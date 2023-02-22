import styled from "styled-components";

export const ConnectInfoContainer = styled.div`
    margin-top: 10px;
    display:flex;
    flex-direction: column;
    gap: 10px;
`;
export const ConnectInfoText = styled.p`
    color: red;
    font-size: 17px;
    text-align: center;
`;
export const ConnectButton = styled.button`
    outline: 0;
    border: 0;
    color:white;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    background-color: black;
    &:hover{
        opacity: .8;
        outline: 0;
        border: 0;
    }
`;
export const WarningMessage = styled.p`
    color: red;
    text-align:center;
    font-weight: 600;
    font-size: 15px;
`;