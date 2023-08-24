'use client'

import { useViewportSize } from '@mantine/hooks';

type ViewportSize = {
  width: number,
  height: number
}

export function getViewportSize(): ViewportSize {
  return useViewportSize();
}

export function isMobile(): boolean {
  const viewportSize: ViewportSize = getViewportSize()

  return (viewportSize.width <= 800)
}
