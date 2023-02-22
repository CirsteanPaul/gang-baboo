import React from 'react'
import { PopupContainer, NftImage } from './styles'
import MintingSection from './minting-section';
import styled from 'styled-components';

const Popup = () => {
  return (<MainContainer>
   <PopupContainer >
    
    <MintingSection />
    <NftImage src="images/mint.jpg" />
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

export default Popup