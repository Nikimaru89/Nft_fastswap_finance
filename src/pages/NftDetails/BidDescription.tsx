import React from 'react';
import styled from 'styled-components'
import { Typography, Button, Divider } from '@mui/material'
import Input from '../components/Input'
import { useTranslation } from '../../contexts/Localization';

const Content = styled.div`
  padding:20px;
`
const Bid = () => {
  const { t } = useTranslation()
  return (
    <>
      <Divider />
      <Content>
        <Typography variant="h6" sx={{ textAlign: 'left', marginBottom: '10px' }}>{t('Price')}</Typography>
        <Input placeholder="Price" />
        <Typography variant="h6" sx={{ textAlign: 'right' }}>{t('Available')}: 0.0000WETH</Typography>
        <Typography variant="h6" sx={{ marginTop: '40px', marginBottom: '20px' }}>
          {t("By checking this box,I agree to OpenSea's")}
          <a href="#" style={{ color: 'blue', textDecoration: 'none' }}> {t('Terms of Service')}</a>
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />
        <Button variant="contained" sx={{ textTransform: 'capitalize !important' }}>{t('Place a Bid')}</Button>
      </Content>
    </>
  )
}
export default Bid;