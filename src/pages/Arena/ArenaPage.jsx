
import {
    Avatar,
    Center,
    Flex,
    Grid,
    GridItem,
    VStack,
    Tooltip,
    AvatarBadge,
    SimpleGrid,
    Spinner,
    PopoverTrigger,
    Popover,
    Heading,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Box,
    Image,
    Text,
    Button,
    Icon,
    Link,
    IconButton,
    HStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import loadable from '@loadable/component';
import axios from "axios";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import ReactPlayer from "react-player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'

import useStreamers from "../../hooks/useStreamers";
import { useAccounts } from "../../providers/AccountsProvider";
import { faAnglesLeft, faAnglesRight, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import PXWallet from "../../components/PXWallet";
import Navbar from "../../components/Navbar";

const AntiCheat = loadable(() => import('../../components/AntiCheat'));
const ConnectButton = loadable(() => import('../../components/ConnectButton'));
const PXPWallet = loadable(() => import("../../components/PXPWallet"));

const trackEvent = (account, stream) => {
    const http = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'https://furia-api.herokuapp.com/',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = {
        eventType: 'changeStream',
        user: account,
        currentStream: stream,
        activity: {
            idle: false
        }
    }
    if (data.user) http.post('/track', data)
}

export const Ads = () => {
    const renderDaoVote = () => (
        <Grid templateColumns='repeat(6, 1fr)' alignItems={'center'} gap={4} p={4} rounded='xl' border={'1px solid'} borderColor='purple.500' w='100%'>
            <GridItem colSpan={1}>
                <Image w='100%' objectFit='cover' loading="lazy" src="https://furia.fbitsstatic.net/img/b/b4db2d6b-8767-403a-bfba-3fed9db3c28a.png" alt="Red Bull" />
            </GridItem>
            <GridItem colSpan={4}>
                <Box colSpan={4}>
                    <Text fontSize={'md'}>Want a <b>Red Bull</b> sponsored collection?</Text>
                </Box>
            </GridItem>
            <GridItem>
                <Button size={'sm'} colorScheme='purple' w='100%'>
                    Vote!
                </Button>
            </GridItem>
        </Grid>
    )

    return (
        <>{renderDaoVote()}</>
    )
}


const LandingPage = () => {
    return <Center h='100vh'>
    <VStack w='50vw' textAlign='center' spacing={4}>
        <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Watch your favorite{' '}
            <Text as={'span'} color={'purple.400'}>
                streamers
            </Text>
            {' '}to earn points
        </Heading>
        <Text color={'gray.500'} fontSize='xl' pb={12}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt minus corporis, iste illum fugiat quos repellendus, repellat necessitatibus nulla ad, quod ipsa assumenda velit! Eligendi reiciendis alias rerum provident rem.
        </Text>
        <ConnectButton />
    </VStack>
</Center>
}


export default function ArenaPage() {
    const { data: streamers, isLoading: isLoadingStreamers } = useStreamers();
    const accounts = useAccounts();
    const [search, setSearch] = useState("");
    const [playing, setPlaying] = useState(true);
    const initialFocusRef = React.useRef();
    const [showSidebar, setShowSidebar] = useState(true)
    const firstStream = streamers ? streamers[0].userName : "FURIAtv"
    const [channel, setChannel] = useState(firstStream)
    if (isLoadingStreamers) return <Center h='100vh'><Spinner /></Center>

    const filteredStreamers = !search
        ? streamers
        : streamers.filter((streamer) => {
            const matchesUserName = streamer.userName.toLowerCase().includes(search.toLowerCase())
            let matchesGameName = false
            if (streamer.stream) {
                matchesGameName = streamer.stream.gameName.toLowerCase().includes(search.toLowerCase())
            }
            return matchesUserName || matchesGameName
        }
        );

    const RenderAvatar = ({ index, style }) => {
        const streamer = filteredStreamers[index]

        return (
            <Tooltip
                key={`${streamer.id}-${streamer.userName}`}
                label={`${streamer.userName}: ${(streamer.stream ? streamer.stream.gameName + ': ' : '')}${(streamer.liveViewers || streamer.views).toLocaleString()} ${streamer.liveViewers ? 'viewers' : 'views'}`}
                fontSize='md'
                placement='top' hasArrow bg='blackAlpha.900' color="gray.200" p={3} rounded={'lg'}
            >

                <Avatar
                    onClick={() => { setChannel(`${streamer.userName}`); trackEvent(accounts[0], streamer.userName); }}
                    mr={4}
                    size={'md'}
                    name={streamer.userName}
                    src={process.env.REACT_APP_API_URL || 'https://furia-api.herokuapp.com' + streamer.profilePictureUrl}
                    sx={streamer.userName === channel ?
                        {
                            cursor: 'pointer',
                            bg: 'green.300',
                            borderColor: 'green.300',
                            padding: '2px',
                            border: '1px',
                            position: style.position,
                            left: style.left,
                            right: style.right,
                            top: style.top,
                        }
                        :
                        {
                            cursor: 'pointer',
                            position: style.position,
                            left: style.left,
                            right: style.right,
                            top: style.top,
                        }
                    }
                    _hover={{ border: '1px solid', borderColor: 'purple.400' }}
                >
                    <AvatarBadge boxSize='1em' bg={streamer.isLive ? 'green.500' : 'red.500'} />
                </Avatar>
            </Tooltip>
        )
    }

    return (
        <AntiCheat channel={channel} account={accounts[0]} h='100%' w='100%' overflow='hidden'>
            {(accounts && accounts.length > 0) ? <>
                <Navbar />
                <Grid
                    h={{ base: 'calc(100vh - 48px -8px)', md: 'calc(100vh - 3rem - 86px)' }}
                    w='100%'
                    templateColumns='repeat(6, 1fr)'
                    gap={{ base: 0, md: 2 }}
                    bg='black'
                    overflow={'hidden'}
                    p={{ base: 0, md: 2 }}

                >

                    {/* <GridItem colSpan={6} display={{ base: 'block', md: 'none' }} px={2} pt={2} pb={{ base: 1, md: 2 }}>
                        <VStack spacing={2}>
                            <ConnectButton />
                        </VStack>
                    </GridItem> */}

                    <GridItem colSpan={{ base: 6, md: (showSidebar ? 5 : 6) }} h={{ base: '25vh', md: 'full' }}>
                        <ReactPlayer
                            url={ `https://twitch.tv/${channel}`}
                            width='100%'
                            height='100%'
                            playing={playing}
                            onPause={() => setPlaying(false)}
                            onPlay={() => setPlaying(true)}
                        />
                        <Box
                            position="absolute"
                            top={'3.5rem'}
                            right={0}
                            p={0}
                            rounded='lg'
                            bg="black"
                            display={showSidebar ? 'none' : 'block'}>
                            <IconButton
                                size='sm'
                                onClick={() => setShowSidebar(true)}
                                variant="solid"
                                icon={<Icon fontSize='1rem'><FontAwesomeIcon icon={faAnglesLeft} /></Icon>}
                            />
                        </Box>
                    </GridItem>
                    <GridItem display={showSidebar ? 'block' : 'none'} colSpan={{ base: 6, md: 1 }} minW={{ base: 'full', md: '200px' }} mt={{ base: 1, md: 0 }} h={{ base: '65vh', md: 'full' }} position='relative'>
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            p={0}
                            rounded='lg'
                            bg="black"
                            >
                        <IconButton
                            size='sm'
                            variant="solid"
                            onClick={() => setShowSidebar(false)}
                            icon={<Icon fontSize='1rem'><FontAwesomeIcon icon={faAnglesRight} /></Icon>}
                        />
                        </Box>
                        <VStack h='100%' align={'flex-start'}>
                            <Box w='100%' display={{ base: 'none', md: 'block' }}>
                                <HStack spacing={2} mb={2}>
                                    {/* <ConnectButton /> */}
                                </HStack>
                            </Box>
                            {/* <PXWallet /> */}
                            <Box w='100%' h='100%' >
                                {channel !== "" &&
                                    <iframe src={`https://www.twitch.tv/embed/${channel}/chat?darkpopout&migration=true&parent=${window.location.hostname}`}
                                        width='100%'
                                        height='100%'
                                        title="twitch-chat"
                                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals"
                                    >
                                    </iframe>
                                }
                            </Box>
                            <Button w='full' colorScheme={'twitter'} as={Link}>Tweet</Button>
                        </VStack>
                    </GridItem>
                </Grid>
                <Grid w='100%' templateColumns='repeat(1, 1fr)'>
                    <GridItem sx={{ overflowX: 'scroll', overflowY: 'hidden' }}>
                        <Flex p={{ base: 2, md: 4 }} direction="row" sx={{ width: '100%', whiteSpace: 'nowrap' }}>
                            <Popover
                                initialFocusRef={initialFocusRef}
                                placement='bottom'
                                closeOnBlur={false}
                                onClose={() => setSearch('')}
                            >
                                <PopoverTrigger>
                                    <Avatar
                                        bg='gray.300'
                                        icon={<Icon fontSize='1.5rem'><FontAwesomeIcon icon={faMagnifyingGlass} /></Icon>}
                                        mr={4}
                                        opacity={0.4}
                                        style={{ cursor: 'pointer' }}
                                        size={'md'}
                                    />
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <InputGroup my={1}>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    children={<Icon color='gray.300'><FontAwesomeIcon icon={faMagnifyingGlass} /></Icon>}
                                                />
                                                <Input
                                                    ref={initialFocusRef}
                                                    placeholder='Search'
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    value={search}
                                                />
                                                <InputRightElement
                                                    children={<PopoverCloseButton />}
                                                />
                                            </InputGroup>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>

                            {!isLoadingStreamers ?
                                <Box w="100%"
                                >
                                    <AutoSizer>
                                        {({ height, width }) => (
                                            <FixedSizeList
                                                height={height + 12}
                                                width={width}
                                                itemCount={filteredStreamers.length}
                                                itemSize={58}
                                                layout="horizontal"
                                            >
                                                {RenderAvatar}
                                            </FixedSizeList>
                                        )}
                                    </AutoSizer>
                                </Box>
                                : <Spinner />}
                        </Flex>
                    </GridItem>
                </Grid>
            </> : <>
                <LandingPage />
            </>}
        </AntiCheat>
    )
}
