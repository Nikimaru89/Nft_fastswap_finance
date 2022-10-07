import React, { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { useDispatch } from 'react-redux'
import { useTranslation } from "../../contexts/Localization"
import style from "styled-components"
import { Button } from "../../components"
import { Link } from "react-router-dom"
import { Typography, IconButton } from "@mui/material"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import api from "../../api"
import { controlMenu } from '../../redux/action/faceAction'

const Flex = style.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const CardWrapper = style.div`
  margin:8px;
  max-width: 325px;
  padding: 13px;
  position: relative;
  width: 100%;
  background: #FCFCFC;
  border-radius: 22px;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 900px) {
    margin: 30px auto 0px;
  }
`

const Divider = style.div`
  width: 100%;
  height: 1px;
  margin: 14px 0px;
  background: #E2EEF1;
`

const ConfirmButton = style(Button)`
  width: auto !important;
  height: auto !important;
  font-size: 14px !important;
  padding: 2px 8px !important;
  border-radius: 45px !important;
`
const FavIconArea = style.div`
  background:white;
  padding:2px 8px;
  display:flex;
  align-items:center;
  border-radius:42px;
  width: 54px;
  height: 30px;
  position: absolute;
  top: 65px;
  right: 25px;
  z-index: 5;
`
const StyledLink = style(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
  position:relative;
`

const avatarStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '3px solid white'
}

const NftCard = (props: any) => {
  let { contract, tokenId, name, image, price, payment, duration, likes, copies, owner, user_info } = props.item
  const { t } = useTranslation()
  const { avatar } = props.item?.user_info ? props.item?.user_info[0] : { avatar: '' }
  const { account } = useWeb3React()
  const [like, setLike] = useState(likes?.includes(account))
  const [count, setCount] = useState(likes?.length || 0)
  const dispatch = useDispatch()

  const onLike = async () => {
    if (account) {
      if (like === true) {
        await api.nft.removeFeatures(contract, tokenId, account, 'likes')
        setCount(count - 1)
      }
      else {
        await api.nft.addFeatures(contract, tokenId, account, 'likes')
        setCount(count + 1)
      }
      setLike(!like)
    }
  }

  useEffect(() => {
    setCount(likes?.length)
    setLike(likes?.includes(account))
  }, [likes, account])

  return (
    <CardWrapper>
      <StyledLink to={`/account/${user_info && user_info[0].address}`} color='black'>
        <Flex onClick={() => dispatch(controlMenu({ menuValue: -1 }))}>
          <img src={avatar || '/assets/images/avatar7.svg'} alt={t('collection')} style={avatarStyle} />
          <Typography variant='body2' sx={{ margin: '0px 4px' }}>{user_info ? user_info[0].name : 'unname'}</Typography>
        </Flex>
      </StyledLink>
      <FavIconArea>
        <IconButton onClick={onLike}>
          {
            like ? <FavoriteOutlinedIcon sx={{ color: '#FF6871' }} /> : <FavoriteBorderOutlinedIcon />
          }
        </IconButton>
        <Typography variant="body2">{count}</Typography>
      </FavIconArea>
      <StyledLink to={`/assets/${contract}/${tokenId}`} color='black'>
        <img src={image} alt='nft' style={{ width: '100%', borderRadius: '22px', height: '280px', marginTop: '6px' }} />
        <Typography variant='h5' sx={{ mt: '6px', mb: '16px', color: "secondary.main" }} textAlign="left">{name}</Typography>
        <Flex style={{ justifyContent: 'space-between' }}>
          <Typography variant='body2' sx={{ color: '#748398' }}>{copies || 1} {t('in stock')}</Typography>
          <Flex>
            <Typography variant='body2' sx={{ color: '#748398' }}>{t('Price')}:&nbsp;</Typography>
            <Typography variant='body2' sx={{ color: '#5fc399' }}>{price} {payment || 'BNB'}</Typography>
          </Flex>
        </Flex>
      </StyledLink>
      <Divider />
      <Flex style={{ justifyContent: 'space-between' }}>
        <Flex>
          <img src='/assets/images/view.svg' alt='view' />
          <StyledLink to={`/assets/${contract}/${tokenId}`} color='black'>
            <Typography variant='body2' sx={{ color: '#748398', fontSize: 16, ml: '6px' }}>{t('View History')}</Typography>
          </StyledLink>
        </Flex>
        {price > 0 ?
          <StyledLink to={`/assets/${contract}/${tokenId}`} color='black'>
            {duration > 0 ?
              <ConfirmButton variant='contained' sx={{ mr: '6px' }}>{t('Place Bid')}</ConfirmButton> :
              <Flex>
                <ConfirmButton variant='contained' sx={{ mr: '6px' }}>{t('Buy Now')}</ConfirmButton>
                <ConfirmButton variant='contained'>{t('Make Offer')}</ConfirmButton>
              </Flex>}
          </StyledLink> :

          owner === account ? <StyledLink to={`/edit/${contract}/${tokenId}`} color='black'>
            <ConfirmButton variant='contained' sx={{ mr: '6px' }}>{t('Put on marketplace')}</ConfirmButton>
          </StyledLink> : <></>
        }
      </Flex>
    </CardWrapper>
  )
}

export default NftCard