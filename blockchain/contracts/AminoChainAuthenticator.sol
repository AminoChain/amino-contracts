// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./IAminoChainAuthenticator.sol";
import "./DonationNFT.sol";
import "./IAminoChainMarketplace.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract AminoChainAuthenticator is IAminoChainAuthenticator, IERC721Receiver {
    uint DEFAULT_PRICE = 40000*10e18;

    IDonationNFT immutable nft;
    IAminoChainMarketplace immutable marketplace;
    IERC20 immutable usdc;

    constructor(address nftAddress, address marketplaceAddress, address usdcAddress) {
        nft = IDonationNFT(nftAddress);
        nft.setApprovalForAll(marketplaceAddress, true);
        marketplace = IAminoChainMarketplace(marketplaceAddress);
        usdc = IERC20(usdcAddress);
    }

    function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress) public {
        uint tokenId = nft.mint(msg.sender, bioData);
        nft.transferFrom(address(this), address(marketplace), tokenId);
        marketplace.listItem(tokenId, DEFAULT_PRICE, msg.sender, biobankAddress);
        emit UserRegistered(msg.sender);
    }

    function isRegistered() public view returns(bool) {
        return nft.getTokenIdByDonor(msg.sender) != 0; // fixme
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}