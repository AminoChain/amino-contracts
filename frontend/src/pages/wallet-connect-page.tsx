import React, {useEffect, useState} from 'react'
// import '../css/main.css'

import metamaskIcon from '../components/assets/img/metamask-icon.png'
import coinbaseIcon from '../components/assets/img/coinbase-icon.png'
import walletConnectIcon from '../components/assets/img/wallet-connect-icon.png'
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";
import {NoEthereumProviderError, UserRejectedRequestError} from "@web3-react/injected-connector";
import Web3 from "web3";
import {injected} from "../index";
import {bscChainId, currentChainId, goerliChainId} from "../utils";
import {Simulate} from "react-dom/test-utils";


interface AddEthereumChainParameter {
    chainId: number; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}

export function WalletConnect({setConnected}) {

    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const [noWallet, setNoWallet] = useState<boolean>()
    const [error, setError] = useState<string>()
    const [update, setUpdate] = useState<number>()

    if (connector) {
        // fixme: no connector instance
        connector.on("session_update", () => setUpdate(Math.random));
        connector.on("Web3ReactDeactivate", () => setUpdate(Math.random));
        connector.on("Web3ReactUpdate", () => setUpdate(Math.random));
    }

    const changeNetwork = async () => {
        // @ts-ignore
        const { ethereum } = window;

        if (ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: Web3.utils.toHex(currentChainId)}]
                })
                return true
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            // @ts-ignore
                            params: [ currentChainId === bscChainId ? {
                                chainId: bscChainId,
                                chainName: 'Binance Smart Chain Mainnet',
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://bscscan.com']
                            } as AddEthereumChainParameter : {
                                chainId: goerliChainId,
                                chainName: 'Goerli Test Network',
                                rpcUrls: ['https://goerli.infura.io/v3/'],
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://goerli.etherscan.io']
                            } as AddEthereumChainParameter],
                        })
                    } catch (addError) {
                        console.error(addError)
                        return false
                    }
                } else {
                    return false
                }
            }
        } else {
            console.error('No ethereum');
        }
    }

    const activateWallet = async () => {
        // setConnected(true)
        await activate(injected,async (error) => {
            if (error instanceof NoEthereumProviderError) {
                setNoWallet(true)
            }
            else if (error instanceof UnsupportedChainIdError) {
                const success = await changeNetwork()
                success && activateWallet()
            }
            else if (error instanceof UserRejectedRequestError) {
                // ignore user rejected error
            } else {
                setError(error.message)
                // setConnected(false)
            }
        }, false)
    }

    useEffect(() => {
        const wasConnectedBefore = !!localStorage.getItem('connected')
        if (wasConnectedBefore) {
            activateWallet()
        }
    }, [])


    return <>
        <h3 className={'w-c-content-title'}>{'Connect your wallet'}</h3>
        <div>{error}</div>
        { noWallet === true && <>
            <div className='no-wallet'>
                <div className='logo'>
                    <img src="https://wallet.polygon.technology/_nuxt/img/metamask.78010a9.svg" alt="Connecting to metamask"/>
                </div>
                <div className='text'>
                    Metamask not installed. Please visit the
                    &nbsp;<a href="https://docs.polygon.technology/docs/develop/metamask/hello"
                       target="_blank">docs</a>&nbsp;
                    for guidance in installing and creating a Metamask wallet. If
                    metamask is already installed, please ensure plugin is
                    enabled.
                </div>
                <div className='download'>
                    <p>Don't have wallet?</p>
                    <a href="https://metamask.io/download.html" target="_blank">Download here</a>
                </div>
            </div>
        </>}
        { noWallet !== true && <>
            <button onClick={activateWallet}>
                <img src={metamaskIcon} alt="Metamask icon"/>
                <a> MetaMask</a>
            </button>
        </>}
    </>
}
