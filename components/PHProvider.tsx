'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider, PostHogErrorBoundary } from '@posthog/react'
import { ErrorFallback } from './ErrorFallback'
import { PostHogPageView } from './PostHogPageView'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      ui_host: POSTHOG_HOST,
      capture_pageview: false,
      capture_exceptions: true,
      cookieless_mode: 'always',
    })
  }, [])

  if (!POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PostHogProvider client={posthog}>
      <PostHogErrorBoundary fallback={<ErrorFallback />}>
        <PostHogPageView />
        {children}
      </PostHogErrorBoundary>
    </PostHogProvider>
  )
}
