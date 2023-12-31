import { Divider, Flex, Text } from '@mantine/core'
import Anchor from 'components/Anchor'

type nav = {
  name: string,
  route: string,
  description?: string | undefined,
}
export type navs = Array<nav>

type SidebarProps = {
  navs: navs,
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Flex direction='column' gap='xs' >
      {props.navs.map(nav => {
        const isFirstItem = nav === props.navs[0]

        return (
          <Flex direction='column' gap='xs' key={nav.name} >
            {!isFirstItem ? <Divider mx={5} /> : null}
            <Anchor href={nav.route} underline='never' c='currentColor' >
              <Flex direction='column' mx={15} >
                <Text size='lg' fw={500} >{nav.name}</Text>
                <Text size='xs' c='dimmed' >{nav.description}</Text>
              </Flex>
            </Anchor>
          </Flex>
        )
      })}
    </Flex>
  )
}
