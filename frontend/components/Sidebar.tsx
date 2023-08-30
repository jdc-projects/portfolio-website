import { Flex, Paper, Text, Space } from '@mantine/core'
import Anchor from 'components/Anchor'
import { IconChevronRight } from '@tabler/icons-react'

type nav = { name: string, route: string, }
export type navs = Array<nav>

type SidebarProps = {
  navs: navs,
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Flex direction='column' gap='xs' >
      {props.navs.map(nav => {
        return (
          <Anchor href={nav.route} key={nav.name} underline='never' c='currentColor' >
            <Paper withBorder={true} radius='md' w='100%'  >
              <Flex direction='row' align='center' justify='space-between' h={50} >
                <Text ml={10} >{nav.name}</Text>
                <Flex direction='row' >
                  <IconChevronRight stroke={1.5} />
                  <Space h={0} w={10} />
                </Flex>
              </Flex>
            </Paper>
          </Anchor>
        )
      })}
    </Flex>
  )
}
