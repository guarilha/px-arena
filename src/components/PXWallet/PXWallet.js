import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  HStack,
  Icon,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useAccounts } from "../../providers/AccountsProvider";
import usePoints from "../../hooks/usePoints";


const PXWalletAvatar = () => (
  <HStack>
    <Avatar
      size={"lg"}
      src={"/profile.gif"}
      alt={"Author"}
      css={{
        border: "2px solid rgb(128, 90, 213)",
        // borderColor: 'purple.500'
      }}
      
    />
    {/* <HStack
      spacing={2}
      position="absolute"
      left={"24px"}
      bottom={3}
      bgGradient="linear(to-t, pink.500, purple.500)"
      px={2}
      rounded={"full"}
      pb={1}
    >
      <Icon as={GiMightyForce} boxSize="1rem" color="white" />
      <Heading
        fontFamily={"IBM Plex Mono"}
        fontWeight="bold"
        fontSize="1rem"
        pt={1}
      >
        80
      </Heading>
    </HStack> */}
    {/* TODO: When value is 100, left must be different */}
  </HStack>
);

export const PXWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = React.useRef();
  const accounts = useAccounts();
  const { data: points, isLoading } = usePoints(accounts[0]);

  return (
    <>
      <Center w={"full"}>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"xl"}
          overflow={"hidden"}
          bgGradient='linear(to-b, purple.500, purple.900)'
          onClick={onOpen}
          ref={drawerRef}
          px={2}
          py={2}
          sx={{ cursor: "pointer" }}
        >

            <HStack justify='space-between' align='center'>
              <PXWalletAvatar />
              <Stack spacing={0} align={"end"} >
              <Heading
                fontSize={"lg"}
                fontWeight={"bold"}
                fontFamily={"IBM Plex Mono"}
                mt={1}
              >
                {points?.amount}
              </Heading>
              <Text color={"gray.300"}>Points</Text>
            </Stack>
            </HStack>
            
        </Box>
      </Center>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={drawerRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"gray.900"}>
          <DrawerCloseButton />
          <DrawerHeader>PX Wallet</DrawerHeader>
          <DrawerBody>
            <Flex justify="space-between">
              <Avatar
                size={"xl"}
                src={"/px-avatar.png"}
                alt={"Author"}
                css={{
                  border: "2px solid white",
                }}
              />
              <Stack spacing={0} align={"end"} verticalAlign={"center"} mt={6}>
                <Heading
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  fontFamily={"IBM Plex Mono"}
                >
                  420.69
                </Heading>
                <Text color={"gray.500"}>Balance</Text>
              </Stack>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={6}>
              <GridItem>
                <Button size="sm" colorScheme="green" isFullWidth={true}>
                  Buy
                </Button>
              </GridItem>
              <GridItem>
                <Button size="sm" isFullWidth={true}>
                  Claim
                </Button>
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PXWallet;
