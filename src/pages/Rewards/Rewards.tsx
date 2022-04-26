import { Box, Button, Center, Heading, HeadingProps, SimpleGrid, Stack, Tag, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FcAdvertising, FcCalendar, FcCollaboration, FcDoughnutChart, FcMultipleDevices, FcPrivacy, FcTimeline, FcVideoCall } from 'react-icons/fc'
import { motion } from 'framer-motion'
import MainLayout from "../../components/MainLayout";

const MotionHeading = motion<HeadingProps>(Heading)

interface FeatureProps {
  title: string
  children: React.ReactNode
  icon: React.ReactElement
  soon?: boolean
}

export const Feature = (props: FeatureProps) => {
  const { title, children, icon, soon } = props
  const bg = useColorModeValue('gray.100', 'gray.800')
  const inactiveBg = useColorModeValue('gray.100', 'blackAlpha.300')

  return (
    <Stack
      spacing={{ base: '4', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
      bg={soon ? inactiveBg : bg}
      rounded='2xl'
      p={{ base: '4', md: '6' }}
      align={'center'}
    >
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
          {soon && 
          <Tag float={'right'} colorScheme='red' variant={'solid'}>SOON</Tag>
          }
        </Text>
        <Box color={useColorModeValue('gray.600', 'gray.400')}>{children}</Box>
      </Stack>
    </Stack>
  )
}



const Rewards = () => {
  const headingColor = useColorModeValue('gray.800', 'gray.300')

  const motionProps = {
    variants: {
      hidden: {
        opacity: 0,
        y: -2,
      },
      shown: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay: 0.2,
        },
      },
    },
    initial: 'hidden',
    animate: 'shown',
  }

  return (<MainLayout>
    <VStack align={'center'}>
    <MotionHeading my={8} size="lg" color={headingColor} {...motionProps}>PX Activities</MotionHeading>
      <Box as="section" maxW="5xl" mx="auto" >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={{ base: '4', md: '6' }} spacingY={{ base: '4', md: '6' }}>
          <Feature title="Watch Streams" icon={<FcVideoCall />}>
            <VStack align={'start'}>
              <Text>
                Connect your Wallet to PX Arena and Watch our Streamers to receive airdrops.
              </Text>
              <Button size={'sm'} colorScheme={'purple'}>Go To PX Arena</Button>
            </VStack>
          </Feature>
          <Feature title="Engage with FURIA on Social Networks" icon={<FcAdvertising />}>
            <VStack align={'start'}>
              <Text>
                Tweet using #DiaDeFuria, tag FURIA's official accounts, or publicly share our posts.
              </Text>
              <Button size={'sm'} colorScheme={'purple'}>Register Post</Button>
            </VStack>
          </Feature>
          <Feature title="Attend FURIA Events" icon={<FcCalendar />} soon={true}>
            Games and other important FURIA Events will distribute extra points for those who attend.
          </Feature>
          <Feature title="Invite Your Friends" icon={<FcCollaboration />} soon={true}>
            When your friend completes 1000 points, you both receive 100 points from the referral. 
          </Feature>
          <iframe src="https://audius.co/embed/track/WbVQK?flavor=compact" width="100%" height="480" allow="encrypted-media" style={{border: "none"}}></iframe>
        </SimpleGrid>
      </Box>
    </VStack>
  </MainLayout>)
}


export default Rewards