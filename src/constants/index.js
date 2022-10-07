export const s3bucketConfig = {
    bucketName: "fastnft",
    dirName: "nft-files",
    region: "us-west-1",
    accessKeyId: "AKIAVRDPO22IDGFGY7W3",
    secretAccessKey: "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",
}

export const moralisConfig = {
    server: "https://1lyvyrzqpgk7.usemoralis.com:2053/server",
    appId: "Q9zwmCp7UkdbNLe8IJUa9hVGLrtC8Z7gvaIVXWnr"
}

export const contractAddress = {
    customNft: {
        56: '0xE3820dfD824f31f9957C0EC350a4072b7E737475',
        97: '0xa36c8D2Df50111546327733fEe3097765314ab2D'
    },
    mammalNft: {
        56: '0xA554B88cedcb4fe58AEf0E34a4017989A75F38f6',
        97: '0x1B1260B2dd8A5f9DceC8Ba78809fD6DE796846Cf'
    },
    auction: {
        56: '0xED40221EE2bD6BBE2f60f602999676B489F106F3',
        97: '0xDd7734DdC5ac2aC6De458A3050d7c7dCF2fbe5CF'
    },
    fast: {
        56: '0x2322AfAaC81697E770c19a58df587d8739777536',
        97: '0xC2e741560428669025b2e173132B5F000f29f29F'
    },
    duke: {
        56: '0xAEe234825dC4687faE606485c1eBD06336052bCc',
        97: '0x4aef15e957617d615cE89abd331268D64f8c48fe'
    }
}

// export const chainId = 97 // testnet
export const chainId = 56 // mainnet

export const endpoint = 'http://192.168.104.202:8080' // localserver
// export const endpoint = 'http://3.99.83.65:2083' // online server

export const pinataApiKey = "daa068ff89f37c95a981"
export const pinataSecretKey = "a703d87ba16f6c775427ddf43f1413e97a87bd0eb61feace274a649507f24327"