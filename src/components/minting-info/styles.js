import styled from "styled-components";

export const MintingContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    color: black;
    justify-content:center;
    align-items:center;
`;
export const FreeMintSection = styled.p`
    color: red;
    font-weight: 700;
`;
export const HowMuchLeftToMint = styled.p`
    color: grey;
    opacity: .9;
`;
export const HowManyCanIMint = styled.p`
    color: #0d142f;
`;
export const CostOfEther = styled.p`
    color: red;
    margin: 0;
`;
export const ChangeButton = styled.button`
    color: red;
    border-radius: 20px;
    display:flex;
    font-size: 20px;
    padding :10px 20px;
    justify-content: center;
    align-items:center;
    background-color: black;
    border: 0;
    outline: 0;
    &:hover{
        opacity: .8;
        outline: 0;
        border: 0;
    }
`;
export const ValueSection = styled.div`
    color: red;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 20px;
    background-color:lightgray;

`;
export const MintingSection = styled.div`
    display:flex;
    padding: 2px;
    gap: 10px;
    width: 70%;
    justify-content: space-evenly;
    align-items: center;
`;
export const MintButton = styled.button`
    color: white;
    background-color: red;
    padding: 10px 20px;
    border-radius: 5px;
    outline: 0;
    border: 0;
    &:hover{
        cursor: pointer;
        outline: 0;
        border: 0;
    }
`;
export const MintButtonContainer = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 20px;
    width: 80%;
    align-items: center;
    flex-direction: row;
`;