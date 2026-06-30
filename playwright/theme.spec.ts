import { test, expect } from '@playwright/test'

test('colour scheme toggle switches attribute', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')
  const initial = await html.getAttribute('data-mantine-color-scheme')
  await page.getByRole('button', { name: 'Toggle colour scheme' }).click()
  await expect(html).not.toHaveAttribute('data-mantine-color-scheme', initial!)
})
