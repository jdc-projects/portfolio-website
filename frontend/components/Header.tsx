import { Center, Flex, Anchor } from '@mantine/core';

export default function Header(props) {
  return (
    <Flex h={50} gap='md' justify='center' align='center' direction='row'>
      {props.navs.map(nav => {
        return <Anchor href={nav.route} underline='never' c='black' key={nav.name} >{nav.name}</Anchor>
      })}
    </Flex>
  )
}
