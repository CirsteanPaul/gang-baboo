import { ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../redux/data/dataActions';
import ReactLoading from 'react-loading';
import { MintingContainer, FreeMintSection,
    HowMuchLeftToMint,HowManyCanIMint, CostOfEther
, ValueSection, MintingSection, ChangeButton
,MintButtonContainer, MintButton } from './styles';
import { setIsMintingtAction, setMintingAmountAction } from '../../redux/appState/appStateActions';

const MintingInfo = () => {
    const dispatch = useDispatch();
    const mintAmount = useSelector(state => state.app.mintingAmount);
    const isMinting = useSelector(state => state.app.isMinting);
    const blockchain = useSelector(state => state.blockchain);
    const data = useSelector(state => state.data);
    const handleIncrement = () =>{
        if(data.whitelistStatus) 
        {
            if(mintAmount < data.whitelistMaxPerWallet - data.alreadyMinted)
           dispatch(setMintingAmountAction(mintAmount + 1));
        }
        else if(mintAmount <data.maxPerWallet -  data.alreadyMinted - 1){
           dispatch(setMintingAmountAction(mintAmount + 1));
        }
    }
    const handleDecrement = () =>{
        if(mintAmount === 1)
        return;
        dispatch(setMintingAmountAction(mintAmount - 1));
    }
    const getData = () =>{
        dispatch(fetchData(blockchain.account));
    }
    const claimNFTs =async () => {
        if(mintAmount + data.totalSupply > data.maxSupply){
          alert(`You can't mint that much! Max supply is ${data.maxSupply} `);
          return;
        }
        let gasLimit = 300000;
        let price = ethers.utils.parseEther(cost.toString());
        let totalCostWei = String(price);
        let totalGasLimit = String(gasLimit * mintAmount);
        console.log("Cost: ", totalCostWei);
        console.log("Gas limit: ", totalGasLimit);
        dispatch(setIsMintingtAction(true));
        try{
        const tx = await  blockchain.smartContract.mint(mintAmount, {value: totalCostWei});
        await tx.wait()
        dispatch(fetchData(blockchain.account));
      }
        catch (err){
            console.log(err.message)
            alert("Check your balance, or the contract is paused right now");
       }
        finally{
            dispatch(setIsMintingtAction(false));
        }
      };
    const freeMintMessageStatus = useMemo(() =>{
        if(data.alreadyWhitelistMinted === 0)
            return "You have a nft for free mint";
        else
            return null;
    },[data.alreadyMinted])
    const cost = useMemo(() =>{
        if(data.whitelistStatus) {
            if(data.alreadyWhitelistMinted) {
                return mintAmount * data.whitelistCost;
            }
            else {
                return (mintAmount - 1) * data.whitelistCost;
            }
        } else{
            return mintAmount * data.cost;
        }
    },[data.alreadyMinted, data.cost, mintAmount])
    useEffect(() =>{
        getData();
    },[])
    if(data.loading)
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}><ReactLoading type='balls' height={70} width={80} /></div>;
    if(data.whitelistStatus) {
        return  (
            <MintingContainer>
                <FreeMintSection>{freeMintMessageStatus}</FreeMintSection>
                <HowMuchLeftToMint>{`${data.totalSupply}/${data.maxSupply}`}</HowMuchLeftToMint>
                <HowManyCanIMint>{`You can mint ${data.whitelistMaxPerWallet - data.alreadyWhitelistMinted} more NFTs` }</HowManyCanIMint>
                <MintingSection>
                    <ChangeButton onClick={(e) => {e.stopPropagation(); handleDecrement()}}> -</ChangeButton>
                    <ValueSection>{mintAmount}</ValueSection>
                    <ChangeButton onClick={(e) =>{e.stopPropagation(); handleIncrement()}}> +</ChangeButton>
                </MintingSection>
                <MintButtonContainer>
                <MintButton disabled={isMinting} onClick={(e) => {e.stopPropagation(); claimNFTs()}}>Mint</MintButton>
                <CostOfEther>{`${cost} ETH`}</CostOfEther>
                </MintButtonContainer>
        
            </MintingContainer>
          )
    }
  return (
    <MintingContainer>
        <HowMuchLeftToMint>{`${data.totalSupply}/${data.maxSupply}`}</HowMuchLeftToMint>
        <HowManyCanIMint>{`You can mint ${data.maxPerWallet - data.alreadyMinted} more NFTs` }</HowManyCanIMint>
        <MintingSection>
            <ChangeButton onClick={(e) => {e.stopPropagation(); handleDecrement()}}> -</ChangeButton>
            <ValueSection>{mintAmount}</ValueSection>
            <ChangeButton onClick={(e) =>{ e.stopPropagation(); handleIncrement()}}> +</ChangeButton>
        </MintingSection>
        <MintButtonContainer>
        <MintButton disabled={isMinting} onClick={(e) => {e.stopPropagation(); claimNFTs()}}>Mint</MintButton>
        <CostOfEther>{`${cost} ETH`}</CostOfEther>
        </MintButtonContainer>

    </MintingContainer>
  )
}

export default MintingInfo