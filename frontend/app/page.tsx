import Image from 'components/Image'
import { Center, Flex, Space } from '@mantine/core'
import { join } from 'path'
import { fixLocalPath } from 'utils/filepath'
import { readLocalFile } from 'utils/markdown'
import Markdown from 'components/Markdown'
import SocialLinks from 'components/SocialLinks'

import WorkProfilePhoto from './work-profile-photo.jpg'

export default async function Page() {
  const intro = (await readLocalFile(fixLocalPath(join(__dirname, 'intro.md')))).content

  return (
    <Flex direction='column' >
      <Space/>
      <Center>
        <Image src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" w={400} radius='50%' />
      </Center>
      <Space/>
      <Flex direction='column' align='center' >
        <Markdown>{intro}</Markdown>
      </Flex>
      <Space/>
      <Center>
        <SocialLinks/>
      </Center>
    </Flex>
  )
}
