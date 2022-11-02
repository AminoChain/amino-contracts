// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

/** @title AminoChain Marketplace V0.2.0
 *  @notice Handles the sale of tokenized stem cells and distributing
 *  incentives to donors
 */
contract AminoChainMarketplace is
    ReentrancyGuard,
    IERC721Receiver,
    ChainlinkClient,
    AutomationCompatibleInterface
{
    using Chainlink for Chainlink.Request;

    uint256 public constant DEFAULT_PRICE_PER_CC = 1400;
    address public owner;
    address public tokenziedStemCells;
    address public authenticator;
    address public immutable i_usdc;

    /** @dev The sale price divied by donorIncentiveRate equals donor incentive amount.
     *   E.G. If donorIncentiveRate is equal to 8, then the donors will get 12.5% of the
     *   sale amounts.
     */
    uint256 public donorIncentiveRate;

    enum physicalStatus {
        AT_ORIGIN,
        IN_TRANSIT,
        DELIVERED
    }

    struct Listing {
        address seller;
        uint256 sizeInCC;
        uint256 price;
        address donor;
        address bioBank;
    }

    struct PendingSale {
        uint256 date;
        physicalStatus saleStatus;
        address seller;
        address buyer;
        address bioBank;
        address donor;
        uint256 escrowedPayment;
    }

    uint256[] pendingSaleTokenIds;

    mapping(uint256 => Listing) ListingData;
    mapping(uint256 => PendingSale) PendingSales;
    mapping(uint256 => uint256) PendingSaleIdsIndex;
    mapping(bytes32 => address) ApprovalRequest;
    mapping(address => bool) ApprovedToBuy;

    /** === Constructor === **/

    constructor(
        uint256 _donorIncentiveRate,
        address _usdc,
        address _tokenizedStemCells,
        address _chainlinkToken,
        address _chainlinkOracle
    ) {
        owner = msg.sender;
        tokenziedStemCells = _tokenizedStemCells;
        i_usdc = _usdc;
        donorIncentiveRate = _donorIncentiveRate;
        setChainlinkToken(_chainlinkToken);
        setChainlinkOracle(_chainlinkOracle);
    }

    /** === Modifiers === **/

    /** @dev Prevents functions from being called by addresses that are
     *  not the owner address.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Msg sender in not contract owner");
        _;
    }

    /** @dev Prevents functions from being called by addresses that are not
     *  the authenticator contract.
     */
    modifier onlyAuthenticator() {
        require(msg.sender == authenticator, "Msg sender in not authenticator contract");
        _;
    }

    /** === Events === **/

    event newListing(
        address seller,
        uint256 tokenId,
        uint256 sizeInCC,
        uint256 price,
        address donor,
        address bioBank
    );

    event saleInitiated(
        address bioBank,
        address buyer,
        uint256 tokenId,
        uint256 sizeInCC,
        address donor,
        uint256 escrowedPrice
    );

    event saleCompleted(
        address bioBank,
        address buyer,
        uint256 tokenId,
        address donor,
        uint256 salePrice,
        uint256 donorIncentive,
        uint256 protocolFee
    );

    event saleRefunded(uint256 tokenId, address buyer, address bioBank, uint256 refundTotal);

    event listingCanceled(uint256 tokenId);

    event ownershipTransferred(address oldOwner, address newOwner);

    event stemCellsAddressSet(address stemCells);

    event authenticatorAddressSet(address authenticator);

    event newDonorIncentiveRate(uint256 newIncentiveRate);

    /** === External Functions === **/

    /** @dev Allows the owner (AminoChain) of the contract to list tokenized stem cells.
     *  The BioBank is the physcial holder of the stem cells. Before calling this function, the
     *  lister must set isApprovedForAll on the ERC-721 contract to true for this contract address.
     */
    function listItem(
        uint256 tokenId,
        uint256 sizeInCC,
        address donor,
        address bioBank
    ) external onlyAuthenticator {
        require(
            IERC721(tokenziedStemCells).ownerOf(tokenId) == msg.sender,
            "Token is not owned by sender"
        );
        require(ListingData[tokenId].seller == address(0), "Token is already listed");
        require(bioBank != address(0), "BioBank cannot be null");
        require(
            IERC721(tokenziedStemCells).isApprovedForAll(msg.sender, address(this)) == true,
            "Marketplace does not have approval from lister on NFT contract"
        );

        uint256 price = (DEFAULT_PRICE_PER_CC * sizeInCC) * 10**IERC20Metadata(i_usdc).decimals();

        ListingData[tokenId] = Listing(msg.sender, sizeInCC, price, donor, bioBank);

        emit newListing(msg.sender, tokenId, sizeInCC, price, donor, bioBank);
    }

    /** @dev Allows a user to buy tokenized stem cells for a given tokenId, then transfers the incentive
     *  (based on donorIncentiveRate) to the donor's wallet, a fee to the authenticator contract,
     *  and the rest of the payment to the bioBanks's wallet. Buyer must have the price amount approved for marketplace address
     *  on the USDC contract.
     */
    function buyItem(uint256 tokenId) external nonReentrant {
        Listing memory data = ListingData[tokenId];
        require(data.seller != address(0), "Token is not listed");
        require(ApprovedToBuy[msg.sender] == true, "Msg sender is not approved to buy");
        require(
            IERC721(tokenziedStemCells).ownerOf(tokenId) != msg.sender,
            "Token seller cannot buy their token"
        );
        require(
            IERC721(i_usdc).balanceOf(msg.sender) >= data.price,
            "Buyer's USDC balence is too low"
        );
        require(
            IERC20(i_usdc).allowance(msg.sender, address(this)) >= data.price,
            "Marketplace allowance from buyer on USDC contract must be higher than listing price"
        );

        IERC20(i_usdc).transferFrom(msg.sender, address(this), data.price);

        IERC721(tokenziedStemCells).safeTransferFrom(data.seller, address(this), tokenId);

        pendingSaleTokenIds.push(tokenId);
        PendingSaleIdsIndex[tokenId] = pendingSaleTokenIds.length - 1;
        PendingSales[tokenId] = PendingSale(
            block.timestamp,
            physicalStatus.AT_ORIGIN,
            data.seller,
            msg.sender,
            data.bioBank,
            data.donor,
            data.price
        );
        delete ListingData[tokenId];

        emit saleInitiated(
            data.bioBank,
            msg.sender,
            tokenId,
            data.sizeInCC,
            data.donor,
            data.price
        );
    }

    /** @dev Requests a Chainlink Any-Api call to determine if the caller is a registered
     *  doctor or researcher. Which then determines if they are allowed to buy stem cells.
     */
    function requestBuyAccess() external {
        Chainlink.Request memory req = buildChainlinkRequest(
            "c1c5e92880894eb6b27d3cae19670aa3",
            address(this),
            this.fulfill.selector
        );
        req.add(
            "get",
            string.concat(
                "https://amino-chain-doctors-registry.herokuapp.com/is-it-doctor-wallet/",
                Strings.toHexString(msg.sender)
            )
        );
        req.add("path", "doctor");

        bytes32 id = sendChainlinkRequest(req, (1 * LINK_DIVISIBILITY) / 10);
        ApprovalRequest[id] = msg.sender;
    }

    /** @dev Called by Chainlink to complete sales if the phyisical stem cells have been delivered or
     *  refund them if they have not been delivered in the acceptable time frame.
     */
    function performUpkeep(bytes calldata performData) external override {
        (uint256[] memory completedSaleIds, uint256[] memory refundSaleIds) = abi.decode(
            performData,
            (uint256[], uint256[])
        );
        require(completedSaleIds.length >= 0 || refundSaleIds.length >= 0, "no upkeep to preform");

        if (completedSaleIds.length >= 0) {
            for (uint256 i = 0; i < completedSaleIds.length; i++) {
                PendingSale memory data = PendingSales[completedSaleIds[i]];
                require(
                    data.saleStatus == physicalStatus.DELIVERED,
                    "provided tokenId has not been delivered"
                );
                completeItemSale(completedSaleIds[i]);
            }
        }
        if (refundSaleIds.length >= 0) {
            for (uint256 i = 0; i < refundSaleIds.length; i++) {
                PendingSale memory data = PendingSales[refundSaleIds[i]];
                require(
                    block.timestamp - data.date >= 30 days,
                    "provided tokenId has not surpassed time limit"
                );
                refundSale(refundSaleIds[i]);
            }
        }
    }

    /** @dev Updates the delivery status of a pending sale for a given tokenId.
     *  @notice 0 = At_Origin, 1 = In Transit, 2 = Delivered
     */
    function updateDeliveryStatus(uint256 tokenId, uint256 status) external onlyOwner {
        PendingSale memory data = PendingSales[tokenId];
        require(data.buyer != address(0), "Buyer cannot be null");
        require(status < 3, "Invalid status input");

        if (status == 0) {
            PendingSales[tokenId].saleStatus = physicalStatus.AT_ORIGIN;
        } else if (status == 1) {
            PendingSales[tokenId].saleStatus = physicalStatus.IN_TRANSIT;
        } else if (status == 2) {
            PendingSales[tokenId].saleStatus = physicalStatus.DELIVERED;
        }
    }

    /** @dev Allows the owner of the contract to cancel a listing by deleting
     *  the corrosponding listing data.
     */
    function cancelListing(uint256 tokenId) external onlyOwner {
        require(ListingData[tokenId].seller != address(0), "Token is not listed");

        delete ListingData[tokenId];

        emit listingCanceled(tokenId);
    }

    /** @dev Allows the owner of the contract to update the price of a listing by
     *  modifing the corrosponding listing data.
     */
    function updateListing(uint256 tokenId, uint256 newPrice) external onlyOwner {
        Listing memory data = ListingData[tokenId];
        require(data.seller != address(0), "Token is not listed");
        require(data.price != newPrice, "Old price cannot be the same as the new");

        ListingData[tokenId].price = newPrice;

        emit newListing(msg.sender, tokenId, data.sizeInCC, newPrice, data.donor, data.bioBank);
    }

    /** @dev Transfers contract ownership to another wallet address. Many functions
     *  (with onlyOwner modifier) can only be called by the owner address.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != owner, "New address is already owner");
        address oldOwner = owner;
        owner = newOwner;
        emit ownershipTransferred(oldOwner, newOwner);
    }

    /** @dev Sets the address of the tokenized stem cells (ERC-721). Only NFTs from
     *  the address can be listed and sold on this markeplace.
     */
    function setTokenizedStemCells(address stemCells) external onlyOwner {
        require(stemCells != tokenziedStemCells, "New address is already set");
        tokenziedStemCells = stemCells;
        emit stemCellsAddressSet(stemCells);
    }

    /** @dev Sets the address of the authenticator contract. Authenticator mints tokenized
     *  stem cells and lists them on the marketplace.
     */
    function setAuthenticatorAddress(address _authenticator) external onlyOwner {
        require(authenticator != _authenticator, "New address is already set");
        authenticator = _authenticator;
        emit authenticatorAddressSet(_authenticator);
    }

    /** @dev Sets a new donor incentive rate. Which determines the percentage of
     *  each sale that goes to the stem cell donor.
     */
    function setDonorIncentiveRate(uint256 newIncentiveRate) external onlyOwner {
        require(
            donorIncentiveRate != newIncentiveRate,
            "New incentive rate is the same as the old"
        );
        donorIncentiveRate = newIncentiveRate;
        emit newDonorIncentiveRate(newIncentiveRate);
    }

    /** @dev Allows the owner of this contract to withdrawl stored LINK.
     */
    function withdrawLink() external onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    // === Internal Functions === //

    /** @dev Finishes sale on delivery of physical stem cells. Tranfers escrowed payment to Bio Bank,
     *  escrowed incentive to donor, and escrowed fee to authenticator. Transfers NFT to buyer.
     */
    function completeItemSale(uint256 tokenId) internal {
        PendingSale memory data = PendingSales[tokenId];
        require(
            data.saleStatus == physicalStatus.DELIVERED,
            "Physical item has not been delivered yet"
        );
        require(
            IERC20(i_usdc).balanceOf(address(this)) >= data.escrowedPayment,
            "Contract USDC balance is too low"
        );

        uint256 incentive = data.escrowedPayment / donorIncentiveRate;
        uint256 fee = data.escrowedPayment / 10;

        /// BioBank Payment
        IERC20(i_usdc).transfer(data.bioBank, data.escrowedPayment - (incentive + fee));
        /// Protocol Fee Payment
        IERC20(i_usdc).transfer(data.seller, fee);
        /// Donor Incentive Payment
        IERC20(i_usdc).transfer(data.donor, incentive);

        IERC721(tokenziedStemCells).safeTransferFrom(address(this), data.buyer, tokenId);

        delete PendingSales[tokenId];
        delete pendingSaleTokenIds[PendingSaleIdsIndex[tokenId]];

        emit saleCompleted(
            data.bioBank,
            data.buyer,
            tokenId,
            data.donor,
            data.escrowedPayment,
            incentive,
            fee
        );
    }

    /** @dev Called by Chainlink automation if the physical stem cells have not been delivered
     *  in the acceptable time frame. Transfers escrowed payment back to buyer and tokenId to authenticator.
     */
    function refundSale(uint256 tokenId) internal {
        PendingSale memory data = PendingSales[tokenId];
        require(
            block.timestamp - data.date >= 30 days,
            "provided tokenId has not surpassed time limit"
        );

        IERC20(i_usdc).transfer(data.buyer, data.escrowedPayment);

        IERC721(tokenziedStemCells).safeTransferFrom(address(this), data.seller, tokenId);

        delete PendingSales[tokenId];
        delete pendingSaleTokenIds[PendingSaleIdsIndex[tokenId]];

        emit saleRefunded(tokenId, data.buyer, data.bioBank, data.escrowedPayment);
    }

    // === Public Functions === //

    /** @dev Allows or prevents a buyer from buying tokenized stem cells. Based on a
     *  Chainlink API call to the doctor/researcher registry.
     */
    function fulfill(bytes32 _requestId, bool isDoctorOrResearcher)
        public
        recordChainlinkFulfillment(_requestId)
    {
        address requester = ApprovalRequest[_requestId];
        ApprovedToBuy[requester] = isDoctorOrResearcher;
    }

    // === View Functions === //

    /** @dev Called by Chainlink automation to determine if there are sales to complete or refund.
     */
    function checkUpkeep(
        bytes calldata /* checkData */
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        uint256 completedCounter;
        uint256 refundedCounter;
        for (uint256 i = 0; i < pendingSaleTokenIds.length; i++) {
            PendingSale memory data = PendingSales[pendingSaleTokenIds[i]];
            if (data.saleStatus == physicalStatus.DELIVERED) {
                completedCounter++;
            } else if (block.timestamp - data.date >= 30 days) {
                refundedCounter++;
            }
        }

        upkeepNeeded = false;
        uint256[] memory completedSaleIds = new uint256[](completedCounter);
        uint256[] memory refundSaleIds = new uint256[](refundedCounter);

        uint256 completedIndexCounter = 0;
        uint256 refundedIndexCounter = 0;
        for (uint256 i = 0; i < pendingSaleTokenIds.length; i++) {
            PendingSale memory data = PendingSales[pendingSaleTokenIds[i]];
            if (data.saleStatus == physicalStatus.DELIVERED) {
                upkeepNeeded = true;
                completedSaleIds[completedIndexCounter] = pendingSaleTokenIds[i];
                completedIndexCounter++;
            } else if (block.timestamp - data.date >= 30 days) {
                upkeepNeeded = true;
                refundSaleIds[refundedIndexCounter] = pendingSaleTokenIds[i];
                refundedIndexCounter++;
            }
        }
        performData = abi.encode(completedSaleIds, refundSaleIds);
        return (upkeepNeeded, performData);
    }

    /** @dev Returns the listing data for a given tokenId
     */
    function getListingData(uint256 tokenId) public view returns (Listing memory) {
        return ListingData[tokenId];
    }

    /** @dev IERC721 Reciever for tokenized stem cells
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
