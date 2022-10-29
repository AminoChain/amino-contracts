// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.7;

import "./interfaces/IAminoChainAuthenticator.sol";
import "./AminoChainDonation.sol";
import "./interfaces/IAminoChainMarketplace.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/** @title AminoChain Authenticator
 *  @notice Handles the minting of tokenized stem cells and listing
 *  them on the marketplace
 */
contract AminoChainAuthenticator is IAminoChainAuthenticator, IERC721Receiver {
    IAminoChainDonation immutable nft;
    IAminoChainMarketplace immutable marketplace;
    IERC20 immutable usdc;
    using ECDSA for bytes32;

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

/*    function registerUser(
        AminoChainLibrary.BioData calldata bioData,
        address biobankAddress,
        uint256[] calldata amounts
    ) external {
        uint256[] memory tokenIds = nft.mint(msg.sender, bioData, amounts);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            marketplace.listItem(tokenIds[i], amounts[i], msg.sender, biobankAddress);
        }
//        emit UserRegistered(msg.sender, tokenIds);
    }*/

    function isRegistered() public view returns (bool) {
        return nft.getTokenIdsByDonor(msg.sender).length != 0; // fixme
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function hash(
        string calldata str
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(str));
    }

    function getBioDataHash(
        string calldata A,
        string calldata B,
        string calldata C,
        string calldata DPB,
        string calldata DRB
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(A, B, C, DPB, DRB));
    }

    function getRegistrationHash(address donor, bytes32 biodataHash, uint nonce) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(donor, biodataHash, nonce));
    }

    function register(
        AminoChainLibrary.BioData calldata bioData,
        address donor,
        bytes32 biodataHash,
        uint nonce,
        bytes memory signature,
        uint256[] calldata amounts
    ) public {
        bytes32 messageHash = getRegistrationHash(donor, biodataHash, nonce);
        bytes32 signedMessageHash = messageHash.toEthSignedMessageHash();

        address signer = signedMessageHash.recover(signature);

        require(signer == donor, "Signature does not come from donor");

        _register(bioData, msg.sender, donor, amounts);
    }

    function _register(
        AminoChainLibrary.BioData calldata bioData,
        address biobank,
        address donor,
        uint256[] calldata amounts
    ) private {
        uint256[] memory tokenIds = nft.mint(donor, bioData, amounts);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            marketplace.listItem(tokenIds[i], amounts[i], donor, biobank);
        }
        emit UserRegistered(donor, biobank, tokenIds, amounts);
    }
}
