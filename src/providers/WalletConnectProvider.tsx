import { createContext, useEffect } from 'react'

import Web3Modal from 'web3modal'

import WalletConnect from '@walletconnect/web3-provider'
// @ts-ignore
import Torus from '@toruslabs/torus-embed'
// @ts-ignore
import WalletLink from 'walletlink'

const infuraId = process.env.REACT_APP_INFURA_ID ?? ''

const Context = createContext({})

const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId,
    },
  },
  torus: {
    package: Torus,
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: 'Web3Modal Example App',
      infuraId,
    },
  },
}

const WalletConnectProvider: React.FC = ({ children }) => {
  // useEffect(() => {
  //   const init = async () => {
  //     const web3Modal = new Web3Modal({
  //       providerOptions,
  //     })

  //     web3Modal.clearCachedProvider()

  //     const provider = await web3Modal.connect()

  //     console.log(provider)
  //   }

  //   init()
  // }, [])

  return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default WalletConnectProvider
