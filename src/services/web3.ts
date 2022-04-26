import Web3 from 'web3'
import { ContractName } from '../@types/DeploymentMap'
import { Web3Address, Web3ChainId } from '../@types/Web3'
import deploymentMapService from './deploymentMap'

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

export const loadContractByAddress = async (
  web3: Web3,
  chainId: Web3ChainId,
  address: Web3Address
) => {
  const chain = chainId === 1337 ? 'dev' : chainId

  let contractArtifact

  try {
    contractArtifact = await import(
      `../build/deployments/${chain}/${address}.json`
    )
  } catch (e) {
    console.log(
      `Failed to load contract artifact "../build/deployments/${chain}/${address}.json"`
    )

    return
  }

  return new web3.eth.Contract(contractArtifact.abi, address)
}

export const loadContract = async (
  web3: Web3,
  chainId: Web3ChainId,
  contractName: ContractName,
  contractIndex: number
) => {
  const chain = chainId === 1337 ? 'dev' : chainId

  let address, _newContractIndex

  try {
    address = deploymentMapService.getContractAddresses(chain, contractName)[
      contractIndex || 0
    ]

    if (address) {
      _newContractIndex = contractIndex || 0
    } else {
      address = deploymentMapService.getContractAddresses(
        chain,
        contractName
      )[0]
      _newContractIndex = 0
    }
  } catch (e) {
    console.log(
      `Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`
    )
    return
  }

  let contractArtifact

  try {
    contractArtifact = await import(
      `../build/deployments/${chain}/${address}.json`
    )
  } catch (e) {
    console.log(
      `Failed to load contract artifact "../build/deployments/${chain}/${address}.json"`
    )

    return
  }

  return new web3.eth.Contract(contractArtifact.abi, address)
}
