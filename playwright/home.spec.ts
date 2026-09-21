import { test, expect } from '@playwright/test'
import { EMAIL } from '../utils/site'

test('home page renders name and title headings', async ({ page }) => {
  await page.goto('/')
  const name = page.getByRole('heading', { level: 1 })
  const title = page.getByRole('heading', { level: 2 })
  await expect(name).toBeVisible()
  await expect(name).toContainText(/\S/)
  await expect(title).toBeVisible()
  await expect(title).toContainText(/\S/)
})

test('home page renders summary text', async ({ page }) => {
  await page.goto('/')
  const summary = page.getByRole('paragraph').first()
  await expect(summary).toBeVisible()
  await expect(summary).toContainText(/\S/)
})

test('home page shows social links', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[href*="github.com"]').first()).toBeVisible()
  await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible()
  await expect(page.locator(`a[href="mailto:${EMAIL}"]`)).toBeVisible()
})

test('footer shows copyright with current year', async ({ page }) => {
  await page.goto('/')
  const year = new Date().getFullYear()
  await expect(page.getByRole('contentinfo')).toContainText(`© Copyright Jack Chapman ${year}`)
})
