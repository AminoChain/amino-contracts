// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./AminoChainLibrary.sol";

interface IAminoChainAuthenticator {
    event UserRegistered(address user);
    function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress) external;
    function isRegistered() external view returns(bool);
}