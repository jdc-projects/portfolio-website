import { test, expect } from '@playwright/test'
import { getProjects } from './_helpers'

const allProjects = getProjects()
const visibleProjects = allProjects.filter(p => !p.hidden)
const hiddenProjects = allProjects.filter(p => p.hidden)
const firstVisible = visibleProjects[0]
const projectWithAssets = visibleProjects.find(p => p.hasAssets)
const projectWithGithub = visibleProjects.find(p => p.githubLink)

test.describe('projects listing page', () => {
  test('lists all non-hidden projects', async ({ page }) => {
    await page.goto('/projects')
    for (const project of visibleProjects) {
      await expect(page.locator(`a[href="${project.route}"]`).first()).toBeVisible()
    }
  })

  test('does not list hidden projects', async ({ page }) => {
    await page.goto('/projects')
    for (const project of hiddenProjects) {
      await expect(page.locator(`a[href="${project.route}"]`)).toHaveCount(0)
    }
  })
})

test.describe('individual project pages', () => {
  for (const project of visibleProjects) {
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
    await page.goto(firstVisible.route)
    await Promise.all([
      page.waitForURL('**/projects'),
      page.getByRole('link', { name: 'Projects' }).first().click(),
    ])
  })

  test('hidden project page is not available', async ({ page }) => {
    const hidden = hiddenProjects[0]
    if (!hidden) {
      test.skip()
      return
    }
    await page.goto(hidden.route)
    await expect(page.getByText("Oops! You're not supposed to be here!")).toBeVisible()
  })

  test('project with co-located assets renders them', async ({ page }) => {
    if (!projectWithAssets) {
      test.skip()
      return
    }
    await page.goto(projectWithAssets.route)
    const svgCount = await page.locator('svg').count()
    expect(svgCount).toBeGreaterThan(0)
  })
})
