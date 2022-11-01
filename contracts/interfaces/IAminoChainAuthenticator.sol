// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../libraries/AminoChainLibrary.sol";

interface IAminoChainAuthenticator {
    event UserRegistered(
        address indexed donor,
        address indexed biobank,
        uint256[] indexed tokenIds,
        uint256[] amounts
    );

    /*function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress, uint256[] calldata amounts)
        external;*/

    function register(
        AminoChainLibrary.BioData calldata bioData,
        bytes32 biodataHash,
        bytes memory rawBiodataEncoded,
        uint256[] calldata amounts,
        address donor,
        bytes memory signature,
        address biobank
    ) external;

    function isRegistered(address donor) external view returns (bool);
}
