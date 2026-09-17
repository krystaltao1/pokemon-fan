import { useState, type FC } from 'react'
import PokemonProvider from '@context/PokemonProvider'
import GroupBar from './components/GroupBar'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'

const Home: FC = () => {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <SearchBar value={query} onChange={setQuery} />
      <GroupBar />
      <PokemonProvider>
        <PokemonList query={query} />
      </PokemonProvider>
    </div>
  )
}

export default Home
