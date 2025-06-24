import { test, expect, devices } from '@playwright/test'

test.use({ ...devices['iPhone SE'] })

test('mobile header displays burger menu', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByLabel('Toggle navigation')).toBeVisible()
})

test('mobile experience sidebar toggle visible', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.getByRole('button', { name: 'Navigation' }).first()).toBeVisible()
})
