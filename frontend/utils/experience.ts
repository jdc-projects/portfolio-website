import { promises as fs } from 'fs'
import path from 'path'
import { readLocalFile } from 'utils/markdown'

export type ExperienceInfo = {
  name: string,
  route: string,
  contentPath: string,
  content: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
}

export async function getExperiencesInfo(): Promise<Array<ExperienceInfo>> {
  const experiencesDir = path.join(process.cwd(), 'content', 'experiences')
  const experienceDirs = (await fs.readdir(experiencesDir, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  return Promise.all(experienceDirs.map(async experienceDir => {
    const experienceContentPath = path.join(experiencesDir, experienceDir, 'page.md')
    const experienceData = await readLocalFile(experienceContentPath)

    return {
      name: experienceDir,
      route: ('/experience/' + experienceDir),
      contentPath: experienceContentPath,
      content: experienceData.content,
      title: experienceData.data.title,
      description: experienceData.data.description,
      startDate: experienceData.data.startDate,
      endDate: experienceData.data.endDate,
    }
  }))
}

export async function getExperienceInfo(experience: string): Promise<ExperienceInfo> {
  const experienceDir = path.join(process.cwd(), 'content', 'experiences', experience)
  const experienceContentPath = path.join(experienceDir, 'page.md')
  const experienceData = await readLocalFile(experienceContentPath)

  return {
    name: experienceDir,
    route: ('/experience/' + experienceDir),
    contentPath: experienceContentPath,
    content: experienceData.content,
    title: experienceData.data.title,
    description: experienceData.data.description,
    startDate: experienceData.data.startDate,
    endDate: experienceData.data.endDate,
  }
}
