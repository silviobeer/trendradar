import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

// Mock next/font/google — not available in test environment
vi.mock('next/font/google', () => ({
  Roboto: vi.fn(() => ({
    variable: '--font-body',
    className: 'mock-roboto',
  })),
  Roboto_Slab: vi.fn(() => ({
    variable: '--font-heading',
    className: 'mock-roboto-slab',
  })),
}))

describe('RootLayout', () => {
  it('applies font CSS variable classes to the html element', async () => {
    const { default: RootLayout } = await import('../layout')

    // Render the layout — jsdom wraps <html> in a fragment-like container.
    // The className is reflected on document.documentElement because
    // @testing-library/react targets the existing jsdom document.
    render(
      <RootLayout>
        <div>test content</div>
      </RootLayout>
    )

    // document.documentElement.className is set by the rendered <html className=...>
    const htmlClass = document.documentElement.className
    expect(htmlClass).toContain('--font-body')
    expect(htmlClass).toContain('--font-heading')
  })

  it('renders children inside body', async () => {
    const { default: RootLayout } = await import('../layout')
    const { getByText } = render(
      <RootLayout>
        <p>Hello Fonts</p>
      </RootLayout>
    )
    expect(getByText('Hello Fonts')).toBeInTheDocument()
  })

  // P10-US-2 AC-5/AC-6/AC-7: Warm appearance — body background and text colors
  it('body has bg-bg-warm-light class for warm beige background (AC-5)', async () => {
    vi.resetModules()
    const { default: RootLayout } = await import('../layout')
    const { container } = render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const body = document.body
    expect(body.className).toContain('bg-bg-warm-light')
  })

  it('body has text-text-medium class for dark grey body text (AC-7)', async () => {
    vi.resetModules()
    const { default: RootLayout } = await import('../layout')
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const body = document.body
    expect(body.className).toContain('text-text-medium')
  })

  // P11-US-2 AC-8: Body uses Roboto 300 (Light) as default font
  it('body has font-sans class for Roboto font family (AC-8)', async () => {
    vi.resetModules()
    const { default: RootLayout } = await import('../layout')
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const body = document.body
    expect(body.className).toContain('font-sans')
  })

  it('body has font-light class for 300 weight default (AC-8)', async () => {
    vi.resetModules()
    const { default: RootLayout } = await import('../layout')
    render(
      <RootLayout>
        <div>content</div>
      </RootLayout>
    )
    const body = document.body
    expect(body.className).toContain('font-light')
  })
})
