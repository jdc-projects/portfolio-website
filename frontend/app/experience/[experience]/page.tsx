import dynamic from 'next/dynamic'
import { getExperienceInfo, getExperiencesInfo } from 'utils/experience'

type ExperiencePageProps = {
  params: {
    experience: string,
  }
}

export default async function Page(props: ExperiencePageProps) {
  const experience = await getExperienceInfo(props.params.experience)
  const ExperienceContent = dynamic(() => import('content/experiences/' + experience.name + '/page.mdx'), {})

  return (
    <ExperienceContent/>
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
