pragma solidity ^0.8.17;

import "./BioDataLibrary.sol";

interface IAminoChainAuthenticator {
    event UserRegistered(address user);

    function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress) external;
}