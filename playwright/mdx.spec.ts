import { test, expect } from '@playwright/test'

test('mdx test page is hidden in production', async ({ page }) => {
  await page.goto('/mdx-test')
  await expect(page.getByText("Oops! You're not supposed to be here!"))
    .toBeVisible()
})
