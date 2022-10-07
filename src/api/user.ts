import axios from 'axios'
import { endpoint } from '../constants'

const userEndpoint = `${endpoint}/user`

const userApi = {
  createUser: (name, description, avatar, background, email, address, website, twitter, discord, instagram, medium, telegram) =>
    axios.post(userEndpoint, { name, description, avatar, background, email, address, website, twitter, discord, instagram, medium, telegram }),
  getAll: () => axios.get(`${userEndpoint}/all`),
  getUser: (address) => axios.get(`${userEndpoint}/get/${address}`),
  updateUser: ({ name, description, avatar, background, email, address, website, twitter, discord, instagram, medium, telegram }) =>
    axios.post(`${userEndpoint}/update`, { name, description, avatar, background, email, address, website, twitter, discord, instagram, medium, telegram }),
  getNotice: (address) => axios.get(`${userEndpoint}/getnotice/${address}`),
  setNotice: ({ address, itemSold, bidActivity, priceChange, auctionExpire, outbid, referralSuccess, ownedAssetUpdate, successPurchase, fastswapNewsletter, minimumBidTreshold }) =>
    axios.post(`${userEndpoint}/setnotice`, { address, itemSold, bidActivity, priceChange, auctionExpire, outbid, referralSuccess, ownedAssetUpdate, successPurchase, fastswapNewsletter, minimumBidTreshold })
}

export default userApi