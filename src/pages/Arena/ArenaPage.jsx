import {
    Avatar,
    Center,
    Flex,
    Grid,
    GridItem,
    VStack,
    Tooltip,
    AvatarBadge,
    Spinner,
    PopoverTrigger,
    Popover,
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TwitchChat } from 'react-twitch-embed'
import useStreamers from "../../hooks/useStreamers";
import AntiCheat from "../../components/AntiCheat";
import ConnectButton from "../../components/ConnectButton";

import axios from "axios";
import { useAccounts } from "../../providers/AccountsProvider";
import { PXPWallet } from "../../components/PXPWallet";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import ReactPlayer from "react-player";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


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

export default function ArenaPage() {
    const { data: streamers, isLoading: isLoadingStreamers } = useStreamers();
    const accounts = useAccounts();
    const [search, setSearch] = useState("");
    const initialFocusRef = React.useRef();
    const { height, width } = useWindowDimensions();

    let startStreamer;
    if (!isLoadingStreamers && streamers && streamers[0]) {
        startStreamer = streamers[0].userName
    }
    const [channel, setChannel] = useState(startStreamer || 'FURIAtv')
    if (isLoadingStreamers) return <Center h='100vh'><Spinner /></Center>

    const filteredStreamers = !search
        ? streamers
        : streamers.filter((streamer) =>
            streamer.userName.toLowerCase().includes(search.toLowerCase())
        );

    const RenderAvatar = ({ index, style }) => {
        const streamer = filteredStreamers[index]
        const size = height > width ? 'sm' : 'md'
        return (
            <Tooltip
                key={`${streamer.id}-${streamer.userName}`}
                label={`${streamer.userName}: ${(streamer.liveViewers || streamer.views).toLocaleString()} ${streamer.liveViewers ? 'viewers' : 'views'}`}
                fontSize='md'
                placement='top' hasArrow bg='blackAlpha.900' color="gray.200" p={3} rounded={'lg'}
            >

                <Avatar
                    onClick={() => { setChannel(`${streamer.userName}`); trackEvent(accounts[0], streamer.userName); }}
                    mr={4}
                    size={size || 'md'}
                    name={streamer.userName}
                    src={streamer.profilePictureUrl}
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

    const size = height > width ? 'sm' : 'md'

    return (
        <AntiCheat channel={channel} account={accounts[0]} h='100%' w='100%' overflow='hidden'>
            <Grid
                h={{ base: 'calc(100vh - 48px)', md: 'calc(100vh - 92px)' }}
                w='100%'
                templateColumns='repeat(6, 1fr)'
                gap={{ base: 0, md: 2 }}
                bg='black'
                overflow={'hidden'}
                p={{ base: 0, md: 2 }}>

                <GridItem colSpan={6} display={{ base: 'block', md: 'none' }} px={2} pt={2} pb={{ base: 1, md: 2 }}>
                    <VStack spacing={1}>
                        <ConnectButton />
                    </VStack>
                </GridItem>

                <GridItem colSpan={{ base: 6, md: 5 }} h={{ base: '25vh', md: 'full' }}>
                    <ReactPlayer  
                        url={`https://twitch.tv/${channel}`}
                        width='100%'
                        height='100%'

                    />
                </GridItem>
                <GridItem colSpan={{ base: 6, md: 1 }} minW={{ base: 'full', md: '300px' }} mt={{ base: 1, md: 0 }} h={{ base: '65vh', md: 'full' }} >
                    <VStack h='100%'>
                        <Box w='100%' display={{ base: 'none', md: 'block' }}>
                            <VStack spacing={1}>
                                <ConnectButton />
                                <PXPWallet />
                            </VStack>
                        </Box>
                        {/* <Ads /> */}
                        <TwitchChat
                            channel={channel}
                            width='100%'
                            height='100%'
                            theme='dark'
                        />
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
                                    size={size || 'md'}
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
                            <Box display={'block'} w="100%">
                                <AutoSizer>
                                    {({ height, width }) => (
                                        <FixedSizeList
                                            height={height + 20}
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
        </AntiCheat>
    )
}
