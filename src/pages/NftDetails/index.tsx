import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import styled from "styled-components"
import api from "../../api"
import TopHead from "./TopHead"
import NftInfos from './NftInfos'
import { CardsView } from "../../components"
import { Typography } from "@mui/material"
import { useTranslation } from "../../contexts/Localization"

const Wrapper = styled.div`
  padding: 40px 0px;
  max-width: 1364px;
  width: 90%;
  margin: 0 auto;
  text-align:center;
`
const Space = styled.div`
  height:80px;
`
const Space2 = styled.div`
  height:40px;
`

const NftDetails = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  //@ts-ignore
  const { contract, tokenId } = useParams()
  const [drop, setDrop] = useState()
  const [drops, setDrops] = useState()
  const [limit, setLimit] = useState(12)
  const [max, setMax] = useState(12)

  const fetchDrop = async () => {
    if (contract && tokenId) {
      const { data } = await api.nft.getNFTById(contract, tokenId)
      setDrop(data[0])
      const res = (await api.nft.getNFTByCollection(contract, data[0].group, limit))

      setDrops(res.data.data)
      setMax(res.data.total ? res.data.total[0].total : 0)
    }
  }

  useEffect(() => {
    fetchDrop()
  }, [contract, tokenId, limit])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <TopHead item={drop} />
      <NftInfos item={drop} />
      <Space />
      <Typography variant="h5" color="text.main" textAlign="left">{t('Other items in this collection')}</Typography>
      <Space2 />
      <CardsView drops={drops || []} max={max} account={account} limit={limit} setLimit={setLimit} />
    </Wrapper>
  )
}

export default NftDetails
