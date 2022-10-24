// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../libraries/AminoChainLibrary.sol";

interface IDonationNFT is IERC721 {
    function mint(address donor,
        AminoChainLibrary.BioData calldata bioData,
        uint256[] calldata amounts
    )
        external
        returns (uint256[] memory);

    function transferOwnership(address newOwner) external;

    function getTokenIdsByDonor(address donor) external view returns (uint256[] memory);

    event NFTMinted(address indexed donor,
        AminoChainLibrary.BioData indexed bioData,
        uint256[] indexed tokenIds,
        uint256[] amounts);
}
