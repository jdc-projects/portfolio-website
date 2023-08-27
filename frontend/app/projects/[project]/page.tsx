import { getProjectsInfo, getProjectInfo } from 'utils/projects'
import { defaultComponents } from 'utils/markdown'
import ReactMarkdown from 'react-markdown'

type ProjectPageProps = {
  params: {
    project: string,
  }
}

export default async function Page(props: ProjectPageProps) {
  const projectInfo = (await getProjectInfo(props.params.project))

  return <ReactMarkdown components={defaultComponents} >{projectInfo.content}</ReactMarkdown>
}

export async function generateStaticParams() {
  const projects = await getProjectsInfo()

  return projects.map(project => {
    return {
      project: project.name,
    }
  })
}
