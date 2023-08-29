import { Flex, Text } from "@mantine/core"
import Anchor from "components/Anchor"
import { IconError404 } from "@tabler/icons-react"

export default function NotFound() {
  return (
    <Flex direction='column' align='center' >
      <IconError404 size={400} stroke={1.5} />
      <Text>Oops! You're not supposed to be here!</Text>
      <Anchor href='/'>Go Back Home</Anchor>
    </Flex>
  )
}
