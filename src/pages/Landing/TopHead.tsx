import React from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { Button, Grid, Typography, Box } from "@mui/material"
import { TopCard } from "../../components/Card"
import { useDispatch } from 'react-redux'
import { controlMenu } from "../../redux/action/faceAction"
import { checkNetwork } from "../../utils/checkNetwork"
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from "../../contexts/Localization"

const Container = styled.div<{ mwth: number }>`
  max-width: ${({ mwth }) => mwth}px;
  width: 100%;
  margin: 0 auto;
`

const StyledLink = styled(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
`

const StyledButton = styled(Button)`
  border-radius: 42px !important;
  max-width: 195px !important;
  width: 45% !important;
  text-transform: none !important;
  @media(max-width: 900px){
    width: 130px !important;
  }
`

const TopHead = () => {
  const { account, chainId } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navCreate = () => {
    if (checkNetwork(account, chainId, t)) {
      navigate('/create')
    }
  }

  return (
    <Container mwth={1364}>
      <Grid container spacing={2} columns={{ xs: 4, md: 8 }}>
        <Grid item xs={4} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Box sx={{ display: { xs: 'flex', md: 'block' }, alignItems: 'center', flexDirection: 'column' }}>
            <Typography
              variant="h2"
              color='text.main'
              sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              {t('Collect Digital Art')}
            </Typography>

            <Typography
              variant="h4"
              maxWidth='500px'
              color='text.primary'
              margin='25px 0px 40px'
              sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              {t('Discover, Buy and Sell Nfts on Binance Smart Chain')}
            </Typography>
            <Box sx={{ width: { xs: 'fit-content', md: '100%' } }}>
              <StyledLink color='white' to='/explore'>
                <StyledButton variant='contained' sx={{ mr: '21px' }} onClick={() => { dispatch(controlMenu({ menuValue: 2 })) }}>
                  {t('Explore')}
                </StyledButton>
              </StyledLink>

              <StyledButton variant='outlined' onClick={navCreate}>{t('Create')}</StyledButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} md={4}>
          <TopCard />
        </Grid>
      </Grid>
    </Container >
  )
}

export default TopHead