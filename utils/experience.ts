import { allExperiences } from 'content-collections'

export type ExperienceInfo = {
  name: string,
  route: string,
  title: string,
  company: string
  startDate: Date,
  endDate: Date | undefined,
}

function parseDate(dateStr: string): Date {
  const [year, month] = dateStr.split('-').map(Number)
  return new Date(year, month - 1)
}

export function getExperiencesInfo(): Array<ExperienceInfo> {
  return allExperiences.map(experience => ({
    name: experience.slug,
    route: experience.route,
    title: experience.title,
    company: experience.company,
    startDate: parseDate(experience.startDate),
    endDate: experience.endDate ? parseDate(experience.endDate) : undefined,
  }))
}

export function getExperienceInfo(experience: string): ExperienceInfo | undefined {
  return getExperiencesInfo().find(e => e.name === experience)
}
