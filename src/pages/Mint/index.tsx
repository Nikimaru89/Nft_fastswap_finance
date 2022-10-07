import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import StyledButton from '../../components/Button'
import MiPlus from '../components/MiPlus'
import { theme } from '../../theme'
import { getContract } from '../../utils/getContract'
import mammalABI from '../../constants/abis/mammal.json'
import { contractAddress as contracts, chainId as rightChain } from '../../constants'
import { useDispatch } from 'react-redux'
import { controlNotification } from '../../redux/action/faceAction'
import { toast } from 'react-toastify'
import { checkNetwork } from '../../utils/checkNetwork'
import { useTranslation } from '../../contexts/Localization'

const Body = styled.div`
  width:100%;
  background: background.main;
  padding-bottom: 100px;
`
const MintPan = styled.div`
  width:70%;
  padding:40px;
  margin:0 auto;
  background:background: linear-gradient(88.83deg,rgba(157,209,178,0.57) 0.54%,rgba(157,209,178,0.19) 99.61%),linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0) 100%);
  backdrop-filter:blur(18px);
  border-radius:20px;
  margin-top:40px;
  text-align:center;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 10px 0px;
  border:4px dashed #183B56;
`
const Head = styled.div`
  max-width:250px;
  width:100%;
  min-height:250px;
  height:100%;
  border:4px dashed #183B56;
  background-image:url('/assets/images/Mint-Head.gif');
  background-size:cover;
  background-position:center;
  border-radius:100%;
  padding:2px;
  margin:40px auto;
  box-shadow: rgb(4 17 29 / 60%) 0px 0px 8px 3px;
`
const Mint = () => {
  const { t } = useTranslation()
  const { library, account, chainId } = useWeb3React()
  const [totalMinted, setTotalMinted] = useState<number>(0)
  const [mintcount, setMintCount] = useState<number>(1)
  const dispatch = useDispatch()
  const mammalNft = getContract(contracts.mammalNft[rightChain], mammalABI, library, account)

  useEffect(() => {
    if (!account) return
    else if (chainId !== rightChain) return
    mammalNft.totalMinted().then(res => setTotalMinted(parseInt(res, 10)))
  }, [account, mammalNft, chainId])

  const handleMint = async () => {
    if (checkNetwork(account, chainId, t)) {
      try {
        if (!account || mintcount <= 0) return
        const balance = await library.getBalance(account)
        const cost = ethers.utils.parseEther(((150 * mintcount) / 1000).toString())
        if (balance.gte(cost)) {
          dispatch(controlNotification({ notificationValue: true, title: t("Minting Nft"), description: t("Please wait...") }))
          const tx = await mammalNft.mint(mintcount, {
            from: account,
            value: cost
          })
          await tx.wait()
          setTotalMinted(totalMinted + mintcount)
          setMintCount(1)
          dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
          toast(t("You have minted nfts, please check your nft on profile page"))
        } else {
          toast(t("Not enough funds to mint mammal nft"))
        }
      } catch (error) {
        toast(error?.message)
        dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
      }
    }
  }

  return (
    <Body>
      <Head />
      <MintPan>
        <Typography variant="h3" color='text.primary' sx={{ mb: '20px' }}>
          <span style={{ color: theme.palette.secondary.main }}>{totalMinted}</span> / 4005
        </Typography>
        <Typography variant="h5" color='text.primary' sx={{ mt: '20px', mb: '20px' }}>
          <span style={{ color: theme.palette.secondary.main }}>***</span>
        </Typography>
        <Typography variant="h4" color='text.primary' sx={{ mt: '20px' }}>
          {t('One SEAMAMMON costs')} <span style={{ color: theme.palette.secondary.main }}>0.15</span> BNB
        </Typography>
        <Typography variant="h6" color='text.primary' sx={{ mt: '20px' }}> {t('Excluding gas fee')} </Typography>
        <Typography variant="h6" color='text.primary' sx={{ mt: '20px' }}> {t('Click to mint your NFTs')} </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <MiPlus value={mintcount} onChange={setMintCount} />
        </div>
        <StyledButton variant="contained" sx={{ mt: '40px' }}>
          <Typography variant="h6" onClick={handleMint}>{t('Mint')}</Typography>
        </StyledButton>

        <Typography variant="h6" color="text.primary" sx={{ fontSize: '14px', marginTop: '20px' }}>
          {t('The seamammon is collection of 4,000 unique Sea mammals NFTs and digital collectibles living on the BNB Chain.')}
          {t('Developed by Fastswap.With Seamammon NFT you will have access to our P2E games on')}
          {t('Metaverse and unlock other premium features in our ecosystem of products like')} <a href="http://cointools.io" target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'none' }}>Cointools.io</a>,
          <a href="http://fastswap.finance/" target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'none' }}>Fastswap.finanace</a> {t('and other benefits in the future.')}
        </Typography>

      </MintPan>
    </Body>
  )
}

export default Mint