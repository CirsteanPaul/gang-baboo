import React from 'react'
import { PopupContainer, NftImage } from './styles'
import MintingSection from './minting-section';
import styled from 'styled-components';
import logo from './logo.jpeg'

const Popup = () => {
  return (<MainContainer>
   <PopupContainer >
    
    <MintingSection />
    <NftImage src={logo} />
    </PopupContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export default Popup;
