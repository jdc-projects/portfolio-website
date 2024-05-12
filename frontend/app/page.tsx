import Image from 'components/Image'
import { Center, Flex, Space, Title, Text } from '@mantine/core'
import SocialLinks from 'components/SocialLinks'

import WorkProfilePhoto from './work-profile-photo.jpg'

export default async function Page() {
  return (
    <Center>
      <Flex direction='column' w={600} >
        <Space/>
        <Center>
          <Image visibleFrom='xs' src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" w={400} radius='50%' />
          <Image hiddenFrom='xs' src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" w={300} radius='50%' />
        </Center>
        <Space/>
        <Flex direction='column' align='center' justify='center' gap='xs' >
          <Title order={1} ta='center' >
            {"Hello, I'm Jack"}
          </Title>
          <Title order={2} ta='center' >
            {"Technology Consultant"}
          </Title>
          <Text ta='center' >
            {"I'm a quick-learning and adaptable generalist with experience of solution architecture, devops and infrastructure engineering, and software development."}
          </Text>
          <Space h={5} />
          <SocialLinks/>
        </Flex>
      </Flex>
    </Center>
  )
}
