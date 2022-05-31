import {
  Box,
  Flex,
  Icon,
  Button,
  Tag
} from '@chakra-ui/react'
import loadable from '@loadable/component'
import { useAccounts } from '../../providers/AccountsProvider'
import { useWeb3 } from '../../providers/Web3Provider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket'

const PXPWallet = loadable(() => import("../../components/PXPWallet"));



type ConnectButtonProps = {
}

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const accounts = useAccounts()
  const { connect, disconnect } = useWeb3()

  const WalletButton = () => (<Flex direction='row' align='center' justify={'space-between'} w='full'>
    <Tag
      size='sm'
      borderRadius='full'
      // onClick={toggleModal}
      fontFamily={'monospace'}
      py={2}
      px={4}
      fontSize={'sm'}
      onClick={disconnect}
    >
      <Icon fontSize="sm" mr={2} color={"green.300"}><FontAwesomeIcon icon={faCheckCircle} /></Icon> {accounts[0].slice(0, 4) + '…' + accounts[0].slice(accounts[0].length - 3, accounts[0].length)}
    </Tag>
    {/* <Box >
      <PXPWallet />
    </Box> */}
    {/* <Button onClick={disconnect} size='sm'><Icon color={"whiteAlpha.500"}><FontAwesomeIcon icon={faArrowRightFromBracket} /></Icon></Button> */}
  </Flex>)

  const Connect = () => (
    <Button
      w={"100%"}
      bgGradient="linear(to-r, blue.400, purple.500)"
      _hover={{
        bgGradient: 'linear(to-r, blue.500, purple.600)',
      }}
      onClick={connect}
    >
      Connect
    </Button>
  )

  return (
    <>
      {accounts.length > 0 ? (
        <WalletButton />
      ) : (
        <Connect />
      )}
    </>
  )
}

export default ConnectButton

