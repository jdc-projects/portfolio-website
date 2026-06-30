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

function getProjects() {
  const dir = path.join(__dirname, '..', 'content', 'projects')
  return fs.readdirSync(dir)
    .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
    .map(name => {
      const filePath = path.join(dir, name, 'page.mdx')
      const fm = parseFrontmatter(filePath)
      const body = fs.readFileSync(filePath, 'utf8')
      const headingMatch = body.match(/^#\s+(.*)$/m)
      return {
        name,
        route: '/projects/' + name,
        title: fm.title || name,
        heading: headingMatch ? headingMatch[1] : name,
        githubLink: fm.githubLink,
        hidden: fm.hidden === 'true',
      }
    })
}

test.describe('projects listing page', () => {
  test('lists all non-hidden projects by title', async ({ page }) => {
    await page.goto('/projects')
    const visibleProjects = getProjects().filter(p => !p.hidden)
    for (const project of visibleProjects) {
      await expect(page.locator(`a[href="${project.route}"]`).first()).toBeVisible()
    }
  })

  test('does not list hidden projects', async ({ page }) => {
    await page.goto('/projects')
    const hiddenProjects = getProjects().filter(p => p.hidden)
    for (const project of hiddenProjects) {
      await expect(page.locator(`a[href="${project.route}"]`)).toHaveCount(0)
    }
  })
})

test.describe('individual project pages', () => {
  for (const project of getProjects().filter(p => !p.hidden)) {
    test(`${project.name} renders heading`, async ({ page }) => {
      await page.goto(project.route)
      await expect(page.getByRole('heading', { name: project.heading, exact: true })).toBeVisible()
    })

    if (project.githubLink) {
      test(`${project.name} shows GitHub link with correct href`, async ({ page }) => {
        await page.goto(project.route)
        const repoLink = page.getByRole('link', { name: /Github Repo/i })
        await expect(repoLink).toBeVisible()
        await expect(repoLink).toHaveAttribute('href', project.githubLink)
      })
    }
  }

  test('back-to-projects link navigates correctly', async ({ page }) => {
    await page.goto('/projects/github-runner')
    await Promise.all([
      page.waitForURL('**/projects'),
      page.getByRole('link', { name: 'Projects' }).first().click(),
    ])
  })

  test('hidden project page is not available', async ({ page }) => {
    await page.goto('/projects/hidden-test')
    await expect(page.getByText("Oops! You're not supposed to be here!")).toBeVisible()
  })

  test('homelab page renders co-located architecture SVG', async ({ page }) => {
    await page.goto('/projects/homelab')
    await expect(page.getByText('Architecture for my homelab')).toBeVisible()
    const svgCount = await page.locator('svg').count()
    expect(svgCount).toBeGreaterThan(0)
  })
})
