import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Btn = styled.div`
  position: static;
  width: 299px;
  height:116px;
  padding:48px 0px;
  border: 1px solid #CECECE;
  box-sizing: border-box;
  border-radius: 16px;
  text-align:center;
  cursor:pointer;
`
const ClickedBtn = styled.div`
  position: static;
  width: 299px;
  height:116px;
  padding:48px 0px;
  border: 3px solid #237745;
  box-sizing: border-box;
  border-radius: 16px;
  text-align:center;
`
const BtnText = styled.span`
 font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color:#757B75;
  text-align:center;
`
const ClickedBtnText = styled.span`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: #131413;
`
const Wrapper = styled.div`
  display:block;
   @media(max-width:605px) {
    margin:0 auto;
  }
`
interface Props {
  transactionBtnText?: string
  transactionText?: string
  isclicked?: boolean
}
const TransactionBtn = (props: Props) => {
  return (
    <Wrapper>
      {props.isclicked ?
        <ClickedBtn>
          <ClickedBtnText>{props.transactionBtnText}</ClickedBtnText>
        </ClickedBtn> :
        <Btn>
          <BtnText>{props.transactionBtnText}</BtnText>
        </Btn>
      }
      <Typography variant='caption' color='text.main' sx={{ textAlign: 'center', margin: '16px 0px' }}>
        {props.transactionText}
      </Typography>
    </Wrapper>
  )
}
export default TransactionBtn;