// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.4;

import "./interfaces/IDonationNFT.sol";
import "./libraries/AminoChainLibrary.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/** @title AminoChain Donation
 *  @notice Tokenizes donated stem cells
 */
contract DonationNFT is IDonationNFT, ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;

    // Struct encapsulating BioData might be useful in case that we plan
    // to store additional data in the NFT
    struct DonationData {
        address donorAddress;
        AminoChainLibrary.BioData bioData;
        uint256 amount;
    }

    // Might also make sense to just use an array since tokenIds are sequencially
    // assigned with the minted DonationNFTs
    //DonationData[] donations;
    mapping(uint256 => DonationData) public tokenIdToDonationData;
    mapping(address => uint256[]) public addressToTokenIds;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _tokenIdCounter.increment();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address donor, AminoChainLibrary.BioData calldata bioData, uint256[] calldata amounts)
        public
        onlyOwner
        whenNotPaused
        returns (uint256[] memory)
    {
        // It would have been also possible ot return the ids stored in addressToTokenIds[donor],
        // new array is created here to account for the case that donor might give donation
        // not for the first time
        uint256[] memory tokenIds = new uint256[](amounts.length);
        for (uint i = 0; i < amounts.length; i++) {        
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            tokenIdToDonationData[tokenId] = DonationData(donor, bioData, amounts[i]);
            addressToTokenIds[donor].push(tokenId);
            tokenIds[i] = tokenId;
        }
        emit NFTMinted(donor, bioData, amounts, tokenIds);
        return tokenIds;
    }

    function getTokenIdsByDonor(address donor) external view returns (uint256[] memory) {
        return addressToTokenIds[donor];
    }

    function getBioData(uint256 tokenId) public view returns (AminoChainLibrary.BioData memory) {
        return tokenIdToDonationData[tokenId].bioData;
    }

    function transferOwnership(address newOwner) public override(IDonationNFT, Ownable) onlyOwner{
        Ownable.transferOwnership(newOwner);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function setTokenURI(uint256 tokenId, string calldata uri) public {
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
