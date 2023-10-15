'use client'

import { Flex, Burger, GridCol, Collapse } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Anchor from 'components/Anchor'
import { isMobile } from 'utils/viewport'

export type nav = { name: string, route: string, }
export type navs = Array<nav>

type MobileNavigationProps = {
  navs: navs,
}

export default function MobileNavigation(props: MobileNavigationProps) {
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
  }

  return (
    <>
      <GridCol span={2}>
        <Flex hiddenFrom='sm' justify='center' align='center' direction='row' h='100%' mr={50} >
          {mobile ? <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" /> : null}
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
          </Flex>
        </Collapse>
      </GridCol>
    </>
  )
}
