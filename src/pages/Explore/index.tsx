import React, { useEffect, useState } from "react"
import styled from "styled-components"
import LatestDrops from "../Landing/LatestDrops"
import Introduction from './Introduction'
import TypeBar from '../components/TypeBar'

const Wrapper = styled.div`
  padding: 40px 0px;
  max-width: 1364px;
  width: 90%;
  margin: 0 auto;
`
const Bar = styled.div`
  width: calc(100% - 16px);
  display: flex;
  justify-content: space-between;
  margin-top: 54px;
  margin-bottom: 10px;
  padding: 8px;
  flex-wrap:wrap;
`
const Left = styled.div`
  max-width:350px;
  width:100%;
  display:flex;
  justify-content:space-between;
  & > div{
    margin-left: 0px;
  }
`
const typeStatus = [
  {
    status: false,
    text: "Fixed"
  },
  {
    status: false,
    text: "Auction"
  }
]

const paymentStatus = [
  {
    status: false,
    text: "DUKE"
  },
  {
    status: false,
    text: "FAST"
  },
  {
    status: false,
    text: "BNB"
  }
]

const sortStatus = [
  {
    status: false,
    text: "Recently Added"
  },
  {
    status: false,
    text: "Lowest Price"
  },
  {
    status: false,
    text: "Highest Price"
  },
  {
    status: false,
    text: "Volume"
  },
  {
    status: false,
    text: "Most Viewed"
  },
  {
    status: false,
    text: "Most Favorited"
  },
  {
    status: false,
    text: "Oldest"
  }
]

const Explore = () => {
  const [type, setType] = useState({ Fixed: false, Auction: false })
  const [payment, setPayment] = useState({ DUKE: false, FAST: false, BNB: false })
  const [sort, setSort] = useState({ "Recently Added": false, "Lowest Price": false, "Highest Price": false, "Volume": false, "Most Viewed": false, "Most Favorited": false, "Oldest": false })
  const [filter, setFilter] = useState("&type=all&payment=all&sort=Recently Added")

  useEffect(() => {
    let filt = ""
    const ind1 = Object.values(type).indexOf(true)
    const ind2 = Object.values(payment).indexOf(true)
    const ind3 = Object.values(sort).indexOf(true)
    filt += "&type=" + (ind1 === -1 ? "all" : Object.keys(type)[ind1]?.toLowerCase())
    filt += "&"
    filt += "payment=" + (ind2 === -1 ? "all" : Object.keys(payment)[ind2])
    filt += "&"
    filt += "sort=" + (ind3 === -1 ? "Recently Added" : Object.keys(sort)[ind3])
    setFilter(filt)
  }, [type, payment, sort])

  return (
    <Wrapper>
      <Introduction />
      <Bar>
        <Left>
          <TypeBar type="normal" liststatus={typeStatus} filter={type} setFilter={setType} default="Sale Type" marginTop='10px' />
          <TypeBar type="normal" liststatus={paymentStatus} filter={payment} setFilter={setPayment} default="Price" marginTop='10px' />
        </Left>
        <TypeBar noSwitch type="normal" liststatus={sortStatus} zIndex={8} filter={sort} setFilter={setSort} default="Recently Added" />
      </Bar>
      <LatestDrops noHeader={true} filter={filter} />
    </Wrapper>
  );
}

export default Explore