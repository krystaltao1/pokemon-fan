import type { FC } from 'react'
import Logo from '@components/Logo'
import Navigation from '@components/Navigation'

const Header: FC = () => (
  <header className="border-b border-gray-200 bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Logo />
      <Navigation />
    </div>
  </header>
)

export default Header
