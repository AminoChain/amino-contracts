import { network, deployments, ethers, run } from "hardhat"
import {
    AminoChainAuthenticator,
    AminoChainMarketplace,
    AminoChainDonation,
    ERC20,
    IAminoChainDonation,
    MockAminoChainMarketplace,
    Token,
    LinkToken,
    MockOracle,
} from "../../typechain"
import { assert, expect } from "chai"
import { BigNumber, constants } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {
    bioData,
    HLAHashed,
    firstNftTokeId,
    amounts,
    DEFAULT_PRICE_PER_CC, bioDataHashed, bioDataHash, messageHash, signature,
} from "../commons"
import {Encryptor} from "../encryptor";

const trueBoolInBytes = "0x0000000000000000000000000000000000000000000000000000000000000001"
const hlaEncodingKey = 'secret'

describe("Full Tests", async function () {
    let authenticator: AminoChainAuthenticator
    let marketplace: AminoChainMarketplace
    let deployer: SignerWithAddress
    let doctor: SignerWithAddress
    let donor: SignerWithAddress
    let biobank: SignerWithAddress
    let usdc: Token
    let nft: AminoChainDonation
    let mockOracle: MockOracle
    let linkToken: LinkToken

    async function beforeEachDescribe() {
        await deployments.fixture(["all-without-mocks"]) // no mocks (except oracle)
        ;[deployer, donor, doctor, biobank] = await ethers.getSigners()
        marketplace = (await ethers.getContract("AminoChainMarketplace")) as AminoChainMarketplace
        nft = (await ethers.getContract("AminoChainDonation")) as AminoChainDonation
        usdc = (await ethers.getContract("USDC")) as Token
        await usdc.transfer(doctor.address, ethers.utils.parseUnits("40000", 6))
        authenticator = (await ethers.getContract(
            "AminoChainAuthenticator"
        )) as AminoChainAuthenticator
        mockOracle = await ethers.getContract("MockOracle", deployer)
        linkToken = await ethers.getContract("LinkToken", deployer)
        await nft.transferOwnership(authenticator.address)
        await marketplace.setAuthenticatorAddress(authenticator.address)
        await linkToken.transfer(marketplace.address, ethers.utils.parseEther("10"))
    }

    describe("Buy happy path", async () => {
        before(beforeEachDescribe)

        const tokenId = firstNftTokeId
        const encryptor = new Encryptor(hlaEncodingKey)
        const bioDataEncodedBytes = encryptor.encrypt(JSON.stringify(bioData))

        it("Mint & List", async () => {
            await expect(nft.ownerOf(tokenId)).revertedWith("ERC721: invalid token ID")
            expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(false)

            // Donor scan QR with biodataHash
            // On donor side, Authentication UI:

            await authenticator.register(
                bioDataHashed,
                bioDataHash,
                bioDataEncodedBytes,
                [30],
                donor.address,
                signature,
                biobank.address
            )

            expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(true)
            expect(await nft.ownerOf(tokenId)).eq(authenticator.address)

            const listing = (await marketplace.getListingData(
                tokenId
            )) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(donor.address)
            expect(listing.bioBank).eq(biobank.address)
            expect(listing.tokenId).eq(tokenId)
            expect(listing.sizeInCC).eq(30)
            expect(listing.price).eq(
                BigNumber.from(10)
                    .pow(await usdc.decimals())
                    .mul(30)
                    .mul(DEFAULT_PRICE_PER_CC)
            )
        })

        it("Buy", async () => {
            await authenticator.register(
                bioDataHashed,
                bioDataHash,
                bioDataEncodedBytes,
                amounts,
                donor.address,
                signature,
                biobank.address
            ) // Test fails unless listing has been posted before via registration of new user

            const list = (await marketplace.getListingData(
                tokenId
            )) as AminoChainMarketplace.ListingStruct
            const price = await list.price
            await usdc.connect(doctor).approve(marketplace.address, price)

            const requestTx = await marketplace.connect(doctor).requestBuyAccess()
            const requestTransactionReceipt = await requestTx.wait()
            const requestId = requestTransactionReceipt.events![4].args?.requestId
            await mockOracle.fulfillOracleRequest(requestId, trueBoolInBytes)

            await marketplace.connect(doctor).buyItem(tokenId)
            expect(await nft.ownerOf(tokenId)).eq(doctor.address)

            const listing = (await marketplace.getListingData(
                tokenId
            )) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(ethers.constants.AddressZero)
            expect(listing.bioBank).eq(ethers.constants.AddressZero)
            expect(listing.tokenId).eq(0)
        })
    })

    describe("Multiply fractions", async () => {
        before(beforeEachDescribe)

        const firstTokenId = firstNftTokeId
        const secondTokenId = firstNftTokeId + 1
        const biodataHash = await authenticator.getBioDataHash(
            bioData.A.toString(),
            bioData.B.toString(),
            bioData.C.toString(),
            bioData.DPB.toString(),
            bioData.DRB.toString()
        )

        it("Mint & List", async () => {
            await expect(nft.ownerOf(firstTokenId)).revertedWith("ERC721: invalid token ID")
            await expect(nft.ownerOf(secondTokenId)).revertedWith("ERC721: invalid token ID")

            expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(false)

            await authenticator.register(
                bioDataHashed,
                biodataHash,
                '',
                [10, 20],
                donor.address,
                signature,
                biobank.address
            )

            expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(true)

            expect(await nft.ownerOf(firstTokenId)).eq(authenticator.address)
            expect(await nft.ownerOf(secondTokenId)).eq(authenticator.address)

            let listing = (await marketplace.getListingData(
                firstTokenId
            )) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(donor.address)
            expect(listing.bioBank).eq(biobank.address)
            expect(listing.tokenId).eq(firstTokenId)
            expect(listing.sizeInCC).eq(20)

            listing = (await marketplace.getListingData(
                secondTokenId
            )) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(donor.address)
            expect(listing.bioBank).eq(biobank.address)
            expect(listing.tokenId).eq(secondTokenId)
            expect(listing.sizeInCC).eq(10)
        })
    })

    describe("Mint & Cancel Procedure", async () => {
        before(beforeEachDescribe)

        const biodataHash = await authenticator.getBioDataHash(
            bioData.A.toString(),
            bioData.B.toString(),
            bioData.C.toString(),
            bioData.DPB.toString(),
            bioData.DRB.toString()
        )

        it("Mint & Cancel", async () => {
            await authenticator.register(
                bioDataHashed,
                biodataHash,
                '',
                [10, 20],
                donor.address,
                signature,
                biobank.address
            )

            // fixme Should be canceled by Authenticator
            /*await marketplace.cancelListing(tokenId)

            const listing = await marketplace.getListingData(tokenId) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(ethers.constants.AddressZero)
            expect(listing.bioBank).eq(ethers.constants.AddressZero)
            expect(listing.tokenId).eq(0)*/
        })
    })
})
