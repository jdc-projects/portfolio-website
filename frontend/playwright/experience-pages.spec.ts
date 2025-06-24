import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

function getExperiences() {
  const dir = path.join(__dirname, '..', 'content', 'experiences')
  return fs.readdirSync(dir).map(name => {
    const file = fs.readFileSync(path.join(dir, name, 'page.mdx'), 'utf8')
    const headingMatch = file.match(/^#\s+(.*)$/m)
    const heading = headingMatch ? headingMatch[1] : name
    return { name, route: '/experience/' + name, heading }
  })
}

for (const exp of getExperiences()) {
  test(`experience page ${exp.name}`, async ({ page }) => {
    await page.goto(exp.route)
    await expect(page.getByRole('heading', { name: exp.heading })).toBeVisible()
  })
}

test('experience summary page', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible()
})
