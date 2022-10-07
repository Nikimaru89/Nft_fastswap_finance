import axios from 'axios'
import { endpoint } from '../constants'

const nftEndpoint = `${endpoint}/nfts`

const nftApi = {
  createNFT: (contract, tokenId, name, description, image, group, price, payment, priceUsd, duration, offers, bids, watches, likes, copies, creator, owner) => axios.post(`${nftEndpoint}/create`, {
    contract, tokenId, name, description, image, group, price, payment, priceUsd, duration, offers, bids, watches, likes, copies, creator, owner
  }),
  updateNFT: (contract, tokenId, update) => axios.post(`${nftEndpoint}/update`, { contract, tokenId, update }),
  addFeatures: (contract, tokenId, account, type) => axios.post(`${nftEndpoint}/addFeatures`, { contract, tokenId, account, type }),
  addBids: (contract, tokenId, bidData) => axios.post(`${nftEndpoint}/addBids`, { contract, tokenId, bidData }),
  addOffers: (contract, tokenId, offerData) => axios.post(`${nftEndpoint}/addOffers`, { contract, tokenId, offerData }),
  removeFeatures: (contract, tokenId, account, type) => axios.post(`${nftEndpoint}/removeFeatures`, { contract, tokenId, account, type }),
  getCustomNfts: () => axios.get(`${nftEndpoint}/get/custom`, {}),
  getTopNFT: () => axios.get(`${nftEndpoint}/get/top`),
  getLatestDrops: (account, limit, filter) => axios.get(`${nftEndpoint}/latest?${account !== "" ? `account=${account}&` : ''}limit=${limit}${filter}`),
  getNFTById: (contract, tokenId) => axios.get(`${nftEndpoint}/gets?contract=${contract}&tokenId=${tokenId}`),
  getNFTByOwner: (owner) => axios.get(`${nftEndpoint}/getbyOwner?owner=${owner}`),
  getNFTByCollection: (contract, name, limit) => axios.get(`${nftEndpoint}/getbyCollection?contract=${contract}&name=${name}&limit=${limit}`),
  getNFTByWatching: (address) => axios.get(`${nftEndpoint}/getWatching/${address}`),
  getNFTByLike: (address) => axios.get(`${nftEndpoint}/getLike/${address}`),
  getNFTByOffers: (address) => axios.get(`${nftEndpoint}/getOffers/${address}`),
  getHighestBid: (contract, tokenId) => axios.get(`${nftEndpoint}/getHBid/${contract}/${tokenId}`),
  getStates: (address) => axios.get(`${nftEndpoint}/getStates/${address}`)
}

export default nftApi