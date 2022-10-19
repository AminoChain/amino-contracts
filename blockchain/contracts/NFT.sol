// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;

    mapping(uint => string) public tokenIdToDomain;

    struct DonationData {
        string HLA_A;
        string randomString;
        address wallet;
    }

    DonationData[] donations;
    mapping(uint256 => DonationData) public tokenIdToDonationInfo;
    

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, string calldata domain) public onlyOwner whenNotPaused returns(uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        tokenIdToDomain[tokenId] = domain;
        return tokenId;
    }

    function nextTokenId() public view returns(uint) {
        return _tokenIdCounter.current() == 0 ? 1 : _tokenIdCounter.current(); // workaround for initial counter value
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

    /*function tokenURI(uint256 tokenId)
        public
        view
//        override(ERC721)
        returns (string memory){

        return _tokenURIs[tokenId];
    }*/
}
