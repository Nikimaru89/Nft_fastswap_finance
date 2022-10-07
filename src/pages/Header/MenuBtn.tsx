import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const MyBtn = styled(Button)`
  font-family: 'CircularStd';
  font-weight: 500 !important;
  font-size: 18px !important;
  line-height: 20px !important;
  text-align: center !important;
  padding:12px; 0px;
  margin:0px 28px;
  text-transform:capitalize !important;
`

const ClickedMyBtn = styled(MyBtn)`
  color: text.primary !important;
`

interface Props {
  text?: string,
  isclicked?: boolean
}
const MenuBtn = (props: Props) => {
  return (
    <>
      {props.isclicked ? <ClickedMyBtn color='secondary'>{props.text}</ClickedMyBtn> : <MyBtn color='secondary'>{props.text}</MyBtn>}
    </>
  )
}
export default MenuBtn;