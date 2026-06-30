import { test, expect } from '@playwright/test'

test('images on home page have alt text', async ({ page }) => {
  await page.goto('/')
  const images = page.locator('img:visible')
  const count = await images.count()
  expect(count).toBeGreaterThan(0)
  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt')
    expect(alt, `image ${i} missing alt text`).toBeTruthy()
  }
})

test('project card images have alt text', async ({ page }) => {
  await page.goto('/projects')
  const images = page.locator('img:visible')
  const count = await images.count()
  expect(count).toBeGreaterThan(0)
  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt')
    expect(alt, `image ${i} missing alt text`).toBeTruthy()
  }
})

test('colour scheme toggle has accessible label', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Toggle colour scheme' })).toBeVisible()
})
