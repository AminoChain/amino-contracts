// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.7;

import "./interfaces/IAminoChainAuthenticator.sol";
import "./DonationNFT.sol";
import "./interfaces/IAminoChainMarketplace.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/** @title AminoChain Authenticator
 *  @notice Handles the minting of tokenized stem cells and listing
 *  them on the marketplace
 */
contract AminoChainAuthenticator is IAminoChainAuthenticator, IERC721Receiver {
    IDonationNFT immutable nft;
    IAminoChainMarketplace immutable marketplace;
    IERC20 immutable usdc;

    constructor(
        address nftAddress,
        address marketplaceAddress,
        address usdcAddress
    ) {
        nft = IDonationNFT(nftAddress);
        nft.setApprovalForAll(marketplaceAddress, true);
        marketplace = IAminoChainMarketplace(marketplaceAddress);
        usdc = IERC20(usdcAddress);
    }

    function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress)
        public
    {
        uint256 tokenId = nft.mint(msg.sender, bioData);
        nft.transferFrom(address(this), address(marketplace), tokenId);
        marketplace.listItem(tokenId, msg.sender, biobankAddress);
        emit UserRegistered(msg.sender);
    }

    function isRegistered() public view returns (bool) {
        return nft.getTokenIdByDonor(msg.sender) != 0; // fixme
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
