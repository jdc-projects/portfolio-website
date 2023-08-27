import { Flex, Text, Space } from "@mantine/core"
import Anchor from 'components/Anchor'
import { IconArrowLeft } from "@tabler/icons-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Anchor href='/projects' underline='never' >
        <Flex direction='row' justify='flex-start' align='center' >
          <IconArrowLeft/><Text>Back to Projects</Text>
        </Flex>
      </Anchor>
      <Space/>
      {children}
    </>
  )
}
