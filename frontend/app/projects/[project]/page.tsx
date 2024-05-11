import { Center, Flex, Text, Container, Space, Group } from "@mantine/core"
import { getProjectsInfo, getProjectInfo } from 'utils/projects'
import { IconArrowLeft, IconBrandGithub } from "@tabler/icons-react"
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
        <Group justify='space-between' >
          <Anchor href='/projects' underline='never' >
            <Flex direction='row' justify='flex-start' align='center' >
              <IconArrowLeft stroke={1.5} />
              <Text>Projects</Text>
            </Flex>
          </Anchor>
          {(undefined === projectInfo.githubLink) ? null :
            <Anchor href={projectInfo.githubLink} underline='never' >
              <Flex direction='row' justify='flex-end' align='center' >
                <IconBrandGithub stroke={1.5} />
                <Text ml={5} >Github Repo</Text>
              </Flex>
            </Anchor>
          }
        </Group>
        <Flex direction='row' >
          <Space visibleFrom="sm" w={20} />
          <Space hiddenFrom="sm" w={10} />
          <Container>
            <Space/>
            <ProjectContent />
          </Container>
          <Space visibleFrom="sm" w={20} />
          <Space hiddenFrom="sm" w={10} />
        </Flex>
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
