import { 
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Text, 
  VStack,
  // Button,
  // SimpleGrid,
} from "@chakra-ui/react"
import { GiMightyForce } from "react-icons/gi"

export const PXStatsBox = () => {
  return (<>

      <Box
          w={{base: '30%', md: '25%'}}
          minW='275px'
          rounded={'2xl'}
          border={'1px solid'} 
          borderColor='whiteAlpha.500' 
          // bg='whiteAlpha.300'
          // bgGradient='linear(to-t, pink.500, purple.500)'
          bgGradient='linear-gradient(to top, #D53F8C45, #805AD599)'
          position={'absolute'}
          overflow='hidden'
          top={4}
          right={4}
      >
          <Flex py={4} px={6} mb={4} justify='space-between' align={'center'} bg={'blackAlpha.500'}>
              <Heading fontSize={'lg'}>PX Power</Heading>
              <HStack spacing={3} rounded={'full'}>
                  <Icon as={GiMightyForce} boxSize='1.5rem' color='white' />
                  <Heading fontFamily={"IBM Plex Mono"} fontWeight='bold' fontSize='1.5rem' pt={1}>80</Heading>
              </HStack>
          </Flex>
          <Flex mx={4} px={2} pb={2} mb={2} justify='space-between' align={'center'} borderBottom='1px solid' borderColor={'whiteAlpha.400'}>
              <Text>Name</Text>
              <Text fontWeight={'bold'}>Cassio</Text>
          </Flex>
          {/* <Flex mx={4} px={2} pb={2} mb={2} justify='space-between' align={'center'} borderBottom='1px solid' borderColor={'whiteAlpha.400'}>
              <Text>ID</Text>
              <Text>#7123</Text>
          </Flex> */}
          <Flex px={6} mb={4} justify='space-between'>
              <Text>Inspired By</Text>
              <VStack align={'flex-end'} spacing={'1px'}>
                <Text textAlign={'right'}>KSCERATO</Text>
                <Text color='whiteAlpha.700' as={'small'}>(50%)</Text>
              </VStack>
          </Flex>
          {/* <Box p={4}>
              <Button w='100%' colorScheme={'purple'}>Mint</Button>
          </Box>
          <SimpleGrid px={4} pb={4} columns={2} columnGap={4}>
              <Button>New PX</Button>
              <Button>Load PX</Button>
          </SimpleGrid> */}
      </Box>

  </>)
}

export default PXStatsBox