import { Contract as EthContract } from 'web3-eth-contract'

export type Web3Address = string
export type Web3ChainId = string | number
export type Web3Account = Web3Address

// Re-exporting the Contract because the autocomplete is not finding the `web3-eth-contract`
export type Contract = EthContract

export type TransactionStatus =
  | 'sent'
  | 'sending'
  | 'success'
  | 'error'
  | 'transactionHash'

export type ProviderRpcError = Error & {
  message: string
  code: number
  data?: unknown
}

export type OnErrorPayload = ProviderRpcError

export type OnMessagePayload = {
  type: string
  data: unknown
}

export type OnConnectPayload = {
  chainId: Web3ChainId
}

export type Ethereum = {
  enable: () => Promise<unknown>
  close: () => Promise<unknown>
  on: (event: string, handler: (payload: unknown) => void) => void
}
