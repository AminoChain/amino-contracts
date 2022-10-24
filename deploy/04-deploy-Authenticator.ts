import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

// 0x7d351a67CCA0955839D2e515d326125343D9780B

const deployAuthenticator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    let mockNftAddress
    let marketplaceAddress
    let usdcAddress

    if (developmentChains.includes(network.name)) {
        const USDC = await ethers.getContract("USDC")
        usdcAddress = USDC.address

        const NFT = await ethers.getContract("MockNFT")
            .catch(() => ethers.getContract("AminoChainDonation"))

        mockNftAddress = NFT.address

        const Marketplace = await ethers.getContract("MockAminoChainMarketplace")
            .catch(() => ethers.getContract("AminoChainMarketplace"))

        marketplaceAddress = Marketplace.address
    } else {
        usdcAddress = "0xb0eaca4246d134cfcd104df91f9cd87e6c7271a7" // todo lets create some registry for deployed contracts addresses
        mockNftAddress = "0x6dfEb832F1902301703c48922B5821ABBA8f251B"
        marketplaceAddress = "0xccdbcf18830ac135b711bd5a8912fcb09457a62c"
    }

    const constructorArgs = [mockNftAddress, marketplaceAddress, usdcAddress]

    const marketplace = await deploy("AminoChainAuthenticator", {
        from: deployer,
        // gasLimit: 20000000,
        args: constructorArgs,
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        console.log("Verifying on polygonscan...")
        await verify(marketplace.address, constructorArgs)
    }
}

export default deployAuthenticator
deployAuthenticator.tags = [`all`, `authenticator`]
