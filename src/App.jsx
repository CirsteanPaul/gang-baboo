import { useEffect } from "react";
import Web3Modal from "web3modal";
import Popup from "./components";
import { addMetamaskIfMissing, providerOptions } from "./we3modal/providerOptions";
import {useDispatch, useSelector} from "react-redux";
import { updateAccountRequest } from "./redux/blockchain/blockchainActions";
import styled from "styled-components";
function App() {
  const dispatch = useDispatch();
  const provider = useSelector(state => state.blockchain.provider);
  const web3Modal = useSelector(state => state.blockchain.web3);
  useEffect(() => {
    addMetamaskIfMissing()
    localStorage.clear()
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions // required
    });
  }, []);

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
  };
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        dispatch(updateAccountRequest(accounts[0]));
      };

      const handleChainChanged = (_hexChainId) => {
        disconnect();
      };

      const handleDisconnect = () => {
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
