import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../../../api'
import { Typography, Grid, Button } from '@mui/material'
import CollectionCard from '../../../components/Card/CollectionCard'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from '../../../contexts/Localization'

const Wrapper = styled.div`
  max-width:617px;
  width:100%;
  padding-bottom: 140px;
`

const Space = styled.div`
  margin-bottom: 40px;
`

const Offers = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [infos, setInfos] = useState([])
  const [finishedSends, setFinishedSends] = useState(0)
  const [isClicked, setIsClicked] = useState(false)

  const handleSave = () => {
    setIsClicked(true)
  }

  const fetchCollection = async () => {
    const { data } = await api.collection.getCollectionByCreator(account)
    setInfos([...data])
  }

  useEffect(() => {
    if (account) {
      fetchCollection()
    }
  }, [account])// eslint-disable-line

  useEffect(() => {
    if (finishedSends >= infos.length && isClicked)
      navigate(`/account/${account}`)
  }, [finishedSends, isClicked])// eslint-disable-line

  return (
    <Wrapper>
      <Space />
      <Typography variant="h6" color='text.main'>{t('Set a minimum offer for collections to ignore low offers.')}</Typography>
      <Space />
      <Typography variant="caption" sx={{ mb: '40px' }} color='text.main'>
        {t('You will not be notified on offers below your minimum amounts for items is that collection.')}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '495px' }}>
        {
          infos.map((info, index) => (
            <Grid item xs={1} md={1} sx={{ marginBottom: '24px', width: '100%' }} key={index}>
              <CollectionCard
                contract={info.contract}
                banner={info.background}
                avatar={info.thumbnail}
                title={info.name}
                mini={info.minimum}
                pays={info.payment}
                counts={finishedSends}
                setNum={setFinishedSends}
                events={isClicked}
                mobileWidthType="full"
              />
            </Grid>
          ))
        }
      </div>
      <Button variant="contained" style={{ maxWidth: '495px', width: '100%', marginTop: '81px' }} onClick={handleSave}>{t('Save')}</Button>
    </Wrapper>
  )
}
export default Offers;