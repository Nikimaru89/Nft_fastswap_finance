import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../api'
import { controlNotification } from '../../redux/action/faceAction'
import { contractAddress as contract } from '../../constants'
import Input from '../components/Input'
import Textfield from '../components/TextField'
import Switch from '../components/Switch'
import { Box, Typography } from '@mui/material'
import SocialLink from '../components/SocialLink'
import { chainId } from '../../constants/index'

import './upload.css'
import { Button, Upload } from '../../components'
import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { useTranslation } from '../../contexts/Localization'

const Wrapper = styled.div`
  width:100%;
  background:none;
  padding-bottom: 140px;
`
const Inner = styled.div`
  max-width:614px;
  margin: 40px auto 0px;
  width:95%;
`
const Flex = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
`

const Space = styled.div`
  margin-bottom:40px;
`

interface CollectionInfoProps {
  contract: String,
  name: String,
  description: String,
  thumbnail: String,
  background: String,
  tokenIds: Array<Number>,
  url: String,
  tokenUri: String,
  maxSupply: String,
  website: String,
  twitter: String,
  discord: String,
  instagram: String,
  medium: String,
  telegram: String,
  creator: String,
  royalties: String,
  wallet: String,
}

const CollectionSet = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [hasRoyalty, setHasRoyalty] = useState(false)
  const [hasCollaborator, setHasCollaborator] = useState(false)
  const dispatch = useDispatch()
  const access = useSelector((state: any) => state.face.adminAccess)

  const [collectionInfo, setCollectionInfo] = useState<CollectionInfoProps>({
    contract: access ? "" : contract.customNft[chainId],
    name: "unname",
    description: "",
    thumbnail: "",
    background: "",
    tokenIds: [],
    url: "",
    tokenUri: "",
    maxSupply: "",
    website: "",
    twitter: "",
    discord: "",
    instagram: "",
    medium: "",
    telegram: "",
    creator: "",
    royalties: "",
    wallet: ""
  })

  const handleCreate = async () => {
    if (!account) return
    else if (!collectionInfo.name || !collectionInfo.description || !collectionInfo.thumbnail || !collectionInfo.background) {
      toast(t("Please input fields correctly"))
    }
    else {
      dispatch(controlNotification({ notificationValue: true, title: t("Creating Collection"), description: t("Please wait...") }))
      try {
        collectionInfo.creator = account
        if (access) {
          await api.admin.signCollection(collectionInfo)
        } else {
          await api.collection.createCollection(collectionInfo)
        }
      } catch (err) {
        console.log("error:", err)
      }
      dispatch(controlNotification({ notificationValue: false, title: "", description: "" }))
      if (access) {
        navigate('/admin')
      } else {
        navigate('/overview')
      }
    }
  }

  return (
    <Wrapper>
      <Inner>
        <Typography variant='h4' color='text.main'>{access ? t('Add') : t('Create')} {t('a collection')}</Typography>
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '9px' }}>{t('Collection Thumbnail')}</Typography>
        <Typography variant='caption' color='text.main' sx={{ mb: '16px' }}>{t('This image will also be used for navigation. 350 x 350 recommended.')}</Typography>
        <Upload info={collectionInfo} setInfo={setCollectionInfo} field="thumbnail" width={104} height={104} />
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '9px' }}>{t('Banner image')}</Typography>
        <Typography variant='caption' color='text.main' sx={{ mb: '16px' }}>
          {t('This image will appear at the top of your collection page. Avoid including too much text in this banner')}<br />
          {t('image, as the dimensions change on different devices. 1400 x 400 recommended.')}
        </Typography>
        <Upload info={collectionInfo} setInfo={setCollectionInfo} field="background" width={614} height={129} />
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '16px' }}>Name</Typography>
        <Input placeholder={t("Example: Mountain open view")} onChange={e => setCollectionInfo({ ...collectionInfo, name: e.target.value })} />
        <Space />

        <Typography variant='h6' color='text.main' sx={{ mb: '9px' }}>{t('Description')}</Typography>
        <Typography variant='caption' color='text.main'>{t('Markdown syntax is supported.')}</Typography>
        <Textfield placeholder={t("Provide a detailed description of the item")} color='text.main'
          onChange={e => setCollectionInfo({ ...collectionInfo, description: e.target.value })} />
        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '8px' }}>
          <Typography variant='caption' textAlign='right' color='text.main'>{t('0 Character of 1000 maximum')}</Typography>
        </Box>
        <Space />

        <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('URL')}</Typography>
        <Typography variant='caption' sx={{ mb: '16px' }} color='text.main'>
          {t('Customize your URL on FastSwap. Must only contain lowercase letters,numbers, and hyphens.')}
        </Typography>
        <Input placeholder="https://nft.fastswap.finance/Mountain open view"
          onChange={e => setCollectionInfo({ ...collectionInfo, url: e.target.value })} />
        <Space />

        <Typography variant='h6' sx={{ mb: '16px' }} color='text.main'>{t('Links')}</Typography>
        <SocialLink info={collectionInfo} setInfo={setCollectionInfo} />
        <Space />

        {
          access && <>
            <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Collection Address')}</Typography>
            <Input placeholder="0x25f...d589" onChange={e => setCollectionInfo({ ...collectionInfo, contract: e.target.value })} />
            <Space />

            <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Nft Token Uri')}</Typography>
            <Input placeholder="http://ipfs.io/ipfs/..." onChange={e => setCollectionInfo({ ...collectionInfo, tokenUri: e.target.value })} />
            <Space />

            <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Max Supply')}</Typography>
            <Input placeholder="9999" onChange={e => setCollectionInfo({ ...collectionInfo, maxSupply: e.target.value })} />
            <Space />
          </>
        }

        <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Royalties')}</Typography>
        <Flex>
          <Typography variant='caption' sx={{ mb: '16px' }} color='text.main'>
            {t('Collect a fee when a user re-sells an item you originally created. This is deducted from')}<br />
            {t('the final sale price and paid monthly to a payout address of your choosing.')}
          </Typography>
          <Switch
            value={hasRoyalty}
            setValue={setHasRoyalty} />
        </Flex>
        {hasRoyalty &&
          <>
            <Typography variant='caption' sx={{ mb: '9px' }} color='text.main'>
              {t('Percentage fee (Up to 10% - Only applies to unsold items)')}
            </Typography>
            <Input placeholder="0.00%" onChange={e => setCollectionInfo({ ...collectionInfo, royalties: e.target.value })} />
          </>
        }
        <Space />

        <Typography variant='h6' sx={{ mb: '9px', mt: '16px' }} color='text.main'>{t('Your payout wallet address')}</Typography>
        <Typography variant='caption' sx={{ mb: '16px' }} color='text.main'>
          {t('Please enter the wallet adress in which you want to receive the royalties payments')}
        </Typography>
        <Input placeholder="0x25f...d589" onChange={e => setCollectionInfo({ ...collectionInfo, wallet: e.target.value })} />
        <Space />

        <Typography variant='h6' sx={{ mb: '9px' }} color='text.main'>{t('Collaborators')}</Typography>
        <Flex>
          <Typography variant='caption' sx={{ mb: '16px' }} color='text.main'>
            {t('Collaborators can modify collection settings, receive payments for items they created')},<br />
            {t("change the collection's royalty payout address, and create new items.")}
          </Typography>
          <Switch value={hasCollaborator} setValue={setHasCollaborator} />
        </Flex>
        {
          hasCollaborator &&
          <Button variant='outlined' sx={{ color: '#757B75', fontSize: '12px', borderColor: '#CECECE' }}>
            +&nbsp;{t('Add Collaborator')}</Button>}
        <Space />

        <Button variant='contained' sx={{ minWidth: '100%' }} onClick={handleCreate}>+&nbsp;{t('Create')}</Button>
      </Inner>
    </Wrapper>
  )
}

export default CollectionSet;