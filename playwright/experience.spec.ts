import { test, expect } from '@playwright/test'
import { getExperiences, getExpectedExperienceOrder } from './_helpers'

const DATE_PATTERN = /[A-Z][a-z]{2,3} \d{4}/

for (const exp of getExperiences()) {
  test(`experience page ${exp.name} renders heading and company`, async ({ page }) => {
    await page.goto(exp.route)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toContainText(exp.title)
    const sidebarEntry = page.locator(`a[href="${exp.route}"]`).first()
    await expect(sidebarEntry).toContainText(exp.company)
  })
}

test('experience summary page renders', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible()
})

test.describe('experience sidebar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience')
  })

  test('sorted newest-first by end date', async ({ page }) => {
    const hrefs = await page.locator('a[href^="/experience/"]', { has: page.locator(':scope:visible') }).evaluateAll(
      els => [...new Set(els.map(el => el.getAttribute('href')))]
    )
    expect(hrefs).toEqual(getExpectedExperienceOrder())
  })

  test('each entry shows a formatted date range', async ({ page }) => {
    for (const exp of getExperiences()) {
      const entry = page.locator(`a[href="${exp.route}"]`).first()
      if (exp.endDate) {
        await expect(entry).toContainText(DATE_PATTERN)
      }
    }
  })

  test('entry without endDate shows Present', async ({ page }) => {
    const current = getExperiences().find(e => !e.endDate)
    if (!current) {
      test.skip()
      return
    }
    const entry = page.locator(`a[href="${current.route}"]`).first()
    await expect(entry).toContainText('Present')
    await expect(entry).toContainText(DATE_PATTERN)
  })
})
