// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../libraries/AminoChainLibrary.sol";

interface IAminoChainDonation is IERC721 {
    function mint(AminoChainLibrary.RegistrationData calldata data)
        external
        returns (uint256[] memory);

    function transferOwnership(address newOwner) external;

    function getTokenIdsByDonor(address donor) external view returns (uint256[] memory);

    function getHlaHashed(uint256 tokenId)
        external
        view
        returns (AminoChainLibrary.HlaHashed memory);

    function getHlaEncoded(uint256 tokenId) external view returns (bytes memory);

    function getGenomeEncodedUrl(uint256 tokenId) external view returns (string memory);

    event NFTMinted(
        address indexed donor,
        AminoChainLibrary.HlaHashed indexed hlaHashed,
        uint256[] indexed tokenIds,
        uint256[] amounts
    );
}
