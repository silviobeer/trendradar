import { describe, it, expect, vi } from 'vitest'

// next/font/google runs at build time and is not available in vitest/jsdom.
// We mock the module so we can test the shape of what fonts.ts exports.
vi.mock('next/font/google', () => ({
  Roboto: vi.fn((options: Record<string, unknown>) => ({
    variable: options.variable,
    className: 'mock-roboto',
  })),
  Roboto_Slab: vi.fn((options: Record<string, unknown>) => ({
    variable: options.variable,
    className: 'mock-roboto-slab',
  })),
}))

describe('fonts configuration', () => {
  it('exports roboto with --font-body CSS variable', async () => {
    const { roboto } = await import('../fonts')
    expect(roboto.variable).toBe('--font-body')
  })

  it('exports robotoSlab with --font-heading CSS variable', async () => {
    const { robotoSlab } = await import('../fonts')
    expect(robotoSlab.variable).toBe('--font-heading')
  })
})
