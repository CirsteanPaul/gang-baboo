import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { toHex } from "./we3modal/utils";
import { networkId } from "./we3modal/networks";
import Popup from "./components";
import { networkParams } from "./we3modal/networks";
import { addMetamaskIfMissing, providerOptions } from "./we3modal/providerOptions";
import {useDispatch, useSelector} from "react-redux";
import { connect, initiateWeb3, updateAccountRequest } from "./redux/blockchain/blockchainActions";
import styled from "styled-components";
function App() {
  const dispatch = useDispatch();
  const provider = useSelector(state => state.blockchain.provider);
  const web3Modal = useSelector(state => state.blockchain.web3);
  const account = useSelector(state => state.blockchain.account);
  useEffect(() => {
    addMetamaskIfMissing()
    localStorage.clear()
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions // required
    });
    // dispatch(initiateWeb3({web3: web3Modal}));
    // if (web3Modal?.cachedProvider) {
    //   dispatch(connect());
    // }
  }, []);

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
  };
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        dispatch(updateAccountRequest(accounts[0]));
      };

      const handleChainChanged = (_hexChainId) => {
        console.log("disconnect" );
        disconnect();
      };

      const handleDisconnect = () => {
        console.log("disconnect");
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
  return (
    <MainContainer>
      <Popup />
    </MainContainer>
  );
}
const MainContainer = styled.div`
  padding: 20px;

    min-height: 300px;
    width: 100vw;
    display:flex;
    justify-content:center;
    align-items:center;
`;
export default App;
