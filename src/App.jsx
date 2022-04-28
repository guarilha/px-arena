import loadable from '@loadable/component'

const Router = loadable(() => import('./Router'))

const App = () => {
  return <Router />
}

export default App
