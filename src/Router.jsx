
import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'
// import Airdrop from './components/Airdrop'
// import ArenaPage from './pages/Arena'
const Airdrop = loadable(() => import('./pages/Airdrop'))
const Arena = loadable(() => import('./pages/Arena'))
const Rewards = loadable(() => import('./pages/Rewards'))
// import Rewards from './pages/Rewards'



const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Arena />} />

      <Route path="rewards">
        <Route path="" element={<Rewards />} />
      </Route>

      <Route path="airdrop">
        <Route path="" element={<Airdrop />} />
      </Route>
    </Routes>
  )
}

export default Router
