import { Text, Flex, Anchor, Space } from '@mantine/core'

type nav = { name: string, route: string, }
export type navs = Array<nav>

type HeaderProps = {
  navs: navs,
}

export default function Header(props: HeaderProps) {
  return (
    <header>
      <Flex gap='lg' justify='center' align='center' direction='row' >
        {props.navs.map((nav: nav) => {
          return (
            <Anchor href={nav.route} target='_self' underline='never' c='black' size='xl' fw={500} key={nav.name} >
              {nav.name}
            </Anchor>
          )
        })}
      </Flex>
    </header>
  )
}
