pragma solidity ^0.8.7;

import "./IAminoChainAuthenticator.sol";
import "./INFT.sol";
import "./IAminoChainMarketplace.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract AminoChainAuthenticator is IAminoChainAuthenticator, IERC721Receiver {
    uint DEFAULT_PRICE = 40000*10e18;

    INFT immutable nft;
    IAminoChainMarketplace immutable marketplace;
    IERC20 immutable usdc;

    constructor(address nftAddress, address marketplaceAddress, address usdcAddress) {
        nft = INFT(nftAddress);
        marketplace = IAminoChainMarketplace(marketplaceAddress);
        usdc = IERC20(usdcAddress);
    }

    function registerUser(AminoChainLibrary.BioData calldata bioData, address biobankAddress) public {
        uint tokenId = nft.mint(bioData);
        nft.transferFrom(address(this), address(marketplace), tokenId);
        marketplace.listItem(tokenId, DEFAULT_PRICE, msg.sender, biobankAddress);
        emit UserRegistered(msg.sender);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}