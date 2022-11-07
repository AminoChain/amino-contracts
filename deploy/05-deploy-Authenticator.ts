import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"
import { delay } from "@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanService"

// 0x7d351a67CCA0955839D2e515d326125343D9780B

const deployAuthenticator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()

    let nftAddress
    let marketplaceAddress
    let usdcAddress

    if (developmentChains.includes(network.name)) {
        const USDC = await ethers.getContract("USDC")
        usdcAddress = USDC.address

        const NFT = await ethers.getContract("AminoChainDonation")

        nftAddress = NFT.address

        const marketplace = await ethers.getContract("AminoChainMarketplace")

        marketplaceAddress = marketplace.address
    } else {
        usdcAddress = "0xb0eaca4246d134cfcd104df91f9cd87e6c7271a7" // todo lets create some registry for deployed contracts addresses
        nftAddress = "0xb7De77FEb9D7BBC536EC15900E59Ce1978C56503"
        marketplaceAddress = "0x350D2e60AEAbCc3a6515Dc4CAd92b8427c4C0232"
    }

    const constructorArgs = [nftAddress, marketplaceAddress, usdcAddress]

    const contract = await deploy("AminoChainAuthenticator", {
        from: deployer,
        // gasLimit: 20000000,
        args: constructorArgs,
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        console.log("Verifying on polygonscan...")
        await delay(20000)
        await verify(
            contract.address,
            "contracts/AminoChainAuthenticator.sol:AminoChainAuthenticator",
            constructorArgs
        ) /*.catch( () => {})*/
    }
}

export default deployAuthenticator
deployAuthenticator.tags = [`all`, `authenticator`]
