import { Container, Flex, Button } from '@mantine/core'
import Anchor from 'components/Anchor'
import Image from 'components/Image'
import { Grid, GridCol } from 'components/Grid'

import Logo from 'app/icon.png'

type nav = { name: string, route: string, }
export type navs = Array<nav>

type HeaderProps = {
  navs: navs,
}

export default function Header(props: HeaderProps) {
  return (
    <header>
      <Grid>
        <GridCol span={2} >
          <Container w={60} ml={100} >
            <Anchor href='/' underline='never' >
              <Image src={Logo} alt="Website logo" />
            </Anchor>
          </Container>
        </GridCol>
        <GridCol span={8}>
          <Flex gap='xl' justify='center' align='center' direction='row' h='100%' >
            {props.navs.map((nav: nav) => {
              return (
                <Anchor href={nav.route} underline='never' c='var(--default-mantine-color)' size='xl' fw={500} key={nav.name} >
                  {nav.name}
                </Anchor>
              )
            })}
          </Flex>
        </GridCol>
        <GridCol span={2}>
          <Flex gap='lg' justify='right' align='center' direction='row' h='100%' >
            <Button mr={100} >Contact Me</Button>
          </Flex>
        </GridCol>
      </Grid>
    </header>
  )
}
