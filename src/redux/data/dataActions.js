import store from "../store";
import { ethers } from "ethers";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    
    try {
        let totalSupply = await store
        .getState()
        .blockchain.smartContract.totalSupply();

        let cost = await store.getState()
        .blockchain.smartContract.publicPrice();

        let alreadyMinted = await store.getState()
        .blockchain.smartContract.publicClaimed(account._address);

        let maxPerWallet = await store.getState()
        .blockchain.smartContract.publicMintPerTx();

        let maxSupply = await store.getState()
        .blockchain.smartContract.maxSupply();


        totalSupply = totalSupply.toNumber();
        alreadyMinted = alreadyMinted.toNumber();
        maxPerWallet = maxPerWallet.toNumber();
        maxSupply = maxSupply.toNumber();
        console.log(cost);
        cost = ethers.utils.formatEther(cost);
        console.log(cost);
        dispatch(
        fetchDataSuccess({
          totalSupply,
          cost,
          alreadyMinted,
          maxPerWallet,
          maxSupply
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};