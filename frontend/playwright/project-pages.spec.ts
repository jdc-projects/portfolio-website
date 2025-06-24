import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

function getProjects() {
  const dir = path.join(__dirname, '..', 'content', 'projects')
  return fs.readdirSync(dir).map(name => {
    const file = fs.readFileSync(path.join(dir, name, 'page.mdx'), 'utf8')
    const headingMatch = file.match(/^#\s+(.*)$/m)
    const heading = headingMatch ? headingMatch[1] : name
    return {
      name,
      route: '/projects/' + name,
      heading,
      hidden: file.includes('hidden: true'),
    }
  })
}

for (const proj of getProjects().filter(p => !p.hidden)) {
  test(`project page ${proj.name}`, async ({ page }) => {
    await page.goto(proj.route)
    await expect(page.getByRole('heading', { name: proj.heading })).toBeVisible()
  })
}

test('hidden project page is not available', async ({ page }) => {
  await page.goto('/projects/hidden-test')
  await expect(page.getByText("Oops! You're not supposed to be here!"))
    .toBeVisible()
})
