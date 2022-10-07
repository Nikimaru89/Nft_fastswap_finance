import React from 'react'
import getLibrary from './utils/getLibrary'
// import { moralisConfig } from './constants'
import { ThemeContextProvider } from './ThemeContext'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { ModalProvider } from '@fastswap-uikit'
// import { MoralisProvider } from 'react-moralis'
const NetworkContextName = 'Network'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeContextProvider>
          {/* <MoralisProvider serverUrl={moralisConfig.server} appId={moralisConfig.appId}> */}
          <ModalProvider>{children}</ModalProvider>
          {/* </MoralisProvider> */}
        </ThemeContextProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
