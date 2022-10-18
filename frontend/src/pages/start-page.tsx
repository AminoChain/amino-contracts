import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {WalletConnect} from "./wallet-connect-page";
import {TrackingComponent} from "../components/tracking-component";
import {getAminoContract} from "../utils";
import '../css/start-page.css'
import {RegisterComponent} from "../components/register-component";
import {WelcomePage} from "./welcom-page";
import {injected} from "../index";

export function StartPage({secret}) {
    const [walletConnecting, setWalletConnecting] = React.useState(false)
    const [registered, setRegistered] = React.useState(false)
    const { active, account, library, connector, activate, setError, deactivate } = useWeb3React()

    useEffect(() => {
        activate(injected, async (error) => {
            if (error) {
                // setWalletConnecting(true)
            }
        })
        if (account) {
            getAminoContract(library).then(async (contract) => {
                setRegistered(false) // contract...
            })
        }
    }, [account])

    const connectWallet = (e) => {
      setWalletConnecting(true)
    }

    return (
        <div className='start-page'>
            {/*account: {account}*/}
            { !account && !walletConnecting && <>
                <WelcomePage setConnect={setWalletConnecting}/>
            </>}
            { !account && walletConnecting && <>
                <WalletConnect setConnected={() => setWalletConnecting(false)}/>
            </>}
            { account && !walletConnecting && <>
                <div className='logo'></div>
                <h1 className='name'>AminoChain</h1>
                { !account && <>
                    <div className='info'>Connect please your Web3 Wallet to track your donation and receive incentive</div>
                    <button onClick={connectWallet} className='connect-wallet'>Connect Wallet</button>
                </>}
                { account && secret && !registered && <>
                    <div className='debug secret'>
                        <h2>Secret</h2>
                        <div>{secret}</div>
                    </div>

                    <RegisterComponent setRegistered={setRegistered}/>
                </>}
                { account && !secret && !registered && <>
                    <div>Not registered and no secret</div>
                </>}
                { account && registered && <>
                    <div>
                        <div>Your Wallet Address</div>
                        <div className='address'>{account}</div>
                    </div>
                    <TrackingComponent/>
                </>}
            </>}
        </div>
    )
}