import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {WalletConnect} from "./wallet-connect-page";
import {TrackingComponent} from "../components/tracking-component";
import {getAuthenticatorContract} from "../utils";
import '../css/start-page.css'
import {RegisterComponent} from "../components/register-component";
import {injected} from "../index";

export function StartPage({ input }) {
    const { hla, biobankAddress } = input
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
            getAuthenticatorContract(library).then(async (authenticator) => {
                await authenticator.registerUser(hla, biobankAddress)
                setRegistered(true)
            })
        }
    }, [account])

    const connectWallet = (e) => {
      setWalletConnecting(true)
    }

    return (
        <div className='start-page'>
            {/*account: {account}*/}

            <div className='logo'></div>
            <h1 className='name'>AminoChain</h1>

            { !walletConnecting && <>
                { hla &&
                    <div className='hla'>
                        <h2>Your HLA Data</h2>
                        <div>{JSON.stringify(hla)}</div>
                    </div>
                }

                { !account && <>
                    <div className='info'>Connect please your Web3 Wallet to track your donation and receive incentive</div>
                    <button onClick={connectWallet} className='connect-wallet'>Connect Wallet</button>
                </>}
            </>}

            { !account && walletConnecting && <>
                <WalletConnect setConnected={() => setWalletConnecting(false)}/>
            </>}

            { account && !walletConnecting && <>

                { account && hla && !registered && <div>
                    <div>Register your HLA data to track your donation and receive incentive</div>
                    <RegisterComponent setRegistered={setRegistered}/>
                </div>}

                { account && !hla && !registered && <>
                    <div>Not registered and no HLA</div>
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