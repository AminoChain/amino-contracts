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
import {biobankAddress, bioData} from "../commons";

describe("Full Tests", async function () {
    let authenticator: AminoChainAuthenticator
    let marketplace: MockAminoChainMarketplace
    let deployer: SignerWithAddress
    let buyer: SignerWithAddress
    let donor: SignerWithAddress
    let usdc: Token
    let nft: DonationNFT

    before(async () => {
        await deployments.fixture(["usdc", "marketplace", "authenticator"]) // no mocks

        ;[deployer, donor, buyer] = await ethers.getSigners()
        marketplace = await ethers.getContract("AminoChainMarketplace") as AminoChainMarketplace
        nft = await ethers.getContract("DonationNFT") as DonationNFT
        usdc = await ethers.getContract("USDC") as ERC20
        await usdc.transfer(buyer.address, ethers.utils.parseUnits("40000", 6))
        authenticator = await ethers.getContract("AminoChainAuthenticator") as AminoChainAuthenticator
        await nft.transferOwnership(authenticator.address)
        await marketplace.setAuthenticatorAddress(authenticator.address)
    })

    it('Mint NFT', async () => {
        expect(await authenticator.connect(donor).isRegistered()).eq(false)
        await authenticator.connect(donor).registerUser(bioData, biobankAddress)
        expect(await authenticator.connect(donor).isRegistered()).eq(true)

        // expect(marketplace.)
    })

    it('', async () => {

    })
})
