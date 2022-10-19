pragma solidity ^0.8.17;

import "../INFT.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockNFT is INFT, ERC721, Ownable  {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function mint(AminoChainLibrary.BioData calldata bioData) public returns(uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_msgSender(), tokenId);
        return tokenId;
    }

    function transferOwnership(address newOwner) public override(INFT, Ownable) virtual onlyOwner {
        super.transferOwnership(newOwner);
    }
}