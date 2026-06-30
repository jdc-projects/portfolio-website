'use client'

import { navs } from 'components/Sidebar'
import Sidebar from 'components/Sidebar'
import Collapse from 'components/Collapse'
import { Space } from '@mantine/core'
import { usePathname } from 'next/navigation'

export default function MobileSidebar(props: { navs: navs }) {
  const pathname = usePathname()
  const current = props.navs.find(nav => nav.route === pathname)
  const rawText = current ? current.name : 'Navigation'
  const buttonText = rawText.length > 20 ? `${rawText.slice(0, 20)}...` : rawText

  return (
    <Collapse buttonText={buttonText}>
      <Sidebar navs={props.navs} />
      <Space />
    </Collapse>
  )
}
