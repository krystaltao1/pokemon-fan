import type { FC } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchBar: FC<Props> = ({ value, onChange }) => (
  <input
    type="search"
    role="searchbox"
    aria-label="Search Pokemon"
    placeholder="🔍 Search Pokemon by name…"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-yellow-400 focus:outline-none"
  />
)

export default SearchBar
