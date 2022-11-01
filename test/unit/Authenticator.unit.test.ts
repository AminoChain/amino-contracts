import { network, deployments, ethers, run } from "hardhat"
import {
    AminoChainAuthenticator,
    IAminoChainDonation,
    MockAminoChainMarketplace,
    Token,
} from "../../typechain"
import { assert, expect } from "chai"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {bioData, HLA, HLAHashed} from "../commons"
import {arrayify} from "ethers/lib/utils";
import {Encryptor} from "../encryptor";

const hlaEncodingKey = 'secret'

describe("Authenticator Tests", async () => {
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

    const amounts = [10, 5, 5, 2, 2, 2, 2, 2]

    it("Register User", async () => {
        expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(false)

        const biodataHash = await authenticator.getBioDataHash(
            bioData.A.toString(),
            bioData.B.toString(),
            bioData.C.toString(),
            bioData.DPB.toString(),
            bioData.DRB.toString()
        )

        // Donor scan QR with biodataHash
        // On donor side, Authentication UI:

        const messageHash = await authenticator.getRegistrationHash(
            donor.address,
            biodataHash
        )

        // Donor connect wallet and sign messageHash
        const signature = await donor.signMessage(arrayify(messageHash))
        //

        // signature coming back to biobank

        const encryptor = new Encryptor(hlaEncodingKey)
        const bioDataEncodedBytes = encryptor.encrypt(JSON.stringify(bioData))

        await authenticator.register(
            bioDataHashed,
            biodataHash,
            bioDataEncodedBytes,
            amounts,
            donor.address,
            signature
        )

        expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(true)

        const storedBioDataEncoded = await authenticator.bioDataEncoded(biodataHash)
        const storedBioData = encryptor.decrypt(ethers.utils.arrayify(storedBioDataEncoded))

        expect(storedBioData).eq(JSON.stringify(bioData))
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
