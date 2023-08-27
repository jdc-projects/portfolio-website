import { getProjectsInfo, getProjectInfo } from 'utils/projects'
import Markdown from 'components/Markdown'

type ProjectPageProps = {
  params: {
    project: string,
  }
}

export default async function Page(props: ProjectPageProps) {
  const projectInfo = await getProjectInfo(props.params.project)

  return <Markdown>{projectInfo.content}</Markdown>
}

export async function generateStaticParams() {
  const projects = await getProjectsInfo()

  return projects.map(project => {
    return {
      project: project.name,
    }
  })
}
