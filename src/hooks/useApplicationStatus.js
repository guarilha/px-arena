import { useItemsContract } from '../providers/ItemsContractProvider'
import { useSellerContract } from '../providers/SellerProvider'
import { useWeb3 } from '../providers/Web3Provider'

const getMessage = (web3, chainId, itemsContract, sellerContract) => {
  if (!web3) return 'Loading Web3, accounts, and contracts...'
  if (isNaN(chainId) || chainId < 3)
    return "Wrong Network! Switch to your local RPC 'Localhost: 8545' in your Web3 provider (e.g. Metamask)"
  if (!itemsContract || !sellerContract) return 'Could not find a deployed contract.'
}

const useApplicationStatus = () => {
  const { web3, chainId } = useWeb3()
  const sellerContract = useSellerContract()
  const itemsContract = useItemsContract()

  const errorMessage = getMessage(web3, chainId, itemsContract, sellerContract)

  return {
    hasError: Boolean(errorMessage),
    message: errorMessage,
  }
}

export default useApplicationStatus
