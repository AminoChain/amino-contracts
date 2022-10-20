// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IDonationNFT.sol";
import "./AminoChainLibrary.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DonationNFT is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;

    mapping(uint => string) public tokenIdToBioData;

    // Struct encapsulating BioData might be useful in case that we plan 
    // to store additional data in the NFT
    struct DonationData {
        address donorAddress;
        AminoChainLibrary.BioData bioData; 
    }

    // Might also make sense to just use an array since tokenIds are sequencially 
    // assigned with the minted DonationNFTs
    //DonationData[] donations;
    mapping(uint256 => DonationData) public tokenIdToDonationData;
    mapping(address => uint256) public addressToTokenId;
    

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        _tokenIdCounter.increment();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address donor, AminoChainLibrary.BioData calldata bioData) public onlyOwner whenNotPaused returns(uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        tokenIdToDonationData[tokenId] = DonationData(donor, bioData);
        addressToTokenId[donor] = tokenId;
        return tokenId;
    }

    function getTokenIdByDonor(address donor) external view returns(uint){
        return addressToTokenId[donor];
    }

    function nextTokenId() public view returns(uint) {
        return _tokenIdCounter.current() == 0 ? 1 : _tokenIdCounter.current(); // workaround for initial counter value
    }

    function getBioData(uint256 tokenId) public view returns(AminoChainLibrary.BioData memory){
        return tokenIdToDonationData[tokenId].bioData;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
        {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function setTokenURI(uint256 tokenId, string calldata uri) public {
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory){
        return _tokenURIs[tokenId];
    }
}
