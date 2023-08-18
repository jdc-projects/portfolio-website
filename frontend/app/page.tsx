import { Container, SimpleGrid, Flex } from '@mantine/core'
import Image from 'components/Image'

import Intro from './intro.mdx'
import WorkProfilePhoto from './work-profile-photo.jpg'

export default function app() {
  return (
    <SimpleGrid cols={2}>
      <Flex justify='left' direction='column' ><Intro /></Flex>
      <Image src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" />
    </SimpleGrid>
  )
}
