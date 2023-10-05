import { Flex, Text, Container } from "@mantine/core"
import { getProjectsInfo, getProjectInfo } from 'utils/projects'
import { IconArrowLeft } from "@tabler/icons-react"
import Anchor from 'components/Anchor'
import Markdown from 'components/Markdown'

type ProjectPageProps = {
  params: {
    project: string,
  }
}

export default async function Page(props: ProjectPageProps) {
  const projectInfo = await getProjectInfo(props.params.project)

  return (
    <Container mx={50} >
      <Anchor href='/projects' underline='never' >
        <Flex direction='row' justify='flex-start' align='center' >
          <IconArrowLeft stroke={1.5} />
          <Text>Back to Projects</Text>
        </Flex>
      </Anchor>
      <Container w={1200} m={20} >
        <Markdown>{projectInfo.content}</Markdown>
      </Container>
    </Container>
  )
}

export async function generateStaticParams() {
  const projects = await getProjectsInfo()

  return projects.map(project => {
    return {
      project: project.name,
    }
  })
}
