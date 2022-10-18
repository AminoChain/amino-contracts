import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {WalletConnect} from "./wallet-connect-page";
import {TrackingComponent} from "../components/tracking-component";
import {getAminoContract} from "../utils";
import '../css/start-page.css'
import {RegisterComponent} from "../components/register-component";

export function WelcomePage({setConnect}) {
    return <>
        <h1 className='name'>AminoChain</h1>
        <div>
            Connect please your Web3 Wallet to track your donation and receive incentive
        </div>
        <button onClick={() => setConnect(true)}>Connect Wallet</button>
    </>
}