'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Flex, Burger, GridCol, Collapse, Center } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Anchor from 'components/Anchor'
import ContactButton from './ContactButton'

export type nav = { name: string, route: string, }
export type navs = Array<nav>

type MobileNavigationProps = {
  navs: navs,
}

export default function MobileNavigation(props: MobileNavigationProps) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let lastUrl = ""
    const url = "${pathname}?${searchParams}"

    if (lastUrl !== url) {
      close()
    }

    lastUrl = url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  return (
    <>
      <GridCol span={2}>
        <Flex visibleFrom='sm' justify='center' align='center' direction='row' h='100%' mr={40} >
          <ContactButton/>
        </Flex>
        <Flex hiddenFrom='sm' justify='center' align='center' direction='row' h='100%' mr={50} >
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
        </Flex>
      </GridCol>
      <GridCol hiddenFrom='sm' span={12} m={0} p={0} >
        <Collapse in={opened} >
          <Flex gap='md' justify='center' align='center' direction='column' h='100%' mb={10} >
            {props.navs.map((nav: nav) => {
              return (
                <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
                  {nav.name}
                </Anchor>
              )
            })}
            <ContactButton/>
          </Flex>
        </Collapse>
      </GridCol>
    </>
  )
}
