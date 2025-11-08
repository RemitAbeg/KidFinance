// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title ChoreManager (MVP)
/// @author
/// @notice Minimal chore/reward escrow contract:
/// Parent creates a chore and deposits ERC20 reward -> Child accepts -> Child submits proof -> Parent approves -> payout to child.
/// Uses OpenZeppelin SafeERC20 + ReentrancyGuard.

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ChoreManager is ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 private _nextChoreId;

    enum Status {
        Open, // created and funded by parent
        InProgress, // accepted by a child
        PendingApproval, // child submitted proof, awaiting parent approval
        Completed, // parent approved and reward paid
        Rejected // parent rejected; funds refunded to parent
    }

    struct Chore {
        uint256 id;
        address parent;
        address child; // 0x0 while unaccepted
        string title;
        string description;
        string proofURI; // IPFS/URL to submitted proof (set by child)
        uint256 reward; // in token smallest units (e.g., USDC has 6 decimals)
        address token; // ERC20 token used as reward
        Status status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    /// @notice choreId => Chore
    mapping(uint256 => Chore) public chores;
    /// @notice array of chore ids (iterate off-chain / in frontend as needed)
    uint256[] private _choreIds;

    /* Events */
    event ChoreCreated(
        uint256 indexed id,
        address indexed parent,
        uint256 reward,
        address token
    );
    event ChoreAccepted(uint256 indexed id, address indexed child);
    event ChoreSubmitted(
        uint256 indexed id,
        address indexed child,
        string proofURI
    );
    event ChoreApproved(
        uint256 indexed id,
        address indexed parent,
        address indexed child,
        uint256 reward
    );
    event ChoreRejected(uint256 indexed id, address indexed parent);
    event ChoreRefunded(
        uint256 indexed id,
        address indexed parent,
        uint256 amount
    );

    /* Errors */
    error InvalidAmount();
    error NotParent();
    error NotChild();
    error InvalidStatus();
    error ZeroAddress();
    error InsufficientAllowance();
    error AlreadyAccepted();
    error AlreadyCompletedOrRejected();

    /* Constructor */
    constructor() {
        // start chore IDs at 1 for readability
        _nextChoreId = 1;
    }

    /* ========== CORE FLOW FUNCTIONS ========== */

    /// @notice Parent creates a chore and funds the reward (transferFrom must be approved)
    /// @param title short title for chore
    /// @param description longer description
    /// @param reward amount in token smallest units
    /// @param token ERC20 token address used to pay reward
    function createChore(
        string calldata title,
        string calldata description,
        uint256 reward,
        address token
    ) external nonReentrant returns (uint256) {
        if (reward == 0) revert InvalidAmount();
        if (token == address(0)) revert ZeroAddress();

        // pull tokens into contract as escrow
        IERC20 erc = IERC20(token);
        // check allowance by attempting safeTransferFrom; SafeERC will revert on insufficiency
        erc.safeTransferFrom(msg.sender, address(this), reward);

        uint256 id = _nextChoreId;
        unchecked {
            _nextChoreId = id + 1;
        }

        Chore memory c = Chore({
            id: id,
            parent: msg.sender,
            child: address(0),
            title: title,
            description: description,
            proofURI: "",
            reward: reward,
            token: token,
            status: Status.Open,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        chores[id] = c;
        _choreIds.push(id);

        emit ChoreCreated(id, msg.sender, reward, token);
        return id;
    }

    /// @notice Child accepts an open chore
    /// @param id chore id
    function acceptChore(uint256 id) external nonReentrant {
        Chore storage c = chores[id];

        if (c.parent == address(0)) revert InvalidStatus(); // not exist
        if (c.status != Status.Open) revert InvalidStatus();
        if (msg.sender == c.parent) revert InvalidStatus(); // parent cannot accept their own chore

        c.child = msg.sender;
        c.status = Status.InProgress;
        c.updatedAt = block.timestamp;

        emit ChoreAccepted(id, msg.sender);
    }

    /// @notice Child submits proof (IPFS/URL string). Moves status to PendingApproval.
    /// @param id chore id
    /// @param proofURI link to proof (IPFS CID or http(s) URL)
    function submitProof(
        uint256 id,
        string calldata proofURI
    ) external nonReentrant {
        Chore storage c = chores[id];

        if (c.parent == address(0)) revert InvalidStatus(); // not exist
        if (c.status != Status.InProgress) revert InvalidStatus();
        if (msg.sender != c.child) revert NotChild();

        c.proofURI = proofURI;
        c.status = Status.PendingApproval;
        c.updatedAt = block.timestamp;

        emit ChoreSubmitted(id, msg.sender, proofURI);
    }

    /// @notice Parent approves the submitted proof and pays out the reward to the child.
    /// @param id chore id
    function approveChore(uint256 id) external nonReentrant {
        Chore storage c = chores[id];

        if (c.parent == address(0)) revert InvalidStatus(); // not exist
        if (msg.sender != c.parent) revert NotParent();
        if (c.status != Status.PendingApproval) revert InvalidStatus();
        if (c.child == address(0)) revert InvalidStatus();

        c.status = Status.Completed;
        c.updatedAt = block.timestamp;

        // transfer reward to child
        IERC20(c.token).safeTransfer(c.child, c.reward);

        emit ChoreApproved(id, msg.sender, c.child, c.reward);
    }

    /// @notice Parent rejects the submitted proof and refunds reward to parent.
    /// Only allowed if status is PendingApproval or InProgress/Open (optional); here we allow PendingApproval & InProgress.
    /// @param id chore id
    function rejectChore(uint256 id) external nonReentrant {
        Chore storage c = chores[id];

        if (c.parent == address(0)) revert InvalidStatus(); // not exist
        if (msg.sender != c.parent) revert NotParent();
        if (
            !(c.status == Status.PendingApproval ||
                c.status == Status.InProgress ||
                c.status == Status.Open)
        ) revert InvalidStatus();
        if (c.status == Status.Completed || c.status == Status.Rejected)
            revert AlreadyCompletedOrRejected();

        c.status = Status.Rejected;
        c.updatedAt = block.timestamp;

        // refund escrow to parent
        IERC20(c.token).safeTransfer(c.parent, c.reward);

        emit ChoreRejected(id, msg.sender);
        emit ChoreRefunded(id, msg.sender, c.reward);
    }

    /* ========== VIEW HELPERS ========== */

    /// @notice Return total number of chores created (useful for pagination)
    function totalChores() external view returns (uint256) {
        return _choreIds.length;
    }

    /// @notice Return array of all chore ids
    function allChoreIds() external view returns (uint256[] memory) {
        return _choreIds;
    }

    /// @notice Get chore details by id
    function getChore(uint256 id) external view returns (Chore memory) {
        return chores[id];
    }

    /// @notice Get chore ids created by a parent (O(n) scan — ok for MVP; index off-chain for production)
    function choresByParent(
        address parent
    ) external view returns (uint256[] memory) {
        uint256 total = _choreIds.length;
        uint256 count = 0;

        // first pass: count
        for (uint256 i = 0; i < total; ++i) {
            if (chores[_choreIds[i]].parent == parent) {
                ++count;
            }
        }

        // second pass: populate
        uint256[] memory result = new uint256[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < total; ++i) {
            uint256 id = _choreIds[i];
            if (chores[id].parent == parent) {
                result[j++] = id;
            }
        }
        return result;
    }

    /// @notice Get chore ids accepted by a child (O(n) scan — ok for MVP)
    function choresByChild(
        address child
    ) external view returns (uint256[] memory) {
        uint256 total = _choreIds.length;
        uint256 count = 0;

        // first pass: count
        for (uint256 i = 0; i < total; ++i) {
            if (chores[_choreIds[i]].child == child) {
                ++count;
            }
        }

        // second pass: populate
        uint256[] memory result = new uint256[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < total; ++i) {
            uint256 id = _choreIds[i];
            if (chores[id].child == child) {
                result[j++] = id;
            }
        }
        return result;
    }

    /* ========== ADMIN / RECOVERY (Optional small helpers) ========== */

    /// @notice In case tokens are accidentally sent to contract address (not via createChore), admin can withdraw them.
    /// WARNING: For MVP we do not implement a global owner. If you want one, add Ownable. For now, this is commented out.
    /*
    function rescueTokens(address token, address to, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(to, amount);
    }
    */

    /* ========== NOTES ==========
       - This contract intentionally keeps logic simple and explicit for MVP.
       - Proof content (images, photos) should be stored on IPFS (e.g., via web3.storage) and the returned CID saved in proofURI.
       - For production, consider:
         * adding pausability / access control (Ownable, Pausable),
         * adding meta-transactions for kid onboarding,
         * indexing events off-chain (The Graph) for efficient listing,
         * on-chain reputation / badges, and
         * dispute window logic (e.g., auto-refund after timeout).
    =================================================== */
}
