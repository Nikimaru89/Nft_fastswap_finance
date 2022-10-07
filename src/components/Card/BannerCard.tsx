import React from "react"
import style from "styled-components"
import { useWeb3React } from "@web3-react/core"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useTranslation } from "../../contexts/Localization"
import { styled } from "@mui/system"
import { Box, Button, ButtonGroup, IconButton, Typography, Skeleton } from '@mui/material'
import { contractAddress as contracts, chainId } from "../../constants"

interface CardProps {
  image?: string,
  avatar?: string,
  title?: string,
  creatorInfo?: {
    name: string,
    wallet: string
  },
  description?: string,
  outlined?: boolean,
  bids?: number,
  price?: number,
  times?: number,
  favorites?: number,
  addType?: string,
  socials?: { label: string, link: string }[],
  setting?: boolean,
  info?: any,
  joinedTime?: string,
  loading?: boolean
}

const StyledButton = styled(Button)`
  border-color: #CECECE;
  min-width: 120px;
  height: fit-content;
  text-transform: none;
  @media (max-width: 435px) {
    max-width: 30% !important;
    height: 85px;
  }
`
const StyledBox = styled(Box)`
  display:flex;
  flex-direction:column;
  max-width:370px;
  width:100%:
  margin-bottom:8px;
  @media(max-width:833px){
    max-width:1350px;
  }
`
const FixedButtonGroup = styled(ButtonGroup)`
  @media(max-width:833px){
    display:flex;
    justify-content:center;
  }
`

const StyledLink = style(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
  display: flex;
  position:relative;
`

const BannerCard = ({
  image,
  avatar,
  title = '',
  addType = '1',
  creatorInfo,
  description,
  outlined = true,
  socials,
  setting = false,
  info,
  loading
}: CardProps) => {
  const navigate = useNavigate()
  const contract = useLocation().pathname.split('/')[2]
  const { account } = useWeb3React()
  const { t } = useTranslation()

  const handleAdd = () => {
    if (addType !== '2') {
      navigate('/create', {
        state: {
          group: title
        }
      })
    } else {
      navigate('/add')
    }
  }

  return (
    <>
      {
        loading ?
          <Skeleton animation="wave" variant="rectangular" sx={{ maxWidth: '1342px', width: '100%', height: '283px', borderRadius: '8px' }} /> :
          <img src={image || '/assets/images/puma.png'} alt='badge' style={{ width: '100%', maxHeight: '288px', borderRadius: '8px', border: outlined ? '4px dashed #757B75' : 'none' }} />
      }
      <div style={{ width: '90%', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: '24px' }}>
          {
            loading ?
              <Skeleton animation="wave" variant="circular" sx={{ width: '80px', height: '80px', marginTop: '-45px' }} /> :
              <img src={avatar || '/assets/images/avatar7.svg'} alt='avatar' style={{ marginTop: '-45px', width: '80px', height: '80px', borderRadius: '64px', border: '4px dashed #757B75' }} />
          }
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '18px' }}>
            {socials?.map((social, index) => {
              return (
                social?.link !== "" &&
                <IconButton key={index}>
                  <img alt={`label${index}`}
                    src={`/assets/socials/${social?.label}.svg`}
                    style={{ marginLeft: '19px' }} />
                </IconButton>
              )
            })}
            {setting && <IconButton onClick={() => navigate('/setting')} style={{ marginLeft: '19px' }}>
              <img alt='setting' src='/assets/images/settings.svg' />
            </IconButton>}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <StyledBox>
            {title && <Typography variant='h4' color='secondary.main' sx={{ mb: '8px' }}>{title}</Typography>}
            <Box display='flex' mb='25px'>
              {!!creatorInfo && <StyledLink to={`/account/${creatorInfo.wallet}`} color='black'>
                <Typography variant='subtitle2' color='secondary.main'>{t('Created by')}&nbsp;</Typography>
                <Typography variant='subtitle2' color='text.primary'>{creatorInfo.name}</Typography>
              </StyledLink>
              }
            </Box>
            <Typography variant='subtitle2' color='text.primary'>{description}</Typography>
          </StyledBox>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Typography variant="overline">Joined {joinedTime}</Typography> */}
            {info && <FixedButtonGroup variant="outlined" aria-label="outlined button group">
              <StyledButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 8px' }}>
                  <Typography variant='h6' color='text.main'>{info && info.length > 0 ? info[0].item : 0}</Typography>
                  <Typography variant='caption' color='secondary.main'>{t('Items')}</Typography>
                </Box>
              </StyledButton>
              <StyledButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 8px' }}>
                  <Typography variant='h6' color='text.main'>{info && info.length > 0 ? info[0].owner : 0}</Typography>
                  <Typography variant='caption' color='secondary.main'>{t('Owners')}</Typography>
                </Box>
              </StyledButton>
              <StyledButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 8px' }}>
                  <Typography variant='h6' color='text.main'>${info && info.length > 0 ? (info[0].floor).toFixed(2) : 0}</Typography>
                  <Typography variant='caption' color='secondary.main'>{t('Floor price')}</Typography>
                </Box>
              </StyledButton>
              <StyledButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 8px' }}>
                  <Typography variant='h6' color='text.main'>${info && info.length > 0 ? (info[0].volume).toFixed(2) : 0}</Typography>
                  <Typography variant='caption' color='secondary.main'>{t('Vol. traded')}</Typography>
                </Box>
              </StyledButton>
            </FixedButtonGroup>}
            <Box sx={{ display: 'flex', mt: '54px', justifyContent: 'flex-end' }}>
              {(contract === contracts.customNft[chainId] || contract === account) &&
                < Button variant='contained' onClick={handleAdd}>
                  +&nbsp;{addType !== '2' ? t('Create NFT') : t('Add Collection')}
                </Button>}
              {/* <Button variant='contained' sx={{ textTransform: 'none', ml: '8px' }}>
                <img src='assets/images/edit.svg' />
              </Button> */}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default BannerCard