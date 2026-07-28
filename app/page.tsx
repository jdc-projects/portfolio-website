import Image from 'components/Image'
import { Center, Flex, Space, Title, Text } from '@mantine/core'
import SocialLinks from 'components/SocialLinks'

import ProfilePhoto from './profile-photo.jpg'

export default async function Page() {
  return (
    <Center>
      <Flex direction='column' w={600} >
        <Space/>
        <Center>
          <Image visibleFrom='xs' src={ProfilePhoto} alt="Work profile / professional style image of Jack" w={400} radius='50%' />
          <Image hiddenFrom='xs' src={ProfilePhoto} alt="Work profile / professional style image of Jack" w={300} radius='50%' />
        </Center>
        <Space/>
        <Flex direction='column' align='center' justify='center' gap='xs' >
          <Title order={1} ta='center' >
            Jack Chapman
          </Title>
          <Title order={2} ta='center' >
            Solutions Architect
          </Title>
          <Text ta='center' >
            With experience of solution architecture and software engineering, alongside exposure to multiple industries, Jack is an adaptable and versatile architect.
            Expertise in modern agentic AI delivery, including proof-of-concepts, deployed production applications, and enablement of new and existing teams with AI tooling, means Jack is ready to solve challenges across technical and business contexts.
          </Text>
          <Space h={5} />
          <SocialLinks/>
        </Flex>
      </Flex>
    </Center>
  )
}
