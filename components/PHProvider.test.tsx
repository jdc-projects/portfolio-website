import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

const posthogMock = vi.hoisted(() => ({
  init: vi.fn(),
}))

vi.mock('posthog-js', () => ({ default: posthogMock }))
vi.mock('@posthog/react', () => ({
  PostHogProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  PostHogErrorBoundary: ({ children }: { children: ReactNode }) => <>{children}</>,
}))
vi.mock('components/PostHogPageView', () => ({ PostHogPageView: () => null }))
vi.mock('components/ErrorFallback', () => ({ ErrorFallback: () => null }))

describe('PHProvider', () => {
  let PHProvider: typeof import('components/PHProvider').PHProvider

  beforeEach(async () => {
    vi.resetModules()
    posthogMock.init.mockReset()
  })

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY
    delete process.env.NEXT_PUBLIC_POSTHOG_HOST
  })

  it('does not initialise PostHog when the key is absent', async () => {
    ;({ PHProvider } = await import('components/PHProvider'))
    render(<PHProvider><div>child</div></PHProvider>)
    expect(posthogMock.init).not.toHaveBeenCalled()
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('initialises PostHog in cookieless mode when the key is present', async () => {
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'test-key'
    process.env.NEXT_PUBLIC_POSTHOG_HOST = 'https://example.test'
    ;({ PHProvider } = await import('components/PHProvider'))
    render(<PHProvider><div>child</div></PHProvider>)
    expect(posthogMock.init).toHaveBeenCalledWith(
      'test-key',
      expect.objectContaining({
        api_host: 'https://example.test',
        ui_host: 'https://example.test',
        capture_pageview: false,
        capture_exceptions: true,
        cookieless_mode: 'always',
      }),
    )
  })
})
