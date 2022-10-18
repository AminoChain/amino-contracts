import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";
import {getAminoContract} from "../utils";

export function TrackingComponent() {
    const { active, account, library, connector, activate, setError, deactivate } = useWeb3React()

    useEffect(() => {
        if (account) {
            getAminoContract(library).then(async (contract) => {

            })
        }
    }, [account])

    const register = async (e) => {
    }

    return <>
        <h2>Donation tracking</h2>
        <div>Your donation has been listed, you will receive payment on purchase...</div>
        <button>View Listing</button>
    </>
}