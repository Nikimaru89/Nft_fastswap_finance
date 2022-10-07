import axios from 'axios'
import { endpoint } from '../constants'

const adminEndpoint = `${endpoint}/admin`

const adminApi = {
  checkAdmin: (account) => axios.post(`${adminEndpoint}/checkAdmin`, { account }),
  signCollection: (collectionInfo) => axios.post(`${adminEndpoint}/sign/collection`, collectionInfo),
  getAnalytics: () => axios.get(`${adminEndpoint}/analytics`),
  getSaleByPeriod: (period) => axios.get(`${adminEndpoint}/get?period=${period}`),
  removeNfts: (options, tokenId) => axios(`${adminEndpoint}/remove/custom?tokenId=${tokenId}`, options)
}

export default adminApi