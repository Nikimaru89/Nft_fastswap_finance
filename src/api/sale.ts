import axios from 'axios'
import { endpoint } from '../constants'

const saleEndpoint = `${endpoint}/sale`

const saleApi = {
  createSale: (contract, tokenId, name, group, image, seller, price, paymentMethod) => axios.post(saleEndpoint, {
    contract, tokenId, name, group, image, seller, price, paymentMethod
  }),
  getAllSales: () => axios.get(`${saleEndpoint}/all`),
  getSale: (contract, tokenId) => axios.get(`${saleEndpoint}/detail?contract=${contract}&tokenId=${tokenId}`),
  removeSale: (contract, tokenId) => axios.delete(`${saleEndpoint}/remove/${contract}/${tokenId}`)
}

export default saleApi