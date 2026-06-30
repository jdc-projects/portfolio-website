import { allExperiences } from 'content-collections'
import { notFound } from 'next/navigation'

type ExperiencePageProps = {
  params: Promise<{
    experience: string,
  }>
}

export default async function Page(props: ExperiencePageProps) {
  const params = await props.params
  const experience = allExperiences.find(e => e.slug === params.experience)

  if (!experience) {
    notFound()
  }

  const MDXContent = experience.mdxContent

  return (
    <MDXContent/>
  )
}

export function generateStaticParams() {
  return allExperiences.map(e => ({ experience: e.slug }))
}
