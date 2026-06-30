import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

function parseFrontmatter(filePath: string): Record<string, string> {
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

function getExperiences() {
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
      }
    })
}

for (const exp of getExperiences()) {
  test(`experience page ${exp.name} renders heading and company`, async ({ page }) => {
    await page.goto(exp.route)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toContainText(exp.title)
    const sidebarEntry = page.locator(`a[href="${exp.route}"]`).first()
    await expect(sidebarEntry).toContainText(exp.company)
  })
}

test('experience summary page renders', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible()
})

test.describe('experience sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience')
  })

  test('sorted newest-first by end date', async ({ page }) => {
    const hrefs = await page.locator('a[href^="/experience/"]', { has: page.locator(':scope:visible') }).evaluateAll(
      els => [...new Set(els.map(el => el.getAttribute('href')))]
    )
    expect(hrefs).toEqual([
      '/experience/solutions-architect-2024',
      '/experience/cloud-lead-2023',
      '/experience/solutions-architect-2023',
      '/experience/full-stack-engineer-2022',
      '/experience/design-develoment-engineer-2023',
      '/experience/embedded-engineering-apprentice-2017',
      '/experience/beng-electronic-and-computer-engineering-2017',
    ])
  })

  test('shows formatted date ranges', async ({ page }) => {
    const cloudLead = page.locator('a[href="/experience/cloud-lead-2023"]').first()
    await expect(cloudLead).toContainText('Credera (PS Client)')
    await expect(cloudLead).toContainText('May 2023')
    await expect(cloudLead).toContainText('Jul 2024')
  })

  test('shows Present for current role', async ({ page }) => {
    const currentRole = page.locator('a[href="/experience/solutions-architect-2024"]').first()
    await expect(currentRole).toContainText('Present')
    await expect(currentRole).toContainText('Aug 2024')
  })
})
