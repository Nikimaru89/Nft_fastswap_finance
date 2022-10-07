import React, { useState } from 'react'
import CollectionTable from './components/CollectionTable'
import CreatorTable from './components/CreatorTable'
import SaleTable from './components/SaleTable'
import { Button } from '../../components'
import Input from '../components/Input'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import FAQ from './FAQ'
import { useTranslation } from '../../contexts/Localization'

const TableTypeBar = styled.div`
  max-width: 510px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 27px;
  flex-direction: row;
  @media(max-width: 506px){
    flex-direction: column;
  }
`

const Wrapper = styled.div`
  width:100%;
  background:none;
`

const Inner = styled.div`
  max-width:1350px;
  width:95%;
  margin:0 auto;
  padding:50px 0px;
`

const Ranking = () => {
  const { t } = useTranslation()
  const [isclick, SetClick] = useState<number>(1)
  const [filter, setFilter] = useState<string>()

  return (
    <Wrapper>
      <Inner>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant='h4' sx={{ color: 'secondary.main' }}>{t('Rankings')}</Typography>
          <div style={{ width: '200px' }}><Input placeholder='search' value={filter} onChange={e => setFilter(e.target.value)} /></div>
        </div>

        <TableTypeBar>
          <Button
            variant={isclick === 1 ? 'contained' : 'outlined'}
            onClick={() => { SetClick(1) }}
            sx={{ maxWidth: '165px !important' }}>{t('Top Collections')}</Button>
          <Button
            variant={isclick === 2 ? 'contained' : 'outlined'}
            onClick={() => { SetClick(2) }}
            sx={{ maxWidth: '165px !important' }}>{t('Top Sale')}</Button>
          <Button
            variant={isclick === 3 ? 'contained' : 'outlined'}
            onClick={() => { SetClick(3) }}
            sx={{ maxWidth: '165px !important' }}>{t('Top Creators')}</Button>
        </TableTypeBar>
        {isclick === 1 ? <CollectionTable filter={filter} /> : isclick === 2 ? <SaleTable filter={filter} /> : <CreatorTable filter={filter} />}
      </Inner>
      <FAQ />
    </Wrapper>
  )
}
export default Ranking;