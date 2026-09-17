import type { FC } from 'react'
import PokemonGrid from '@components/PokemonGrid'
import Section from '@components/Section'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

interface Props {
  pokemon: Pokemon[]
}

const Favorites: FC<Props> = ({ pokemon }) => (
  <Section heading="h2" title="All Favorites" count={pokemon.length}>
    <PokemonGrid pokemon={pokemon} emptyMessage="No favorites yet" />
  </Section>
)

export default Favorites
