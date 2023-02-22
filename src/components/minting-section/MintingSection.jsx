import React from 'react'
import { useSelector } from 'react-redux'
import MintingInfo from '../minting-info';
import ConnectInfo from '../connect-info';
import { MintingSectionContainer, MintingSectionTitle } from './styles';

const MintingSection = () => {
const account = useSelector(state => state.blockchain.account);
  return (
    <MintingSectionContainer>
        <MintingSectionTitle>Mint your nft now!</MintingSectionTitle>
        {account ? <MintingInfo /> : <ConnectInfo />}
    </MintingSectionContainer>
  )
}

export default MintingSection