pragma solidity ^0.8.17;

import "../interfaces/IDonationNFT.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockNFT is IDonationNFT, ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) donorToTokenId;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        //        _tokenIdCounter.increment(); // todo
    }

    function mint(address donor, AminoChainLibrary.BioData calldata bioData)
        public
        returns (uint256)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_msgSender(), tokenId);
        donorToTokenId[donor] = tokenId;
        return tokenId;
    }

    function transferOwnership(address newOwner)
        public
        virtual
        override(IDonationNFT, Ownable)
        onlyOwner
    {
        super.transferOwnership(newOwner);
    }

    //    function getTokenIdByHlaHash(string calldata hash) external pure /*override*/ returns(uint) {}

    function getTokenIdByDonor(address donor) external view returns (uint256) {
        return donorToTokenId[donor];
    }
}