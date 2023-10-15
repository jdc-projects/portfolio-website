import Image from 'components/Image'
import { Center, Flex, Space, Text } from '@mantine/core'
import { join } from 'path'
import { fixLocalPath } from 'utils/filepath'
import { readLocalFile } from 'utils/markdown'
import Markdown, { Components, defaultComponents } from 'components/Markdown'
import SocialLinks from 'components/SocialLinks'

import WorkProfilePhoto from './work-profile-photo.jpg'

export default async function Page() {
  const intro = (await readLocalFile(fixLocalPath(join(__dirname, 'intro.md')))).content
  const components: Components = {
    ...defaultComponents,
    p: (props) => <Text ta='center' >{props.children}</Text>,
  }

  return (
    <Center>
      <Flex direction='column' w={600} >
        <Space/>
        <Center>
          <Image src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" w={400} radius='50%' />
        </Center>
        <Space/>
        <Flex direction='column' align='center' justify='center' gap='xs' >
          <Markdown components={components} >{intro}</Markdown>
          <Space h={5} />
          <SocialLinks/>
        </Flex>
        <Center>
        </Center>
      </Flex>
    </Center>
  )
}
