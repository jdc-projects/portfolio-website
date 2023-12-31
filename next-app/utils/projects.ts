import { promises as fs } from 'fs'
import path from 'path'

export type ProjectInfo = {
  name: string,
  route: string,
  title: string,
  description: string,
  thumbnail: string,
  thumbnailFit: React.CSSProperties['objectFit'],
  thumbnailAlt: string,
}

export async function getProjectsInfo(): Promise<Array<ProjectInfo>> {
  const projectsDir = path.join(process.cwd(), 'content', 'projects')
  const projects = (await fs.readdir(projectsDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  return Promise.all(projects.map(async project => getProjectInfo(project)))
}

export async function getProjectInfo(project: string): Promise<ProjectInfo> {
  const projectMetadata = (await import('content/projects/' + project + '/page.mdx')).metadata

  return {
    name: project,
    route: ('/projects/' + project),
    title: projectMetadata.title,
    description: projectMetadata.description,
    thumbnail: projectMetadata.thumbnail,
    thumbnailFit: projectMetadata.thumbnailFit,
    thumbnailAlt: projectMetadata.thumbnailAlt,
  }
}
