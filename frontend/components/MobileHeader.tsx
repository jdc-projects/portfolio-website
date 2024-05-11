'use client'

import { Grid, GridCol, Flex, Burger, Collapse, Space } from '@mantine/core'
import Anchor from 'components/Anchor'
import ColourSchemeToggleButton from './ColourSchemeToggleButton'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useDisclosure } from '@mantine/hooks'
import ContactButton from './ContactButton'
import { nav, navs } from 'components/DesktopHeader'

type MobileHeaderProps = {
  navs: navs,
}

export default function MobileHeader(props: MobileHeaderProps) {
  return(
    <Suspense>
      <MobileHeaderComponent navs={props.navs} />
    </Suspense>
  )
}

function MobileHeaderComponent(props: MobileHeaderProps) {
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
    <Grid>
      <GridCol span={2} >
        <Flex justify='center' align='center' direction='row' h='100%' ml={50} >
          <ColourSchemeToggleButton />
        </Flex>
      </GridCol>
      <GridCol span={8}>
      </GridCol>
      <GridCol span={2} >
        <Flex justify='center' align='center' direction='row' h='100%' mr={50} >
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
        </Flex>
      </GridCol>
      <GridCol span={12} m={0} p={0} >
        <Collapse in={opened} >
          <Flex gap='md' justify='center' align='center' direction='column' >
            {props.navs.map((nav: nav) => {
              return (
                <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
                  {nav.name}
                </Anchor>
              )
            })}
            <ContactButton />
          </Flex>
          <Space h={10} />
        </Collapse>
      </GridCol>
    </Grid>
  )
}
