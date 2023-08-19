import { Container, Center, Text } from '@mantine/core'

export default function Footer() {
  return (
    <Container pos='sticky' top='100%' >
      <footer>
        <Center h={50} >
            <Text >© Copyright Jack Chapman 2023. All rights reserved.</Text>
        </Center>
      </footer>
    </Container>
  )
}
