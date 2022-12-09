//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/** @title AminoChain Cell Line V0.1.0
 *  @notice Tokenizes donated cell lines
 */
contract AminoCellLine is ERC1155 {
    address public owner;
    address public authenticator;
    uint internal lastId = 0;
    mapping(address => mapping(uint => uint)) public cellLineId;
    mapping(uint => DonationData) public cellLineData;
    uint[] public cellLineIds;

    struct DonationData {
        address donorAddress;
        string donorConsentStatus;
        address biobankOriginAddress;
    }

    // === Constructor === //

    constructor(string memory uri) ERC1155(uri) {
        owner = msg.sender;
    }

    // === Modifiers === //

    modifier onlyOwner() {
        require(msg.sender == owner, "Msg sender in not contract owner");
        _;
    }

    modifier onlyAuthenticator() {
        require(msg.sender == authenticator, "Msg sender in not authenticator contract");
        _;
    }

    // === Events === //

    event registeredDonation(uint cellLineId, address donor);
    event clonedAndTransferred(uint cellLineId, address from, address to);
    event ownershipTransferred(address newOwner);
    event authenticatorAddressSet(address newAuthenticator);

    // === External Functions === //

    function registerCancerLine(
        address donor,
        address biobank
    ) external onlyAuthenticator returns (uint) {
        require(biobank != address(0), "Biobank cannot be null");
        require(donor != address(0), "Donor cannot be null");
        uint id = lastId + 1;
        lastId = id;
        cellLineIds.push(id);
        cellLineId[donor][block.timestamp] = id;
        cellLineData[id] = DonationData(donor, "full", biobank);

        _mint(biobank, id, 1, "");

        emit registeredDonation(id, donor);
        return (id);
    }

    function cloneAndTransfer(uint id, address from, address to) external onlyAuthenticator {
        require(balanceOf(from, id) != 0, "From balance for id cannot be zero");
        _mint(from, id, 1, "");
        safeTransferFrom(from, to, id, 1, "");
        emit clonedAndTransferred(id, from, to);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != owner, "New address is already owner");
        require(newOwner != address(0), "Invalid owner address");

        owner = newOwner;
        emit ownershipTransferred(newOwner);
    }

    function setAuthenticatorAddress(address _authenticator) external onlyOwner {
        require(authenticator != _authenticator, "New address is already set");
        require(_authenticator != address(0), "Invalid authenticator address");

        authenticator = _authenticator;
        emit authenticatorAddressSet(_authenticator);
    }

    // === View Functions === //

    function getCellLineData(uint id) public view returns (DonationData memory) {
        return cellLineData[id];
    }
}
