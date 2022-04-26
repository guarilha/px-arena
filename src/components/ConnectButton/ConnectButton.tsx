import {
  Box,
  Flex,
  Icon,
  Button,
  HStack,
  useColorModeValue,
  Collapse,
  useDisclosure,
  Link,
  IconButton,
  Stack,
  Spacer,
  Tag
} from '@chakra-ui/react'
import { useAccounts } from '../../providers/AccountsProvider'
import { useWeb3 } from '../../providers/Web3Provider'
import { IoLogOutOutline, IoCheckmarkCircle } from "react-icons/io5";
import { ReactNode } from 'react'
import { PXPWallet } from '../PXPWallet';


type ConnectButtonProps = {
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
}) => {
  const accounts = useAccounts()
  const { connect, disconnect, toggleModal, isConnected } = useWeb3()

  const WalletButton = () => (<Flex direction='row' align='center' justify={'space-between'} w='full'>
    <Tag
      size='sm'
      borderRadius='full'
      // onClick={toggleModal}
      fontFamily={'monospace'}
      py={2}
      px={4}
      fontSize={'sm'}
    >
      <Icon as={IoCheckmarkCircle} fontSize="sm" mr={2} color={"green.300"} /> {accounts[0].slice(0, 4) + '…' + accounts[0].slice(accounts[0].length - 3, accounts[0].length)}
    </Tag>
    <Box display={{base: 'block', md:'none'}}>
      <PXPWallet />
    </Box>
    <Button display={{base: 'none', md:'block'}} onClick={disconnect} size='sm' leftIcon={<IoLogOutOutline />}>Exit</Button>
    <Button display={{base: 'block', md:'none'}} onClick={disconnect} size='sm'><IoLogOutOutline /></Button>
  </Flex>)

  const Connect = () => (
    <Button
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

