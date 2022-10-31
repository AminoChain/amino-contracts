import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { BigNumber } from "ethers"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"

const deployFunction: DeployFunction = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const constructorArgs = ["Amino", "AMINO"]

    const nft = await deploy(`AminoChainDonation`, {
        contract: `AminoChainDonation`,
        from: deployer,
        log: true,
        args: constructorArgs,
    })

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        console.log("Verifying on polygonscan...")
        await verify(
            nft.address,
            "contracts/AminoChainDonation.sol:AminoChainDonation",
            constructorArgs
        ) /*.catch( () => {})*/
    }
}

export default deployFunction
deployFunction.tags = [`all`, `donation`, "full"]
