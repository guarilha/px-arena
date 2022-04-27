import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Airdrop from './components/Airdrop'
import ArenaPage from './pages/Arena'
import Rewards from './pages/Rewards'

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<ArenaPage />} />

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
