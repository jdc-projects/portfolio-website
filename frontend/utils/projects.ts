import { allProjects } from 'content-collections'

export type ProjectInfo = {
  name: string,
  route: string,
  title: string,
  description: string,
  thumbnail: string,
  thumbnailFit: React.CSSProperties['objectFit'],
  thumbnailAlt: string,
  githubLink: string | undefined,
  hidden: boolean,
}

export function getProjectsInfo(): Array<ProjectInfo> {
  return allProjects.map(project => ({
    name: project.slug,
    route: project.route,
    title: project.title,
    description: project.description,
    thumbnail: project.thumbnail,
    thumbnailFit: (project.thumbnailFit ?? 'cover') as React.CSSProperties['objectFit'],
    thumbnailAlt: project.thumbnailAlt,
    githubLink: project.githubLink,
    hidden: project.hidden ?? false,
  }))
}

export function getProjectInfo(project: string): ProjectInfo | undefined {
  return getProjectsInfo().find(p => p.name === project)
}
