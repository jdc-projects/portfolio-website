import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import yn from 'yn'

const Content = dynamic(() => import('./content.mdx'))

export default function Page() {
  if (process.env.NODE_ENV === 'production' && !yn(process.env.ENABLE_MDX_TEST_PAGE, { default: false })) {
    notFound()
  }
  return <Content />
}
