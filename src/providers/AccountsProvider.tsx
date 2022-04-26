import {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { Web3Account } from '../@types/Web3'
import { useWeb3 } from './Web3Provider'

const Context = createContext<Web3Account[]>([])

const reloadApp = () => {
  window.location.reload()
}

const AccountsProvider: React.FC = ({ children }) => {
  const { web3, ethereum } = useWeb3()
  const [accounts, setAccounts] = useState<Web3Account[]>([])

  const init = useCallback(async () => {
    if (!web3) return

    const accounts = await web3.eth.getAccounts()

    setAccounts(accounts)
  }, [web3])

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (ethereum) {
      ethereum.on('accountsChanged', reloadApp)
      ethereum.on('chainChanged', reloadApp)
    } else {
      setAccounts([])
    }
  }, [ethereum])

  return <Context.Provider value={accounts}>{children}</Context.Provider>
}

export const useAccounts = () => {
  const context = useContext(Context)
  
  return context
}

export default AccountsProvider
