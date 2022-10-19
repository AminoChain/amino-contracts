import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";
import {getAuthenticatorContract} from "../utils";

export function IncentiveComponent() {
    const { active, account, library, connector, activate, setError, deactivate } = useWeb3React()

    useEffect(() => {
        if (account) {
            getAuthenticatorContract(library).then(async (contract) => {

            })
        }
    }, [account])

    const register = async (e) => {
    }

    return <>
        <h2>Your incentive</h2>
        <div>$5000 USDC</div>
        <button>View Transaction</button>
    </>
}