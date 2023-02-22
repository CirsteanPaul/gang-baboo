import styled from "styled-components";

export const MintingSectionContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 20px;
    @media screen and (max-width: 630px){
       width: 100%;
       align-items: center;
    }

`;
export const MintingSectionTitle = styled.h3`
    color: #181C2A;
    font-family: 'Merienda One', cursive;
    text-align: center;
`;