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
            Solutions Architect & AI Engineer
          </Title>
          <Text ta='center' >
            Jack is a hands-on solutions architect and engineer who embeds with client teams to take AI-enabled systems from discovery and proof-of-concept through to production.
            He designs and leads delivery of full-stack applications, RAG systems, and agentic AI, working directly with stakeholders from engineers to executives.
          </Text>
          <Space h={5} />
          <SocialLinks/>
        </Flex>
      </Flex>
    </Center>
  )
}
