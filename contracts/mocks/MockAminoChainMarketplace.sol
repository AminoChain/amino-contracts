// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.17;

import "../interfaces/IAminoChainMarketplace.sol";
import "../interfaces/IDonationNFT.sol";

contract MockAminoChainMarketplace is IAminoChainMarketplace {
    IDonationNFT nft;

    constructor(
        uint256 _donorIncentiveRate,
        address _usdc,
        address _tokenizedStemCells
    ) {
        nft = IDonationNFT(_tokenizedStemCells);
    }

    function listItem(
        uint256 tokenId,
        uint256 sizeInCC,
        address donor,
        address bioBank
    ) external {}

    function buyItem(uint256 tokenId) external {
        //        nft.transferFrom(address(this), msg.sender, tokenId);
    }

    function cancelListing(uint256 tokenId) external {}

    function updateListing(uint256 tokenId, uint256 newPrice) external {}

    function transferOwnership(address newOwner) external {}

    function setTokenizedStemCells(address stemCells) external {}

    function setAuthenticatorAddress(address _authenticator) external {}

    function setDonorIncentiveRate(uint256 newIncentiveRate) external {}
}
