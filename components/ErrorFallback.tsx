'use client'

import { Container, Title, Text, Button, Stack } from '@mantine/core'

export function ErrorFallback() {
  return (
    <Container p={20} ta='center'>
      <Stack align='center' gap='md' mt={40}>
        <Title order={2}>Something went wrong</Title>
        <Text c='dimmed'>An unexpected error occurred while rendering this page.</Text>
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      </Stack>
    </Container>
  )
}
