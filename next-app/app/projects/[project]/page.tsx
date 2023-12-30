import { Center, Flex, Text, Container, Space } from "@mantine/core"
import { getProjectsInfo, getProjectInfo } from 'utils/projects'
import { IconArrowLeft } from "@tabler/icons-react"
import Anchor from 'components/Anchor'
import dynamic from 'next/dynamic'

type ProjectPageProps = {
  params: {
    project: string,
  }
}

export default async function Page(props: ProjectPageProps) {
  const projectInfo = await getProjectInfo(props.params.project)

  const ProjectContent = dynamic(() => import('content/projects/' + projectInfo.name + '/page.mdx'), {})

  return (
    <Center>
      <Container w={1200} >
        <Space/>
        <Anchor href='/projects' underline='never' >
          <Flex direction='row' justify='flex-start' align='center' >
            <IconArrowLeft stroke={1.5} />
            <Text>Back to Projects</Text>
          </Flex>
        </Anchor>
        <Container m={20} >
          <ProjectContent />
        </Container>
      </Container>
    </Center>
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
