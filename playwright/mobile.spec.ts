import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 375, height: 667 } })

test('mobile header displays burger menu', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel('Toggle navigation')).toBeVisible()
})

test('mobile experience sidebar toggle visible', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.getByRole('button', { name: 'Summary' }).first()).toBeVisible()
})
