import {Contract} from "@ethersproject/contracts";
import ERC20ABI from "./artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import {Web3Provider} from "@ethersproject/providers";
import Amino from './artifacts/contracts/Amino.sol/Amino.json'
import {ERC20} from "./contracts/erc20";
import {PhenomCampaign} from "./contracts/PhenomCampaign";
import {BigNumber, ContractTransaction, ethers, Overrides} from "ethers";

export const goerliChainId = 5
export const bscChainId = 56
export const currentChainId = goerliChainId

const nftAddress = {
    [goerliChainId]: '0x'
}
export const aminoAddress = {
    [goerliChainId]: '0x82144D798FDa1e2dB3CffF445A111731A8418301'
}
const busdContractAddress = {
    [goerliChainId]: '0x'
}

interface AminoContract {
    registerUser(
        overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>
}

let _aminoContract: AminoContract

export async function getAminoContract(library: Web3Provider): Promise<AminoContract> {
    if (!_aminoContract) {
        const contract = new Contract(
            aminoAddress[currentChainId],
            Amino.abi,
            library.getSigner()
        )
        await contract.deployed()
        _aminoContract = contract as unknown as AminoContract
    }
    return _aminoContract
}

let _busdContract: ERC20

export async function getBusdContract(library: Web3Provider): Promise<ERC20> {
    if (!_busdContract) {
        const contract = new Contract(
            busdContractAddress[currentChainId],
            ERC20ABI.abi,
            library.getSigner()
        )
        await contract.deployed()
        _busdContract = contract as unknown as ERC20
    }
    return _busdContract
}


export function prettyPrintBigNumber(bn: BigNumber) {
    if (bn === undefined) {
        return undefined
    }

    if (bn.isZero()) {
        return '0'
    }
    // if (bn.lt('100000000000000000')) {
    //     return '<0.1'
    // }
    const withoutFraction = Math.round(bn.div('1000000000000000000').toNumber())
    const fraction = bn.sub(BigNumber.from(withoutFraction).mul('1000000000000000000'))
    const formatted = (fraction.isZero() ? ethers.utils.formatEther(bn) : withoutFraction.toString())
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .replace("000 000.0", 'kk')
        .replace("000.0", 'k')
        .replace(RegExp("\\.0$"), '')

    if (fraction.isZero()) {
        return formatted
    } else {
        return `~${formatted}`
    }
}

export async function addToken(phetaTokenContract: ERC20, account: string) {
    const balance = await phetaTokenContract.balanceOf(account)

    if (balance.isZero()) {
        const ethereum = window['ethereum']
        try {
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: nftAddress[currentChainId],
                        symbol: "???", // A ticker symbol or shorthand, up to 5 chars.
                        decimals: 18,
                        image: 'https://user-images.githubusercontent.com/1183619/167500553-fd199209-cf7c-44a2-80fd-96f7d0ed247c.png' // A string url of the token logo
                    }
                }
            })

            if (wasAdded) {
                console.log('Token added');
            } else {
                console.warn('Token not added');
            }
        } catch (error) {
            console.error(error);
        }
    }
}
