import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "../../contexts/Localization"
import { Typography } from "@mui/material"
import { NftCard } from "../Card"
import { Button } from "../../components"
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core"

const CardWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
`

const CardsView = (props: any) => {
  const navigate = useNavigate()
  const { account } = useWeb3React()
  const { t } = useTranslation()

  const onLoad = () => {
    if (props.limit < props.max)
      props.setLimit(props.limit + 12)
  }

  return (
    <>
      {props.drops.length > 0 ?
        <CardWrapper>
          {props.drops.map((nft, index) => {
            if (props.account || (!props.account && nft.price)) {
              return (
                <NftCard item={nft} account={props.account} key={index} />
              )
            }
            return (<div key={index}></div>)
          })}
        </CardWrapper> :
        <Typography variant='subtitle1' color='text.main' sx={{ textAlign: 'center', mt: '56px' }}>{t('There is nothing here.')}</Typography>
      }
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {
          props.drops.length > 0 ?
            props.max > props.limit ?
              <Button variant="contained" sx={{ margin: '64px auto 40px' }} onClick={onLoad}>{t('See more')}</Button> : <></> :
            <>
              {!!account && <Button variant="contained" onClick={() => navigate('/create')}>+&nbsp;{t('Create NFT')}</Button>}
            </>
        }
      </div>
    </>
  )
}

export default CardsView