import { Container, Center, Text } from '@mantine/core'
import Anchor from 'components/Anchor'

export default function Footer() {
  return (
    <Container pos='sticky' top='100%' >
      <footer>
        <Center>
          <Text ta='center' mb={5} px={5} >
            © Copyright Jack Chapman {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Center>
        <Center mb={15}>
          <Anchor href='/privacy' size='sm' c='dimmed'>Privacy policy</Anchor>
        </Center>
      </footer>
    </Container>
  )
}
