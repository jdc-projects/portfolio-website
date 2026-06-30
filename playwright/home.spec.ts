import { test, expect } from '@playwright/test'

test('home page renders name and title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Jack Chapman' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Solutions Architect' })).toBeVisible()
})

test('home page renders description text', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('adaptable and versatile architect')).toBeVisible()
})

test('home page shows social links', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[href*="github.com"]').first()).toBeVisible()
  await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible()
})

test('footer shows copyright with current year', async ({ page }) => {
  await page.goto('/')
  const year = new Date().getFullYear()
  await expect(page.getByRole('contentinfo')).toContainText(`© Copyright Jack Chapman ${year}`)
})
