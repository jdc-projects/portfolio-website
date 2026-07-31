import { test, expect } from '@playwright/test'
import { EMAIL } from '../utils/site'

test('privacy page renders heading and contact email', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible()
  await expect(page.getByText(EMAIL)).toBeVisible()
})

test('privacy page shows analytics and rights sections', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: 'Analytics (PostHog)' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Your rights' })).toBeVisible()
})

test('footer privacy link navigates to the privacy page', async ({ page }) => {
  await page.goto('/')
  const link = page.getByRole('link', { name: 'Privacy policy' })
  await expect(link).toBeVisible()
  await link.click()
  await expect(page).toHaveURL(/\/privacy$/)
})
