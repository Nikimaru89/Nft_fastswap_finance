import React from 'react'
import { useTranslation } from '../../contexts/Localization'
import styled from 'styled-components'
import { Accordion } from '../../components'
import Activity from '../Activity'
import Typography from '@mui/material/Typography'
import Chart from '../../components/Chart'

const Side = styled.div`
  max-width:48%;
  width:100%;
  text-align: left;
  @media(max-width:1150px){
    max-width:1350px;
  }
`
const Wrapper = styled.div`
  width:100%;
  display:block;
`

const Inner = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  flex-direction:row;
  @media(max-width:1150px){
    flex-direction:column;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const Space = styled.div`
  width: 100%;
  height: 16px;
  background: transparent;
`

const TokenDetail = ({ item }) => {
  const { t } = useTranslation()
  const filterAddress = (address) => {
    return address ? address.slice(0, 5) + '...' + address.slice(38, 42) : ""
  }

  return (
    <Wrapper>
      <Flex>
        <Typography variant='body2' color='black'>{t('Contract Address')}</Typography>
        <Typography variant='body2' color='black'>{filterAddress(item?.contract)}</Typography>
      </Flex>
      <Space />
      <Flex>
        <Typography variant='body2' color='black'>{t('Token ID')}</Typography>
        <Typography variant='body2' color='black'>{item?.tokenId}</Typography>
      </Flex>
      <Space />
      <Flex>
        <Typography variant='body2' color='black'>{t('Token Standard')}</Typography>
        <Typography variant='body2' color='black'>ERC-721</Typography>
      </Flex>
      <Space />
      <Flex>
        <Typography variant='body2' color='black'>{t('Blockchain')}</Typography>
        <Typography variant='body2' color='black'>{t('Binance')}</Typography>
      </Flex>
    </Wrapper>
  )
}

const NftInfos = ({ item }) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Inner>
        <Side>
          <Accordion title={t('Description')}
            description={
              <Typography variant='body2' color='black'>{item?.description}</Typography>
            } />
          <Accordion title={t('About creator')}
            description={
              <Typography variant='body2' color='black'>{item?.user_info[0].description || 'none'}</Typography>
            } />
          <Accordion title={t('Details')}
            description={
              <TokenDetail item={item} />
            } />
        </Side>
        <Side>
          <Accordion title={t('Price History')}
            description={
              item?.chart.length > 0 ? <Chart info={item?.chart} xaxisField='createdAt' yaxisField='priceUsd' /> :
                <Typography color='black'>{t('No price history yet')}</Typography>
            }
            expanded={true}
          />
        </Side>
      </Inner>
      <Accordion title={t('Items activity')}
        description={
          <Activity noTitle actType='nfts' address={item?.contract} tokenId={item?.tokenId} type="small" />
        } />
    </Wrapper>
  )
}

export default NftInfos