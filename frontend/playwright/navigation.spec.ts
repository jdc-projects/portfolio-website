import { test, expect } from '@playwright/test'

test('navigation links navigate between pages', async ({ page }) => {
  await page.goto('/')
  await Promise.all([
    page.waitForURL('**/experience'),
    page.getByRole('link', { name: 'Experience', exact: true }).click(),
  ])
  await Promise.all([
    page.waitForURL('**/projects'),
    page.getByRole('link', { name: 'Projects', exact: true }).click(),
  ])
  await Promise.all([
    page.waitForURL('**/'),
    page.getByRole('link', { name: 'Home', exact: true }).click(),
  ])
})
