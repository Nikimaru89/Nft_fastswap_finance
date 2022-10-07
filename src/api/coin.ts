import axios from "axios"

const coingeckoRequest = 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin%2Cdukecoin%2Cfastswap-bsc&vs_currencies=usd'

const coinApi = {
  getPriceData: () => axios.get(coingeckoRequest)
}

export default coinApi