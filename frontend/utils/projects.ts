import { promises as fs } from 'fs'
import path from 'path'
import { readLocalFile } from 'utils/markdown'

export type ProjectInfo = {
  name: string,
  route: string,
  contentPath: string,
  content: string,
  title: string,
  description: string,
  thumbnail: string,
  thumbnailAlt: string,
}

export async function getProjectsInfo(): Promise<Array<ProjectInfo>> {
  const projectsDir = path.join(process.cwd(), 'projects')
  const projectDirs = (await fs.readdir(projectsDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  return Promise.all(projectDirs.map(async projectDir => {
    const projectContentPath = path.join(projectsDir, projectDir, 'page.md')
    const projectData = await readLocalFile(projectContentPath)

    return {
      name: projectDir,
      route: ('/projects/' + projectDir),
      contentPath: projectContentPath,
      content: projectData.content,
      title: projectData.data.title,
      description: projectData.data.description,
      thumbnail: projectData.data.thumbnail,
      thumbnailAlt: projectData.data.thumbnailAlt,
    }
  }))
}

export async function getProjectInfo(project: string): Promise<ProjectInfo> {
  const projectDir = path.join(process.cwd(), 'projects', project)
  const projectContentPath = path.join(projectDir, 'page.md')
  const projectData = await readLocalFile(projectContentPath)

  return {
    name: projectDir,
    route: ('/projects/' + projectDir),
    contentPath: projectContentPath,
    content: projectData.content,
    title: projectData.data.title,
    description: projectData.data.description,
    thumbnail: projectData.data.thumbnail,
    thumbnailAlt: projectData.data.thumbnailAlt,
  }
}
