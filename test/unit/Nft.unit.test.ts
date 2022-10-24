import { network, deployments, ethers, run } from "hardhat"
import {
    AminoChainAuthenticator,
    AminoChainDonation,
    MockAminoChainMarketplace,
    Token,
} from "../../typechain"
import { assert, expect } from "chai"
import chai from "chai"
import { BigNumber, constants } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {biobankAddress, bioData, firstNftTokeId, HLA} from "../commons"
import {AminoChainLibrary} from "../../typechain/contracts/AminoChainDonation";

describe("NFT Tests", async function () {
    let authenticator: AminoChainAuthenticator
    let marketplace: MockAminoChainMarketplace
    let deployer: SignerWithAddress
    let doctor: SignerWithAddress
    let donor: SignerWithAddress
    let usdc: Token
    let nft: AminoChainDonation

    beforeEach(async () => {
        await deployments.fixture(["all"])
        ;[deployer, donor, doctor] = await ethers.getSigners()

        // marketplace = await ethers.getContract("MockAminoChainMarketplace")
        nft = await ethers.getContract("AminoChainDonation")
        usdc = await ethers.getContract("USDC")
        await usdc.transfer(doctor.address, ethers.utils.parseUnits("42000", 6))

        // authenticator = await ethers.getContract("AminoChainAuthenticator")
        // await nft.setApprovalForAll(marketplace.address, true)
        // await nft.transferOwnership(authenticator.address)
    })

    after(async function () {
        // authenticator.removeAllListeners()
    })

    const amounts = [10, 5, 5, 2, 2, 2, 2, 2]

    it("Mint", async () => {
        const expectedTokenIds = [...Array(amounts.length).keys()]
            .map( i => i + firstNftTokeId)
        expect(await nft.mint(donor.address,bioData, amounts))
            .emit(nft, 'NFTMinted')
            .withArgs(donor.address, bioData, amounts, expectedTokenIds)

        await Promise.all(expectedTokenIds.map( async (tokenId) => {
            expect(await nft.ownerOf(tokenId)).eq(deployer.address)
            const actualBioData = await nft.getBioData(tokenId) as AminoChainLibrary.BioDataStruct
            expect(actualBioData).bioDataEqual(bioData)
        }))

        expect((await nft.getTokenIdsByDonor(donor.address)).map( t => t.toNumber()))
            .eql(expectedTokenIds)
    })
})