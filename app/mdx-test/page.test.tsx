import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const notFoundMock = vi.hoisted(() => vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND')
}))

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}))

vi.mock('next/dynamic', () => ({
  default: () => () => <div data-testid='mdx-content'>rendered mdx</div>,
}))

const Page = (await import('./page')).default

describe('mdx-test page gate', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    delete process.env.ENABLE_MDX_TEST_PAGE
    notFoundMock.mockReset()
  })

  it('is hidden in production by default', () => {
    vi.stubEnv('NODE_ENV', 'production')
    delete process.env.ENABLE_MDX_TEST_PAGE
    expect(() => render(<Page />)).toThrow('NEXT_NOT_FOUND')
    expect(notFoundMock).toHaveBeenCalled()
    expect(screen.queryByTestId('mdx-content')).not.toBeInTheDocument()
  })

  it('is shown in production when ENABLE_MDX_TEST_PAGE is true', () => {
    vi.stubEnv('NODE_ENV', 'production')
    process.env.ENABLE_MDX_TEST_PAGE = 'true'
    render(<Page />)
    expect(notFoundMock).not.toHaveBeenCalled()
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })

  it('is shown in development regardless of the flag', () => {
    vi.stubEnv('NODE_ENV', 'development')
    delete process.env.ENABLE_MDX_TEST_PAGE
    render(<Page />)
    expect(notFoundMock).not.toHaveBeenCalled()
    expect(screen.getByTestId('mdx-content')).toBeInTheDocument()
  })
})
