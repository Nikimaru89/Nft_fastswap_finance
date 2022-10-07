import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import api from '../../../api'
import validator from 'validator'
import { Box, Typography } from '@mui/material'
import { controlNotification, controlValidation } from '../../../redux/action/faceAction'
import styled from 'styled-components'
import Input from '../../components/Input'
import TextField from '../../components/TextField'
import SocialLink from '../../components/SocialLink'
import { Button } from '../../../components'
import UploadField from '../../../components/Upload'
import '../../upload.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../contexts/Localization'

const Wrapper = styled.div`
  width: 100%;
  background: none;
  padding: 0px 0px 140px 0px;
`

const Space = styled.div`
  margin-bottom:40px;
`

const WalletAddress = styled.div`
  width:100%;
  padding:10px 24px;
  background: #CECECE;
  border: 1px solid #CECECE;
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom:80px;
  font-weight: 400;
  font-size:18px;
  font-family:CircularStd;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

interface UserInfoProps {
  name: String,
  description: String,
  avatar: String,
  background: String,
  email: String,
  address: String,
  website: String,
  twitter: String,
  discord: String,
  instagram: String,
  medium: String,
  telegram: String
}

const ProfileSettings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    name: "unname",
    description: "",
    avatar: "https://fastnft.s3-us-west-1.amazonaws.com/nft-files/avatar7.svg",
    background: "https://fastnft.s3-us-west-1.amazonaws.com/nft-files/puma.png",
    email: "",
    address: "",
    website: "",
    twitter: "",
    discord: "",
    instagram: "",
    medium: "",
    telegram: ""
  })

  const socials = ["email", "website", "twitter", "discord", "instagram", "medium", "telegram"]

  const { account } = useWeb3React()
  const handleSave = async () => {
    let i;
    for (i = 0; i < socials.length; i++)
      if (userInfo[socials[i]] !== "" && !validator.isEmail(userInfo[socials[i]])) {
        dispatch(controlValidation({ validationValue: true, validationdescription: `${t('Please input your')} ${socials[i]} ${t('correctly')}.` }))
        return
      }
    if (account && i === socials.length) {
      dispatch(controlNotification({ notificationValue: true, title: t("Updating Profile"), description: t("Please wait...") }))
      await api.user.updateUser({ ...userInfo })
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
      navigate(`/ account / ${account} `)
    } else {
      dispatch(controlValidation({ validationValue: true, validationdescription: t("Please log in first") }))
    }
  }

  const fetchUser = async () => {
    if (account) {
      const { data } = (await api.user.getUser(account))
      setUserInfo({ ...data, address: account })
    }
  }

  useEffect(() => {
    fetchUser()
  }, [account])// eslint-disable-line

  return (
    <Wrapper>
      <Space />
      <UploadField info={userInfo} setInfo={setUserInfo} field="background" width={1005} height={210} />
      <UploadField info={userInfo} setInfo={setUserInfo} field="avatar" width={80} height={80} rounded />
      <Space />

      <Box maxWidth={617}>
        <Typography variant='h6' color='text.main' sx={{ mb: '16px' }}>{t('Name')}</Typography>
        <Input placeholder="Your username"
          value={userInfo?.name}
          onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} />
        <Space />

        <Typography variant='h6' color='text.main'>{t('Description')}</Typography>
        <TextField placeholder="Tell us a little bit about you"
          value={userInfo?.description}
          onChange={e => setUserInfo({ ...userInfo, description: e.target.value })} />
        <Typography variant='caption' textAlign="right">{t('0 Character of 1000 maximum')}</Typography>
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '16px' }}>{t('Email Address')}</Typography>
        <Input placeholder="Your email"
          value={userInfo?.email}
          onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} />
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '16px' }}>{t('Links')}</Typography>
        <SocialLink info={userInfo} setInfo={setUserInfo} />
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '16px' }}>{t('Wallet Address')}</Typography>
        <WalletAddress>
          {account}
        </WalletAddress>
        <Button variant="contained" style={{ minWidth: '100%', marginTop: '50px' }} onClick={handleSave}>{t('Save')}</Button>
      </Box>
    </Wrapper>
  )
}

export default ProfileSettings