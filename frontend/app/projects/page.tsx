import { promises as fs } from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import { Text } from '@mantine/core';

type ProjectInfo = {
  route: string,
  title: string,
  thumbnail: string,
}

type ProjectPageProps = {
}

export default async function Page(props: ProjectPageProps) {
  const projects = await getProjects();

  return (
    <Text>{projects[0].title}</Text>
  )
}

async function getProjects() {
  const projectsDir = path.join(process.cwd(), 'public', 'projects')
  const projectDirs = (await fs.readdir(projectsDir, { withFileTypes: true })).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)

  const projects: Array<ProjectInfo> = await Promise.all(projectDirs.map(async projectDir => {
    const projectPage = path.join(projectsDir, projectDir, 'page.mdx')
    const projectContent = await fs.readFile(projectPage)
    const projectMatter = grayMatter(projectContent)

    return {
      route: projectDir, // this isn't correct, but will do for now
      title: projectMatter.data.title,
      thumbnail: path.join(projectDir, projectMatter.data.thumbnail),
    }
  }))

  return projects
}
