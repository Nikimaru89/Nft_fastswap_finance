import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import api from '../../api'
import { controlNotification } from '../../redux/action/faceAction'
import { contractAddress as contracts, chainId } from '../../constants'
import customABI from '../../constants/abis/custom.json'
import auctionABI from '../../constants/abis/auction.json'
import erc721ABI from '../../constants/abis/erc721.json'
import { getContract } from '../../utils/getContract'
import { Button, Upload } from '../../components'
import Input from '../components/Input'
import Textfield from '../components/TextField'
import MySwitch from '../components/Switch'
import TransactionBtn from '../components/TransactionBtn'
import MiPlus from '../components/MiPlus'
import Select from '../components/Select'
import Dropdown from '../components/Dropdown'
import { Box, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import '../upload.css';
import { toast } from 'react-toastify'
import { pinFileToIPFS } from '../../utils/fileUploadToIpfs'
import { useTranslation } from '../../contexts/Localization'

interface NftInfoProps {
  url: string,
  name: string,
  description: string,
  group: string,
  supply: number,
  saletype: number,
  payment: string,
  price: number,
  duration: number
}

const Wrapper = styled.div`
  max-width: 614px;
  width: 90%;
  margin: 40px auto 140px;
`

const Flex = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
`

const Flex2 = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  margin-bottom:8px;
`

const Space = styled.div<{ wth?: string }>`
  margin-bottom : ${({ wth }) => wth ? wth : '40px'};
`

const CreateNft = () => {
  const props = useLocation()
  const { library, account } = useWeb3React()
  const { t } = useTranslation()
  //@ts-ignore
  const { contract, tokenId } = useParams()
  const [nftInfo, setNftInfo] = useState<NftInfoProps>({
    url: "",
    name: "",
    description: "",
    group: "Fastswap Collection",
    supply: 1,
    saletype: 2,
    payment: "BNB",
    price: 0,
    duration: 0
  })

  const [isList, setIsList] = useState(false)
  const [isMarket, setIsMarket] = useState(false)
  const [isUnlock, setIsUnlock] = useState(false)
  const [collections, setCollections] = useState([])
  const [collIndex, setCollIndex] = useState(0)
  const dispatch = useDispatch()
  const customContract = getContract(contracts.customNft[chainId], customABI, library, account)
  const auctionContract = getContract(contracts.auction[chainId], auctionABI, library, account)

  const navigate = useNavigate()

  const fetchCollection = async () => {
    let res = (await (api.collection.getAll())).data
    const data = []
    if (!contract) {
      res = res.filter(it => it.contract === contracts.customNft[chainId])
    } else {
      res = res.filter(it => it.contract === contract)
    }
    res.map((item) => data.push(item.name))
    setCollections(data)
    setCollIndex(data.indexOf(props.state?.['group']) >= 0 ? data.indexOf(props.state?.['group']) : 0)
    if (contract && tokenId) {
      res = (await api.nft.getNFTById(contract, tokenId)).data
      if (res[0].price > 0) {
        setIsMarket(true)
      }
      setNftInfo({
        ...nftInfo,
        url: res[0].image,
        name: res[0].name,
        description: res[0].description,
        group: res[0].group,
        price: res[0].price,
        payment: res[0].payment || "BNB",
        duration: res[0].duration,
        saletype: res[0].duration ? 1 : 2
      })
      setCollIndex(data.indexOf(res[0].group))
      setIsList(true)
    }
  }

  const handleCreate = async () => {
    if (!account) return

    else if (!nftInfo.url || !nftInfo.name || !nftInfo.description || !nftInfo.group) {
      toast(t("Please input the fields correctly"))
      return
    }

    else {
      const price = (await api.coin.getPriceData()).data

      dispatch(controlNotification({ notificationValue: true, title: t("Creating Nft"), description: t("Please wait...") }))
      try {
        if (isList) {
          if (nftInfo.price <= 0) {
            toast(t("Price must be greater than 0"))
            dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
            return
          }
          if (nftInfo.saletype === 1 && nftInfo.duration <= 0) {
            toast(t("Duration must be greater than 0"))
            dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
            return
          }
        }
        const minted = await customContract.totalMinted()
        let tx
        const tokenIds = []
        if (!tokenId) {
          const hash = await pinFileToIPFS({
            name: nftInfo.name,
            description: nftInfo.description,
            image: nftInfo.url
          })
          tx = await customContract.mint(hash, nftInfo.supply)
          await tx.wait()
          for (let i = Number(minted) + 1; i < Number(minted) + nftInfo.supply + 1; i++) {
            await api.nft.createNFT(contracts.customNft[chainId], i, nftInfo.name, nftInfo.description, nftInfo.url, nftInfo.group, 0, "", 0, 0, [], [], [], [], nftInfo.supply || 1, account, account)
            await api.activity.createActivity(contracts.customNft[chainId], i, nftInfo.name, nftInfo.group, nftInfo.url, "Minted", 0, "", 0, 1, account, "")
            tokenIds.push(i)
          }
        } else {
          tokenIds.push(tokenId)
        }
        if (isList) {
          if (nftInfo.price > 0) {
            if (contract && contract !== contracts.customNft[chainId]) {
              const erc721Contract = getContract(contract, erc721ABI, library, account)
              tx = await erc721Contract.approve(contracts.auction[chainId], tokenId)
              await tx.wait()
            } else {
              tx = await customContract.batchApprove(contracts.auction[chainId], tokenIds)
              await tx.wait()
            }
          }
          await Promise.all(tokenIds.map(async (tokenId) => {
            if (nftInfo.price > 0) {
              if (nftInfo.saletype === 1) {
                tx = await auctionContract.createAuction(contract || contracts.customNft[chainId],
                  tokenId,
                  nftInfo.payment,
                  new BigNumber(nftInfo.price).multipliedBy(10 ** 18).toString(10),
                  nftInfo.duration * 86400)
                await tx.wait()
              } else {
                tx = await auctionContract.createSale(contract || contracts.customNft[chainId],
                  tokenId,
                  nftInfo.payment,
                  new BigNumber(nftInfo.price).multipliedBy(10 ** 18).toString(10))
                await tx.wait()
              }
            }
            let coinUsd = 0
            switch (nftInfo.payment) {
              case 'BNB':
                coinUsd = price.binancecoin.usd
                break;
              case 'FAST':
                coinUsd = price['fastswap-bsc'].usd
                break;
              case 'DUKE':
                coinUsd = price.dukecoin.usd
                break;
            }
            await api.nft.updateNFT(contract || contracts.customNft[chainId], tokenId, {
              name: nftInfo.name,
              description: nftInfo.description,
              image: nftInfo.url,
              group: nftInfo.group,
              price: nftInfo.price,
              payment: nftInfo.payment,
              priceUsd: coinUsd * nftInfo.price,
              duration: nftInfo.duration || 0,
              offers: [],
              bids: [],
              watches: [],
              likes: [],
              creator: account,
              owner: account
            })
            await api.activity.createActivity(contract || contracts.customNft[chainId], tokenId, nftInfo.name, nftInfo.group, nftInfo.url, "Listed", nftInfo.price, nftInfo.payment, coinUsd * nftInfo.price, 1, account, "")
          }))
        }
        navigate('/overview')
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
    }
  }

  useEffect(() => {
    fetchCollection()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!collections[collIndex])
      setNftInfo({ ...nftInfo, group: collections[collIndex] })
  }, [collIndex])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <Typography variant='h4' sx={{ mb: '40px' }} color='text.main'>{contract && tokenId ? t('Update') : t('Create')} {t('NFT')}</Typography>

      <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Image, Video, 3D model or Audio')}</Typography>
      <Typography variant='caption' sx={{ mb: 9 }} color='text.main'>{t('JPEG, PNG, SVG, GIF, WEBP, MP4, GLB, GLFT, MP3, WAV, OGG. Max 100mb.')}</Typography>
      <Upload info={nftInfo} setInfo={setNftInfo} field="url" width={326} height={246} disabled={!!contract && !!tokenId} />
      <Space />

      <Typography variant='h6' sx={{ mb: '17px' }} color='text.main'>{t('Name')}</Typography>
      <Input placeholder={t("Item Name")}
        value={nftInfo?.name}
        onChange={e => setNftInfo({ ...nftInfo, name: e.target.value })}
        disabled={!!contract && !!tokenId}
      />
      <Space />

      <Typography variant='h6' color='text.main'>{t('Description')}</Typography>
      <Typography variant='caption' sx={{ mt: '8px' }} color='text.main'>{t('Displayed on the item page')}</Typography>
      <Textfield placeholder={t("Provide a detailed description of the item")}
        value={nftInfo?.description}
        onChange={e => setNftInfo({ ...nftInfo, description: e.target.value })}
        disabled={!!contract && !!tokenId}
        color='text.main'
      />
      <Typography variant='caption' sx={{ textAlign: 'right' }} color='text.main'>
        {t('0 Character of 1000 maximum')}
      </Typography>
      <Space />
      <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Put on marketplace')}</Typography>
      <Flex>
        <Typography variant='caption' color='text.main'>{t('Your item will be on Sale')}</Typography>
        <MySwitch value={isList} setValue={setIsList} />
      </Flex>
      <Space />

      {isList && <>
        <Typography variant='h6' color='text.main'>{t('Supply')}</Typography>
        <Typography variant='caption' sx={{ mt: '8px', mb: '16px' }} color='text.main'>
          {t('The number of copies that can be minted')}
        </Typography>
        <MiPlus value={nftInfo.supply} onChange={e => setNftInfo({ ...nftInfo, supply: e })} disabled={!!tokenId} />
        <Space />

        <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Transaction')}</Typography>
        <Typography variant='caption' sx={{ mb: '16px' }} color='text.main'>{t('Choose type')}</Typography>
        <Flex>
          <Box onClick={() => {
            if (!(contract && tokenId && isMarket))
              setNftInfo({ ...nftInfo, saletype: 1 })
          }}>
            <TransactionBtn
              transactionBtnText={t("Auction")}
              transactionText={t("Buyers make bids on your collectible")}
              isclicked={nftInfo.saletype === 1 ? true : false}
            />
          </Box>
          <Box onClick={() => {
            if (!(contract && tokenId && isMarket))
              setNftInfo({ ...nftInfo, saletype: 2 })
          }}>
            <TransactionBtn
              transactionBtnText={t("Fixed Price")}
              transactionText={t("Collectible can be instantly purchased")}
              isclicked={nftInfo.saletype === 2 ? true : false}
            />
          </Box>
        </Flex>
        <Space />
        {nftInfo.saletype === 1 && <>
          <Typography variant='h6' color='text.main'>{t('Duration')}</Typography>
          <Typography variant='caption' color='text.main' sx={{ mt: '8px', mb: '16px' }}>
            {t('Selected value shows one day')}
          </Typography>
          <MiPlus value={nftInfo.duration} onChange={e => {
            if (!(contract && tokenId && isMarket))
              setNftInfo({ ...nftInfo, duration: e })
          }} />
          <Space />
        </>}

        <Typography variant='h6' color='text.main' sx={{ mb: '9px' }}>{t('Reserve Price')}</Typography>
        <Typography variant='caption' color='text.main' sx={{ mb: '16px' }}>{t('Minimum Price per copies that must be met to conclude sale')}</Typography>
        <Flex2>
          <Dropdown info={nftInfo} setInfo={setNftInfo} disabled={(contract && tokenId && isMarket)} />
        </Flex2>
        <Space />
      </>}

      <Typography variant='h6' color='text.main' sx={{ mb: '9px' }}>{t('Unlock Once Purchased')}</Typography>
      <Flex>
        <Typography variant='caption' color='text.main' sx={{ mb: '16px' }}>{t('Content will be unlocked once purchased')}</Typography>
        <MySwitch value={isUnlock} setValue={setIsUnlock} />
      </Flex>
      <Input placeholder={t("Enter Digital Key, Code, Link etc.")} disabled={!isUnlock} />
      <Space />

      <Typography variant='h6' color='text.main' sx={{ mb: '9px' }}>{t('Collection')}</Typography>
      <Typography variant='caption' color='text.main' sx={{ mb: '16px' }}>{t('Select existing Collection or create new one')}</Typography>
      <Select maininfos={collections} value={collIndex} setValue={setCollIndex} disabled={!!contract && !!tokenId} />
      <Space />

      <Button
        variant='contained'
        sx={{ minWidth: '100%', marginBottom: '140px' }}
        onClick={handleCreate}>
        + {contract && tokenId ? t('Update') : t('Create')}
      </Button>
    </Wrapper>
  )
}

export default CreateNft