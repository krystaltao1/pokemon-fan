import { useMemo, type FC } from 'react'
import CardGrid from '@components/CardGrid'
import Message from '@components/Message'
import PokemonCard from '@components/PokemonCard'
import usePagination from '@hooks/usePagination'
import usePokemon from '@hooks/usePokemon'
import Pagination from './components/Pagination'
import filterByName from './utils/filterByName'

const PAGE_SIZE = 20

interface Props {
  query: string
}

const PokemonList: FC<Props> = ({ query }) => {
  const pokemon = usePokemon()
  const filtered = useMemo(() => filterByName(pokemon, query), [pokemon, query])
  const { page, setPage, pageItems, totalPages } = usePagination(filtered, PAGE_SIZE)

  if (filtered.length === 0) return <Message>No Pokemon named "{query.trim()}"</Message>

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        {filtered.length} Pokemon · Page {page} / {totalPages}
      </p>
      <CardGrid>
        {pageItems.map((item) => (
          <li key={item.id}>
            <PokemonCard pokemon={item} />
          </li>
        ))}
      </CardGrid>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}

export default PokemonList
