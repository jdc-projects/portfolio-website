'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from '@posthog/react'

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (!pathname || !posthog) return
    let url = window.origin + pathname
    const search = searchParams.toString()
    if (search) url += `?${search}`
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams, posthog])

  return null
}

export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  )
}
