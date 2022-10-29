import { network, deployments, ethers, run } from "hardhat"
import {
    AminoChainAuthenticator,
    IAminoChainDonation,
    MockAminoChainMarketplace,
    Token,
} from "../../typechain"
import { assert, expect } from "chai"
import { BigNumber, constants } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {HLA, HLAHashed, web3StringToBytes32} from "../commons"
import {arrayify, parseEther} from "ethers/lib/utils";
import {keccak256} from "hardhat/internal/util/keccak";

describe("Authenticator Tests", async function () {
    let authenticator: AminoChainAuthenticator
    let marketplace: MockAminoChainMarketplace
    let owner: SignerWithAddress
    let buyer: SignerWithAddress
    let donor: SignerWithAddress
    let usdc: Token
    let nft: IAminoChainDonation
    let bioDataHashed: HLAHashed

    beforeEach(async () => {
        await deployments.fixture(["all"])
        ;[owner, donor, buyer] = await ethers.getSigners()

        marketplace = await ethers.getContract("MockAminoChainMarketplace")
        nft = await ethers.getContract("MockNFT")
        usdc = await ethers.getContract("USDC")
        await usdc.transfer(buyer.address, ethers.utils.parseUnits("42000", 6))

        authenticator = await ethers.getContract("AminoChainAuthenticator")
        // await nft.setApprovalForAll(marketplace.address, true)
        await nft.transferOwnership(authenticator.address)

        bioDataHashed = {
            A: await authenticator.hash(bioData.A.toString()),
            B: await authenticator.hash(bioData.B.toString()),
            C: await authenticator.hash(bioData.C.toString()),
            DPB: await authenticator.hash(bioData.DPB.toString()),
            DRB: await authenticator.hash(bioData.DRB.toString()),
        }
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

    const amounts = [10, 5, 5, 2, 2, 2, 2, 2]

    it("Register User", async () => {
        expect(await authenticator.connect(donor).isRegistered()).eq(false)

        const nonce = 1

        const biodataHash = await authenticator.getBioDataHash(
            bioData.A.toString(),
            bioData.B.toString(),
            bioData.C.toString(),
            bioData.DPB.toString(),
            bioData.DRB.toString())

        const messageHash = await authenticator.getRegistrationHash(
            donor.address,
            biodataHash,
            nonce
        )

        const signature = await donor.signMessage(arrayify(messageHash));

        await authenticator.register(
            bioDataHashed,
            donor.address,
            biodataHash,
            nonce,
            signature,
            amounts
        )

        expect(await authenticator.connect(donor).isRegistered()).eq(true)
    })

    /*it("Buy Item", async () => {
        ///// before
        await authenticator.registerUser(bioData, biobankAddress)
        /////
        await usdc.connect(buyer).approve(marketplace.address, ethers.utils.parseUnits("40000", 6))

        expect(await nft.balanceOf(buyer.address)).eq(0)
        await marketplace.connect(buyer).buyItem(1)
        expect(await nft.balanceOf(buyer.address)).eq(1)
        // expect(await nft.tokenOfOwnerByIndex(buyer.address)).eq(1)
    })*/
})
