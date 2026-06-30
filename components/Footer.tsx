import { Container, Center, Text } from '@mantine/core'

export default function Footer() {
  return (
    <Container pos='sticky' top='100%' >
      <footer>
        <Center>
          <Text ta='center' mb={15} px={5} >
            © Copyright Jack Chapman {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Center>
      </footer>
    </Container>
  )
}
