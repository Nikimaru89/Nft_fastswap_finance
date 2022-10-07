import React, { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import api from '../../api'
import getDateFormat from '../../utils/getDateFormat'
import { controlNotification } from '../../redux/action/faceAction'
import { chainId, contractAddress as contract } from '../../constants'
import { getContract } from '../../utils/getContract'
import auctionABI from '../../constants/abis/auction.json'
import erc20ABI from '../../constants/abis/erc20.json'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import Input from '../components/Input'
import { Button } from '../../components'
import BidModal from '../../components/BIdModal'
import table from '../assets2/table.png'
import grayeye from '../assets2/grayeye.png'
import heart from '../assets2/heart.png'
import { controlModal } from '../../redux/action/faceAction'
import { checkNetwork } from '../../utils/checkNetwork'
import 'react-toastify/dist/ReactToastify.css'
import { useTranslation } from '../../contexts/Localization'

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`
const WrapperLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media(max-width:350px){
    width:100%;
    justify-content:space-between;
  }
`
const WrapperRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  padding-bottom: 4px;
  text-align: right;
  @media(max-width:350px){
    width:100%;
    text-align:center;
    margin-top:20px;
  }
`
const Divider = styled.div`
  width: 1px;
  height: 80px;
  margin: -2px 8px 0px 8px;
  border-right: 1px solid #CECECE;
`
const Item = styled.div`
  display:flex;
  align-items:center;
`
const ItemText = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #757B75;
`
const StyledLink = styled(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
  width: calc(100% - 75px);
`
const Content = styled.div`
  padding:20px;
`

const ConfirmModal = ({ onClick }) => {
  const [value, setValue] = useState('')
  const { t } = useTranslation()

  const handleClick = () => {
    onClick(value)
  }

  return (
    <>
      <Content>
        <Flex>
          <Typography variant="h6" sx={{ textAlign: 'left', mr: '15px' }}>{t('Price')}: </Typography>
          <Input value={value} placeholder="Price" onChange={e => setValue(e.target.value)} />
        </Flex>
        <Button
          variant="contained"
          sx={{ textTransform: 'capitalize', minWidth: '100%', mt: '10px' }}
          onClick={handleClick}>{t('Confirm')}</Button>
      </Content>
    </>
  )
}

const TopHead = ({ item }) => {
  const { library, account } = useWeb3React()
  const { t } = useTranslation()
  const [type, setType] = useState('bid')
  const [watch, setWatch] = useState(item?.watches.includes(account))
  const [count, setCount] = useState(item?.watches.length || 0)
  const [tokenPrice, setTokenPrice] = useState({ "BNB": 0, "FAST": 0, "DUKE": 0 })
  const [activityRequested, setActivityRequested] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const curTime = new Date().getTime()
  const auctionContract = getContract(contract.auction[chainId], auctionABI, library, account)
  const hasBid = item?.bids.some(el => el.user?.toLowerCase() === account?.toLowerCase())
  const hasOffer = item?.offers.some(el => el.user?.toLowerCase() === account?.toLowerCase())

  const fetchPrice = async () => {
    const res = (await api.coin.getPriceData()).data
    const _bnb = res.binancecoin.usd
    const _fast = res['fastswap-bsc'].usd
    const _duke = res.dukecoin.usd
    setTokenPrice({ "BNB": _bnb, "FAST": _fast, "DUKE": _duke })
  }

  const handleBuy = async () => {
    if (checkNetwork(account, chainId, t)) {
      dispatch(controlNotification({ notificationValue: true, title: t("Buy Nft"), description: t("Please wait...") }))
      try {
        if (item.payment !== "BNB") {
          const erc20 = getContract(contract[item.payment.toLowerCase()][chainId], erc20ABI, library, account)
          const balance = await erc20.balanceOf(account)
          if (item.price > Number(ethers.utils.formatEther(balance))) {
            toast(t("Insufficient funds to buy nft"))
            dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
            return
          } else {
            const tx = await erc20.approve(
              contract.auction[chainId],
              new BigNumber(item.price).multipliedBy(10 ** 18).toString(10))
            await tx.wait()
          }
        } else {
          const balance = await library.getBalance(account)
          if (item.price > Number(ethers.utils.formatEther(balance))) {
            toast(t("Insufficient funds to buy nft"))
            dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
            return
          }
        }
        const tx = await auctionContract.buy(item.contract, item.tokenId, new BigNumber(item.price).multipliedBy(10 ** 18).toString(10), {
          from: account,
          value: item.payment === 'BNB' ? new BigNumber(item.price).multipliedBy(10 ** 18).toString(10) : "0"
        })
        await tx.wait()
        await api.activity.createActivity(item.contract, item.tokenId, item.name, item.group, item.image, "Sale", item.price, item.payment, tokenPrice[item.payment] * item.price, 1, item.owner, account)
        await api.nft.updateNFT(item.contract, item.tokenId, { owner: account, price: 0, payment: "", priceUsd: 0, duration: 0, offers: [] })
        navigate(`/account/${account}`)
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
    }
  }

  const onDuration = () => {
    const value = item?.duration * 86400000 - curTime + new Date(item?.updatedAt).getTime()
    if (value < 0) return 0
    return value
  }

  const getHighestBid = () => {
    return item?.bids.length > 0 ?
      new BigNumber(Math.max(...item.bids.map(data => data.price))).dividedBy(10 ** 18).toNumber() :
      item?.price
  }

  const getHighestOffer = () => {
    return item?.offers.length > 0 ?
      new BigNumber(Math.max(...item.offers.map(data => data.price))).dividedBy(10 ** 18).toNumber() :
      item?.price
  }

  const handleBid = async (price) => {
    dispatch(controlModal({ modalValue: false }))
    if (checkNetwork(account, chainId, t)) {
      if (Number(price) > getHighestBid()) {
        dispatch(controlNotification({ notificationValue: true, title: t("Bid Nft"), description: t("Please wait...") }))
        try {
          if (item.payment !== "BNB") {
            const erc20 = getContract(contract[item.payment.toLowerCase()][chainId], erc20ABI, library, account)
            const balance = await erc20.balanceOf(account)
            if (Number(price) > Number(ethers.utils.formatEther(balance))) {
              toast(t("Insufficient funds to bid nft"))
              dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
              return
            } else {
              const tx = await erc20.approve(
                contract.auction[chainId],
                new BigNumber(price).multipliedBy(10 ** 18).toString(10))
              await tx.wait()
            }
          } else {
            const balance = await library.getBalance(account)
            if (Number(price) > Number(ethers.utils.formatEther(balance))) {
              toast(t("Insufficient funds to bid nft"))
              dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
              return
            }
          }
          const tx = await auctionContract.bid(item.contract, item.tokenId, item.payment, new BigNumber(price).multipliedBy(10 ** 18).toString(10),
            {
              from: account,
              value: item.payment === "BNB" ? new BigNumber(price).multipliedBy(10 ** 18).toString(10) : "0"
            })
          await tx.wait()
          await api.nft.addBids(item.contract, item.tokenId, { user: account, price: new BigNumber(price).multipliedBy(10 ** 18).toString(10) })
          await api.activity.createActivity(item.contract, item.tokenId, item.name, item.group, item.image, "Bid", price, item.payment, tokenPrice[item.payment] * price, 1, account, "")
          setActivityRequested(true)
        } catch (err) {
          console.log("error:", err)
        }
        dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
      } else {
        toast(t("Bid price must be higher than that."))
      }
    }
  }

  const handleAcceptBid = async () => {
    dispatch(controlModal({ modalValue: false }))
    if (checkNetwork(account, chainId, t)) {
      dispatch(controlNotification({ notificationValue: true, title: t("Accept bid"), description: t("Please wait...") }))
      try {
        const hbid = item.bids[item.bids.length - 1]
        const tx = await auctionContract.acceptBid(item.contract, item.tokenId, { from: account })
        await tx.wait()
        await api.activity.createActivity(item.contract, item.tokenId, item.name, item.group, item.image, "Sale", ethers.utils.formatEther(hbid.price), item.payment, tokenPrice[item.payment] * Number(ethers.utils.formatEther(hbid.price)), 1, item.owner, account)
        await api.nft.updateNFT(item.contract, item.tokenId, { owner: hbid.user, price: 0, payment: "", priceUsd: 0, duration: 0, bids: [] })
        navigate(`/account/${account}`)
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
    }
  }

  const handleOffer = async (price) => {
    if (Number(price) <= 0) {
      toast(t("Price must be greater than 0"))
    } else {
      dispatch(controlModal({ modalValue: false }))
      if (checkNetwork(account, chainId, t)) {
        if (Number(price) < item?.price) {
          dispatch(controlNotification({ notificationValue: true, title: t("Offer Nft"), description: t("Please wait...") }))
          try {
            if (item.payment !== "BNB") {
              const erc20 = getContract(contract[item.payment.toLowerCase()][chainId], erc20ABI, library, account)
              const balance = await erc20.balanceOf(account)
              if (Number(price) > Number(ethers.utils.formatEther(balance))) {
                toast(t("Insufficient funds to offer nft"))
                dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
                return
              } else {
                const tx = await erc20.approve(
                  contract.auction[chainId],
                  new BigNumber(price).multipliedBy(10 ** 18).toString(10))
                await tx.wait()
              }
            } else {
              const balance = await library.getBalance(account)
              if (Number(price) > Number(ethers.utils.formatEther(balance))) {
                toast(t("Insufficient funds to offer nft"))
                dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
                return
              }
            }
            const tx = await auctionContract.createOffer(item.contract, item.tokenId, item.payment, new BigNumber(price).multipliedBy(10 ** 18).toString(10),
              {
                from: account,
                value: item.payment === "BNB" ? new BigNumber(price).multipliedBy(10 ** 18).toString(10) : "0"
              })
            await tx.wait()
            await api.nft.addOffers(item.contract, item.tokenId, {
              user: account,
              price: new BigNumber(price).multipliedBy(10 ** 18).toString(10)
            })
            await api.activity.createActivity(item.contract, item.tokenId, item.name, item.group, item.image, "Offer", price, item.payment, tokenPrice[item.payment] * price, 1, account, "")
            setActivityRequested(true)
          } catch (err) {
            console.log("error:", err)
          }
          dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
        } else {
          toast(t("Offer price must be lower than that"))
        }
      }
    }
  }

  const handleAcceptOffer = async () => {
    dispatch(controlModal({ modalValue: false }))
    if (checkNetwork(account, chainId, t)) {
      dispatch(controlNotification({ notificationValue: true, title: t("Accept offer"), description: t("Please wait...") }))
      try {
        const hoffer = item?.offers.filter(res => res.price === new BigNumber(getHighestOffer()).multipliedBy(10 ** 18).toString(10))
        const tx = await auctionContract.acceptOffer(item.contract, item.tokenId, { from: account })
        await tx.wait()
        await api.activity.createActivity(item.contract, item.tokenId, item.name, item.group, item.image, "Sale", getHighestOffer(), item.payment, tokenPrice[item.payment] * getHighestOffer(), 1, item.owner, account)
        await api.nft.updateNFT(item.contract, item.tokenId, { owner: hoffer[0].user, price: 0, payment: "", priceUsd: 0, duration: 0, offers: [] })
        navigate(`/account/${account}`)
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
    }
  }

  const handleCancelSale = async () => {
    dispatch(controlModal({ modalValue: false }))
    if (checkNetwork(account, chainId, t)) {
      dispatch(controlNotification({ notificationValue: true, title: t("Cancel sale"), description: t("Please wait...") }))
      try {
        const tx = await auctionContract.cancelSale(item.contract, item.tokenId, { from: account })
        await tx.wait()
        await api.nft.updateNFT(item.contract, item.tokenId, { owner: account, price: 0, payment: "", priceUsd: 0, duration: 0, offers: [] })
        navigate(`/account/${account}`)
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
    }
  }

  const handleCancelAuction = async () => {
    dispatch(controlModal({ modalValue: false }))
    if (checkNetwork(account, chainId, t)) {
      dispatch(controlNotification({ notificationValue: true, title: t("Cancel auction"), description: t("Please wait...") }))
      try {
        const tx = await auctionContract.cancelAuction(item.contract, item.tokenId, { from: account })
        await tx.wait()
        await api.nft.updateNFT(item.contract, item.tokenId, { owner: account, price: 0, payment: "", priceUsd: 0, duration: 0, bids: [] })
        navigate(`/account/${account}`)
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
    }
  }

  const handleModal = (type) => {
    setType(type)
    dispatch(controlModal({ modalValue: true }))
  }

  const onWatch = async () => {
    if (checkNetwork(account, chainId, t)) {
      if (watch) {
        await api.nft.removeFeatures(item?.contract, item?.tokenId, account, 'watches')
        setCount(count - 1)
      }
      else {
        await api.nft.addFeatures(item?.contract, item?.tokenId, account, 'watches')
        setCount(count + 1)
      }
      setWatch(!watch)
    }
  }

  const copyURL = () => {
    const el = document.createElement('input')
    el.value = window.location.href
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  useEffect(() => {
    setCount(item?.watches.length)
    setWatch(item?.watches.includes(account))
  }, [item?.watches, account])

  useEffect(() => {
    fetchPrice()
  }, [])

  return (
    <>
      <BidModal
        title={type === 'bid' ? t("Place a bid") : t("Place an offer")}
        description={<ConfirmModal onClick={(price) => {
          type === 'bid' ? handleBid(price) : handleOffer(price)
        }} />} />
      <Grid container spacing={4} columns={{ xs: 4, md: 8 }} sx={{ mb: '64px' }}>
        <Grid item xs={4} md={4}>
          <img src={item?.image} style={{ width: '85%' }} alt="headimg" />
        </Grid>
        <Grid item xs={4} md={4} sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '410px', margin: 'auto 0' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '186px' }}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
              <Typography variant="h4" color='text.main' textAlign="left" sx={{ width: 'calc(100% - 24px)' }}>{item?.name}</Typography>
              <IconButton onClick={copyURL}>
                <img src='/assets/socials/share.svg' alt="share" />
              </IconButton>
            </Box>
            <StyledLink to={`/collection/${item?.contract}/${item?.group}`} color='black'>
              <Typography variant="subtitle2" color='text.main' textAlign="left">{item?.group}</Typography>
            </StyledLink>
            <StyledLink to={`/account/${item?.user_info ? item?.user_info[0].address : ''}`} color='black'>
              <Typography variant="caption" color='text.main' textAlign="left">{t('Owned by')} <span style={{ color: 'primary' }}>{item?.user_info ? item?.user_info[0].name : "unname"}</span></Typography>
            </StyledLink>
            <Flex style={{ justifyContent: 'space-between', width: '280px' }}>
              <Item>
                <img src={table} alt="table" style={{ marginRight: '6px' }} />
                <ItemText>{item?.copies || 1} {t('copies')}</ItemText>
              </Item>
              <Item>
                <img src={grayeye} alt="grayeye" style={{ marginRight: '6px' }} />
                <ItemText>{count || 0} {t('views')}</ItemText>
              </Item>
              <Item>
                <img src={heart} alt="heart" style={{ marginRight: '6px' }} />
                <ItemText>{item?.likes?.length} {t('favorite')}</ItemText>
              </Item>
            </Flex>
          </Box>
          <Flex style={{ marginTop: '24px', justifyContent: 'space-between' }}>
            {item?.price > 0 &&
              <WrapperLeft>
                <Flex style={{ flexDirection: 'column' }}>
                  <img src={`/assets/images/${item?.payment}.svg`} alt={item?.payment} style={{ width: '56px', height: '56px' }} />
                  <Typography variant='subtitle2' color='text.main' sx={{ mt: '2px', textAlign: 'center' }}>{item?.payment?.toUpperCase()}</Typography>
                </Flex>
                <Divider />
                <Flex style={{ flexDirection: 'column', alignItems: 'flex-start', paddingBottom: '4px' }}>
                  <Typography variant='subtitle2' color='text.primary'>{item?.duration > 0 ? t('Last Bid') : t('Buy Now')}</Typography>
                  <Typography variant='h5' color='text.main'>{item?.duration > 0 ? getHighestBid() : item?.price}</Typography>
                  <Typography variant='body2' color='text.primary'>${item?.priceUsd.toFixed(3)}</Typography>
                </Flex>
              </WrapperLeft>
            }
            {
              item?.duration > 0 &&
              <WrapperRight>
                <Typography variant='caption' color='text.main' sx={{ width: '100%' }}>{t('Time Left')}</Typography>
                <Typography variant='h6' color='primary.main' sx={{ width: '100%' }}>
                  {getDateFormat(onDuration(), 1)}
                </Typography>
                <Typography variant='body2' color='text.main' sx={{ width: '100%' }}>{item?.updatedAt}</Typography>
              </WrapperRight>
            }
          </Flex>
          <Flex>
            {item?.duration > 0 ?
              <>
                {item?.owner === account ?
                  <>
                    <Button variant="contained"
                      sx={{ minWidth: 'calc(43%)' }}
                      onClick={handleAcceptBid}
                      disabled={item?.bids?.length <= 0}
                    >
                      {t('Accept bid')}</Button>
                    <Button variant="contained"
                      sx={{ ml: '8px', minWidth: 'calc(43%)' }}
                      onClick={handleCancelAuction}
                    >
                      {t('Cancel auction')}</Button>
                  </> :
                  <Button variant="contained"
                    sx={{ minWidth: 'calc(100% - 80px)' }}
                    onClick={() => handleModal('bid')}
                    disabled={item?.owner === account || hasBid || activityRequested || onDuration() <= 0} >
                    {hasBid || activityRequested ? t('Sent a bid') : onDuration() > 0 ? t('Place a bid') : t('Auction ended')}
                  </Button>
                }
              </>
              :
              item?.price > 0 ? <>
                {item?.owner !== account &&
                  <Button variant="contained"
                    sx={{ minWidth: 'calc(43%)' }}
                    onClick={handleBuy}>
                    {t('Buy now')}</Button>
                }
                {item?.owner === account ?
                  <>
                    <Button variant="contained"
                      sx={{ ml: '8px', minWidth: 'calc(43%)' }}
                      onClick={handleAcceptOffer}
                      disabled={item?.offers?.length <= 0}
                    >
                      {t('Accept offer')}</Button>
                    <Button variant="contained"
                      sx={{ ml: '8px', minWidth: 'calc(43%)' }}
                      onClick={handleCancelSale}
                    >
                      {t('Cancel sale')}</Button>
                  </> :
                  <Button variant="contained"
                    sx={{ ml: '8px', minWidth: 'calc(43%)' }}
                    onClick={() => handleModal('offer')}
                    disabled={item?.owner === account || hasOffer} >
                    {hasOffer || activityRequested ? t('Sent an offer') : t('Make an offer')}
                  </Button>
                }
              </> :
                item?.owner === account ? <StyledLink to={`/edit/${item?.contract}/${item?.tokenId}`} color='black'>
                  <Button variant="contained" sx={{ minWidth: '100%' }}>{t('Put on marketplace')}</Button>
                </StyledLink> : <></>
            }
            <Button
              onClick={onWatch}
              variant={watch ? "contained" : "outlined"}
              sx={{ ml: '8px', maxWidth: '63px !important', background: watch ? "#240034" : "primary" }}
              startIcon={<img src={`/assets/images/watch.svg`} alt="something" />} />
          </Flex>
        </Grid>
      </Grid >
    </>
  )
}

export default TopHead