import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { BigNumber } from "ethers"

const deployFunction: DeployFunction = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number | undefined = network.config.chainId

    // If we are on a local development network, we need to deploy mocks!
    if (chainId === 31337) {
        log(`Local network detected! Deploying USDC...`)

        const usdc = await deploy(`USDC`, {
            contract: `Token`,
            from: deployer,
            log: true,
            args: [`USDC`, `USDC`, 1000000],
        })
    }
}

export default deployFunction
deployFunction.tags = [`all`, `usdc`]
