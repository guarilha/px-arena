import MainLayout from "../MainLayout"
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Container,
  Text,
  Link
} from "@chakra-ui/react";

export const NoWallet = () => {
  return (
    <>
      <Box as="section" py={24}>
        <Center>
          <Container maxW='container.md'>
            <Heading size="2xl" my={4}>You need a crypto Wallet</Heading>
            <Text fontSize="xl">
            If this is all new to you, don't panic! We're here to help =) 
            </Text>
          </Container>
        </Center>
      </Box>
      <Box as="section" pb={8}>
        <Center>
          <Container maxW='container.md'>
            <Heading size="xl">What is a Wallet?</Heading>
            <Text fontSize="lg" mb={4}>
            Wallets are devices or services that enable users to access their public and private keys. 
            They are used to connect to web3 dApps (such as PX) in order to purchase, sell, and trade assets (tokens and NFTs).
            </Text>
            <Text fontSize="lg" mb={4}>
            PX is a non-custodial dApp, it means we don't hold your assets. Our service works with various wallet providers, so you can choose your own. 
            Bellow we have some tips for newcomers on Wallets. 
            </Text>
            
            </Container>
        </Center>
      </Box>
      <SimpleGrid columns={6} mb={12} columnGap={4}>
        <Link p={8} borderColor='gray.400' border='1px solid' rounded={'2xl'} href='https://metamask.io/' target={'_blank'}>
          <Text fontStyle={'bold'}>MetaMask</Text>
          <Text as='small'>browser extension</Text>
        </Link>
        <Link p={8} borderColor='gray.400' border='1px solid' rounded={'2xl'} href='https://ledger.com' target={'_blank'}>
          <Text fontStyle={'bold'}>Ledger</Text>
          <Text as='small'>hardware wallet</Text>
        </Link>
        <Link p={8} borderColor='gray.400' border='1px solid' rounded={'2xl'} href='https://trezos.io' target={'_blank'}>
          <Text fontStyle={'bold'}>Trezos</Text>
          <Text as='small'>hardware wallet</Text>
        </Link>
        <Link p={8} borderColor='gray.400' border='1px solid' rounded={'2xl'} href='https://tor.us/' target={'_blank'}>
          <Text fontStyle={'bold'}>Torus</Text>
          <Text as='small'>key management</Text>
        </Link>
        <Link p={8} borderColor='gray.400' border='1px solid' rounded={'2xl'} href='https://authereum.com/' target={'_blank'}>
          <Text fontStyle={'bold'}>Authereum</Text>
          <Text as='small'>custodial wallet</Text>
        </Link>
        <Link p={8} borderColor='gray.400' border='1px solid' rounded={'2xl'} href='https://www.coinbase.com/wallet' target={'_blank'}>
        <Text fontStyle={'bold'}>Coinbase Wallet</Text>
          <Text as='small'>mobile wallet</Text>
        </Link>
      </SimpleGrid>

      <Box as="section" pb={24}>
        <Center>
          <Container maxW='container.md'>
            <Heading size="lg">Wallet Address</Heading>
            <Text fontSize="lg" mb={12}>
            The wallet Address is a bunch of letters and numbers that uniquely identifies your Wallet, similar to your phone number or email address. 
            This address is what you can share with dApps and people you trust, to send and receive transactions. 
            </Text>
            <Heading size="lg">Private Key &amp; Seedphrases</Heading>
            <Text fontSize="lg" mb={4}>
            This is where things get serious. Please, don't ever share your Seedphrase or Private Key. These are used to control your assets.
            Whoever has access to this text has full control over your assets. 
            </Text>
            <Text fontSize="lg" color='red.300' mb={12}>
            You should never, under any circumstances, share your private key with anyone. 
            If a someone finds your private key on google drive or laying around your room, this person can drain your wallet and steal all your assets. 
            Not only there is no way for you to retrieve them, we would not be able to do anything about it. Please, be safe.
            </Text>
          </Container>
        </Center>
      </Box>
    </>
  )
}

export default NoWallet