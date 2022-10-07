import axios from "axios"
import { pinataApiKey, pinataSecretKey } from "../constants"

export const pinFileToIPFS = async (file) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
  const gate = 'https://fastmarket.mypinata.cloud/ipfs'

  try {
    const res = await axios.post(url, file,
      {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretKey
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    )
    return `${gate}/${res.data.IpfsHash}`
  }
  catch (error) {
    console.log('error', error)
    return null
  }
}