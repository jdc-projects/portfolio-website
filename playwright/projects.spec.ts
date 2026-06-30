import { test, expect } from '@playwright/test'

test('projects page lists portfolio project', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.getByRole('link', { name: 'Portfolio Website' })).toBeVisible()
  await expect(page.getByText('Take a look at some of my projects:')).toBeVisible()
})
