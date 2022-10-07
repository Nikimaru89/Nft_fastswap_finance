import styled, { css } from 'styled-components'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import down from '../assets2/down.png'
import up from '../assets2/up.png'
import { useTranslation } from '../../contexts/Localization'

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
font - family: 'CircularStd';
font - weight: 500;
font - size: 12px;
line - height: 12px;
text - align: center;
color: #757B75;
`
const MainContentLine = styled.div`
  width:calc(100%-64px);
  padding: 16px 30px;
  display: flex;
  justify - content: left;
  cursor:pointer;
  &:hover{
    background:#F2F2F2;
  }
`
const Divider = styled.div`
border: 1px solid #CECECE;
`
const CreateNew = styled(MainContentLine)`
border - bottom - left - radius: 8px;
border - bottom - right - radius: 8px;
cursor: pointer;
`

const Select = (props: any) => {
  const { t } = useTranslation()
  const [isclick, SetIsClick] = useState<boolean>(false)
  const navigate = useNavigate()

  const handle = () => {
    if (props.disabled) SetIsClick(false)
    else SetIsClick(!isclick)
  }

  const contenthandle = (index: number) => {
    props.setValue(index)
    SetIsClick(false);
  }

  const createCollection = () => {
    navigate('/add')
  }

  return (
    <>
      <UpArea onClick={handle} mode={isclick ? 'clicked' : 'notclicked'}>
        <BaseText>{props?.maininfos[props.value]}</BaseText>
        {isclick ? <Icon src={up} /> : <Icon src={down} />}
      </UpArea>
      <DownArea mode={isclick ? 'clicked' : 'notclicked'}>
        {
          props.maininfos.map((info, index) => {
            if (index < props?.maininfos.length - 1) return (<MainContentLine key={index} onClick={() => contenthandle(index)}>
              <BaseText>{info}</BaseText>
            </MainContentLine>)
            return (<div key={index}></div>)
          })
        }
        <Divider />
        <MainContentLine onClick={() => contenthandle(props?.maininfos.length - 1)}>
          <BaseText>{props?.maininfos[props?.maininfos.length - 1]}</BaseText>
        </MainContentLine>
        <Divider />
        <CreateNew onClick={() => createCollection()}>
          <BaseText>{t('Create New Collection')} +</BaseText>
        </CreateNew>
      </DownArea>
    </>
  )
}
export default Select;