import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployAuthenticator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    let mockNftAddress
    let marketplaceAddress
    let usdcAddress

    if (developmentChains.includes(network.name)) {
        const MockERC20 = await ethers.getContract("MockERC20")
        usdcAddress = MockERC20.address
        const MockNFT = await ethers.getContract("MockNFT")
        mockNftAddress = MockNFT.address
    } else {
        usdcAddress = "0xb0eaca4246d134cfcd104df91f9cd87e6c7271a7" // todo lets create some registry for deployed contracts addresses
        mockNftAddress = "0x7BbB00C38a70B384dcb713A1ba7143c8B2AF0109"
        marketplaceAddress = "0xB64C0837BA35D07F61b87553d61a830Bc1E36Dd4"
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
