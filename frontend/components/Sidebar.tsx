import { Flex, Paper, Text } from '@mantine/core'
import Anchor from 'components/Anchor'
import { IconChevronRight } from '@tabler/icons-react'

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
        return (
          <Anchor href={nav.route} key={nav.name} underline='never' c='currentColor' >
            <Paper withBorder={true} radius='md' w='100%'  >
              <Flex direction='row' align='center' justify='space-between' h={60} >
                <Flex direction='column' ml={15} >
                  <Text size='lg' fw={500} >{nav.name}</Text>
                  <Text size='xs' c='dimmed' >{nav.description}</Text>
                </Flex>
                <Flex direction='row' mr={10} >
                  <IconChevronRight stroke={1.5} />
                </Flex>
              </Flex>
            </Paper>
          </Anchor>
        )
      })}
    </Flex>
  )
}
