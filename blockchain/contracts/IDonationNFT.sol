// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./AminoChainLibrary.sol";

interface IDonationNFT is IERC721 {
    function mint(address donor, AminoChainLibrary.BioData calldata bioData) external returns(uint);
    function transferOwnership(address newOwner) external;
    function getTokenIdByDonor(address donor) external view returns(uint);
}