import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

export default function Page() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  const Content = dynamic(() => import('./content.mdx'))
  return <Content />
}
