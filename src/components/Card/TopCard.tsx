import useMounted from '../../hooks/useMounted'
import { useTranslation } from '../../contexts/Localization'
import { Typography, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../api'

const CardWrapper = styled.div`
  max-width: 550px;
  width: 100%;
  margin-left: auto;
  border-radius: 24px;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 10px 0px;
  @media (max-width: 900px) {
    margin: 30px auto 0px;
  }
`

const StyledLink = styled(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
`

const TopCard = () => {
  const [drop, setDrop] = useState({ contract: "", tokenId: 0, image: "", title: "", avatar: "", description: "" })
  const [loading, SetLoading] = useState<boolean>(true)
  const mounted = useMounted()
  const { t } = useTranslation()

  const fetchNFT = async () => {
    const { data } = await api.nft.getTopNFT()
    if (data.length > 0) {
      if (!!data[0].owner) {
        const res = await api.user.getUser(data[0].owner)
        setDrop({
          contract: data[0].contract,
          tokenId: data[0].tokenId,
          image: data[0].image,
          title: data[0].name,
          avatar: res.data.avatar || '/assets/images/avatar7.svg',
          description: data[0].description
        })
      }
    }
    SetLoading(false)
  }

  useEffect(() => {
    if (mounted) {
      fetchNFT()
    }
  }, [mounted])

  return (
    <>
      {
        drop.image ?
          <StyledLink to={`/assets/${drop.contract}/${drop.tokenId}`} color='black'>
            <CardWrapper style={{ background: loading ? 'none' : '#EEEEEE' }}>
              {
                loading ?
                  <Skeleton variant="rectangular" width='550px' height='500px' style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }} /> :
                  <img src={drop.image || '/assets/images/avatar7.svg'} alt='nft' style={{ width: 'calc(100%)', maxHeight: '500px', borderRadius: '24px 24px 0px 0px' }} />
              }
              <div style={{ borderRadius: '0px 0px 24px 24px', padding: '15px 40px', background: 'white' }}>
                {
                  loading ?
                    <>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </> :
                    <>
                      <Box display='flex' flexWrap='wrap'>
                        <img src={drop.avatar || '/assets/images/avatar7.svg'} alt='user' style={{ borderRadius: '24px', width: '50px', marginRight: '15px' }} />
                        <div>
                          {
                            drop.tokenId ? <>
                              <Typography variant='h5'>{drop.title}</Typography>
                              <Typography variant='caption'>{drop.description}</Typography>
                            </> :
                              <Typography variant='h5' sx={{ marginTop: '8px' }}>{t('no nfts yet')}</Typography>
                          }
                        </div>
                      </Box>
                    </>
                }
              </div>
            </CardWrapper >
          </StyledLink> :
          <CardWrapper style={{ background: loading ? 'none' : '#EEEEEE' }}>
            {
              loading ?
                <Skeleton variant="rectangular" width='550px' height='500px' style={{ borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }} /> :
                <img src={drop.image || '/assets/images/avatar7.svg'} alt='nft' style={{ width: 'calc(100%)', maxHeight: '500px', borderRadius: '24px 24px 0px 0px' }} />
            }
            <div style={{ borderRadius: '0px 0px 24px 24px', padding: '15px 40px', background: 'white' }}>
              {
                loading ?
                  <>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </> :
                  <>
                    <Box display='flex' flexWrap='wrap'>
                      <img src={drop.avatar || '/assets/images/avatar7.svg'} alt='user' style={{ borderRadius: '24px', width: '50px', marginRight: '15px' }} />
                      <div>
                        {
                          drop.tokenId ? <>
                            <Typography variant='h5'>{drop.title}</Typography>
                            <Typography variant='caption'>{drop.description}</Typography>
                          </> :
                            <Typography variant='h5' sx={{ marginTop: '8px' }}>{t('no nfts yet')}</Typography>
                        }
                      </div>
                    </Box>
                  </>
              }
            </div>
          </CardWrapper >
      }
    </>
  )
}

export default TopCard