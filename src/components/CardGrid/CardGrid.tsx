import type { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const CardGrid: FC<Props> = ({ children }) => (
  <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{children}</ul>
)

export default CardGrid
