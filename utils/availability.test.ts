import { describe, expect, it } from 'vitest'
import { isBackendAvailable } from 'utils/availability'

describe('isBackendAvailable', () => {
  it('returns false for a static site with no backend', () => {
    expect(isBackendAvailable()).toBe(false)
  })
})
