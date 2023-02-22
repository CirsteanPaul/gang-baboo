// constants
// import Web3EthContract from "web3-eth-contract";
// import Web3 from "web3";
// log
import { networkId } from "../../we3modal/networks";
import { networkParams } from "../../we3modal/networks";
import { addMetamaskIfMissing, providerOptions } from "../../we3modal/providerOptions";
import { toHex } from "../../we3modal/utils";
import Web3Modal from "web3modal";
import {mainContract,mainContractAbi} from "../../absolutePath"
import { ethers } from "ethers";
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};
export const initiateWeb3 = (payload) =>{
  return {
    type: "INITIATE_WEB3",
    payload: payload
  }
}
const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

export const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};
const switchNetwork = async (library, network) => {
  try {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(network) }]
    });
  } catch (switchError) {
    console.log(switchError)
    if (switchError.code === 4902 || switchError.code === '4902') {
      try {
        await library.provider.request({
          method: "wallet_addEthereumChain",
          params: [networkParams[toHex(network)]]
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    addMetamaskIfMissing()
    localStorage.clear()
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      theme: 'dark',
      providerOptions // required
    });
    dispatch(initiateWeb3({web3: web3Modal}));
    const abi = mainContractAbi;
    try {

      const provider = await web3Modal.connect();

      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      if(network.chainId !== networkId)
        {
          const x = "https://bridge.walletconnect.org"
          if(library.provider?.bridge !== x && !library.provider?.isFortmatic)
          {
            await switchNetwork(library, networkId)
          }
        }
      if (accounts) {
        try{

        
        const account = library.getSigner(accounts[0]);

        const contract = new ethers.Contract(mainContract.CONTRACT_ADDRESS, abi, account);
        contract.connect(account);
        dispatch(connectSuccess({
          account,
          smartContract: contract,
          provider: library.provider,
        }))
      }catch(e){
        console.log(e)
        dispatch(connectFailed("Something went wrong. Please try again!"));
      }

      }
      else{
        dispatch(connectFailed("No wallets available"));
      }
    } catch (error) {
      console.log(error);
      dispatch(connectFailed("Something went wrong. Please try again!"));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};