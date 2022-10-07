import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../api'
import { Button, Typography } from '@mui/material'
import MySwitch from '../../components/Switch'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from '../../../contexts/Localization'

const Inner = styled.div`
  border: 1px solid #CECECE;
  border-radius: 16px;
  padding:63px;
  width:calc(100%-126px);
`
const Wrapper = styled.div`
  max-width:617px;
  width:100%;
  padding-bottom: 140px;
`

const Flex = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
`

const Space = styled.div`
  margin-bottom: 40px;
`

const infos = [
  {
    head: 'Item Sold',
    content: 'When someone purchased one of your items',
    disable: false
  },
  {
    head: 'Bid Activity',
    content: 'When someone bids on one of your items',
    disable: false
  },
  {
    head: 'Price Change',
    content: 'When an item you made an offer on changes in price',
    disable: false
  },
  {
    head: 'Auction Expiration',
    content: 'When a Dutch or English auction you created ends',
    disable: false
  },
  {
    head: 'Outbid',
    content: 'When an offer you placed is exceeded by another user',
    disable: false
  },
  {
    head: 'Referral Successful',
    content: 'When an item you referred is purchased',
    disable: true
  },
  {
    head: 'Owned Asset updates',
    content: 'When a significant update occurs for one of the items you have purchased on FastSwap',
    disable: true
  },
  {
    head: 'Successful Purchase',
    content: 'When you successfully buy an item',
    disable: false
  },
  {
    head: 'Fastswap newsletter',
    content: 'Occasional updates from the FastSwap team',
    disable: true
  },
  {
    head: 'Minimum Bid Treshold',
    content: 'Receive notifications only when you receive offers with a value greater than or equal to this amount of Currency.',
    disable: false
  },
]

interface NoticeInfoProps {
  itemSold: boolean,
  bidActivity: boolean,
  priceChange: boolean,
  auctionExpire: boolean,
  outbid: boolean,
  referralSuccess: boolean,
  ownedAssetUpdate: boolean,
  successPurchase: boolean,
  fastswapNewsletter: boolean,
  minimumBidTreshold: boolean
}

const Notification = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { account } = useWeb3React()
  const [noticeInfo, setNoticeInfo] = useState<NoticeInfoProps>({
    itemSold: false,
    bidActivity: false,
    priceChange: false,
    auctionExpire: false,
    outbid: false,
    referralSuccess: false,
    ownedAssetUpdate: false,
    successPurchase: false,
    fastswapNewsletter: false,
    minimumBidTreshold: false
  })

  const handleSave = async () => {
    await api.user.setNotice({ ...noticeInfo, address: account })
    navigate(`/account/${account}`)
  }

  const fetchNotice = async () => {
    const { data } = await api.user.getNotice(account)
    setNoticeInfo({ ...data })
  }

  useEffect(() => {
    fetchNotice()
  }, [account])// eslint-disable-line

  return (
    <Wrapper>
      <Space />
      <Typography variant="body1" color='text.main'>{t('Select which notifications you would like to receive for')} 0x2ce5...c081</Typography>
      <Space />
      <Inner>
        {
          infos.map((info, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <Flex>
                <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t(info.head)}</Typography>
                <MySwitch
                  value={noticeInfo[Object.keys(noticeInfo)[index]]}
                  setValue={e => {
                    const key = Object.keys(noticeInfo)[index]
                    setNoticeInfo({
                      ...noticeInfo, [key]: !noticeInfo[key]
                    })
                  }} />
              </Flex>
              <Typography variant='caption' color='text.main' sx={{ maxWidth: '418px', width: '100%', marginBottom: '10px' }}>{t(info.content)}</Typography>
            </div>
          ))
        }
      </Inner>
      <Button variant="contained" style={{ width: '100%', marginTop: '81px' }} onClick={handleSave}>{t('Save')}</Button>
    </Wrapper>
  )
}
export default Notification;