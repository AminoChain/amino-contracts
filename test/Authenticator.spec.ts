import { developmentChains, networkConfig } from "../helper-hardhat-config"
import { network, deployments, ethers, run } from "hardhat"
// @ts-ignore
import {
    AminoChainAuthenticator,
    IDonationNFT,
    MockAminoChainMarketplace,
    Token,
} from "../typechain"
import { assert, expect } from "chai"
import { BigNumber, constants } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { NFT } from "../typechain/contracts/NFT"

describe("Authenticator Tests", async function () {
    // let authenticator: Authenticator
    let authenticator: AminoChainAuthenticator
    let marketplace: MockAminoChainMarketplace
    let owner: SignerWithAddress
    let buyer: SignerWithAddress
    let donor: SignerWithAddress
    let usdc: Token
    let nft: IDonationNFT

    beforeEach(async () => {
        await deployments.fixture(["mocks" /*, "api"*/])
        ;[owner, donor, buyer] = await ethers.getSigners()

        marketplace = await ethers.getContract("MockAminoChainMarketplace")
        nft = await ethers.getContract("MockNFT")
        usdc = await ethers.getContract("USDC")
        await usdc.transfer(buyer.address, ethers.utils.parseEther("1000"))

        authenticator = await ethers.getContract("AminoChainAuthenticator")
        // await nft.setApprovalForAll(marketplace.address, true)
        await nft.transferOwnership(authenticator.address)
    })

    after(async function () {
        // authenticator.removeAllListeners()
    })

    const bioData: HLA = {
        A: [1, 2, 3],
        B: [1, 2, 3],
        C: [1, 2, 3],
        DPB: [1, 2, 3],
        DRB: [1, 2, 3],
    }
    const biobankAddress = "0x985AC3C3Dbb4135Bea36D643bf93d073A10520bc"

    it("Register User", async () => {
        expect(await authenticator.connect(donor).isRegistered()).eq(false)
        await authenticator.connect(donor).registerUser(bioData, biobankAddress)
        // console.log(await nft.getTokenIdByDonor(donor.address))
        // expect(await authenticator.connect(donor).isRegistered()).eq(true) // fixme
    })

    it("Buy Item", async () => {
        ///// before
        await authenticator.registerUser(bioData, biobankAddress)
        /////

        expect(await nft.balanceOf(buyer.address)).eq(0)
        await marketplace.connect(buyer).buyItem(0)
        expect(await nft.balanceOf(buyer.address)).eq(1)
        // expect(await nft.tokenOfOwnerByIndex(buyer.address)).eq(1)
    })
})

interface HLA {
    A: number[]
    B: number[]
    C: number[]
    DPB: number[]
    DRB: number[]
}
