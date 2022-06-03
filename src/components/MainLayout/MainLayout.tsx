import { Container } from "@chakra-ui/react"
import Navbar from '../Navbar'

export type MainLayoutProps = {
  activeMenuItem?: string
}

  
const MainLayout: React.FC<MainLayoutProps> = ({
    children,
  }) => {
    return (
      <>
      <Navbar />
      <Container
          display="flex"
          flexDirection="column"
          maxW="container.xl"
          >
          {children}
      </Container>
    </>
    )
}

export default MainLayout