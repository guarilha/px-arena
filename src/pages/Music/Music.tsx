import loadable from '@loadable/component'
import {
    Box,
    Center,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Progress,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import Navbar from "../../components/Navbar";

import { 
    BiShuffle, 
    BiPlay, 
    BiRepeat, 
    BiFastForward, 
    BiRewind,
    BiVolume
} from "react-icons/bi";

const MusicItem = () => {
    const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')

    return <Box rounded='xl' bg={bgColor} p={4}>
        <Image src={'https://creatornode.audius.co/ipfs/QmXVMM1RVqP6EFKuDq49HYq5aNSKXd24S7vcxR7qcPom6e/640x.jpg'} rounded='md' />
        <Box pt={4}>
            <Heading size={'sm'} lineHeight={'110%'} mb={2} >Playlist Name</Heading>
            <Text fontSize={'sm'}>Playlist description and some cool text...</Text>
        </Box>
    </Box>
}

const PlayControls = () => {
    return <Box position='fixed' bottom={0} w='100vw' p={4} bg='gray.900'>
        <Grid templateColumns='repeat(4, 1fr)' alignItems={'center'} gap={2}>
            <GridItem>
                <HStack>
                    <Image boxSize={16} src={'https://creatornode.audius.co/ipfs/QmXVMM1RVqP6EFKuDq49HYq5aNSKXd24S7vcxR7qcPom6e/640x.jpg'} rounded='md' />
                    <Box pl={4}>
                        <Heading size={'xs'} pb={1}>Song name</Heading>
                        <Text fontSize={'xs'}>Artist Name, ft Another One</Text>
                    </Box>
                </HStack>
            </GridItem>
            <GridItem colSpan={2}>
                
                <HStack align={'center'} justify='center'>
                    <IconButton rounded='full' size='md' aria-label='Play' icon={<Icon as={BiShuffle} />} />
                    <IconButton rounded='full' size='md' aria-label='Play' icon={<Icon as={BiRewind} />} />
                    <IconButton rounded='full' size='md' aria-label='Play' icon={<Icon as={BiPlay} />} />
                    <IconButton rounded='full' size='md' aria-label='Play' icon={<Icon as={BiFastForward} />} />
                    <IconButton rounded='full' size='md' aria-label='Play' icon={<Icon as={BiRepeat} />} />
                </HStack>
                <Center>
                <Progress value={80} w='50%' h={1} mt={4} />
                </Center>
            </GridItem>
            <GridItem>
                <HStack float={'right'}>
                    <Icon as={BiVolume} />
                    <Progress value={80} w='80px' h={1} mt={4} />
                </HStack>
            </GridItem>
        </Grid>
    </Box>
}

const Music = () => {
    const headingColor = useColorModeValue('gray.800', 'gray.300')

    return (<Box w='100vw' bg='black'>
        <Navbar />
        <VStack align={'flex-start'} p={8}>
            <Heading size="md" color={headingColor}>Trending</Heading>
            <Grid templateColumns='repeat(5, 1fr)' alignItems={'center'} gap={4} py={4}>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
            </Grid>
            <Heading size="md" color={headingColor}>Brazilian Storm</Heading>
            <Grid templateColumns='repeat(5, 1fr)' alignItems={'center'} gap={4} py={4}>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
            </Grid>
            <Heading size="md" color={headingColor}>Mood</Heading>
            <Grid templateColumns='repeat(5, 1fr)' alignItems={'center'} gap={4} py={4}>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
                <GridItem>
                    <MusicItem />
                </GridItem>
            </Grid>
        </VStack>
        <PlayControls />
    </Box>)
}


export default Music