import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {WalletConnect} from "./pages/wallet-connect-page";
import { TrackingComponent } from "./components/tracking-component";
import {StartPage} from "./pages/start-page";

interface HLA {
    A: number[],
    B: number[],
    C: number[],
    DPB: number[],
    DRB: number[]
}

type Input = { hla: HLA, biobankAddress: string }

export function getHlaDataFromLocationHash(): Input {
    const input = {
        hla: {
            A: [1,2,3],
            B: [1,2,3],
            C: [1,2,3],
            DPB: [1,35,1,1],
            DRB: [1,35,1,1]
        },
        biobankAddress: '0x985AC3C3Dbb4135Bea36D643bf93d073A10520bc'
    }
    const jsonStr = JSON.stringify(input);
    const jsonStrBase64 = Buffer.from(jsonStr).toString("base64");
    console.log(jsonStrBase64)

    const base64encoded = window.location.hash.replace("#", "");
    if (base64encoded) {
        return JSON.parse(Buffer.from(base64encoded, 'base64').toString()) as Input
    }
}

export const App: React.FC = () => {

    return (
        <>
            <StartPage input={getHlaDataFromLocationHash()}/>
        </>
    )
}
