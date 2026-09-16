import type { FC } from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@components/Layout'
import Collection from './pages/Collection'
import Home from './pages/Home'

const App: FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
  </Layout>
)

export default App
