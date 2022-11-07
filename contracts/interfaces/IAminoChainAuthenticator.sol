// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../libraries/AminoChainLibrary.sol";

interface IAminoChainAuthenticator {
    event UserRegistered(address donor, address biobank, uint256[] tokenIds, uint256[] amounts);

    /*function registerUser(AminoChainLibrary.HlaHashed calldata bioData, address biobankAddress, uint256[] calldata amounts)
        external;*/

    function register(AminoChainLibrary.RegistrationData calldata data) external;

    function isRegistered(address donor) external view returns (bool);
}
