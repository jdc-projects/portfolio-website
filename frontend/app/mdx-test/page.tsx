import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const Content = dynamic(() => import('./content.mdx'))

export default function Page() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  return <Content />
}
