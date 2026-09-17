import type { FC } from 'react'
import Message from '@components/Message'
import Section from '@components/Section'
import Group from './components/Group'

interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

interface Props {
  groups: { id: string; name: string; members: Pokemon[] }[]
}

const Groups: FC<Props> = ({ groups }) => (
  <Section heading="h2" title="My Groups" count={groups.length}>
    {groups.length === 0 ? (
      <Message>No groups yet. Click “+ New group” at the top right to create one.</Message>
    ) : (
      groups.map((group) => <Group key={group.id} group={group} />)
    )}
  </Section>
)

export default Groups
