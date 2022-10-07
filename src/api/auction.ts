import axios from 'axios'
import { endpoint } from '../constants'

const auctionEndpoint = `${endpoint}/auction`

const auctionApi = {
  createAuction: (contract, tokenId, name, group, image, seller, price, paymentMethod, duration) => axios.post(auctionEndpoint, {
    contract, tokenId, name, group, image, seller, price, paymentMethod, duration
  }),
  addBids: (contract, tokenId, { user, price, payment }) => axios.post(`${auctionEndpoint}/add`, {
    contract, tokenId, user, price, payment
  }),
  getAllAuctions: () => axios.get(`${auctionEndpoint}/all`),
  getAuction: (contract, tokenId) => axios.get(`${auctionEndpoint}/detail?contract=${contract}&tokenId=${tokenId}`),
  getHighestBid: (contract, tokenId) => axios.get(`${auctionEndpoint}/getBid?contract=${contract}&tokenId=${tokenId}`),
  removeAuction: (contract, tokenId) => axios.delete(`${auctionEndpoint}/remove/${contract}/${tokenId}`)
}

export default auctionApi