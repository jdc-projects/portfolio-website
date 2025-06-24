import { test, expect } from '@playwright/test'

test('home page has expected headings and footer', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Jack Chapman' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Solutions Architect' })).toBeVisible()
  await expect(page.getByRole('contentinfo')).toContainText('©')
})
