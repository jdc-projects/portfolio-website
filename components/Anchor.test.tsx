import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

vi.mock('next/link', () => ({
  default: ({ children, ...rest }: { children: React.ReactNode; [key: string]: unknown }) => (
    <a {...rest}>{children}</a>
  ),
}))

const Anchor = (await import('components/Anchor')).default

const renderAnchor = (node: React.ReactNode) =>
  render(<MantineProvider>{node}</MantineProvider>)

describe('Anchor newTab derivation', () => {
  it('opens internal links in the same tab', () => {
    renderAnchor(<Anchor href='/about'>About</Anchor>)
    expect(screen.getByText('About')).not.toHaveAttribute('target')
  })

  it('opens external links in a new tab', () => {
    renderAnchor(<Anchor href='https://example.com'>Example</Anchor>)
    expect(screen.getByText('Example')).toHaveAttribute('target', '_blank')
  })

  it('keeps mailto links in the same tab when newTab is false', () => {
    renderAnchor(<Anchor href='mailto:test@example.com' newTab={false}>Email</Anchor>)
    expect(screen.getByText('Email')).not.toHaveAttribute('target')
  })

  it('defaults mailto links to the same tab when newTab is omitted', () => {
    renderAnchor(<Anchor href='mailto:test@example.com'>Email</Anchor>)
    expect(screen.getByText('Email')).not.toHaveAttribute('target')
  })

  it('defaults tel links to the same tab when newTab is omitted', () => {
    renderAnchor(<Anchor href='tel:+441234567890'>Call</Anchor>)
    expect(screen.getByText('Call')).not.toHaveAttribute('target')
  })

  it('defaults external links to a new tab when newTab is omitted', () => {
    renderAnchor(<Anchor href='https://example.com'>Example</Anchor>)
    expect(screen.getByText('Example')).toHaveAttribute('target', '_blank')
  })
})
