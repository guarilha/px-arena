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


const PXWalletAvatar = () => (
  <HStack spacing={3} pt={7}>
    <Avatar
      size={"xl"}
      src={"/px-avatar.png"}
      alt={"Author"}
      css={{
        border: "2px solid rgb(128, 90, 213)",
        // borderColor: 'purple.500'
      }}
      position="absolute"
      bottom={4}
      left={4}
    />
    <HStack
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
    </HStack>
    {/* TODO: When value is 100, left must be different */}
  </HStack>
);

export const PXWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerRef = React.useRef();

  return (
    <>
      <Center w={"full"}>
        <Box
          // maxW={'270px'}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"xl"}
          overflow={"hidden"}
          onClick={onOpen}
          ref={drawerRef}
          sx={{ cursor: "pointer" }}
        >
          <Image
            h={"50px"}
            w={"full"}
            src={"/bg-how-it-works.jpg"}
            objectFit={"cover"}
          />
          <Flex
            mt={-8}
            justify="space-between"
            align="start"
            position={"relative"}
          >
            <Box></Box>
            <Stack spacing={0} align={"end"} mr={4} mt={0} pb={4}>
              <Heading fontSize={"xl"} fontWeight={500} mt={-1} mb={6}>
                @aakkari
              </Heading>
              <Heading
                fontSize={"lg"}
                fontWeight={"bold"}
                fontFamily={"IBM Plex Mono"}
                mt={1}
              >
                420.69
              </Heading>
              <Text color={"gray.500"}>PX Balance</Text>
            </Stack>
          </Flex>
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
