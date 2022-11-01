import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { BigNumber } from "ethers"
import { ERC20, IERC20Metadata } from "../typechain"

const deployFunction: DeployFunction = async () => {
    const { deploy, log } = deployments
    // const { deployer } = await getNamedAccounts()
    const [deployer, donor, buyer] = await ethers.getSigners()
    const chainId: number | undefined = network.config.chainId

    // If we are on a local development network, we need to deploy mocks!
    if (chainId === 31337) {
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
        await usdc.transfer(buyer.address, amount)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `usdc`, "all-without-mocks"]
