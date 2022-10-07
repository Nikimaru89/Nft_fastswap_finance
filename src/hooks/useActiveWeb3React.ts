import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

const useActiveWeb3React = () => {
  const context = useWeb3ReactCore<Web3Provider>()
  // const contextNetwork = useWeb3ReactCore<Web3Provider>('BNB Smart Chain Testnet')
  return context
}

export default useActiveWeb3React