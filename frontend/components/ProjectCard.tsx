import { Container, Text, Center } from '@mantine/core'
import { ProjectInfo } from 'app/projects/page'
import { Card, CardSection } from 'components/Card'
import Anchor from 'components/Anchor'
import Image from 'components/Image'

type ProjectCardProps = {
  projectInfo: ProjectInfo,
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Container w={200} >
      <Anchor href={props.projectInfo.route} underline='never' >
        <Card shadow='xs' >
          <CardSection>
            <Center>
              <Image src={props.projectInfo.thumbnail} w={160} h={150} fit='cover' alt={props.projectInfo.thumbnailAlt} />
            </Center>
          </CardSection>

          <CardSection>
            <Center>
              <Text fw={500} size="lg" mt="md">
                {props.projectInfo.title}
              </Text>
            </Center>
          </CardSection>

          <CardSection>
            <Center>
              <Text mt="xs" c="dimmed" size="sm">
                {props.projectInfo.description}
              </Text>
            </Center>
          </CardSection>
        </Card>
      </Anchor>
    </Container>
  )
}
