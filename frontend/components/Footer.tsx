import { Container, Center, Text } from '@mantine/core'

export default function Footer() {
  return (
    <Container pos='sticky' top='100%' >
      <footer>
        <Center h={50} >
          <Text ta='center' >
            © Copyright Jack Chapman {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Center>
      </footer>
    </Container>
  )
}
