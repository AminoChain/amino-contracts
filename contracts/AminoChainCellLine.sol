//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/** @title AminoChain Cell Lines V0.1.0
 *  @notice Tokenizes donated cell lines
 */
contract AminoCellLine is ERC721 {
    address public owner;
    address public authenticator;
    uint internal lastId = 0;
    uint internal lastBatchId = 0;

    //data for a batch of tokens
    mapping(uint => DonationData) public batchData;
    //data for a tokenId
    mapping(uint => SampleData) public sampleData;

    mapping(uint => uint) public batchId;
    mapping(address => mapping(uint => uint)) internal batchBalance;

    enum Consent {
        UNDETERMINED,
        CONSENTS,
        NO_CONSENT
    }

    struct DonationData {
        address donor;
        address biobank;
    }

    struct SampleData {
        string caseId;
        Consent donorConsent;
    }

    // === Constructor === //

    constructor() ERC721("Amino", "AMCL") {
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

    event registeredDonation(uint batchId, uint tokenId, address donor, address biobank);
    event clonedAndTransferred(uint batchId, uint tokenId, address from, address to);
    event ownershipTransferred(address newOwner);
    event authenticatorAddressSet(address newAuthenticator);

    // === External Functions === //

    function registerCellLine(address donor, address biobank) external onlyAuthenticator {
        require(biobank != address(0), "Biobank cannot be null");
        require(donor != address(0), "Donor cannot be null");
        uint id = lastId + 1;
        lastId = id;

        _safeMint(biobank, id);

        uint currentBatchId = lastBatchId + 1;
        batchData[currentBatchId] = DonationData(donor, biobank);
        batchId[id] = currentBatchId;
        lastBatchId = currentBatchId;

        emit registeredDonation(currentBatchId, id, donor, biobank);
    }

    function cloneAndTransfer(
        uint cloneBatchId,
        address from,
        address to
    ) external onlyAuthenticator {
        require(batchBalance[from][cloneBatchId] > 0, "From balance for batch cannot be zero");
        require(from != to, "Cannot clone to cloner");
        uint id = lastId + 1;
        lastId = id;

        _safeMint(from, id);
        batchId[id] = cloneBatchId;
        safeTransferFrom(from, to, id);
        emit clonedAndTransferred(cloneBatchId, id, from, to);
    }

    function setStudyCaseId(uint tokenId, string memory caseId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner can set case id");
        sampleData[tokenId] = SampleData(caseId, Consent.UNDETERMINED);
    }

    function updateConsent(uint tokenId, Consent consentStatus) external {
        require(
            batchData[batchId[tokenId]].donor == msg.sender,
            "Only donor can update their consent"
        );
        sampleData[tokenId].donorConsent = consentStatus;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._afterTokenTransfer(from, to, tokenId);

        uint tokenBatchId = batchId[tokenId];
        if (batchBalance[to][tokenBatchId] != 0) {
            batchBalance[from][tokenBatchId]--;
        }
        batchBalance[to][tokenBatchId]++;
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

    // === VIEW FUNCTIONS === //

    function getBatchId(uint tokenId) public view returns (uint) {
        return batchId[tokenId];
    }

    function getTokenData(
        uint tokenId
    ) public view returns (DonationData memory, SampleData memory) {
        return (batchData[tokenId], sampleData[tokenId]);
    }
}
