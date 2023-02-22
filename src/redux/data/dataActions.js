// log
import store from "../store";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
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
        .blockchain.smartContract.publicCost();

        let alreadyMinted = await store.getState()
        .blockchain.smartContract.publicClaimed(account._address);

        let alreadyWhitelistMinted = await store.getState()
        .blockchain.smartContract.publicClaimed(account._address);

        let maxPerWallet = await store.getState()
        .blockchain.smartContract.maxPublic();

        let maxSupply = await store.getState()
        .blockchain.smartContract.maxSupply();

        let whitelistCost = await store.getState().blockchain.smartContract.whitelistCost();
        let whitelistMaxPerWallet = await store.getState().blockchain.smartContract.maxWhitelist();
        let whitelistStatus = await store.getState().blockchain.smartContract.whitelistStatus();

        totalSupply = totalSupply.toNumber();
        alreadyMinted = alreadyMinted.toNumber();
        alreadyWhitelistMinted = alreadyWhitelistMinted.toNumber();
        maxPerWallet = maxPerWallet.toNumber();
        maxSupply = maxSupply.toNumber();
        cost = ethers.utils.formatEther(cost);
        whitelistMaxPerWallet = whitelistMaxPerWallet.toNumber();
        whitelistCost = ethers.utils.formatEther(whitelistCost);
        dispatch(
        fetchDataSuccess({
          totalSupply,
          cost,
          alreadyWhitelistMinted,
          whitelistCost,
          whitelistMaxPerWallet,
          whitelistStatus,
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