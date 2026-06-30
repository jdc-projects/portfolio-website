import fs from 'fs'
import path from 'path'

export function parseFrontmatter(filePath: string): Record<string, string> {
  const content = fs.readFileSync(filePath, 'utf8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const result: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')
    result[key] = value
  }
  return result
}

export type ExperienceData = ReturnType<typeof getExperiences>[number]

export function getExperiences() {
  const dir = path.join(__dirname, '..', 'content', 'experiences')
  return fs.readdirSync(dir)
    .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
    .map(name => {
      const filePath = path.join(dir, name, 'page.mdx')
      const fm = parseFrontmatter(filePath)
      return {
        name,
        route: '/experience/' + name,
        title: fm.title || name,
        company: fm.company || '',
        startDate: fm.startDate || '',
        endDate: fm.endDate || undefined,
      }
    })
}

export function getExpectedExperienceOrder(): string[] {
  const experiences = getExperiences()
  experiences.sort((a, b) => {
    if (!b.endDate) return 1
    if (!a.endDate) return -1
    if (a.endDate !== b.endDate) return b.endDate.localeCompare(a.endDate)
    return b.startDate.localeCompare(a.startDate)
  })
  return experiences.map(e => e.route)
}

export type ProjectData = ReturnType<typeof getProjects>[number]

export function getProjects() {
  const dir = path.join(__dirname, '..', 'content', 'projects')
  return fs.readdirSync(dir)
    .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
    .map(name => {
      const projectDir = path.join(dir, name)
      const filePath = path.join(projectDir, 'page.mdx')
      const fm = parseFrontmatter(filePath)
      const body = fs.readFileSync(filePath, 'utf8')
      const headingMatch = body.match(/^#\s+(.*)$/m)
      const hasAssets = fs.readdirSync(projectDir).some(f => f !== 'page.mdx')
      return {
        name,
        route: '/projects/' + name,
        title: fm.title || name,
        heading: headingMatch ? headingMatch[1] : name,
        githubLink: fm.githubLink,
        hidden: fm.hidden === 'true',
        hasAssets,
      }
    })
}
