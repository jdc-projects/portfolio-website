import { SimpleGrid, Container } from '@mantine/core'
import Image from '../components/wrapper/Image'

import Intro from './intro.mdx'
import WorkProfilePhoto from './work-profile-photo.jpg'

export default function app() {
  return (
    <SimpleGrid cols={2}>
      <Container ><Intro /></Container>
      <Image src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" />
    </SimpleGrid>
  );
}
