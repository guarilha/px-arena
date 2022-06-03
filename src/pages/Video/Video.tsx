import loadable from '@loadable/component'
import { 
    Box, 
    Heading, 
    SimpleGrid, 
    useColorModeValue, 
    VStack 
} from '@chakra-ui/react';
import Navbar from "../../components/Navbar";


const MainLayout = loadable(() => import("../../components/MainLayout"));


const Video = () => {
  const headingColor = useColorModeValue('gray.800', 'gray.300')

  return (<>
    <Navbar /> 

  </>)
}


export default Video