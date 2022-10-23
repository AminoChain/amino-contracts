import { network, deployments, ethers, run } from "hardhat"
import {
    AminoChainAuthenticator, AminoChainMarketplace, DonationNFT, ERC20,
    IDonationNFT,
    MockAminoChainMarketplace,
    Token,
} from "../../typechain"
import { assert, expect } from "chai"
import { BigNumber, constants } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {biobankAddress, bioData, firstNftTokeId} from "../commons";

describe("Full Tests", async function () {
    let authenticator: AminoChainAuthenticator
    let marketplace: AminoChainMarketplace
    let deployer: SignerWithAddress
    let doctor: SignerWithAddress
    let donor: SignerWithAddress
    let usdc: Token
    let nft: DonationNFT

    async function beforeEachDescribe() {
        await deployments.fixture(["usdc", "nft", "marketplace", "authenticator"]) // no mocks

        ;[deployer, donor, doctor] = await ethers.getSigners()
        marketplace = await ethers.getContract("AminoChainMarketplace") as AminoChainMarketplace
        nft = await ethers.getContract("DonationNFT") as DonationNFT
        usdc = await ethers.getContract("USDC") as ERC20
        await usdc.transfer(doctor.address, ethers.utils.parseUnits("40000", 6))
        authenticator = await ethers.getContract("AminoChainAuthenticator") as AminoChainAuthenticator
        await nft.transferOwnership(authenticator.address)
        await marketplace.setAuthenticatorAddress(authenticator.address)
    }

    const tokenId = firstNftTokeId

    describe("Buy Procedure", async () => {
        before(beforeEachDescribe)

        it('Mint & List', async () => {
            await expect(nft.ownerOf(tokenId)).revertedWith("ERC721: invalid token ID")
            expect(await authenticator.connect(donor).isRegistered()).eq(false)

            await authenticator.connect(donor).registerUser(bioData, biobankAddress)

            expect(await authenticator.connect(donor).isRegistered()).eq(true)
            expect(await nft.ownerOf(tokenId)).eq(authenticator.address)

            const listing = await marketplace.getListingData(tokenId) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(donor.address)
            expect(listing.bioBank).eq(biobankAddress)
            expect(listing.tokenId).eq(tokenId)
        })

        it('Buy', async () => {
            const price = BigNumber.from(10).pow(await usdc.decimals()).mul(40000)
            await usdc.connect(doctor).approve(marketplace.address, price)

            await marketplace.connect(doctor).buyItem(tokenId)
            expect(await nft.ownerOf(tokenId)).eq(doctor.address)

            const listing = await marketplace.getListingData(tokenId) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(ethers.constants.AddressZero)
            expect(listing.bioBank).eq(ethers.constants.AddressZero)
            expect(listing.tokenId).eq(0)
        })
    })

    describe("Mint & Cancel Procedure", async () => {
        before(beforeEachDescribe)

        it('Mint & Cancel', async () => {
            await authenticator.connect(donor).registerUser(bioData, biobankAddress)

            // fixme Should be canceled by Authenticator
            /*await marketplace.cancelListing(tokenId)

            const listing = await marketplace.getListingData(tokenId) as AminoChainMarketplace.ListingStruct
            expect(listing.donor).eq(ethers.constants.AddressZero)
            expect(listing.bioBank).eq(ethers.constants.AddressZero)
            expect(listing.tokenId).eq(0)*/
        })
    })
})
