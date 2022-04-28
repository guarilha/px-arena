import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useContext,
} from 'react'

import Web3 from 'web3'
import { Ethereum, Web3ChainId } from '../@types/Web3'
import Web3Modal from 'web3modal'

import WalletConnect from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import { DEFAULT_NETWORK, INFURA_ID } from '../config/settings'

const infuraId = INFURA_ID

const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId,
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: 'FURIA PX',
      infuraId,
    },
  },
}

type ContextType = {
  web3: Web3 | null
  ethereum: Ethereum | null
  chainId: Web3ChainId | null
  isConnected: boolean | null
  connect: () => unknown
  disconnect: () => unknown
  toggleModal: () => unknown
}

const Context = createContext<ContextType>({
  web3: null,
  ethereum: null,
  chainId: null,
  isConnected: null,
  connect: () => {},
  disconnect: () => {},
  toggleModal: () => {},
})

const web3Modal = new Web3Modal({
  network: DEFAULT_NETWORK,
  providerOptions,
  cacheProvider: true,
})

const Web3Provider: React.FC = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [ethereum, setEthereum] = useState<Ethereum | null>(null)
  const [chainId, setChainId] = useState<Web3ChainId | null>(null)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal.connect()
      const web3 = new Web3(provider)
      const chainId = await web3.eth.getChainId()

      setEthereum(provider)
      setWeb3(web3)
      setChainId(chainId)
      setIsConnected(true)
    } catch (e) {
      console.log(`Could not enable accounts. Interaction with contracts not available.
          Use a modern browser with a Web3 plugin to fix this issue.`)
      console.log(e)
    }
  }, [])

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider()
    setEthereum(null)
    setIsConnected(false)
  }, [])

  const toggleModal = useCallback(async () => {
    await disconnect()
    await connect()
  }, [])

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  const value = useMemo(
    () => ({
      web3,
      ethereum,
      chainId,
      isConnected,
      connect,
      disconnect,
      toggleModal,
    }),
    [web3, ethereum, chainId, isConnected, connect, disconnect, toggleModal]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useWeb3 = () => {
  const context = useContext(Context)

  if (typeof context === 'undefined')
    throw new Error('`useWeb3` must be used within `Web3Provider`')

  return context
}

export const Web3Context = Context

export default Web3Provider
