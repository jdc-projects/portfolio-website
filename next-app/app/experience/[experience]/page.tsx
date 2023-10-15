import Markdown from 'components/Markdown'
import { getExperienceInfo, getExperiencesInfo } from 'utils/experience'

type ExperiencePageProps = {
  params: {
    experience: string,
  }
}

export default async function Page(props: ExperiencePageProps) {
  const experience = await getExperienceInfo(props.params.experience)

  return (
    <Markdown>{experience.content}</Markdown>
  )
}

export async function generateStaticParams() {
  const experiences = await getExperiencesInfo()

  return experiences.map(experience => {
    return {
      experience: experience.name,
    }
  })
}
