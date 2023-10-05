import { Container, Grid, GridCol } from '@mantine/core'
import Anchor from 'components/Anchor'
import Image from 'components/Image'
import HeaderNavigation, { navs as HeaderNavigationNavs } from './HeaderNavigation'

import Logo from 'app/icon.png'

export type navs = HeaderNavigationNavs

type HeaderProps = {
  navs: navs,
}

export default async function Header(props: HeaderProps) {
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
        <HeaderNavigation navs={props.navs}/>
      </Grid>
    </header>
  )
}
