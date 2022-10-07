import React, { useEffect, useState } from 'react'
import api from '../../api'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import ActivityTable from './ActivityTable'
import Input from '../components/Input'
import TypeBar from '../components/TypeBar'
import useMounted from '../../hooks/useMounted'
import { useTranslation } from '../../contexts/Localization'

const Wrapper = styled.div<{ noTitle: boolean }>`
  width:100%;
  background:none;
  padding: ${({ noTitle }) => noTitle ? '0px' : '50px 0px'};
`

const Inner = styled.div`
  max-width:1350px;
  width:95%;
  margin:0 auto;
`

const liststatus = [
  {
    status: false,
    icon: '/assets/images/mint.png',
    text: "Minted"
  },
  {
    status: false,
    icon: '/assets/images/list.png',
    text: "Listed"
  },
  {
    status: false,
    icon: '/assets/images/bid.png',
    text: "Bid"
  },
  {
    status: false,
    icon: '/assets/images/sale.png',
    text: "Sale"
  },
  {
    status: false,
    icon: '/assets/images/transfer.png',
    text: "Transfer"
  },
]

interface ActivityInterfaceProps {
  noTitle?: boolean,
  actType?: string,
  address?: string,
  tokenId?: number,
  data?: any,
  type?: string
}

const Activity = ({ noTitle = false, actType = "all", address = "", tokenId = 0, data, type = "big" }: ActivityInterfaceProps) => {
  const { t } = useTranslation()
  const mounted = useMounted()
  const [acts, setActs] = useState([])
  const [filter, setFilter] = useState({ Minted: false, Listed: false, Bid: false, Sale: false, Transfer: false })
  const [filt, setFilt] = useState("")

  const fetchActivity = async () => {
    let res = []
    if (data) {
      res = data
    } else {
      switch (actType) {
        case "all":
          res = (await api.activity.getActivities()).data
          break
        case "owners":
          if (address)
            res = (await api.activity.getActivityByOwner(address)).data
          break
        case "nfts":
          if (address && tokenId)
            res = (await api.activity.getActivityByNfts(address, tokenId)).data
          break
      }
    }

    if (res.length > 0) {
      Object.keys(filter).map((key) => {
        if (filter[key] === true)
          res = res.filter((item) => item.event === key)
        return res
      })
    }
    setActs([...res])
  }

  useEffect(() => {
    if (mounted) {
      fetchActivity()
    }
  }, [filter, address]) // eslint-disable-line

  return (
    <Wrapper noTitle={noTitle}>
      <Inner>
        {!noTitle && <>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant='h4' sx={{ color: 'secondary.main' }}>{t('Activities')}</Typography>
            <div style={{ width: '200px' }}><Input placeholder={t('search')} value={filt} onChange={e => setFilt(e.target.value)} /></div>
          </div>
        </>}
        <TypeBar liststatus={liststatus} filter={filter} setFilter={setFilter} type="full" />
        <ActivityTable acts={[...acts.filter(it => it.name.includes(filt) || it.group.includes(filt) || it.user_info[0].name.includes(filt))]} type={type} />
      </Inner>
    </Wrapper>
  )
}

export default Activity;