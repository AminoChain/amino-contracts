import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app";
import { Web3ReactProvider } from '@web3-react/core'
import {InjectedConnector} from "@web3-react/injected-connector";
import {Web3Provider} from "@ethersproject/providers";
import {currentChainId} from "./utils";

export const injected = new InjectedConnector({
    supportedChainIds: [currentChainId]
})

function getLibrary(provider) {
   return new Web3Provider(provider)
}

(async () => {
   ReactDOM.render(
       <Web3ReactProvider getLibrary={getLibrary}>
          <App />
       </Web3ReactProvider>
    , document.getElementById('root'))
})()
