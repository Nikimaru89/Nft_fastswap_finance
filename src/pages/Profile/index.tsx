import React, { useEffect, useState } from "react"
import api from "../../api"
import styled from "styled-components"
import { BannerCard } from "../../components/Card"
import CardsView from "../../components/CardsView"
import CollectionView from "../../components/CollectionView"
import StyledTab from "../../components/Tab"
import Activity from "../Activity"
import { useParams } from "react-router-dom"
import { contractAddress as contracts, chainId } from "../../constants"

const Wrapper = styled.div`
  padding: 40px 0px;
  max-width: 1364px;
  width: 90%;
  margin: 0 auto;
`

interface UserInfoProps {
  name: string,
  description: string,
  avatar: string,
  background: string,
  email: string,
  address: string,
  website: string,
  twitter: string,
  discord: string,
  instagram: string,
  medium: string,
  telegram: string
}

const Profile = () => {
  const { address } = useParams<{ address: string }>()
  const [addType, setAddType] = useState('1')
  const [userInfo, setUserInfo] = useState<UserInfoProps>()
  const [total, setTotal] = useState([])
  const [drops, setDrops] = useState([])
  const [filter, setFilter] = useState(0)
  const [species, setSpecies] = useState("Item")
  const [counts, setCounts] = useState([0, 0, 0, 0, 0])
  const [states, setStates] = useState({ Item: 0, Collection: 0, Watching: 0, Like: 0, Activity: 0, Offers: 0 })

  const fetchState = async () => {
    const { data } = await api.nft.getStates(address)
    setStates(data)
  }

  const fetchUser = async () => {
    if (address) {
      const res = (await api.user.getUser(address)).data
      setUserInfo(res)
    }
  }

  const fetchData = (data) => {
    let nums = [0, 0, 0, 0, 0]
    setTotal(data)
    setDrops(species === 'Collection' ? data : data.filter(item => item.owner === address))
    nums = [
      species === 'Collection' ? data.length : data.filter(item => item.owner === address).length,
      species === 'Collection' ? data.length : data.filter(item => item.creator === address && item.contract === contracts.customNft[chainId]).length,
      data.filter(item => item.price > 0 && item.duration > 0).length,
      data.filter(item => item.price > 0 && item.duration === 0).length,
      species === 'Collection' ? 0 : data.filter(item => item.creator === address && item.owner !== address).length
    ]
    setCounts(nums)
  }

  const fetchDrops = async () => {
    let data
    setFilter(0)
    switch (species) {
      case 'Item':
        data = (await api.nft.getNFTByOwner(address)).data
        fetchData(data)
        break;
      case 'Collection':
        data = (await api.collection.getCollectionByCreator(address)).data
        fetchData(data)
        break;
      case 'Watching':
        data = (await api.nft.getNFTByWatching(address)).data
        fetchData(data)
        break;
      case 'Like':
        data = (await api.nft.getNFTByLike(address)).data
        fetchData(data)
        break;
      case 'Offers':
        data = (await api.nft.getNFTByOffers(address)).data
        fetchData(data)
        break;
    }
    await fetchState()
  }

  useEffect(() => {
    if (address) {
      fetchDrops()
    }
  }, [species, address])// eslint-disable-line

  useEffect(() => {
    if (address) {
      switch (filter) {
        case 0:
          if (species !== 'Collection')
            setDrops(total.filter(item => item.owner === address))
          else setDrops(total)
          break;
        case 1:
          if (species !== 'Collection')
            setDrops(total.filter(item => item.creator === address && item.contract === contracts.customNft[chainId]))
          else setDrops(total)
          break;
        case 2:
          setDrops(total.filter(item => item.price > 0 && item.duration > 0))
          break;
        case 3:
          setDrops(total.filter(item => item.price > 0 && item.duration === 0))
          break;
        case 4:
          if (species !== 'Collection')
            setDrops(total.filter(item => item.creator === address && item.owner !== address))
          else setDrops([])
          break;
      }
    }
  }, [filter, address])// eslint-disable-line

  useEffect(() => {
    fetchUser()
  }, [address])// eslint-disable-line

  return (
    <Wrapper>
      <BannerCard
        image={userInfo?.background || '/assets/images/puma.png'}
        avatar={userInfo?.avatar || '/assets/images/avatar7.svg'}
        title={userInfo?.name}
        description={userInfo?.description}
        addType={addType}
        setting={true}
        joinedTime="NOVEMBER 2021"
      />
      <StyledTab counts={counts} topMenu={states} addType={addType} filter={filter} setAddType={setAddType} setFilter={setFilter} setSpecies={setSpecies} noHead={species === 'Activity'} />
      {
        species === 'Activity' ?
          <Activity noTitle={true} actType="owners" address={address} /> :
          species === 'Collection' ?
            <CollectionView drops={drops} address={address} /> :
            <CardsView drops={drops} account={address} />
      }
    </Wrapper>
  )
}

export default Profile