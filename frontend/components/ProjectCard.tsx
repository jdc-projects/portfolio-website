import { Container, Paper, Text, Flex } from '@mantine/core'
import { ProjectInfo } from 'utils/projects'
import Anchor from 'components/Anchor'
import Image from 'components/Image'

type ProjectCardProps = {
  projectInfo: ProjectInfo,
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Container>
      <Anchor href={props.projectInfo.route} underline='never' c='currentColor' >
        <Paper shadow='md' withBorder={true} radius='md' w={350} h={380} >
          <Flex direction='column' align='center' >
            <Image src={props.projectInfo.thumbnail} mt={12} w={320} h={250} radius='sm' fit='cover' alt={props.projectInfo.thumbnailAlt} />

            <Text fw={500} size='lg' mt='md' ta='center' mx={20} >
              {props.projectInfo.title}
            </Text>

            <Text my='xs' c='dimmed' size='sm' ta='center' mx={20} >
              {props.projectInfo.description}
            </Text>
          </Flex>
        </Paper>
      </Anchor>
    </Container>
  )
}
