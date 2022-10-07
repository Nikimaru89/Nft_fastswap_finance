import { useWeb3React } from "@web3-react/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import api from "../../api"
import { BannerCard } from "../../components/Card"
import { CardsView } from "../../components"
import Activity from "../Activity"
import StyledTab from "../../components/Tab"

interface CollectionProps {
  contract: string,
  name: string,
  creatorInfo: {
    name: string,
    wallet: string
  },
  description: string,
  thumbnail: string,
  background: string,
  tokenIds: number[],
  website: string,
  twitter: string,
  discord: string,
  instagram: string,
  medium: string,
  telegram: string
}

interface SocialProps {
  label: string,
  link: string
}

const Wrapper = styled.div`
  padding: 40px 0px;
  max-width: 1364px;
  width: 90%;
  margin: 0 auto;
`

const Collection = () => {
  const labels = ['website', 'twitter', 'discord', 'instagram', 'medium', 'telegram']

  const { contract, name } = useParams<{ contract: string, name: string }>()
  const { account } = useWeb3React()
  const [collection, setCollection] = useState<CollectionProps>()
  const [social, setSocial] = useState<SocialProps[]>()
  const [tdata, setTdata] = useState<{ states: Object, Items: Object, Activity: Object, Offers: Object }>()
  const [total, setTotal] = useState([])
  const [addType, setAddType] = useState('1')
  const [species, setSpecies] = useState("Items")
  const [drops, setDrops] = useState([])
  const [filter, setFilter] = useState(0)
  const [counts, setCounts] = useState([0, 0, 0, 0, 0])
  const [states, setStates] = useState({ Items: 0, Activity: 0, Offers: 0 })
  const [info, setInfo] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchState = async () => {
    let { data } = await api.collection.getStates(contract, name)
    setStates(data.states)
    setTdata({ ...data })
    await fetchCollection()
    data = (await api.activity.getCollectionInfo(contract, name)).data
    setInfo(data)
  }

  const fetchDrops = (_collection) => {
    if (_collection && tdata) {
      let data = tdata[species]
      fetchData(data)
    }
  }

  const fetchData = (data) => {
    let nums = [0, 0, 0, 0, 0]
    setTotal(data)
    setDrops(data)
    nums = [
      data.length,
      data.length,
      data.filter(item => item.price > 0 && item.duration > 0).length,
      data.filter(item => item.price > 0 && item.duration === 0).length,
      0
    ]
    setCounts(nums)
  }

  const fetchCollection = async () => {
    const res = (await api.collection.getCollectionByName(contract, name)).data
    const { data } = await api.user.getUser(res[0].creator)
    setCollection({ ...res[0], creatorInfo: { name: data.name, wallet: data.address } })
    const socials = []
    labels.map((label) => (
      socials.push({ label: label, link: res[0][label] })
    ))
    setSocial(socials)
    setLoading(false)
  }

  useEffect(() => {
    if (filter < 2)
      setDrops(total)
    if (filter === 2)
      setDrops(total.filter(item => item.price > 0 && item.duration > 0))
    if (filter === 3)
      setDrops(total.filter(item => item.price > 0 && item.duration === 0))
  }, [filter])// eslint-disable-line

  useEffect(() => {
    fetchState()
  }, [contract, name])// eslint-disable-line

  useEffect(() => {
    if (collection && tdata) {
      fetchDrops(collection)// eslint-disable-line
    }
  }, [collection, tdata])// eslint-disable-line

  return (
    <Wrapper>
      <BannerCard
        image={collection?.background}
        avatar={collection?.thumbnail}
        title={collection?.name}
        creatorInfo={collection?.creatorInfo}
        description={collection?.description}
        outlined={false}
        socials={social}
        info={info}
        loading={loading}
      />
      <StyledTab counts={counts} addType={addType} setAddType={setAddType} topMenu={states} setFilter={setFilter} setSpecies={setSpecies} noHead={species === 'Activity'} />
      {
        species !== 'Activity' ?
          <CardsView drops={drops} account={account} /> :
          <Activity noTitle={true} data={tdata.Activity} />
      }
    </Wrapper>
  )
}

export default Collection