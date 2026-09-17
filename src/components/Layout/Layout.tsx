import type { FC, ReactNode } from 'react'
import Header from '@components/Header'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => (
  <div className="min-h-screen bg-gray-100 text-gray-900">
    <Header />
    <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
  </div>
)

export default Layout
