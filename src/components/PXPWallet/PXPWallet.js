import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useAccounts } from "../../providers/AccountsProvider";
import usePoints from "../../hooks/usePoints";

export const PXPWallet = () => {
  const accounts = useAccounts();
  const { data: points, isLoading } = usePoints(accounts[0]);
  
  return (
    <>
    {accounts[0] && 
      <Center w={"full"}>
        <Box
          // maxW={'270px'}
          w={"full"}
          bgGradient="linear(to-r, green.400,purple.500)"
          boxShadow={"2xl"}
          rounded={"xl"}
          overflow={"hidden"}
        >
          <Flex
            justify="space-between"
            align="center"
            position={"relative"}
            px={{base:3, md:4}}
            py={{base:1, md:2}}
          >
            <Box>
              <Heading fontSize={{base:'sm', md:'lg'}} fontWeight={500} mr={4}>
                PX Points 
              </Heading>
            </Box>
            <Stack spacing={0} align={"end"}>
              <Heading
                fontSize={{base:'sm', md:'lg'}}
                fontWeight={"bold"}
                fontFamily={"IBM Plex Mono"}
              >
                {isLoading ? <Spinner size='sm' /> : points?.amount}
              </Heading>
            </Stack>
          </Flex>
        </Box>
      </Center>
      }
    </>
  );
};


export default PXPWallet;
