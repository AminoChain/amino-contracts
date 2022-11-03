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

describe("Authenticator Integration Tests", async () => {
    let authenticator: AminoChainAuthenticator
    let marketplace: MockAminoChainMarketplace
    let owner: SignerWithAddress
    let buyer: SignerWithAddress
    let donor: SignerWithAddress
    let biobank: SignerWithAddress
    let usdc: Token
    let nft: IAminoChainDonation
    let hlaHashed: HLAHashed

    before(async () => {
        await deployments.fixture(["all"])
        ;[owner, donor, buyer, biobank] = await ethers.getSigners()

        marketplace = await ethers.getContract("MockAminoChainMarketplace")
        nft = await ethers.getContract("MockNFT")
        usdc = await ethers.getContract("USDC")
        await usdc.transfer(buyer.address, ethers.utils.parseUnits("42000", 6))

        authenticator = await ethers.getContract("AminoChainAuthenticator")
        // await nft.setApprovalForAll(marketplace.address, true)
        await nft.transferOwnership(authenticator.address)

        hlaHashed = {
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

    let hlaHash: string

    it("Should create HLA hash", async () => {
        hlaHash = ethers.utils.id(JSON.stringify(bioData))
        /*hlaHash = await authenticator.getBioDataHash(
            bioData.A.toString(),
            bioData.B.toString(),
            bioData.C.toString(),
            bioData.DPB.toString(),
            bioData.DRB.toString()
        )*/
        // @ts-ignore
        expect(hlaHash).correctHash()
    })

    it("Should be no registration data", async () => {
        expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(false)
    })

    let signature: string

    it("Donor side / Sign registration parameters hash", async () => {

        const registrationParametersHash = await authenticator.getRegistrationHash(
            donor.address,
            hlaHash
        )
        // @ts-ignore
        expect(hlaHash).correctHash()

        signature = await donor.signMessage(arrayify(registrationParametersHash))

        expect(signature.startsWith('0x')).true
        expect(signature).have.length(132)
    })

    const encryptor = new Encryptor(hlaEncodingKey)

    it("Backend / registration", async () => {

        const bioDataEncodedBytes = encryptor.encrypt(JSON.stringify(bioData))
        expect(bioDataEncodedBytes).length(80)

        await authenticator.register(
            hlaHashed,
            hlaHash,
            bioDataEncodedBytes,
            amounts,
            donor.address,
            signature,
            biobank.address
        )
        expect(await authenticator.connect(donor).isRegistered(donor.address)).eq(true)
    })

    it("Decrypt HLA data", async () => {
        const storedBioDataEncoded = await authenticator.bioDataEncoded(hlaHash)
        expect(storedBioDataEncoded).length(162)

        const encryptedBytes = ethers.utils.arrayify(storedBioDataEncoded)
        expect(encryptedBytes).length(80)

        const storedBioData = encryptor.decrypt(encryptedBytes)

        expect(storedBioData).eq(JSON.stringify(bioData))
    })
})
