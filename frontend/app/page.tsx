import { SimpleGrid, Flex } from '@mantine/core'
import Image from 'components/Image'

import Intro from './intro.mdx'

export default function Page() {
  return (
    <SimpleGrid cols={2}>
      <Flex justify='left' direction='column' ><Intro /></Flex>
      <Image src='/work-profile-photo.jpg' alt="Work profile / professional style image of Jack" />
    </SimpleGrid>
  )
}
