import { test, expect } from '@playwright/test'

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('burger menu is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByLabel('Toggle navigation')).toBeVisible()
  })

  test('clicking burger menu opens navigation links', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Toggle navigation').click()
    await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Experience', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projects', exact: true })).toBeVisible()
  })

  test('mobile nav link navigates to projects', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Toggle navigation').click()
    await Promise.all([
      page.waitForURL('**/projects'),
      page.getByRole('link', { name: 'Projects', exact: true }).click(),
    ])
  })

  test('experience sidebar toggle visible on mobile', async ({ page }) => {
    await page.goto('/experience')
    await expect(page.getByRole('button', { name: 'Summary' }).first()).toBeVisible()
  })
})
