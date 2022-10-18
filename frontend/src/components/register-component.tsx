import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";
import {getAminoContract} from "../utils";

export function RegisterComponent({setRegistered}) {
    const { active, account, library, connector, activate, setError, deactivate } = useWeb3React()

    useEffect(() => {
        if (account) {
            getAminoContract(library).then(async (contract) => {

            })
        }
    }, [account])

    const register = async (e) => {
        // const contract = await getAminoContract(library)
        // const tx = await contract.registerUser()
        // await tx.wait()
        // alert('Registered')
        setTimeout(() => {setRegistered(true)}, 1000)
    }

    return <>
        <button onClick={register}>Register</button>
    </>
}