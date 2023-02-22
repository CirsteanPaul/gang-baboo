import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { connect } from '../../redux/blockchain/blockchainActions';
import { ConnectInfoContainer, WarningMessage, ConnectInfoText, ConnectButton } from './styles';

const ConnectInfo = () => {
    const dispatch = useDispatch();
    const errorMsg = useSelector(state => state.blockchain.errorMsg);
  return (
    <ConnectInfoContainer>
        <ConnectInfoText>Please connect with your wallet</ConnectInfoText>
        <ConnectButton onClick= {(e) => {e.stopPropagation(); dispatch(connect())}}>Connect</ConnectButton>
        {errorMsg && <WarningMessage>{errorMsg}</WarningMessage>}
    </ConnectInfoContainer>
  )
}

export default ConnectInfo