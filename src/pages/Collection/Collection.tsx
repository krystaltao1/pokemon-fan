import type { FC } from 'react'
import PokemonProvider from '@context/PokemonProvider'
import Content from './components/Content'
import Header from './components/Header'

const Collection: FC = () => (
  <div className="flex flex-col gap-6">
    <Header />
    <PokemonProvider>
      <Content />
    </PokemonProvider>
  </div>
)

export default Collection
