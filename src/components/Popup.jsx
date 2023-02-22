import React from 'react'
import { PopupContainer, NftImage } from './styles'
import MintingSection from './minting-section';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Popup = () => {
  const data = useSelector(state => state.data);
  return (<MainContainer>
   <PopupContainer >
    
    <MintingSection />
    <NftImage src="images/mint.jpg" />
    </PopupContainer>
    <FollowButton style={{ color: 'black'}} onClick={(e) => {
      e.stopPropagation();
      window.open('https://linktr.ee/gangstapes', '_blank');
    }}>Linktree</FollowButton>
    </MainContainer>
  )
}
const FollowButton = styled.button`
  font-family: 'Merienda One',cursive;
    text-align: center;
    background-color: #f1f1f1;
    border: 0;
    border-radius: 8px;
    outline: 0;
    &:focus{
      outline: 0;
    }
    &:hover{
  cursor: pointer;
  border: 0;
  outline: 0;
}
    width: 100px;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
export default Popup