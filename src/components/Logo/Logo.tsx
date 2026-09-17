import type { FC } from 'react'
import { Link } from 'react-router'

const Logo: FC = () => (
  <Link to="/" className="text-xl font-bold text-gray-900">
    ⚡ Pokefan
  </Link>
)

export default Logo
