import { test, expect } from '@playwright/test'

test.describe('/mdx-test renders MDX features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mdx-test')
  })

  test('headings h1 through h6', async ({ page }) => {
    for (const level of [1, 2, 3, 4, 5, 6]) {
      await expect(
        page.getByRole('heading', { name: `Heading ${level}`, level })
      ).toBeVisible()
    }
  })

  test('paragraph with link and inline formatting', async ({ page }) => {
    await expect(page.getByText('This is a paragraph with')).toBeVisible()
    const link = page.getByRole('link', { name: 'a link' })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', '/')
    await expect(page.getByText('bold text', { exact: true })).toBeVisible()
    await expect(page.getByText('italic text', { exact: true })).toBeVisible()
    await expect(page.getByText('deleted text', { exact: true })).toBeVisible()
    await expect(page.getByText('inline code', { exact: true })).toBeVisible()
  })

  test('blockquote', async ({ page }) => {
    await expect(page.getByText('A famous quote.')).toBeVisible()
  })

  test('fenced code block', async ({ page }) => {
    await expect(page.locator('pre').filter({ hasText: 'console.log' })).toBeVisible()
  })

  test('ordered and unordered lists', async ({ page }) => {
    await expect(page.getByText('Item A', { exact: true })).toBeVisible()
    await expect(page.getByText('Item B', { exact: true })).toBeVisible()
    await expect(page.getByText('First', { exact: true })).toBeVisible()
    await expect(page.getByText('Second', { exact: true })).toBeVisible()
  })

  test('task list checkboxes render with correct state', async ({ page }) => {
    const taskOne = page.getByRole('checkbox', { name: 'Task One' })
    const taskTwo = page.getByRole('checkbox', { name: 'Task Two' })
    await expect(taskOne).toBeVisible()
    await expect(taskTwo).toBeVisible()
    await expect(taskOne).not.toBeChecked()
    await expect(taskTwo).toBeChecked()
  })

  test('table headers and cells', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Syntax' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Description' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Header' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Title' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Paragraph' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Text' })).toBeVisible()
  })

  test('image with alt text', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Alt text' })).toBeVisible()
  })

  test('horizontal rule', async ({ page }) => {
    // Mantine's layout <Divider> also exposes role="separator", so target the
    // raw <hr> that markdown's thematic break produces.
    await expect(page.locator('hr')).toBeVisible()
  })
})
