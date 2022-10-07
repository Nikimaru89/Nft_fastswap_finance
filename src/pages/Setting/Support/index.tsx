import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Typography, Button } from '@mui/material'
import down from '../../assets2/down.png'
import up from '../../assets2/up.png'
import check from '../../assets2/check.svg'
import emptycheck from '../../assets2/emptycheck.png'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { theme } from '../../../theme'
import { useTranslation } from '../../../contexts/Localization'

const Wrapper = styled.div`
  max-width:617px;
  width:100%;
  padding-bottom: 140px;
`

const Flex = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
`
const Colortext = styled.span`
  color: #566FFE;
`

const Space = styled.div`
  margin-bottom: 40px;
`

const UpArea = styled.div`
  width:calc(100%-33px);
  padding:14px 13px 14px 24px;
  border: 1px solid #CECECE;
  display:flex;
  justify-content:space-between;
  cursor:pointer;
  align-items:center;
  ${(props: { mode?: any }) => {
    switch (props.mode) {
      case "clicked":
        return css`
          border-top-left-radius:8px;
          border-top-right-radius:8px;
        `;
      default:
        return css`
          border-radius:8px;
        `;
    }
  }}
`
const DownArea = styled.div`
  width:calc(100%-2px);
  border: 1px solid #CECECE;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  ${(props: { mode?: any }) => {
    switch (props.mode) {
      case "clicked":
        return css`
          display:block;
        `;
      default:
        return css`
          display:none;
        `;
    }
  }}
}}
`
const Icon = styled.img`
  width:9px;
  height:8px;
`
const BaseText = styled.div`
  font-family: 'CircularStd';
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  color: #757B75;
`
const MainContentLine = styled.div`
  width:calc(100%-64px);
  padding: 16px 30px;
  display: flex;
  justify-content: left;
  cursor:pointer;
  &:hover{
    background:#F2F2F2;
  }
`
const listgroup = [
  "I have unknown transactions in my account",
  "I have everything but believe my account is compromised"
]
const CheckIcon = styled.img`
  width:20px;
  height:20px;
  cursor:pointer;
`
const Support = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [isclick, SetIsClick] = useState<boolean>(false)
  const [text, SetText] = useState<string>("Describe your issue");
  const [ischeck, SetIsCheck] = useState<boolean>(false);

  const handleConfirm = () => {
    SetIsClick(!isclick)
  }

  const handleSave = () => {
    navigate(`/account/${account}`)
  }
  return (
    <Wrapper>
      <Space />
      <Typography variant="body1" color='text.main'>{t('If you need help related to your account, we can help you.')}</Typography>
      <Space />
      <Typography variant="h6" color='text.main'>{t('General help')}</Typography>
      <Typography variant="body1" color='text.main'>{t('Visit our')} <Colortext>{t('help center')}</Colortext> {t('to learn how to get started with buying, selling, and creating.')}</Typography>
      <Space />
      <Typography variant="h6" color='text.main'>{t('Contact FastSwap Support')}</Typography>
      <Typography variant="body1" color='text.main'>{t("Can't find the answers you’re looking for?")}<br />{t('You can')} <Colortext>{t('submit a request')}</Colortext> {t('here')}.</Typography>
      <Space />
      <Typography variant="h6" color='text.main'>{t('Help with a compromised account')}</Typography>
      <Typography variant="body1" color='text.main'>
        {t('If you believe your account has been compromised, let us know and we can lock your account. This will disable items in your wallet from being bought, sold, or transferred using FastSwap.')} <br />
      </Typography>
      <Space />
      <>
        <UpArea onClick={handleConfirm} mode={isclick ? 'clicked' : 'notclicked'}>
          <BaseText>{text}</BaseText>
          {isclick ? <Icon src={up} /> : <Icon src={down} />}
        </UpArea>
        <DownArea mode={isclick ? 'clicked' : 'notclicked'}>
          {listgroup.map((list, index) => (
            <MainContentLine key={index} onClick={() => { SetText(list); SetIsClick(false) }}>
              <BaseText>{list}</BaseText>
            </MainContentLine>
          ))}
          <MainContentLine style={{ color: theme.palette.text.primary }}>Other</MainContentLine>
        </DownArea>
      </>
      {text !== "Describe your issue"
        ?
        <Flex style={{ marginTop: '34px' }}>
          <CheckIcon src={ischeck ? check : emptycheck} onClick={() => SetIsCheck(!ischeck)} />
          <Typography variant="body1" color='text.main'>
            {t("I understand I must provide a sworn statement certified by a")}<br /> {t("notary public to unlock my account.")}
          </Typography>
        </Flex>
        :
        <></>
      }

      {
        ischeck ?
          <Button variant="contained" sx={{ width: '100%', marginTop: '34px', background: '#F16868' }} onClick={handleSave}>
            {t("Lock Account")}</Button> :
          <Button variant="contained" sx={{ width: '100%', marginTop: '34px', background: '#CECECE' }} disabled>
            {t("Lock Account")}</Button>
      }
    </Wrapper >
  )
}
export default Support;