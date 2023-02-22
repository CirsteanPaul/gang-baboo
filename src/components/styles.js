import styled from "styled-components";

export const PopupContainer = styled.div`
  border-radius: 20px;
  box-shadow: 1px 1px rgba(0,0,0, 0.7);
  width: 600px;
  height: 400px;
  padding: 10px 30px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  background-color: #4b4b4b;
  opacity: .9 ;
  @media screen and (max-width: 630px){
    width: 100%;
  }
`;
export const NftImage = styled.img`
    height: 300px;
    width: 250px;
    border-radius: 10px;
    object-fit: cover;
    @media screen and (max-width: 630px){
        display:none;
    }
`;