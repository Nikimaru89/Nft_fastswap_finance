const moralisEndpoint = 'https://deep-index.moralis.io/api/v2'

const moralisApi = {
  getAllNfts: async (account) => {
    const url = `${moralisEndpoint}/${account}/nft?chain=bsc%20testnet`
    return await fetch(url, {
      method: 'POST',
      headers: { accept: 'application/json' },
      body: JSON.stringify({ "X-API-Key": "CT5DXbdCxh2Ns035NeLuklhBwjPzfJNxVnSFtcHDo5fKj9lul54CU9VOWDxaB7CD" })
    })
  }
}

export default moralisApi