// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./AminoChainLibrary.sol";

interface IDonationNFT is IERC721 {
    function mint(AminoChainLibrary.BioData calldata bioData) external returns(uint);
}