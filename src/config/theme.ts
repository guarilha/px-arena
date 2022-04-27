import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
}

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: "'FuriaFontBlack', sans-serif",
    body: "'Roboto', sans-serif"
  },
  styles: {
    global: (props: Record<string, unknown>) => ({
      body: {
        bg: mode('white', 'gray.900')(props),
      },
    }),
  },
})

export default theme
