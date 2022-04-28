import "@fontsource/dm-sans"
import "@fontsource/ibm-plex-mono"

import loadable from '@loadable/component'

import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import Web3Provider from './providers/Web3Provider'
// import AccountsProvider from './providers/AccountsProvider'
// import ReactQueryProvider from './providers/ReactQueryProvider'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './config/theme'

import "./fonts.css"

const App = loadable(() => import('./App'))

const AccountsProvider = loadable(() => import('./providers/AccountsProvider'))
const ReactQueryProvider = loadable(() => import('./providers/ReactQueryProvider'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider resetCSS theme={theme}>
            <Web3Provider>
              <AccountsProvider>
                    <App />
              </AccountsProvider>
            </Web3Provider>
        </ChakraProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
