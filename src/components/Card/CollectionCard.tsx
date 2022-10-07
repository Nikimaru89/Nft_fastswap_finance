import React, { useEffect, useState } from "react"
import { useTranslation } from "../../contexts/Localization"
import styled from "styled-components"
import { Typography, MenuItem, FormControl, Select, Box } from '@mui/material'
import DUKE from '../../pages/assets2/Duke.png'
import BNB from '../../pages/assets2/Bnb.png'
import FAST from '../../pages/assets2/Fast.png'
import api from "../../api"

interface CollectionCardProps {
  contract?: string,
  banner: string,
  avatar: string,
  title?: string,
  noPrice?: boolean,
  mini?: number,
  pays?: string,
  counts?: number,
  setNum?: (number) => void,
  events?: boolean,
  mobileWidthType?: string
}

const CardWrapper = styled(Box)`
  width: 250px;
  height: 190px;
  background: #FCFCFC;
  border: 1px solid #CECECE;
  border-radius: 8px;
  margin: 0 auto;
`

const AvatarWrapper = styled.div`
  width: 60px;
  height: 60px;
  padding: 2px;
  background: grey;
  border: 4px solid #fff;
  border-radius: 8px;
  margin: -40px auto 0px;
  position: relative;
  z-index: 2;
`

const Tokeninfo = [
  {
    symbol: DUKE,
    name: "DUKE"
  },
  {
    symbol: FAST,
    name: "FAST"
  },
  {
    symbol: BNB,
    name: "BNB"
  }
]

const MyForm = styled(FormControl)`
  .MuiOutlinedInput-root {
    height: 42px !important;
    border-top-left-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
}
`

const avatarStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '8px',
  marginLeft: '1px',
  marginTop: '1px'
}

const CollectionCard = ({ contract, banner, avatar, title, noPrice = false, mini, pays, counts, setNum, events, mobileWidthType }: CollectionCardProps) => {

  const { t } = useTranslation()
  const [minimum, setMinimum] = useState(mini || 0)
  const [payment, setPayment] = useState(pays || 'BNB')

  const sendPayment = async () => {
    await api.collection.setPayment({ contract, name: title, minimum, payment })
    setNum(counts + 1)
  }

  useEffect(() => {
    if (events === true) {
      sendPayment()
    }
  }, [events])// eslint-disable-line

  return (
    <CardWrapper>
      <img src={banner || '/assets/images/puma.png'} alt={t('collection')} style={{ width: '100%', height: '120px', borderRadius: '8px 8px 0px 0px', zIndex: 0 }} />
      <div style={{ borderRadius: '0px 0px 24px 24px' }}>
        <AvatarWrapper>
          <img src={avatar || '/assets/images/avatar7.svg'} alt={t('collection')} style={avatarStyle} />
        </AvatarWrapper>
        <Typography variant='subtitle2' sx={{ textAlign: 'center', mb: '10px' }}>{title?.slice(0, title.length > 20 ? 20 : title.length)}</Typography>
        {!noPrice && <div style={{ textAlign: 'center', padding: '0px 40px 16px 40px' }}>
          <Typography variant="caption">{t('Minimum Price')}</Typography><br />
          <input className="w3-input w3-border w3-animate-input" type="text"
            value={minimum}
            onChange={e => setMinimum(Number(e.target.value))}
            style={{
              width: '96%',
              height: '40px',
              border: '1px solid #CECECE',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          />
          <MyForm variant="outlined" sx={{ width: '100%' }}>
            <Select
              value={payment}
              onChange={e => setPayment(e.target.value)}
              displayEmpty
            >
              {
                Tokeninfo.map((token, index) => (
                  <MenuItem value={token.name} key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 20px' }}>
                      <div style={{ alignItems: 'center', display: 'flex', marginRight: '20px', width: '70px', height: '15px', justifyContent: 'space-between' }}>
                        <img src={token.symbol} alt="token" />
                        <Typography variant='subtitle2'>{token.name}</Typography>
                      </div>
                    </div>
                  </MenuItem>
                ))
              }
            </Select>
          </MyForm>
        </div>}
      </div>
    </CardWrapper>
  )
}

export default CollectionCard