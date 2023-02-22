import { ethers } from 'ethers';
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../redux/data/dataActions';
import ReactLoading from 'react-loading';
import { MintingContainer,
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
    console.log(data);
    const handleIncrement = () =>{
        if(mintAmount < data.maxPerWallet -  data.alreadyMinted - 1){
           dispatch(setMintingAmountAction({mintingAmount: mintAmount + 1 }));
        }
    }
    const handleDecrement = () =>{
        if(mintAmount === 1)
        return;
        dispatch(setMintingAmountAction({ mintingAmount: mintAmount - 1 }));
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
        dispatch(setIsMintingtAction({ isMinting: true}));
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
            dispatch(setIsMintingtAction({ isMinting: false }));
        }
      };
    const cost = useMemo(() =>{
        console.log(data.cost, mintAmount);
            if(data.alreadyMinted !== 0) 
                return (mintAmount * Number(data.cost)).toString().substring(0, 6);

            return ((mintAmount - 1) * Number(data.cost)).toString().substring(0, 6);
    },[data.alreadyMinted, data.cost, mintAmount])
    useEffect(() =>{
        getData();
    },[])
    if(data.loading)
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}}><ReactLoading type='balls' height={70} width={80} /></div>;

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