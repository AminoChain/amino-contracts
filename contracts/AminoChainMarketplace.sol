// SPDX-License-Identifier: GPL-2.0

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/** @title AminoChain Marketplace V0.2.0
 *  @notice Handles the sale of tokenized stem cells and distributing
 *  incentives to donors
 */
contract AminoChainMarketplace is ReentrancyGuard, IERC721Receiver, ChainlinkClient {
    using Chainlink for Chainlink.Request;

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
        address incentiveReciever;
        uint256 escrowedPayment;
    }

    mapping(uint256 => Listing) ListingData;
    mapping(uint256 => PendingSale) PendingSales;
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
        address incentiveReciever,
        uint256 salePrice,
        uint256 paidIncentive,
        uint256 protocolFee
    );

    event deliveryStatusChanged(uint256 tokenId, physicalStatus status);

    event saleRefunded(uint256 tokenId, address buyer, address bioBank, uint256 refundTotal);

    event listingCanceled(uint256 tokenId);

    event ownershipTransferred(address oldOwner, address newOwner);

    event stemCellsAddressSet(address stemCells);

    event authenticatorAddressSet(address authenticator);

    event newDonorIncentiveRate(uint256 newIncentiveRate);

    /** === External Functions === **/

    /** @notice Allows the owner (AminoChain) of the contract to list tokenized stem cells.
     *  The BioBank is the physcial holder of the stem cells. Before calling this function, the
     *  lister must set isApprovedForAll on the ERC-721 contract to true for this contract address.
     */
    function listItem(
        uint256 tokenId,
        uint256 sizeInCC,
        uint256 price_per_cc,
        address donor,
        address bioBank
    ) external onlyAuthenticator {
        require(
            IERC721(tokenziedStemCells).ownerOf(tokenId) == msg.sender,
            "Token is not owned by sender"
        );
        require(ListingData[tokenId].seller == address(0), "Token is already listed");
        require(bioBank != address(0), "BioBank cannot be null");
        require(donor != address(0), "Donor cannot be null");
        require(sizeInCC > 0, "CC size cannot be 0");
        require(
            IERC721(tokenziedStemCells).isApprovedForAll(msg.sender, address(this)) == true,
            "Marketplace does not have approval from lister on NFT contract"
        );

        uint256 price = (price_per_cc * sizeInCC) * 10 ** IERC20Metadata(i_usdc).decimals();

        ListingData[tokenId] = Listing(msg.sender, sizeInCC, price, donor, bioBank);

        emit newListing(msg.sender, tokenId, sizeInCC, price, donor, bioBank);
    }

    /** @notice Allows a user to buy tokenized stem cells for a given tokenId, then transfers the incentive
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
            "Marketplace allowance from buyer on USDC contract must be higher than or equal to listing price"
        );

        IERC20(i_usdc).transferFrom(msg.sender, address(this), data.price);

        IERC721(tokenziedStemCells).safeTransferFrom(data.seller, address(this), tokenId);

        PendingSales[tokenId] = PendingSale(
            block.timestamp,
            physicalStatus.AT_ORIGIN,
            data.seller,
            msg.sender,
            data.bioBank,
            data.donor,
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

    /** @notice Requests a Chainlink Any-Api call to determine if the caller is a registered
     *  doctor or researcher. Which then determines if they are allowed to buy stem cells.
     */
    function requestBuyAccess() external {
        Chainlink.Request memory req = buildChainlinkRequest(
            "c1c5e92880894eb6b27d3cae19670aa3", // todo maybe better to provide this in constructor to be able to deploy same code to mainnet (after demo)
            address(this),
            this.fulfill.selector
        );
        req.add(
            "get",
            string.concat(
                "https://amino-chain-backend.herokuapp.com/is-it-doctor-or-researcher-address/",
                Strings.toHexString(msg.sender)
            )
        );
        req.add("path", "doctor");

        bytes32 id = sendChainlinkRequest(req, (1 * LINK_DIVISIBILITY) / 10);
        ApprovalRequest[id] = msg.sender;
    }

    /** @notice Updates the delivery status of a pending sale for a given tokenId.
     */
    function updateDeliveryStatus(
        uint256 tokenId,
        physicalStatus status,
        address incentiveReciever
    ) external onlyOwner {
        PendingSale memory data = PendingSales[tokenId];
        require(data.buyer != address(0), "Buyer cannot be null");
        require(data.saleStatus != status, "Input status is the same as old");
        require(incentiveReciever != address(0), "Incentive Receiver cannot be null");

        PendingSales[tokenId].saleStatus = status;
        if (data.incentiveReciever != incentiveReciever) {
            PendingSales[tokenId].incentiveReciever = incentiveReciever;
        }
        if (status == physicalStatus.DELIVERED) {
            completeItemSale(tokenId);
        }

        emit deliveryStatusChanged(tokenId, status);
    }

    /** @notice Allows the owner of the contract to cancel a listing by deleting
     *  the corresponding listing data.
     */
    function cancelListing(uint256 tokenId) external onlyOwner {
        require(ListingData[tokenId].seller != address(0), "Token is not listed");

        delete ListingData[tokenId];

        emit listingCanceled(tokenId);
    }

    /** @notice Allows the owner of the contract to update the price of a listing by
     *  modifying the corresponding listing data.
     */
    function updateListing(uint256 tokenId, uint256 newPrice) external onlyOwner {
        Listing memory data = ListingData[tokenId];
        require(data.seller != address(0), "Token is not listed");
        require(data.price != newPrice, "Old price cannot be the same as the new");

        ListingData[tokenId].price = newPrice;

        emit newListing(msg.sender, tokenId, data.sizeInCC, newPrice, data.donor, data.bioBank);
    }

    /** @notice Transfers contract ownership to another wallet address. Many functions
     *  (with onlyOwner modifier) can only be called by the owner address.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != owner, "New address is already owner");
        require(newOwner != address(0), "Invalid owner address");

        address oldOwner = owner;
        owner = newOwner;
        emit ownershipTransferred(oldOwner, newOwner);
    }

    /** @notice Sets the address of the tokenized stem cells (ERC-721). Only NFTs from
     *  the address can be listed and sold on this markeplace.
     */
    function setTokenizedStemCells(address stemCells) external onlyOwner {
        require(stemCells != tokenziedStemCells, "New address is already set");
        require(stemCells != address(0), "Invalid stemCells address");

        tokenziedStemCells = stemCells;
        emit stemCellsAddressSet(stemCells);
    }

    /** @notice Sets the address of the authenticator contract. Authenticator mints tokenized
     *  stem cells and lists them on the marketplace.
     */
    function setAuthenticatorAddress(address _authenticator) external onlyOwner {
        require(authenticator != _authenticator, "New address is already set");
        require(_authenticator != address(0), "Invalid authenticator address");

        authenticator = _authenticator;
        emit authenticatorAddressSet(_authenticator);
    }

    /** @notice Sets a new donor incentive rate. Which determines the percentage of
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

    /** @notice Allows the owner of this contract to withdraw stored LINK.
     */
    function withdrawLink() external onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    // === Internal Functions === //

    /** @notice Finishes sale on delivery of physical stem cells. Tranfers escrowed payment to Bio Bank,
     *  escrowed incentive to donor, and escrowed fee to authenticator. Transfers NFT to buyer.
     */
    function completeItemSale(uint256 tokenId) internal nonReentrant {
        PendingSale memory data = PendingSales[tokenId];
        require(
            data.saleStatus == physicalStatus.DELIVERED,
            "Physical item has not been delivered yet"
        );
        require(data.escrowedPayment > 0, "No payment escrowed to transfer");
        require(data.donor != address(0), "Donor cannot be null");
        require(data.bioBank != address(0), "BioBank cannot be null");
        require(data.buyer != address(0), "Buyer cannot be null");
        require(data.seller != address(0), "Authenticator(seller) cannot be null");
        require(data.incentiveReciever != address(0), "Incentive Reciever cannot be null");

        uint256 incentive = data.escrowedPayment / donorIncentiveRate;
        uint256 fee = data.escrowedPayment / 10;

        /// BioBank Payment
        IERC20(i_usdc).transfer(data.bioBank, data.escrowedPayment - (incentive + fee));
        /// Protocol Fee Payment
        IERC20(i_usdc).transfer(data.seller, fee);
        /// Incentive Payment
        IERC20(i_usdc).transfer(data.incentiveReciever, incentive);

        IERC721(tokenziedStemCells).safeTransferFrom(address(this), data.buyer, tokenId);

        delete PendingSales[tokenId];

        emit saleCompleted(
            data.bioBank,
            data.buyer,
            tokenId,
            data.donor,
            data.incentiveReciever,
            data.escrowedPayment,
            incentive,
            fee
        );
    }

    /** @notice Called by buyer if the physical stem cells have not been delivered.
     *  Transfers escrowed payment back to buyer and tokenId to authenticator.
     */
    function refundSale(uint256 tokenId) external nonReentrant {
        PendingSale memory data = PendingSales[tokenId];
        require(data.buyer == msg.sender, "Only buyer can refund their sale");
        require(data.escrowedPayment > 0, "No escrowed payment to  transfer");
        require(data.buyer != address(0), "Buyer cannot be null");
        require(authenticator != address(0), "Authenticator cannot be null");

        IERC20(i_usdc).transfer(data.buyer, data.escrowedPayment);

        IERC721(tokenziedStemCells).safeTransferFrom(address(this), data.seller, tokenId);

        delete PendingSales[tokenId];

        emit saleRefunded(tokenId, data.buyer, data.bioBank, data.escrowedPayment);
    }

    // === Public Functions === //

    /** @notice Allows or prevents a buyer from buying tokenized stem cells. Based on a
     *  Chainlink API call to the doctor/researcher registry.
     */
    function fulfill(
        bytes32 _requestId,
        bool isDoctorOrResearcher
    ) public recordChainlinkFulfillment(_requestId) {
        address requester = ApprovalRequest[_requestId];
        ApprovedToBuy[requester] = isDoctorOrResearcher;
    }

    // === View Functions === //

    /** @notice Returns the listing data for a given tokenId
     */
    function getListingData(uint256 tokenId) public view returns (Listing memory) {
        return ListingData[tokenId];
    }

    /** @notice Returns bool of if a buyers address is whitelisted to buy or not
     */
    function isApprovedToBuy(address buyer) public view returns (bool) {
        return ApprovedToBuy[buyer];
    }

    /** @notice Returns pending sale data for a given tokenId
     */
    function getPendingSaleData(uint256 tokenId) public view returns (PendingSale memory) {
        return PendingSales[tokenId];
    }

    /** @notice IERC721 Reciever for tokenized stem cells
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
