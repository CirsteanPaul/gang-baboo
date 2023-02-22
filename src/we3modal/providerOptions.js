import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { providers } from "web3modal";
import { infuraKey } from "../absolutePath";
// Example for Polygon/Matic:
const customNetworkOptions = {
    // formatic custom network
    rpcUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: 4
}

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "GangstaApes", // Required
      infuraId: infuraKey // Required unless you provide a JSON RPC url; see `rpc` below
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: infuraKey // required
    },
    rpc: {
        1: "https://main‑light.eth.linkpool.io",
    },
    chainId: 1
  },
};
export const addMetamaskIfMissing = () => {
   
    if (!window.ethereum) {
        providerOptions['custom-metamask'] = {
          display: {
            logo: providers.METAMASK.logo,
            name: 'Install MetaMask',
            description: 'Connect using browser wallet'
          },
          package: {},
          connector: async () => {
            window.open('https://metamask.io/download/')
            // throw new Error('MetaMask not installed');
          }
}
    }
}