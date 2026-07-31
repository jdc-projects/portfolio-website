import { Center, Container, Flex, Space } from '@mantine/core'

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <Center>
      <Container w={1200} >
        <Flex direction='row' >
          <Space visibleFrom="sm" w={20} />
          <Space hiddenFrom="sm" w={10} />
          <Container w='100%' >
            <Space />
            {children}
          </Container>
          <Space visibleFrom="sm" w={20} />
          <Space hiddenFrom="sm" w={10} />
        </Flex>
      </Container>
    </Center>
  )
}
