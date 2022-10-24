// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../libraries/AminoChainLibrary.sol";

interface IAminoChainAuthenticator {
    event UserRegistered(address indexed user, uint256[] indexed tokenIds);

    function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress, uint256[] calldata amounts)
        external;

    function isRegistered() external view returns (bool);
}
