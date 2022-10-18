import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {WalletConnect} from "./pages/wallet-connect-page";
import { TrackingComponent } from "./components/tracking-component";
import {StartPage} from "./pages/start-page";

export function getSecretFromLocationHash() {
    return window.location.hash.replace("#", "");
}

export const App: React.FC = () => {

    return (
        <>
            <StartPage secret={getSecretFromLocationHash()}/>
        </>
    )
}
