import { promises as fs } from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'
import { Flex, Text, Space } from "@mantine/core"
import ProjectCard from 'components/ProjectCard'

export type ProjectInfo = {
  route: string,
  title: string,
  description: string,
  thumbnail: string,
  thumbnailAlt: string,
}

export default async function Page() {
  const projects = await getProjects();

  const projectCards = projects.map(project => {
    return <ProjectCard projectInfo={project} key={project.route} />
  })

  return (
    <>
      <Text ta='center' >
        Take a look at some of the projects I have worked on:
      </Text>
      <Space/>
      <Flex gap='lg' justify='center' align='center' direction='row' wrap='wrap' >
        {projectCards}
      </Flex>
      <Space/>
    </>
  )
}

async function getProjects() {
  const projectsDir = path.join(process.cwd(), 'app', 'projects')
  const projectDirs = (await fs.readdir(projectsDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const projects: Array<ProjectInfo> = await Promise.all(projectDirs.map(async projectDir => {
    const projectPage = path.join(projectsDir, projectDir, 'page.mdx')
    const projectContent = await fs.readFile(projectPage)
    const projectMatter = grayMatter(projectContent)

    return {
      route: ('/projects/' + projectDir),
      title: projectMatter.data.title,
      description: projectMatter.data.description,
      thumbnail: projectMatter.data.thumbnail,
      thumbnailAlt: projectMatter.data.thumbnailAlt,
    }
  }))

  return projects
}
