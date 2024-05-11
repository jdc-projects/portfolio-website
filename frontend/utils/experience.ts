import { promises as fs } from 'fs'
import path from 'path'

export type ExperienceInfo = {
  name: string,
  route: string,
  title: string,
  company: string
  startYear: number,
  endYear: number,
}

export async function getExperiencesInfo(): Promise<Array<ExperienceInfo>> {
  const experiencesDir = path.join(process.cwd(), 'content', 'experiences')
  const experiences = (await fs.readdir(experiencesDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  return Promise.all(experiences.map(async experience => getExperienceInfo(experience)))
}

export async function getExperienceInfo(experience: string): Promise<ExperienceInfo> {
  const experienceMetadata = (await import('content/experiences/' + experience + '/page.mdx')).metadata

  return {
    name: experience,
    route: ('/experience/' + experience),
    title: experienceMetadata.title,
    company: experienceMetadata.company,
    startYear: experienceMetadata.startYear,
    endYear: experienceMetadata.endYear,
  }
}
