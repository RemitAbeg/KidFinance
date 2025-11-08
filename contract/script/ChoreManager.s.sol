// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {ChoreManager} from "../src/ChoreManager.sol";

/// @notice Foundry deployment script for ChoreManager.
/// @dev Run with:
///      forge script script/ChoreManager.s.sol:DeployChoreManager \
///        --rpc-url $BASE_RPC_URL \
///        --broadcast \
///        --verify? \
///        --etherscan-api-key $BASESCAN_API_KEY
///      Ensure `PRIVATE_KEY` is set in the environment.
contract DeployChoreManager is Script {
    function run() external returns (ChoreManager choreManager) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        choreManager = new ChoreManager();
        vm.stopBroadcast();

        console2.log("ChoreManager deployed at", address(choreManager));
    }
}
