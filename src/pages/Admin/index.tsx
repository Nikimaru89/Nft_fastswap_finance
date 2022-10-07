import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../api'
import { Button } from '../../components'
import { Box, Typography } from '@mui/material'
import Chart from '../../components/Chart'
import CollectionTable from './components/CollectionTable'
import NftTable from './components/NftTable'
import Input from '../components/Input'
import TypeBar from '../components/TypeBar'
import UserTable from './components/UserTable'
import { useTranslation } from '../../contexts/Localization'

const Wrapper = styled.div`
  max-width:1350px;
  width:95%;
  margin:0 auto;
  padding:50px 0px;
`

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 276px;
  height: 169px;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 17px 13px 20px 13px;
  margin-top: 10px;
`

const analyzeStatus = [
  {
    status: false,
    text: "Daily"
  },
  {
    status: false,
    text: "Weekly"
  },
  {
    status: false,
    text: "Monthly"
  },
  {
    status: false,
    text: "Yearly"
  }
]

const Card = ({ title, desc, label, url }) => {
  return (
    <CardWrap>
      <img src={url} style={{ width: '40px', height: '40px' }} alt='icon' />
      <Typography color='#566FFE' variant='h3'>{title}</Typography>
      <Box display='flex'>
        <Typography color='#748398' fontSize='35px'>{desc}&nbsp;</Typography>
        <Typography color='primary.main' fontSize='35px'>{label}</Typography>
      </Box>
    </CardWrap>
  )
}

const Admin = () => {
  const { t } = useTranslation()
  const [users, setUsers] = useState<any>([])
  const [datas, setDatas] = useState({ user: 0, nft: 0, collection: 0, volume: 0 })
  const [sales, setSales] = useState<any>()
  const [nfts, setNfts] = useState<any>([])
  const [nftFilt, setNftFilt] = useState('')
  const [userFilt, setUserFilt] = useState('')
  const [saleFilt, setSaleFilt] = useState('')
  const [daysFilt, setDaysFilt] = useState({ "Daily": false, "Weekly": false, "Monthly": false, "Yearly": false })
  const navigate = useNavigate()

  const fetchUserList = async () => {
    const { data } = await api.user.getAll()
    setUsers([...data])
  }

  const update = async () => {
    await fetchCustomNfts()
  }

  const fetchCustomNfts = async () => {
    const { data } = await api.nft.getCustomNfts()
    setNfts(data)
  }

  const fetchAnalytics = async () => {
    const { data } = await api.admin.getAnalytics()
    setDatas(data)
  }

  const fetchSale = async (period) => {
    const { data } = await api.admin.getSaleByPeriod(period)
    setSales(data)
  }

  useEffect(() => {
    fetchUserList()
    fetchAnalytics()
    fetchCustomNfts()
  }, [])

  useEffect(() => {
    const ind = Object.values(daysFilt).indexOf(true)
    fetchSale(Object.keys(daysFilt)[ind >= 0 ? ind : 0].toLowerCase())
  }, [daysFilt])

  return (
    <Wrapper>
      <Box display='flex' flexWrap='wrap' justifyContent='space-between' sx={{ mb: '70px' }}>
        <Card url='/assets/images/user.svg' title={datas.user} desc={t('Total')} label={t('Users')} />
        <Card url='/assets/images/nft.svg' title={datas.nft} desc={t('Total')} label={t('Nfts')} />
        <Card url='/assets/images/collection.svg' title={datas.collection} desc={t('Total')} label={t('Collections')} />
        <Card url='/assets/images/volume.svg' title={`$ ${(datas.volume).toFixed(2)}`} desc={t('Total')} label={t('Volume')} />
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' color='text.main' sx={{ mb: '16px' }}>{t('Nft Total Sales')}</Typography>
        <TypeBar noSwitch type="normal" liststatus={analyzeStatus} filter={daysFilt} setFilter={setDaysFilt} default="Daily" />
      </Box>
      <Chart info={sales} xaxisField='_id' yaxisField='price' height={400} />
      <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between' sx={{ mt: '40px', mb: '16px' }}>
        <Typography variant='h4' color='text.main'>{t('User List')}</Typography>
        <div style={{ width: '200px' }}>
          <Input placeholder={t('search')} value={userFilt} onChange={e => setUserFilt(e.target.value)} /></div>
      </Box>
      <UserTable acts={users.filter(res => res.name.includes(userFilt) || res.address.includes(userFilt))} />
      <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between' sx={{ mt: '40px', mb: '16px' }}>
        <Typography variant='h4' color='text.main' sx={{ mb: '16px' }}>{t('Collection List')}</Typography>
        <Box display='flex' alignItems='center'>
          <Button variant='contained' sx={{ maxWidth: '100px !important', mr: '10px' }} onClick={() => navigate('/add')}>+{t('Add')}</Button>
          <div style={{ width: '200px' }}>
            <Input placeholder={t('search')} value={saleFilt} onChange={e => setSaleFilt(e.target.value)} /></div>
        </Box>
      </Box>
      <CollectionTable filter={saleFilt} />
      <Box display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between' sx={{ mt: '40px', mb: '16px' }}>
        <Typography variant='h4' color='text.main'>{t('Custom Nft List')}</Typography>
        <div style={{ width: '200px' }}>
          <Input placeholder={t('search')} value={nftFilt} onChange={e => setNftFilt(e.target.value)} /></div>
      </Box>
      <NftTable acts={nfts.filter(res => res.name.includes(nftFilt))} update={update} />
    </Wrapper>
  )
}

export default Admin