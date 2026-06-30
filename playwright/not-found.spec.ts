import { test, expect } from '@playwright/test'

test('unknown route shows not found page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')
  await expect(page.getByText("Oops! You're not supposed to be here!")).toBeVisible()
  await expect(page.getByRole('link', { name: 'Go Back Home' })).toBeVisible()
})

test('mdx test page is hidden in production', async ({ page }) => {
  await page.goto('/mdx-test')
  await expect(page.getByText("Oops! You're not supposed to be here!")).toBeVisible()
})
