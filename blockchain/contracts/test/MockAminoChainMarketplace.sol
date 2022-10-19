pragma solidity ^0.8.17;

import "../IAminoChainMarketplace.sol";

contract MockAminoChainMarketplace is IAminoChainMarketplace {
    constructor(
        uint256 _donorIncentiveRate,
        address _usdc,
        address _tokenizedStemCells
    ) {}

    function listItem(
        uint256 tokenId,
        uint256 price,
        address donor,
        address bioBank
    ) external {}

    function buyItem(uint256 tokenId) external {}

    function cancelListing(uint256 tokenId) external {}

    function updateListing(uint256 tokenId, uint256 newPrice) external {}

    function transferOwnership(address newOwner) external {}

    function setTokenizedStemCells(address stemCells) external {}

    function setAuthenticatorAddress(address _authenticator) external {}

    function setDonorIncentiveRate(uint256 newIncentiveRate) external {}
}