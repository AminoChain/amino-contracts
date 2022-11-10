import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { BigNumber } from "ethers"
import { ERC20, IERC20Metadata } from "../typechain"
import { developmentChains } from "../helper-hardhat-config"
import { delay } from "@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanService"
import verify from "../utils/verify"

const deployFunction: DeployFunction = async () => {
    const { deploy, log } = deployments
    // const { deployer } = await getNamedAccounts()
    const [deployer, donor, buyer] = await ethers.getSigners()
    const chainId: number | undefined = network.config.chainId

    if (developmentChains.includes(network.name) || network.name === "mumbai") {
        log(`Local network detected! Deploying USDC...`)
        await deploy(`USDC`, {
            contract: `Token`,
            from: deployer.address,
            log: true,
            args: [`USDC`, `USDC`, 6, 1000000],
        })
        const usdc = (await ethers.getContract("USDC")) as IERC20Metadata
        let usdcDecimals = await usdc.decimals()
        let amount = BigNumber.from(10).pow(usdcDecimals).mul(100_000)
        if (network.name === "mumbai") {
            await usdc.transfer(deployer.address, amount)
        } else {
            await usdc.transfer(buyer.address, amount)
        }
    }

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        const usdc = (await ethers.getContract("USDC")) as IERC20Metadata
        console.log("Verifing on Etherscan...")
        await delay(20000)
        await verify(usdc.address, "contracts/mocks/Token.sol:Token", [
            `USDC`,
            `USDC`,
            6,
            1000000,
        ]) /*.catch( () => {})*/
    }
}

export default deployFunction
deployFunction.tags = [`all`, `usdc`]
