import { test, expect } from '@playwright/test'

test('external links open in new tab', async ({ page }) => {
  await page.goto('/')
  const githubLink = page.locator('a[href*="github.com"]').first()
  await expect(githubLink).toHaveAttribute('target', '_blank')
})

test('internal links do not open in new tab', async ({ page }) => {
  await page.goto('/')
  const homeLink = page.getByRole('link', { name: 'Home', exact: true })
  await expect(homeLink).not.toHaveAttribute('target', '_blank')
})

test('project page GitHub links open in new tab', async ({ page }) => {
  await page.goto('/projects/github-runner')
  const repoLink = page.getByRole('link', { name: /Github Repo/i })
  await expect(repoLink).toHaveAttribute('target', '_blank')
})
