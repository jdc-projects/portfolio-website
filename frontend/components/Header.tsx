import { Container, Center, Text, Paper, Flex, Anchor } from '@mantine/core';

type nav = { name: string; route: string; }
export type navs = Array<nav>

type HeaderProps = {
  navs: navs;
}

export default function Header(props: HeaderProps) {
  return (
    <Container >
      <header>
        <Center h={100} >
          <Paper h={50} >
            <Flex gap='md' justify='center' align='center' direction='row'>
              {props.navs.map((nav: nav) => {
                return (
                  <Anchor href={nav.route} target='_self' underline='never' c='black' key={nav.name} >
                    <Text fw={500} >{nav.name}</Text>
                  </Anchor>
                )
              })}
            </Flex>
          </Paper>
        </Center>
      </header>
    </Container>
  )
}
