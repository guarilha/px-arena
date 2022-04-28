import Web3 from 'web3'
import { Web3Address, Web3ChainId } from '../@types/Web3'

export const getEthereum = async () => {
  // event listener is not reliable
  while (document.readyState !== 'complete') {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return window.ethereum
}

export const getWeb3 = async () => {
  const ethereum = await getEthereum()

  if (ethereum) return new Web3(ethereum)
  if (window.web3) return window.web3

  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')

  return new Web3(provider)
}
