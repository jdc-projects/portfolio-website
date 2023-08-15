import { Center, Flex, Anchor } from '@mantine/core';

const navs = [
  {
    name: 'Home',
    route: '/'
  },
  {
    name: 'Test',
    route: '/test/'
  },
]

export default function Header() {
  return (
    <Flex h={50} gap='md' justify='center' align='center' direction='row'>
      {navs.map(nav => {
        return <Anchor href={nav.route} underline='never' c='black' key={nav.name} >{nav.name}</Anchor>
      })}
    </Flex>
  )
}
