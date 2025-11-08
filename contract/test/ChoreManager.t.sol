// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {ChoreManager} from "../src/ChoreManager.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";

contract ChoreManagerTest is Test {
    ChoreManager internal choreManager;
    ERC20Mock internal rewardToken;

    address internal parent = makeAddr("parent");
    address internal child = makeAddr("child");
    uint256 internal constant INITIAL_SUPPLY = 1_000e18;
    uint256 internal constant REWARD = 100e18;

    function setUp() public {
        choreManager = new ChoreManager();
        rewardToken = new ERC20Mock();
        rewardToken.mint(parent, INITIAL_SUPPLY);
    }

    function _createDefaultChore() internal returns (uint256 choreId) {
        vm.startPrank(parent);
        rewardToken.approve(address(choreManager), REWARD);
        choreId = choreManager.createChore(
            "Clean Room",
            "Tidy up and vacuum",
            REWARD,
            address(rewardToken)
        );
        vm.stopPrank();
    }

    function testCreateChoreStoresDetailsAndEscrowsFunds() public {
        uint256 id = _createDefaultChore();

        ChoreManager.Chore memory chore = choreManager.getChore(id);
        assertEq(chore.id, id);
        assertEq(chore.parent, parent);
        assertEq(chore.child, address(0));
        assertEq(chore.reward, REWARD);
        assertEq(chore.token, address(rewardToken));
        assertEq(uint256(chore.status), uint256(ChoreManager.Status.Open));
        assertEq(rewardToken.balanceOf(address(choreManager)), REWARD);
        assertEq(rewardToken.balanceOf(parent), INITIAL_SUPPLY - REWARD);
    }

    function testCreateChoreWithZeroRewardReverts() public {
        vm.startPrank(parent);
        rewardToken.approve(address(choreManager), REWARD);
        vm.expectRevert(ChoreManager.InvalidAmount.selector);
        choreManager.createChore("Zero", "Reward", 0, address(rewardToken));
        vm.stopPrank();
    }

    function testAcceptChoreSetsChildAndStatus() public {
        uint256 id = _createDefaultChore();

        vm.prank(child);
        choreManager.acceptChore(id);

        ChoreManager.Chore memory chore = choreManager.getChore(id);
        assertEq(chore.child, child);
        assertEq(
            uint256(chore.status),
            uint256(ChoreManager.Status.InProgress)
        );
    }

    function testParentCannotAcceptOwnChore() public {
        uint256 id = _createDefaultChore();

        vm.prank(parent);
        vm.expectRevert(ChoreManager.InvalidStatus.selector);
        choreManager.acceptChore(id);
    }

    function testSubmitProofAndApprovePaysChild() public {
        uint256 id = _createDefaultChore();

        vm.prank(child);
        choreManager.acceptChore(id);

        vm.prank(child);
        choreManager.submitProof(id, "ipfs://proof");

        vm.prank(parent);
        choreManager.approveChore(id);

        ChoreManager.Chore memory chore = choreManager.getChore(id);
        assertEq(uint256(chore.status), uint256(ChoreManager.Status.Completed));
        assertEq(rewardToken.balanceOf(child), REWARD);
        assertEq(rewardToken.balanceOf(address(choreManager)), 0);
    }

    function testRejectChoreRefundsParent() public {
        uint256 id = _createDefaultChore();

        vm.prank(child);
        choreManager.acceptChore(id);

        vm.prank(parent);
        choreManager.rejectChore(id);

        ChoreManager.Chore memory chore = choreManager.getChore(id);
        assertEq(uint256(chore.status), uint256(ChoreManager.Status.Rejected));
        assertEq(rewardToken.balanceOf(parent), INITIAL_SUPPLY);
        assertEq(rewardToken.balanceOf(address(choreManager)), 0);
    }
}
