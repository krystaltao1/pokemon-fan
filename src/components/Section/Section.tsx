import { useId, type FC, type ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const section = tv({
  slots: {
    base: 'flex flex-col gap-3',
    header: 'flex items-center justify-between',
    headline: 'font-semibold',
  },
  variants: {
    heading: {
      h2: { headline: 'text-lg' },
      h3: { base: 'rounded-lg border border-gray-200 bg-white p-4' },
    },
  },
})

interface Props extends VariantProps<typeof section> {
  heading: 'h2' | 'h3'
  title: string
  count: number
  action?: ReactNode
  children: ReactNode
}

const Section: FC<Props> = ({ heading, title, count, action, children }) => {
  const headingId = useId()
  const Heading = heading
  const { base, header, headline } = section({ heading })

  return (
    <section aria-labelledby={headingId} className={base()}>
      <div className={header()}>
        <Heading id={headingId} className={headline()}>
          {title} ({count})
        </Heading>
        {action}
      </div>
      {children}
    </section>
  )
}

export default Section
