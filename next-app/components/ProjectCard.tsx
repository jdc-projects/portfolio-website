import { Container, Paper, Text, Flex } from '@mantine/core'
import { ProjectInfo } from 'utils/projects'
import Anchor from 'components/Anchor'
import Image from 'components/Image'

type ProjectCardProps = {
  projectInfo: ProjectInfo,
}

export default function ProjectCard(props: ProjectCardProps) {
  const desktopBaseWidth = 350
  const mobileBaseWidth = 250
  const desktopBaseHeight = 380
  const mobileBaseHeight = 280

  return (
    <Container>
      <Anchor href={props.projectInfo.route} underline='never' c='currentColor' >
        <Paper visibleFrom='sm' withBorder={true} radius='md' w={desktopBaseWidth} h={desktopBaseHeight} >
          <Flex direction='column' align='center' >
            <Container>
              <Image src={props.projectInfo.thumbnail} mt={12} w={desktopBaseWidth - 30} h={(desktopBaseWidth - 30) * 0.8} radius='sm' fit='cover' alt={props.projectInfo.thumbnailAlt} />
            </Container>
            <Text fw={500} size='lg' mt='md' ta='center' mx={20} >
              {props.projectInfo.title}
            </Text>
            <Text my='xs' c='dimmed' size='sm' ta='center' mx={20} >
              {props.projectInfo.description}
            </Text>
          </Flex>
        </Paper>
        <Paper hiddenFrom='sm' withBorder={true} radius='md' w={mobileBaseWidth} h={mobileBaseHeight} >
          <Flex direction='column' align='center' >
            <Container>
              <Image src={props.projectInfo.thumbnail} mt={12} w={mobileBaseWidth - 30} h={(mobileBaseWidth - 30) * 0.8} radius='sm' fit='cover' alt={props.projectInfo.thumbnailAlt} />
            </Container>
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
