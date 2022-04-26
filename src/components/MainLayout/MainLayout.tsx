import { Box, Container } from "@chakra-ui/react"


export type MainLayoutProps = {
  activeMenuItem?: string
}

  
const MainLayout: React.FC<MainLayoutProps> = ({
    children,
  }) => {
    return (
    <Container
        display="flex"
        flexDirection="column"
        maxW="container.xl"
        minH="100vh"
        >

        {children}
    </Container>
    )
}

export default MainLayout