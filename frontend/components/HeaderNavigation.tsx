'use client'

import { Flex, Burger, GridCol } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ColourSchemeToggleButton from 'components/ColourSchemeToggleButton'
import Anchor from 'components/Anchor'
import { isMobile } from 'utils/viewport'

type nav = { name: string, route: string, }
export type navs = Array<nav>

type HeaderNavigationProps = {
  navs: navs,
}

export default function HeaderNavigation(props: HeaderNavigationProps) {
  const [opened, { toggle }] = useDisclosure()
  const mobile = isMobile()

  let navigation = <></>
  if (mobile && opened) {
    navigation = (
      <GridCol span={12}>
        <Flex gap='xl' justify='center' align='center' direction='column' h='100%' >
          {props.navs.map((nav: nav) => {
            return (
              <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
                {nav.name}
              </Anchor>
            )
          })}
        </Flex>
      </GridCol>
    )
  } else {
    navigation = (
      <Flex gap='xl' justify='center' align='center' direction='row' h='100%' >
        {props.navs.map((nav: nav) => {
          return (
            <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
              {nav.name}
            </Anchor>
          )
        })}
      </Flex>
    )
  }

  return (
    <>
      <GridCol span={8}>
        {(!mobile) ? navigation : null}
      </GridCol>
      <GridCol span={2}>
        <Flex gap='lg' justify='right' align='center' direction='row' h='100%' mr={100} >
          <ColourSchemeToggleButton/>
          {mobile ? <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" /> : null}
        </Flex>
      </GridCol>
      {(mobile && opened) ? navigation : null}
    </>
  )
}
