import { Center, Flex, Anchor } from '@mantine/core';

type nav = { name: string; route: string; }
export type navs = Array<nav>

type HeaderProps = {
  navs: navs;
}

export default function Header(props: HeaderProps) {
  return (
    <Flex h={50} gap='md' justify='center' align='center' direction='row'>
      {props.navs.map((nav: nav) => {
        return <Anchor href={nav.route} target='_self' underline='never' c='black' key={nav.name} >{nav.name}</Anchor>
      })}
    </Flex>
  )
}
