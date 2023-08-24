import { Container, Paper, Text, Flex } from '@mantine/core'
import { ProjectInfo } from 'app/projects/page'
import Anchor from 'components/Anchor'
import Image from 'components/Image'

type ProjectCardProps = {
  projectInfo: ProjectInfo,
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Container w={200} >
      <Anchor href={props.projectInfo.route} underline='never' >
        <Paper shadow='md' withBorder={true} radius='md' >
          <Flex direction='column' align='center' >
            <Image src={props.projectInfo.thumbnail} mt={8} w={180} h={150} radius='sm' fit='cover' alt={props.projectInfo.thumbnailAlt} />

            <Text fw={500} size='lg' mt='md' c='black' >
              {props.projectInfo.title}
            </Text>

            <Text my='xs' c='dimmed' size='sm' >
              {props.projectInfo.description}
            </Text>
          </Flex>
        </Paper>
      </Anchor>
    </Container>
  )
}
