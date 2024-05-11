import { Grid, GridCol, Flex } from '@mantine/core'
import Anchor from 'components/Anchor'
import ColourSchemeToggleButton from './ColourSchemeToggleButton'
import ContactButton from './ContactButton'

export type nav = {
  name: string,
  route: string,
}
export type navs = Array<nav>

type DesktopHeaderProps = {
  navs: navs,
}

export default function DesktopHeader(props: DesktopHeaderProps) {
  return (
    <Grid>
      <GridCol span={2} >
        <Flex justify='center' align='center' direction='row' h='100%' ml={50} >
          <ColourSchemeToggleButton />
        </Flex>
      </GridCol>
      <GridCol span={8}>
        <Flex gap='xl' justify='center' align='center' direction='row' h='100%' >
          {props.navs.map((nav: nav) => {
            return (
              <Anchor href={nav.route} underline='never' c='currentColor' size='xl' fw={500} key={nav.name} >
                {nav.name}
              </Anchor>
            )
          })}
        </Flex>
      </GridCol>
      <GridCol span={2} >
        <Flex visibleFrom='sm' justify='center' align='center' direction='row' h='100%' mr={40} >
          <ContactButton/>
        </Flex>
      </GridCol>
    </Grid>
  )
}
