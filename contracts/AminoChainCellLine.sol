//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/** @title AminoChain Cell Lines V0.1.0
 *  @notice Tokenizes donated cell lines
 */
contract AminoChainCellLine is ERC721 {
    address public owner;
    address public authenticator;
    uint internal lastId = 0;
    uint internal lastBatchId = 0;

    //data for a batch of tokens
    mapping(uint => DonationData) public batchData;
    //data for a tokenId
    mapping(uint => SampleData) public sampleData;

    mapping(uint => uint) public batchId;
    mapping(address => mapping(uint => uint)) public batchBalance;

    enum Consent {
        UNDETERMINED,
        CONSENTS,
        NO_CONSENT
    }

    struct DonationData {
        bool isImmortalized;
        address donor;
        address biobank;
    }

    struct SampleData {
        string caseId;
        Consent donorConsent;
        uint sizeInCC; // 0 for immortilized
    }

    // === Constructor === //

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
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

    event cellLineRegistered(
        uint batchId,
        uint tokenId,
        bool isImmortalized,
        address donor,
        address biobank
    );
    event clonedAndTransferred(uint batchId, address from, address to);
    event splitAndTransferred(uint batchId, uint amount, address from, address to);
    event mergedAndBurned(uint[] tokenIds, uint sizeMerged, address merger);
    event ownershipTransferred(address newOwner);
    event authenticatorAddressSet(address newAuthenticator);

    // === External Functions === //

    function registerCellLine(
        address donor,
        address biobank,
        uint size /* 0 if immortalized */
    ) external onlyAuthenticator {
        require(biobank != address(0), "Biobank cannot be null");
        require(donor != address(0), "Donor cannot be null");
        uint id = lastId + 1;
        lastId = id;

        uint currentBatchId = lastBatchId + 1;
        if (size == 0) {
            batchData[currentBatchId] = DonationData(true, donor, biobank);
        } else {
            batchData[currentBatchId] = DonationData(false, donor, biobank);
            sampleData[id].sizeInCC = size;
        }
        batchId[id] = currentBatchId;
        lastBatchId = currentBatchId;

        _safeMint(biobank, id);

        emit cellLineRegistered(currentBatchId, id, batchData[id].isImmortalized, donor, biobank);
    }

    function cloneAndTransfer(
        uint tokenId,
        uint amount /* 0 if immortalized */,
        address from,
        address to
    ) external onlyAuthenticator {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "ERC721: caller is not token owner nor approved"
        );
        require(ownerOf(tokenId) == from, "From balance for batch cannot be zero");
        require(from != to, "Cannot clone to from");

        uint id = lastId + 1;
        lastId = id;

        bool split = false;
        if (batchData[batchId[tokenId]].isImmortalized == false) {
            require(amount > 0, "Split amount must be above 0");
            require(sampleData[tokenId].sizeInCC > amount, "Cannot split more than amount");
            split = true;
            sampleData[tokenId].sizeInCC = sampleData[tokenId].sizeInCC - amount;
            sampleData[id].sizeInCC = amount;
        }

        batchId[id] = batchId[tokenId];

        _safeMint(from, id);
        safeTransferFrom(from, to, id);

        if (!split) {
            emit clonedAndTransferred(batchId[tokenId], from, to);
        } else {
            emit splitAndTransferred(batchId[tokenId], amount, from, to);
        }
    }

    function burnAndMerge(uint[] memory _tokenIds) external {
        uint firstBatchId = batchId[_tokenIds[0]];
        require(
            _isApprovedOrOwner(msg.sender, _tokenIds[0]),
            "ERC721: caller is not token owner nor approved"
        );

        uint newSampleSize = sampleData[_tokenIds[0]].sizeInCC;
        for (uint i = 1; i < _tokenIds.length; i++) {
            require(batchId[_tokenIds[i]] == firstBatchId, "Batch Ids do not match");
            require(
                _isApprovedOrOwner(msg.sender, _tokenIds[i]),
                "ERC721: caller is not token owner nor approved"
            );

            delete sampleData[_tokenIds[i]];
            newSampleSize = newSampleSize + sampleData[_tokenIds[i]].sizeInCC;
            _burn(_tokenIds[i]);
        }
        sampleData[_tokenIds[0]].sizeInCC = newSampleSize;

        emit mergedAndBurned(_tokenIds, newSampleSize, msg.sender);
    }

    function setStudyCaseId(uint tokenId, string memory caseId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner can set case id");
        sampleData[tokenId].caseId = caseId;
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

    // === View Functions === //

    function getBatchId(uint tokenId) public view returns (uint) {
        return batchId[tokenId];
    }

    function getTokenData(
        uint tokenId
    ) public view returns (DonationData memory, SampleData memory) {
        return (batchData[tokenId], sampleData[tokenId]);
    }

    function getBatchBalance(address addy, uint batch) public view returns (uint) {
        return batchBalance[addy][batch];
    }
}
