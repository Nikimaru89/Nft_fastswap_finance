import axios from "axios"
import { endpoint } from "../constants"

const activityEndpoint = `${endpoint}/activity`

const activityApi = {
  createActivity: (contract, tokenId, name, group, image, event, price, payment, priceUsd, quantity, from, to) => axios.post(activityEndpoint, {
    contract, tokenId, name, group, image, event, price, payment, priceUsd, quantity, from, to
  }),
  getActivities: () => axios.get(`${activityEndpoint}/all`),
  getActivityByOwner: (address) => axios.get(`${activityEndpoint}/getByOwner/${address}`),
  getActivityByNfts: (contract, address) => axios.get(`${activityEndpoint}/getByNfts/${contract}/${address}`),
  getCollectionInfo: (contract, group) => axios.get(`${activityEndpoint}/get/info/${contract}/${group}`),
  getRankByCreators: () => axios.get(`${activityEndpoint}/rank/creators`),
  getRankBySales: () => axios.get(`${activityEndpoint}/rank/sales`),
  getRankByCollection: () => axios.get(`${activityEndpoint}/rank/collection`)
}

export default activityApi