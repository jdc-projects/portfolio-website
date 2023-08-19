import { Flex, Anchor, Button } from '@mantine/core'
import Image from "components/Image"
import { Grid, GridCol } from "components/Grid"

import Icon from "app/icon.png"

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
          <Image src={Icon} alt="Placeholder logo" w={50} ml={20} />
        </GridCol>
        <GridCol span={8}>
          <Flex gap='lg' justify='center' align='center' direction='row' h='100%' >
            {props.navs.map((nav: nav) => {
              return (
                <Anchor href={nav.route} target='_self' underline='never' c='black' size='xl' fw={500} key={nav.name} >
                  {nav.name}
                </Anchor>
              )
            })}
          </Flex>
        </GridCol>
        <GridCol span={2}>
          <Flex gap='lg' justify='right' align='center' direction='row' h='100%' >
            <Button mr={20} >Contact Me</Button>
          </Flex>
        </GridCol>
      </Grid>
    </header>
  )
}
