import axios from 'axios'
import { endpoint } from '../constants'

const collectionEndpoint = `${endpoint}/collections`

const collectionApi = {
  createCollection: ({ contract, name, description, thumbnail, background, tokenIds, url, website, twitter, discord, instagram, medium, telegram, creator, royalties, wallet }) => axios.post(collectionEndpoint, {
    contract, name, description, thumbnail, background, tokenIds, url, website, twitter, discord, instagram, medium, telegram, creator, royalties, wallet
  }),
  setPayment: ({ contract, name, minimum, payment }) => axios.post(`${collectionEndpoint}/setOffer`,
    { contract, name, minimum, payment }),
  getAll: () => axios.get(`${collectionEndpoint}/all`),
  getCollectionById: (contract, tokenId) => axios.get(`${collectionEndpoint}/getById?contract=${contract}&tokenId=${tokenId}`),
  getCollectionByName: (contract, name) => axios.get(`${collectionEndpoint}/getByName?contract=${contract}&name=${name}`),
  getCollectionByCreator: (creator) => axios.get(`${collectionEndpoint}/getByCreator?creator=${creator}`),
  getStates: (contract, name) => axios.get(`${collectionEndpoint}/getStates/${contract}/${name}`)
}

export default collectionApi