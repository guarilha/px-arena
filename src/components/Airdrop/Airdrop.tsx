import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AspectRatio,
    Box,
    Button,
    Center,
    Container,
    Flex,
    GlobalStyle,
    Heading,
    HeadingProps,
    HStack,
    Icon,
    Image,
    LightMode,
    Link,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import axios from 'axios'
import {
    FcAdvertising,
    FcAssistant,
    FcCalendar,
    FcCollaboration,
    FcDonate,
    FcDoughnutChart,
    FcInTransit,
    FcMultipleDevices,
    FcPrivacy,
    FcSafe,
    FcTimeline,
    FcVideoCall,
    FcVoicePresentation
} from 'react-icons/fc'
import { useAccounts } from '../../providers/AccountsProvider';
import { useWeb3 } from '../../providers/Web3Provider';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { ReactElement } from 'react';

import ReactPlayer from "react-player/youtube";

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://furia-api.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
})

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack align={'center'}>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                mb={1}>
                {icon}
            </Flex>
            <Heading fontWeight={"bold"} fontSize={'2xl'} textAlign={'center'}>{title}</Heading>
            <Text fontSize={'md'} color={'gray.800'} textAlign={'center'}>{text}</Text>
        </Stack>
    );
};

const Airdrop = () => {
    const accounts = useAccounts()
    const { web3, connect, disconnect, toggleModal, isConnected } = useWeb3()


    const WalletViewer = () => (<Tag
        size='sm'
        borderRadius='full'
        // onClick={toggleModal}
        fontFamily={'monospace'}
        py={2}
        px={4}
        fontSize={'sm'}
    >
        <Icon as={IoCheckmarkCircle} fontSize="sm" mr={2} color={"green.300"} /> {accounts[0].slice(0, 4) + '…' + accounts[0].slice(accounts[0].length - 3, accounts[0].length)}
    </Tag>)

    const Connect = () => (
        <Button
            size='lg'
            colorScheme={'blackAlpha'}
            bg={'black'}
            onClick={connect}
            rounded={0}
        >
            Conectar a Carteira
        </Button>
    )

    const signMessage = async () => {
        if (web3) {
            const msg = "Estou no AirDrop da Furia!";
            const messageHash = await web3.eth.personal.sign(msg, accounts[0], 'furia');

            try {
                const result = await http.post('/identity', {
                    wallet: accounts[0],
                    signature: messageHash,
                })
            } catch (e) {
                console.log(e)
            }

            window.location.href = `https://twitter.com/intent/tweet?text=Eu vou participar! ${messageHash} &hashtags=AirdropDaFuria&via=FURIA`
        }
    }

    const CallToAction = () => (
        <Button
            size='lg'
            colorScheme={'blackAlpha'}
            bg={'black'}
            onClick={signMessage}
            rounded={0}
        >
            Quero Participar
        </Button>
    )

    const How = () => (
        <Button
            size='lg'
            variant={'outline'}
            color={headingColor}
            rounded={0}
            bg='white'
            onClick={() => console.log('clicou')}
        >
            Como Funciona?
        </Button>
    )

    const headingColor = 'gray.800'

    return (
        <LightMode>
            <GlobalStyle />
            <Center
                w='100%'
                gap={2}
                bgImage={'/bg_pixel_2.png'}
                bgSize='cover'
                bgPos={'center'}
                overflow={'hidden'}
                py={'72px'}>

                <VStack align={'center'} spacing={8} >
                    <Image src='/icons/FURIA_logo_minimal.svg' boxSize={'320px'} my={8} />

                    <VStack>
                        <Heading size="4xl" fontFamily={'FuriaFontBlack'} textAlign={'center'} color={headingColor}>A FURIA ganhou, você ganha.</Heading>

                        <Text fontSize='xl' textAlign={'center'} color={headingColor}>Todo jogo da Furia tem uma novidade para quem é fã de verdade.</Text>
                    </VStack>

                    <Box py={'36px'} px={8} maxW={'1000px'}>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                            <Feature
                                icon={<Icon as={FcSafe} w={10} h={10} />}
                                title={'1. Conecte sua Carteira Ethereum'}
                                text={
                                    'Se você não conhece ou não tem, clica em "Como Funciona?" que a gente ensina :)'
                                }
                            />
                            <Feature
                                icon={<Icon as={FcVoicePresentation} w={10} h={10} />}
                                title={'2. Compartilhe um Tweet'}
                                text={
                                    'A gente prepara um tweet pra você enviar que é o seu ticket de entrada pra participar.'
                                }
                            />
                            <Feature
                                icon={<Icon as={FcCalendar} w={10} h={10} />}
                                title={'3. Furia ganha, você ganha'}
                                text={
                                    '#DiaDeFuria e a gente venceu? Fica de olho que você recebe um Airdrop na sua carteira.'
                                }
                            />
                        </SimpleGrid>
                    </Box>


                    {accounts.length > 0 ? (
                        <VStack spacing={8} pb={5}>
                            <WalletViewer />
                            <HStack spacing={8}>
                                <CallToAction />
                                {/* <How /> */}
                            </HStack>
                        </VStack>
                    ) : (
                        <HStack>
                            <Connect />
                            {/* <How /> */}
                        </HStack>
                    )}
                </VStack>
            </Center>
            <Box
                w='100%'
                minH={'100vh'}
                bgImage={'/bg_pixel_1.png'}
                bgSize='cover'
                bgPos={'center'}
                mt={8}
                p={'72px'}
                display='block'
            >

                <Text fontSize='xl' mb={8} textAlign={'center'} color={headingColor}>Sua primeira missão? Assista o vídeo e descubra como funciona.</Text>

                <AspectRatio ratio={16 / 9}>
                    <iframe
                        title='naruto'
                        src='https://www.youtube.com/embed/QhBnZ6NPOY0'
                        allowFullScreen
                    />
                </AspectRatio>

            </Box>
            
            <Center
                w='100%'
                gap={2}
                minH={'50vh'}
                bgImage={'/bg_pixel_1.png'}
                bgSize='cover'
                bgPos={'center'}
                py={'72px'}>
                <VStack w='100%'>

                    <Heading pt={`144px`} size="2xl" fontWeight={'bold'} textAlign={'center'} color={headingColor}>Perguntas Frequentes.</Heading>

                    <Text fontSize='xl' textAlign={'center'} color={headingColor}>Fique por dentro com as principais perguntas da comunidade.</Text>

                    <Accordion w='60%' py={'72px'} defaultIndex={[0]} allowToggle>
                        <AccordionItem mb={2}>
                            <h2>
                                <AccordionButton bg={'white'} py={6} px={8}>
                                    <Box flex='1' textAlign='left'>
                                        <Heading fontSize={'xl'}>O que é um Airdrop?</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel bg={'white'} pb={6} px={8}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem mb={2}>
                            <h2>
                                <AccordionButton bg={'white'} py={6} px={8}>
                                    <Box flex='1' textAlign='left'>
                                        <Heading fontSize={'xl'}>Todo mundo ta querendo saber isso aqui</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel bg={'white'} pb={6} px={8}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </VStack>
            </Center>

            <Center
                w='100%'
                h={'100vh'}
                bgImage={'/bg_pixel_2.png'}
                bgSize='cover'
                bgPos={'center'}
                overflow={'hidden'}
                py={'72px'}>

                <Heading size="4xl" fontWeight={'bold'} textAlign={'center'} color={headingColor}>Dúvidas? Pula no Discord.</Heading>


            </Center>
            <Button>

            </Button>
        </LightMode>)
}


export default Airdrop


