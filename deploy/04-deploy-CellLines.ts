import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network, ethers } from "hardhat"
import { developmentChains } from "../helper-hardhat-config"
import verify from "../utils/verify"
import { delay } from "@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanService"

const deployCellLine: DeployFunction = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const constructorArgs = ["AminoCellLines", "AMCL"]

    const nft = await deploy(`AminoChainCellLine`, {
        contract: `AminoChainCellLine`,
        from: deployer,
        log: true,
        args: constructorArgs,
    })

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        console.log("Verifying on polygonscan...")
        await delay(20000)
        await verify(
            nft.address,
            "contracts/AminoChainCellLine.sol:AminoChainCellLine",
            constructorArgs
        ) /*.catch( () => {})*/
    }
}

export default deployCellLine
deployCellLine.tags = [`all`, `nft`, `cLine`]
