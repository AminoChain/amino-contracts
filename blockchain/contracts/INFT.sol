pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./BioDataLibrary.sol";

interface INFT is IERC721 {
    function mint(AminoChainLibrary.BioData calldata bioData) external returns(uint);
    function transferOwnership(address newOwner) external;
}