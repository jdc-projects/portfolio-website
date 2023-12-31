import { Grid, GridCol, Flex } from '@mantine/core'
import Anchor from 'components/Anchor'
import MobileNavigation, { nav as MobileNavigationNav, navs as MobileNavigationNavs } from './MobileNavigation'
import ColourSchemeToggleButton from './ColourSchemeToggleButton'
import { Suspense } from 'react'

export type nav = MobileNavigationNav
export type navs = MobileNavigationNavs

type HeaderProps = {
  navs: navs,
}

export default async function Header(props: HeaderProps) {
  return (
    <header>
      <Grid>
        <GridCol span={2} >
          <Flex justify='center' align='center' direction='row' h='100%' ml={50} >
            <ColourSchemeToggleButton/>
          </Flex>
        </GridCol>
        <GridCol span={8}>
          <Flex visibleFrom='sm' gap='xl' justify='center' align='center' direction='row' h='100%' >
            {props.navs.map((nav: nav) => {
              return (
                <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
                  {nav.name}
                </Anchor>
              )
            })}
          </Flex>
        </GridCol>
        <Suspense fallback={null} >
          <MobileNavigation navs={props.navs}/>
        </Suspense>
      </Grid>
    </header>
  )
}
