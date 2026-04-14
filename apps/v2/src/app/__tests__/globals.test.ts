import { readFileSync } from 'fs'
import { join } from 'path'
import { describe, it, expect } from 'vitest'

const cssPath = join(__dirname, '../globals.css')
const css = readFileSync(cssPath, 'utf-8')

describe('globals.css design tokens', () => {
  it('contains @theme block', () => {
    expect(css).toContain('@theme')
  })

  describe('Primary (Navy) tokens', () => {
    it('defines --color-primary', () => {
      expect(css).toContain('--color-primary:')
    })

    it('defines --color-primary-120', () => {
      expect(css).toContain('--color-primary-120:')
    })

    it('defines --color-primary-80', () => {
      expect(css).toContain('--color-primary-80:')
    })

    it('defines --color-primary-60', () => {
      expect(css).toContain('--color-primary-60:')
    })

    it('defines --color-primary-40', () => {
      expect(css).toContain('--color-primary-40:')
    })

    it('defines --color-primary-20', () => {
      expect(css).toContain('--color-primary-20:')
    })

    it('defines --color-primary-10', () => {
      expect(css).toContain('--color-primary-10:')
    })
  })

  describe('Accent (Orange) tokens', () => {
    it('defines --color-accent', () => {
      expect(css).toContain('--color-accent:')
    })

    it('defines --color-accent-rollover', () => {
      expect(css).toContain('--color-accent-rollover:')
    })
  })

  describe('Text tokens', () => {
    it('defines --color-text-dark', () => {
      expect(css).toContain('--color-text-dark:')
    })

    it('defines --color-text-medium', () => {
      expect(css).toContain('--color-text-medium:')
    })

    it('defines --color-text-light', () => {
      expect(css).toContain('--color-text-light:')
    })
  })

  describe('Background tokens', () => {
    it('defines --color-bg-warm-light', () => {
      expect(css).toContain('--color-bg-warm-light:')
    })

    it('defines --color-bg-warm-medium', () => {
      expect(css).toContain('--color-bg-warm-medium:')
    })
  })

  describe('Button tokens', () => {
    it('defines --color-button-light', () => {
      expect(css).toContain('--color-button-light:')
    })

    it('defines --color-button-medium', () => {
      expect(css).toContain('--color-button-medium:')
    })

    it('defines --color-button-dark', () => {
      expect(css).toContain('--color-button-dark:')
    })
  })

  describe('Primary Light (warm beige scale) tokens', () => {
    it('defines --color-primary-light-120', () => {
      expect(css).toContain('--color-primary-light-120:')
    })

    it('defines --color-primary-light-100', () => {
      expect(css).toContain('--color-primary-light-100:')
    })

    it('defines --color-primary-light-80', () => {
      expect(css).toContain('--color-primary-light-80:')
    })

    it('defines --color-primary-light-60', () => {
      expect(css).toContain('--color-primary-light-60:')
    })

    it('defines --color-primary-light-40', () => {
      expect(css).toContain('--color-primary-light-40:')
    })

    it('defines --color-primary-light-20', () => {
      expect(css).toContain('--color-primary-light-20:')
    })

    it('defines --color-primary-light-10', () => {
      expect(css).toContain('--color-primary-light-10:')
    })
  })

  describe('Error token', () => {
    it('defines --color-error', () => {
      expect(css).toContain('--color-error:')
    })
  })

  describe('Handlungsfeld tokens', () => {
    it('defines --color-hf-klientel', () => {
      expect(css).toContain('--color-hf-klientel:')
    })

    it('defines --color-hf-mitarbeitende', () => {
      expect(css).toContain('--color-hf-mitarbeitende:')
    })

    it('defines --color-hf-extern', () => {
      expect(css).toContain('--color-hf-extern:')
    })

    it('defines --color-hf-betrieb', () => {
      expect(css).toContain('--color-hf-betrieb:')
    })
  })

  describe('Branche tokens', () => {
    it('defines --color-brand-curaviva', () => {
      expect(css).toContain('--color-brand-curaviva:')
    })

    it('defines --color-brand-insos', () => {
      expect(css).toContain('--color-brand-insos:')
    })

    it('defines --color-brand-youvita', () => {
      expect(css).toContain('--color-brand-youvita:')
    })
  })

  describe('Radar ring tokens', () => {
    it('defines --color-ring-handeln', () => {
      expect(css).toContain('--color-ring-handeln:')
    })

    it('defines --color-ring-vorbereiten', () => {
      expect(css).toContain('--color-ring-vorbereiten:')
    })

    it('defines --color-ring-beobachten', () => {
      expect(css).toContain('--color-ring-beobachten:')
    })

    it('defines --color-ring-border', () => {
      expect(css).toContain('--color-ring-border:')
    })
  })

  // P10-US-2 AC-6/AC-7: Base styles for headings and links
  describe('@layer base styles (P10-US-2)', () => {
    it('contains @layer base block', () => {
      expect(css).toContain('@layer base')
    })

    it('sets heading color to var(--color-primary) (AC-6)', () => {
      expect(css).toContain('h1, h2, h3, h4, h5, h6')
      expect(css).toContain('color: var(--color-primary)')
    })

    it('sets link color to var(--color-primary) (AC-6)', () => {
      // link 'a' selector inside @layer base — use depth-aware extraction
      const start = css.indexOf('@layer base')
      let depth = 0
      let end = start
      for (let i = start; i < css.length; i++) {
        if (css[i] === '{') depth++
        if (css[i] === '}') {
          depth--
          if (depth === 0) { end = i; break }
        }
      }
      const layerBaseBlock = css.slice(start, end + 1)
      expect(layerBaseBlock).toMatch(/\ba\b/)
    })
  })

  // P11-US-2 AC-4/AC-5/AC-6/AC-8: Typography base styles applied via @layer base
  describe('Typography base styles (P11-US-2)', () => {
    // Helper: extract the full @layer base block from the CSS
    const getLayerBaseBlock = () => {
      const start = css.indexOf('@layer base')
      if (start === -1) return ''
      // Find the matching closing brace (accounting for nested braces)
      let depth = 0
      let end = start
      for (let i = start; i < css.length; i++) {
        if (css[i] === '{') depth++
        if (css[i] === '}') {
          depth--
          if (depth === 0) { end = i; break }
        }
      }
      return css.slice(start, end + 1)
    }

    it('sets font-family to var(--font-serif) on all headings (AC-4/AC-5/AC-6)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('font-family: var(--font-serif)')
    })

    it('sets font-weight to 300 on all headings (AC-4/AC-5/AC-6)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('font-weight: 300')
    })

    it('sets h1 font-size to var(--text-h1) (AC-4)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('font-size: var(--text-h1)')
    })

    it('sets h1 line-height to var(--text-h1--line-height) (AC-4)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('line-height: var(--text-h1--line-height)')
    })

    it('sets h2 font-size to var(--text-h2) (AC-5)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('font-size: var(--text-h2)')
    })

    it('sets h2 line-height to var(--text-h2--line-height) (AC-5)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('line-height: var(--text-h2--line-height)')
    })

    it('sets h3 font-size to var(--text-h3) (AC-6)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('font-size: var(--text-h3)')
    })

    it('sets h3 line-height to var(--text-h3--line-height) (AC-6)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('line-height: var(--text-h3--line-height)')
    })

    it('sets body font-size to var(--text-body-lg) (AC-8)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('font-size: var(--text-body-lg)')
    })

    it('sets body line-height to var(--text-body-lg--line-height) (AC-8)', () => {
      const block = getLayerBaseBlock()
      expect(block).toContain('line-height: var(--text-body-lg--line-height)')
    })
  })

  // P11-US-3 AC-11/AC-12: Typography tokens
  describe('Typography tokens (P11-US-3)', () => {
    it('defines --font-sans referencing --font-body (AC-11)', () => {
      expect(css).toContain('--font-sans:')
    })

    it('defines --font-serif referencing --font-heading (AC-11)', () => {
      expect(css).toContain('--font-serif:')
    })

    it('defines --text-h1 font-size token (AC-12)', () => {
      expect(css).toContain('--text-h1:')
    })

    it('defines --text-h2 font-size token (AC-12)', () => {
      expect(css).toContain('--text-h2:')
    })

    it('defines --text-h3 font-size token (AC-12)', () => {
      expect(css).toContain('--text-h3:')
    })

    it('defines --text-body-lg font-size token (AC-12)', () => {
      expect(css).toContain('--text-body-lg:')
    })

    it('defines --text-small font-size token (AC-12)', () => {
      expect(css).toContain('--text-small:')
    })

    it('defines --text-tag font-size token (AC-12)', () => {
      expect(css).toContain('--text-tag:')
    })

    it('defines --text-nav font-size token (AC-12)', () => {
      expect(css).toContain('--text-nav:')
    })
  })
})
