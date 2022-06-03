
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Center,
} from '@chakra-ui/react';
import usePoints from '../../hooks/usePoints';
import { useAccounts } from '../../providers/AccountsProvider';
import ConnectButton from '../ConnectButton';

const NavLink = ({ children, isActive, to }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    fontWeight={isActive ? 'bold' : 'normal'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={to}>
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accounts = useAccounts();
  const { data: points, isLoading } = usePoints(accounts[0]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
          <Heading size='sm'>PX</Heading>
          <Stack direction={'row'} spacing={7}>
            <NavLink isActive={true} to={'/'}>Streams</NavLink>
            <NavLink to={'/music'}>Music</NavLink>
            <NavLink to={'/video'}>Video</NavLink>
          </Stack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                    <Stack direction='row'>
                  <Box pt={'0.25rem'}>
                  <Text>{points?.amount}</Text>
                  <Text fontSize='xx-small'>POINTS</Text>
                  </Box>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                  </Stack>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center w='full' justifyContent='center'>
                    <ConnectButton />
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Invite Friends</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}