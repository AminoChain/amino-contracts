// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.7;

import "./interfaces/IAminoChainDonation.sol";
import "./AminoChainDonation.sol";
import "./interfaces/IAminoChainMarketplace.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** @title AminoChain Authenticator
 *  @notice Handles the minting of tokenized stem cells and listing
 *  them on the marketplace
 */
contract AminoChainAuthenticator is IERC721Receiver, Ownable {
    IAminoChainDonation public nft;
    IAminoChainMarketplace public marketplace;
    IERC20 public usdc;

    event UserRegistered(address indexed donor, address indexed biobank, uint256[] indexed tokenIds, uint256[] amounts);
    event Withdrawn(address indexed to, uint amount);

    constructor(
        address nftAddress,
        address marketplaceAddress,
        address usdcAddress
    ) {
        nft = IAminoChainDonation(nftAddress);
        nft.setApprovalForAll(marketplaceAddress, true);
        marketplace = IAminoChainMarketplace(marketplaceAddress);
        usdc = IERC20(usdcAddress);
    }

    function setNftAddress(address nftAddress) external {
        nft = IAminoChainDonation(nftAddress);
        nft.setApprovalForAll(address(marketplace), true);
    }

    function setMarketplaceAddress(address marketplaceAddress) external {
        marketplace = IAminoChainMarketplace(marketplaceAddress);
    }

    function setUsdcAddress(address usdcAddress) external {
        usdc = IERC20(usdcAddress);
    }

    function isRegistered(address donor) public view returns (bool) {
        return nft.getTokenIdsByDonor(donor).length != 0;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function getRegistrationHash(address donor, bytes32 biodataHash) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(donor, biodataHash));
    }

    function register(AminoChainLibrary.RegistrationData calldata data) public onlyOwner {
        uint256[] memory tokenIds = nft.mint(data);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            marketplace.listItem(tokenIds[i], data.amounts[i], 1400, data.donor, data.biobank);
        }

        emit UserRegistered(data.donor, data.biobank, tokenIds, data.amounts);
    }

    function withdraw(address to, uint amount) external {
        require(to != address(0), "Invalid to address");
        require(amount <= usdc.balanceOf(address(this)), "Not enough balance");

        usdc.transfer(to, amount);

        emit Withdrawn(to, amount);
    }
}
