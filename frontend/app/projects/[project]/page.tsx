import { Center, Flex, Text, Container, Space, Group } from "@mantine/core"
import { allProjects } from 'content-collections'
import { notFound } from 'next/navigation'
import { IconArrowLeft, IconBrandGithub } from "@tabler/icons-react"
import Anchor from 'components/Anchor'

type ProjectPageProps = {
  params: Promise<{
    project: string,
  }>
}

export default async function Page(props: ProjectPageProps) {
  const params = await props.params
  const project = allProjects.find(p => p.slug === params.project)

  if (!project || project.hidden) {
    notFound()
  }

  const MDXContent = project.mdxContent

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
          {project.githubLink === undefined ? null :
            <Anchor href={project.githubLink} underline='never' >
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
          <Container w='100%' >
            <Space/>
            <MDXContent />
          </Container>
          <Space visibleFrom="sm" w={20} />
          <Space hiddenFrom="sm" w={10} />
        </Flex>
      </Container>
    </Center>
  )
}

export function generateStaticParams() {
  return allProjects
    .filter(p => !p.hidden)
    .map(p => ({ project: p.slug }))
}
