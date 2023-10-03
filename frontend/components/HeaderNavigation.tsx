'use client'

import { GridCol } from 'components/Grid'
import { Flex, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ColourSchemeToggleButton from 'components/ColourSchemeToggleButton'
import Anchor from 'components/Anchor'

type nav = { name: string, route: string, }
export type navs = Array<nav>

type HeaderNavigationProps = {
  navs: navs,
}

export default function HeaderNavigation(props: HeaderNavigationProps) {
  const [opened, { toggle }] = useDisclosure();

  // const desktopHeader = (
  //       <GridCol span={8}>
  //         <Flex gap='xl' justify='center' align='center' direction='row' h='100%' >
  //           {props.navs.map((nav: nav) => {
  //             return (
  //               <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
  //                 {nav.name}
  //               </Anchor>
  //             )
  //           })}
  //         </Flex>
  //       </GridCol>
  //       <GridCol span={2}>
  //         <Flex gap='lg' justify='right' align='center' direction='row' h='100%' >
  //           <ColourSchemeToggleButton/>
  //           <Button mr={100} >Contact Me</Button>
  //         </Flex>
  //       </GridCol>
  // )

  let navigation = <></>
  if (opened) {
    navigation = (
      <Flex gap='xl' justify='center' align='center' direction='column' h='100%' >
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
        {navigation}
      </GridCol>
      <GridCol span={2}>
        <Flex gap='lg' justify='right' align='center' direction='row' h='100%' >
          <ColourSchemeToggleButton/>
          <Burger opened={opened} onClick={toggle} mr={100} aria-label="Toggle navigation" />
        </Flex>
      </GridCol>
    </>
  )
}
