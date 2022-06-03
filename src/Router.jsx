
import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'
// import Airdrop from './components/Airdrop'
// import ArenaPage from './pages/Arena'
const Arena = loadable(() => import('./pages/Arena'))
const Music = loadable(() => import('./pages/Music'))
const Video = loadable(() => import('./pages/Video'))
// import Rewards from './pages/Rewards'



const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Arena />} />

      <Route path="music">
        <Route path="" element={<Music />} />
      </Route>

      <Route path="video">
        <Route path="" element={<Video />} />
      </Route>
    </Routes>
  )
}

export default Router
