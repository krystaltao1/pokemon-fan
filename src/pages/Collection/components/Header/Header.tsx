import type { FC } from 'react'
import CreateGroup from '@components/CreateGroup'

const Header: FC = () => (
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">My Collection</h1>
    <CreateGroup />
  </div>
)

export default Header
