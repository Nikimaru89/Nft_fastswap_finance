import React from "react"
import { Grid, Typography } from "@mui/material"
// import { NftCard } from "../../components/Card"
import card from "../../constants/json/card.json"
import styled from 'styled-components'
import { useTranslation } from "../../contexts/Localization"

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Image = styled.img`
  max-width:316px;
  width:100%;
  height:236px;
  border-radius:8px;
  margin:0 auto;
`
const TextArea = styled.div`
  max-width:316px;
  width:100%;
  height:236px;
  text-align:left;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Introduction = () => {
  const { t } = useTranslation()
  const cardgroup = card
  return (
    <Wrapper>
      <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={1} sm={1} md={1} sx={{ display: 'flex' }}>
          <TextArea>
            <Typography variant="h2" color="text.main" mb="16px">
              {t('Explore')}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {t("Buy the finest NFT’s on Binance Smart Chain")}
            </Typography>
          </TextArea>
        </Grid>
        {cardgroup.map((nft, index) => {
          return (
            <Grid item xs={1} sm={1} md={1} sx={{ display: 'flex' }} key={index}>
              <Image src={nft.image} />
            </Grid>
          )
        })}
      </Grid>
    </Wrapper>
  )
}

export default Introduction