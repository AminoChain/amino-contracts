import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {WalletConnect} from "./pages/wallet-connect-page";
import { UserPage } from "./pages/user-page";

export function getTokenFromLocationHash() {
    return window.location.hash.replace("#", "");
}

export const App: React.FC = () => {
    const [walletConnecting, setWalletConnecting] = React.useState(false)
    const { active, account, library, connector, activate, setError, deactivate } = useWeb3React()


    return (
        <>
            { walletConnecting && (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
            { !account && !walletConnecting && (
                <div>
                    <WalletConnect/>
                </div>
            )}
            { account && (
                <div>
                    <UserPage/>
                </div>
            )}
        </>
    )
}
