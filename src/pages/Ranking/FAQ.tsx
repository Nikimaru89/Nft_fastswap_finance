import { Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from '../../contexts/Localization'
import Accordion from './Accordion'

const Wrapper = styled.div`
  width: 100%;
  height: 110vh;
  background: background.main;
  padding: 88px 0px;
  margin-top: 86px;
`

const FAQ = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Typography variant="h4" color="text.primary" textAlign="center">{t('FAQ')}</Typography>
      <Accordion />
    </Wrapper>
  )
}
export default FAQ;