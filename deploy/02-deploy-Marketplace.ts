import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployMarketplace: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    let args: any[] = []
    if (developmentChains.includes(network.name)) {
        const MockERC20 = await ethers.getContract("MockERC20")
        const erc20Address = MockERC20.address
        const MockNFT = await ethers.getContract("MockNFT")
        const nftAddress = MockNFT.address

        args = [8, erc20Address, nftAddress]
    } else {
        args = [
            8,
            "0xb0eaca4246d134cfcd104df91f9cd87e6c7271a7",
            "0x7BbB00C38a70B384dcb713A1ba7143c8B2AF0109",
        ]
    }

    const marketplace = await deploy("AminoChainMarketplace", {
        from: deployer,
        gasLimit: 20000000,
        args: args,
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        console.log("Verifing on Etherscan...")
        await verify(marketplace.address, args)
    }
}

export default deployMarketplace
deployMarketplace.tags = [`all`, `marketplace`]
