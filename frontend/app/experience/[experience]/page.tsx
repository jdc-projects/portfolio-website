import { getExperienceInfo, getExperiencesInfo } from 'utils/experience'

type ExperiencePageProps = {
  params: Promise<{
    experience: string,
  }>
}

export default async function Page(props: ExperiencePageProps) {
  const params = await props.params
  const experience = await getExperienceInfo(params.experience)
  const { default: ExperienceContent } = await import('content/experiences/' + experience.name + '/page.mdx')

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
