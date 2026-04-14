# Trendradar v2 — ARTISET CI Implementation Plan

**Goal:** Build `apps/v2` as a new Next.js app in the monorepo with full ARTISET Corporate Identity — design tokens, typography, UI components, and page layouts. `apps/v1` stays as functional reference. `packages/shared` provides all data.

**Architecture:** Frontend-only SSG app. Design tokens via Tailwind v4 @theme in globals.css. Self-hosted Roboto/Roboto Slab via next/font/local. Radar components and BranchenFilterContext copied from v1, UI components built fresh with CI tokens. Same 4 routes as v1.

**Tech Stack:** Next.js 15 (App Router, SSG), TypeScript, Tailwind CSS v4, Vitest, pnpm Workspaces

---

## User Story Dependencies

| US | Spec | Scope | Agent Type | Depends on | Can start when |
|----|------|-------|------------|------------|----------------|
| P10-US-1 | PROJ-10 | frontend | frontend-implementer | — | immediately |
| P10-US-3 | PROJ-10 | frontend | frontend-implementer | P10-US-1 | P10-US-1 complete |
| P10-US-2 | PROJ-10 | frontend | frontend-implementer | P10-US-3 | P10-US-3 complete |
| P11-US-1 | PROJ-11 | frontend | frontend-implementer | P10-US-1 | P10-US-1 complete (parallel to P10-US-3) |
| P11-US-3 | PROJ-11 | frontend | frontend-implementer | P11-US-1, P10-US-3 | P11-US-1 + P10-US-3 complete |
| P10-US-4 | PROJ-10 | frontend | frontend-implementer | P10-US-3 | P10-US-3 complete (parallel to P11-US-3) |
| P10-US-5 | PROJ-10 | frontend | frontend-implementer | P10-US-3 | P10-US-3 complete (parallel to P10-US-4) |
| P11-US-2 | PROJ-11 | frontend | frontend-implementer | P11-US-3 | P11-US-3 complete |
| P12-US-1 | PROJ-12 | frontend | frontend-implementer | P10-US-2, P11-US-3 | Tokens + Typo complete |
| P12-US-2 | PROJ-12 | frontend | frontend-implementer | P10-US-2, P11-US-3 | Tokens + Typo complete (parallel to P12-US-1) |
| P12-US-3 | PROJ-12 | frontend | frontend-implementer | P10-US-2, P11-US-3 | Tokens + Typo complete (parallel to P12-US-1) |
| P12-US-4 | PROJ-12 | frontend | frontend-implementer | P10-US-2, P11-US-3 | Tokens + Typo complete (parallel to P12-US-1) |
| P12-US-5 | PROJ-12 | frontend | frontend-implementer | P10-US-2, P11-US-3 | Tokens + Typo complete (parallel to P12-US-1) |
| P12-US-6 | PROJ-12 | frontend | frontend-implementer | P10-US-2, P11-US-3 | Tokens + Typo complete (parallel to P12-US-1) |
| P13-US-5 | PROJ-13 | frontend | frontend-implementer | P12-US-* | All components complete |
| P13-US-1 | PROJ-13 | frontend | frontend-implementer | P13-US-5 | Base layout complete |
| P13-US-2 | PROJ-13 | frontend | frontend-implementer | P13-US-5 | Base layout complete (parallel to P13-US-1) |
| P13-US-3 | PROJ-13 | frontend | frontend-implementer | P13-US-5, P12-US-* | Base layout + components complete |
| P13-US-4 | PROJ-13 | frontend | frontend-implementer | P13-US-5 | Base layout complete (parallel to P13-US-2) |

**Implementation order (5 waves):**

1. **Wave 1 — Foundation:** P10-US-1 (v2 app scaffold + seed data fix)
2. **Wave 2 — Tokens & Fonts:** P10-US-3, P11-US-1 (parallel) → P10-US-2, P10-US-4, P10-US-5, P11-US-3 (parallel)
3. **Wave 3 — Typography Scale:** P11-US-2
4. **Wave 4 — UI Components:** P12-US-1 through P12-US-6 (all parallel)
5. **Wave 5 — Pages:** P13-US-5 (base layout) → P13-US-1, P13-US-2, P13-US-3, P13-US-4 (parallel)

---

## Wave 1 — Foundation

### P10-US-1: Als Verbandsmitglied moechte ich die Verbaende an ihren echten Farben erkennen, um mich sofort orientieren zu koennen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: CURAVIVA-Farbe ist #207003 (Gruen) statt #e07b39 (Orange)
- [ ] AC-2: INSOS-Farbe ist #B8032C (Rot/Crimson) statt #4a6fa5 (Blau)
- [ ] AC-3: YOUVITA-Farbe ist #2D518C (Blau) statt #2a9d8f (Tuerkis)
- [ ] AC-4: Die Farben sind in den Seed-Daten (packages/shared) aktualisiert

**Smoke Test:**
- Route: `http://localhost:3001/` (v2 dev server)
- Verify: "v2 app loads with a basic page that imports @trendradar/shared and renders without errors"

#### Task 1.1: Fix Verbandsfarben in Seed-Daten
**Fulfills:** AC-1, AC-2, AC-3, AC-4

**Files:**
- Modify: `packages/shared/data/branchen.json`
- Modify: `packages/shared/__tests__/data-integrity.test.ts` (update expected colors)

**What to build:** Update the `farbe` field for each Branche: CURAVIVA from #e07b39 to #207003, INSOS from #4a6fa5 to #B8032C, YOUVITA from #2a9d8f to #2D518C. Update any tests that assert on the old color values.

**TDD cycle:**
- RED: test that branchen.json contains the correct CI colors (#207003, #B8032C, #2D518C) for each Verband
- GREEN: update the JSON values
- REFACTOR: verify no other files hardcode the old colors
- COMMIT: `fix(PROJ-10): correct Verbandsfarben in seed data to CI colors`

#### Task 1.2: Scaffold v2 App
**Fulfills:** AC-4 (v2 can read shared data)

**Files:**
- Create: `apps/v2/package.json`
- Create: `apps/v2/next.config.ts`
- Create: `apps/v2/tsconfig.json`
- Create: `apps/v2/postcss.config.mjs`
- Create: `apps/v2/src/app/globals.css`
- Create: `apps/v2/src/app/layout.tsx`
- Create: `apps/v2/src/app/page.tsx`

**What to build:** Create a minimal Next.js 15 App Router app that mirrors v1's config (transpilePackages, Tailwind v4 via PostCSS). The root layout imports globals.css and wraps children. The page.tsx imports data from `@trendradar/shared` to verify the workspace link works. Dev server runs on port 3001 to avoid conflicts with v1.

**TDD cycle:**
- RED: test that the v2 app renders a page that successfully imports and displays data from @trendradar/shared (e.g. renders the count of trends)
- GREEN: scaffold the app with all config files, minimal layout and page
- REFACTOR: ensure pnpm workspace resolves @trendradar/shared correctly
- COMMIT: `feat(PROJ-10): scaffold v2 app in monorepo`

> ⚠️ **Gotcha:** Copy v1's `next.config.ts` (needs `transpilePackages: ["@trendradar/shared"]`), `postcss.config.mjs`, and `tsconfig.json` as starting points. The pnpm workspace already includes `apps/*` so v2 is auto-detected.

---

## Wave 2 — Tokens & Fonts

### P10-US-3: Als Entwickler moechte ich ein zentrales Farbsystem haben, damit Farbaenderungen an einer Stelle erfolgen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-8: Alle CI-Farben sind als CSS Custom Properties oder Tailwind-Theme-Variablen definiert (globals.css)
- [ ] AC-9: Folgende Farbkategorien sind abgedeckt: Primary (Navy-Abstufungen), Accent (Orange), Text, Hintergruende (warme Beige-Toene), Error
- [ ] AC-10: Keine hardcodierten Hex-Werte in Komponenten — alle referenzieren Design-Tokens

#### Task 2.1: Define Design Tokens in globals.css
**Fulfills:** AC-8, AC-9

**Files:**
- Modify: `apps/v2/src/app/globals.css`

**What to build:** Add Tailwind v4 @theme block with all CI color tokens. Categories: primary-120 through primary-10, accent-100/rollover, text-dark/text-medium/text-light, bg-warm-light/bg-warm-medium, button-light/medium/dark, primary-light-120 through primary-light-10, error. Also add Handlungsfeld colors (hf-klientel, hf-mitarbeitende, hf-extern, hf-betrieb) and Branche colors (brand-curaviva, brand-insos, brand-youvita). Reference: `specs/concepts/2026-04-14-artiset-corporate-identity.md` for all hex values.

**TDD cycle:**
- RED: test that CSS custom properties --color-primary, --color-accent, --color-bg-warm etc. are defined when globals.css is loaded (unit test checking CSS output or snapshot test of the generated tokens)
- GREEN: add the @theme block with all color definitions
- REFACTOR: organize tokens by category with comments
- COMMIT: `feat(PROJ-10): add ARTISET CI design tokens to globals.css`

### P11-US-1: Als Verbandsmitglied moechte ich die vertraute ARTISET-Schrift sehen, damit der Trendradar als Teil der Verbandswelt erkennbar ist
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Roboto Slab (Variable Font, weight 100-900) ist self-hosted eingebunden
- [ ] AC-2: Roboto (Variable Font, weight 100-900) ist self-hosted eingebunden
- [ ] AC-3: Keine externen Requests zu fonts.googleapis.com oder fonts.gstatic.com

#### Task 2.2: Download and integrate self-hosted fonts
**Fulfills:** AC-1, AC-2, AC-3

**Files:**
- Create: `apps/v2/public/fonts/RobotoSlab-VariableFont_wght.woff2`
- Create: `apps/v2/public/fonts/Roboto-VariableFont_wght.woff2`
- Create: `apps/v2/src/lib/fonts.ts`
- Modify: `apps/v2/src/app/layout.tsx`

**What to build:** Download Roboto and Roboto Slab Variable Font WOFF2 files from Google Fonts repository. Create a `fonts.ts` file that configures both fonts via `next/font/local` with `display: 'swap'` and appropriate fallbacks (serif for Roboto Slab, sans-serif for Roboto). Apply font CSS variables to the html element in layout.tsx.

**TDD cycle:**
- RED: test that layout.tsx applies font CSS variables (--font-heading, --font-body) to the html element, and that no external font requests are made (check for absence of fonts.googleapis.com in rendered output)
- GREEN: add font files, create fonts.ts config, update layout.tsx
- REFACTOR: ensure font-display: swap is set for both fonts
- COMMIT: `feat(PROJ-11): add self-hosted Roboto fonts via next/font/local`

> ⚠️ **Gotcha:** Download WOFF2 from https://github.com/google/fonts — the Variable Font files are in the `ofl/` directories. Do NOT use Google Fonts CDN links.

### P10-US-2: Als Verbandsmitglied moechte ich ein warmes, vertrauenswuerdiges Erscheinungsbild sehen, das zur ARTISET-Marke passt
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-5: Seitenhintergrund verwendet Warm-Beige #F5F3F1 statt reinem Weiss
- [ ] AC-6: Ueberschriften und Links verwenden Navy #003060 statt Schwarz/Grau
- [ ] AC-7: Fliesstext verwendet Dunkelgrau #363636

#### Task 2.3: Apply base colors to layout
**Fulfills:** AC-5, AC-6, AC-7

**Files:**
- Modify: `apps/v2/src/app/layout.tsx`
- Modify: `apps/v2/src/app/globals.css` (base layer styles)

**What to build:** Apply background color bg-warm-light (#F5F3F1) to the body. Set default text color to text-medium (#363636). Set heading color to primary (#003060). These use the design tokens from Task 2.1.

**TDD cycle:**
- RED: test that body has background-color #F5F3F1, default text color is #363636, and h1/h2 elements use color #003060
- GREEN: add base styles using token classes in layout.tsx and globals.css @layer base
- REFACTOR: verify tokens are referenced, not hardcoded hex values (AC-10)
- COMMIT: `feat(PROJ-10): apply warm beige background and navy text colors`

### P10-US-4: Als Verbandsmitglied moechte ich die Radar-Ringe visuell unterscheiden koennen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-11: Ring "Handeln" hat Fuellfarbe #ccd6df (Primary 20)
- [ ] AC-12: Ring "Vorbereiten" hat Fuellfarbe #e5eaef (Primary 10)
- [ ] AC-13: Ring "Beobachten" hat Fuellfarbe #F5F3F1 (Primary Light 10)
- [ ] AC-14: Trennlinien zwischen Ringen verwenden #6683a0 (Primary 60)

#### Task 2.4: Add radar ring color tokens
**Fulfills:** AC-11, AC-12, AC-13, AC-14

**Files:**
- Modify: `apps/v2/src/app/globals.css` (add ring tokens if not already in Task 2.1)

**What to build:** Ensure the design tokens include ring-specific semantic tokens: ring-handeln (#ccd6df), ring-vorbereiten (#e5eaef), ring-beobachten (#F5F3F1), ring-border (#6683a0). These are already defined as primary-20, primary-10, primary-light-10, primary-60 in Task 2.1 — add semantic aliases for clarity.

**TDD cycle:**
- RED: test that CSS custom properties --color-ring-handeln, --color-ring-vorbereiten, --color-ring-beobachten, --color-ring-border are defined with correct values
- GREEN: add semantic token aliases in globals.css
- REFACTOR: ensure no duplication with the base primary tokens
- COMMIT: `feat(PROJ-10): add semantic radar ring color tokens`

### P10-US-5: Als Verbandsmitglied moechte ich die vier Handlungsfelder im Radar farblich unterscheiden koennen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-15: Klientinnen und Klienten: #5A8A3C (Warmes Gruen)
- [ ] AC-16: Mitarbeitende: #335980 (Primary 80 / Warmes Blau)
- [ ] AC-17: Externes Umfeld: #8C7B68 (Primary Light 120 / Warmes Braun)
- [ ] AC-18: Betrieb: #3D7A80 (Gedaempftes Teal)
- [ ] AC-19: Die Handlungsfeld-Farben sind als Design-Tokens definiert

#### Task 2.5: Add Handlungsfeld color tokens
**Fulfills:** AC-15, AC-16, AC-17, AC-18, AC-19

**Files:**
- Modify: `apps/v2/src/app/globals.css`

**What to build:** Ensure Handlungsfeld colors are defined as tokens: hf-klientel (#5A8A3C), hf-mitarbeitende (#335980), hf-extern (#8C7B68), hf-betrieb (#3D7A80). Should already be in Task 2.1 — verify and add if missing.

**TDD cycle:**
- RED: test that CSS custom properties for all 4 Handlungsfeld colors are defined
- GREEN: verify/add tokens in globals.css
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-10): add Handlungsfeld color tokens`

### P11-US-3: Als Entwickler moechte ich die Typografie-Skala zentral definiert haben, damit sie konsistent angewendet wird
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-11: Font-Familien sind als Tailwind-Theme-Variablen definiert (z.B. font-heading, font-body)
- [ ] AC-12: Font-Groessen und Zeilenhoehen sind als benannte Tailwind-Klassen verfuegbar
- [ ] AC-13: Bestehende Komponenten verwenden die neuen Typografie-Tokens statt generischer Tailwind-Klassen

#### Task 2.6: Define typography tokens in globals.css
**Fulfills:** AC-11, AC-12

**Files:**
- Modify: `apps/v2/src/app/globals.css`

**What to build:** Add font-family tokens to the @theme block: --font-heading (Roboto Slab variable + serif fallback), --font-body (Roboto variable + sans-serif fallback). Add named font-size tokens for the typography scale: text-h1 (54px/62px), text-h2 (32px/38px), text-h3 (24px/30px), text-nav (16px), text-body (20px/32px), text-small (14px/20px), text-tag (12px). These generate Tailwind utility classes automatically.

**TDD cycle:**
- RED: test that Tailwind generates utility classes font-heading, font-body, text-h1, text-h2 etc. from the @theme definitions
- GREEN: add the @theme entries to globals.css
- REFACTOR: verify naming consistency with CI spec
- COMMIT: `feat(PROJ-11): add typography tokens to Tailwind theme`

---

## Wave 3 — Typography Scale

### P11-US-2: Als Verbandsmitglied moechte ich eine luftige, elegante Typografie erleben, die nicht autoritaer wirkt
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-4: H1 (Seitentitel): Roboto Slab, 300 (Light), 54px, Zeilenhoehe 62px
- [ ] AC-5: H2 (Sektionen): Roboto Slab, 300 (Light), 32px, Zeilenhoehe 38px
- [ ] AC-6: H3 (Karten-Titel): Roboto Slab, 300 (Light), 24px, Zeilenhoehe 30px
- [ ] AC-7: Navigation: Roboto Slab, 400 (Regular), 16px
- [ ] AC-8: Body: Roboto, 300 (Light), 20px, Zeilenhoehe 32px
- [ ] AC-9: Small/Meta: Roboto, 300 (Light), 14px, Zeilenhoehe 20px
- [ ] AC-10: Tags/Badges: Roboto, 400 (Regular), 12px

#### Task 3.1: Apply typography base styles
**Fulfills:** AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, P11-AC-13

**Files:**
- Modify: `apps/v2/src/app/globals.css` (add @layer base heading/body rules)

**What to build:** In the CSS @layer base, set default heading styles (h1, h2, h3) to use font-heading with the CI-specified sizes and font-weight 300. Set body text to font-body weight 300, 20px/32px. These base styles apply globally so components don't need to repeat them. Also update layout.tsx body class to use font-body and font-light.

**TDD cycle:**
- RED: test that h1 renders with font-family containing "Roboto Slab", font-weight 300, font-size 54px, line-height 62px. Test h2 at 32px/38px. Test body text at Roboto 300 20px/32px.
- GREEN: add base layer CSS rules using the typography tokens
- REFACTOR: ensure tokens from Wave 2 are referenced, not hardcoded values
- COMMIT: `feat(PROJ-11): apply ARTISET typography scale as base styles`

---

## Wave 4 — UI Components

### P12-US-1: Als Verbandsmitglied moechte ich klare, einladende Aktions-Buttons sehen, die mich zur Interaktion einladen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Primary CTA: Hintergrund #F59702 (Orange), Text Weiss
- [ ] AC-2: Primary CTA Hover: Hintergrund #F7AC35 (heller Orange)
- [ ] AC-3: Secondary Button: Hintergrund #EAE7E3 (Warm-Beige), Text #003060 (Navy)
- [ ] AC-4: Secondary Hover: Hintergrund #E0DBD6
- [ ] AC-5: Ghost Button: Transparent, Text #003060, Rahmen 1px #003060

**Smoke Test:**
- Route: (component test only — no dedicated page)
- Verify: "Primary button renders with orange background, hover changes to lighter orange. Secondary button renders with beige background. Ghost button has navy border."

#### Task 4.1: Create Button component
**Fulfills:** AC-1, AC-2, AC-3, AC-4, AC-5

**Files:**
- Create: `apps/v2/src/components/ui/Button.tsx`
- Create: `apps/v2/src/components/ui/__tests__/Button.test.tsx`

**What to build:** A Button component with variants: "primary" (orange CTA), "secondary" (beige), "ghost" (transparent with border). Uses design tokens for all colors. Accepts standard button props + variant prop. Each variant has hover state via Tailwind hover: classes.

**TDD cycle:**
- RED: test that Button variant="primary" renders with bg-accent text-white. Test variant="secondary" renders with bg-warm-medium text-primary. Test variant="ghost" renders with transparent bg, border, text-primary.
- GREEN: implement Button component with variant prop and Tailwind classes using design tokens
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-12): add Button component with primary/secondary/ghost variants`

### P12-US-2: Als Verbandsmitglied moechte ich auf einen Blick sehen, welchem Zeitbereich ein Trend zugeordnet ist
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-6: Badge "Handeln": Hintergrund #003060 (Navy), Text Weiss
- [ ] AC-7: Badge "Vorbereiten": Hintergrund #335980 (Primary 80), Text Weiss
- [ ] AC-8: Badge "Beobachten": Hintergrund #ccd6df (Primary 20), Text #003060 (Navy)

#### Task 4.2: Create ZeitbereichBadge component
**Fulfills:** AC-6, AC-7, AC-8

**Files:**
- Create: `apps/v2/src/components/trends/ZeitbereichBadge.tsx`
- Create: `apps/v2/src/components/trends/__tests__/ZeitbereichBadge.test.tsx`

**What to build:** A badge component that takes a `zeitrahmen: Zeitrahmen` prop (from @trendradar/shared types) and renders with the correct background/text colors. "handeln" = navy bg + white text, "vorbereiten" = primary-80 bg + white text, "beobachten" = primary-20 bg + navy text. Uses design tokens.

**TDD cycle:**
- RED: test that ZeitbereichBadge zeitrahmen="handeln" renders with bg-primary text-white and text "Handeln". Test "vorbereiten" with bg-primary-80 text-white. Test "beobachten" with bg-primary-20 text-primary.
- GREEN: implement component with switch on zeitrahmen prop
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-12): add ZeitbereichBadge component`

### P12-US-3: Als Verbandsmitglied moechte ich Handlungsfeld- und Megatrend-Tags auf der Trend-Detailseite sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-9: Handlungsfeld-Tags: Hintergrund #e5eaef (Primary 10), Text #003060 (Navy)
- [ ] AC-10: Megatrend-Tags: Hintergrund #ccd6df (Primary 20), Text #003060 (Navy)
- [ ] AC-11: Tags sind klickbar und fuehren zur jeweiligen Seite

#### Task 4.3: Create Tag component
**Fulfills:** AC-9, AC-10, AC-11

**Files:**
- Create: `apps/v2/src/components/ui/Tag.tsx`
- Create: `apps/v2/src/components/ui/__tests__/Tag.test.tsx`

**What to build:** A Tag component with variants: "handlungsfeld" (primary-10 bg) and "megatrend" (primary-20 bg). Both use navy text. Renders as a Next.js Link when `href` prop is provided (making it clickable), otherwise as a span. Uses design tokens.

**TDD cycle:**
- RED: test that Tag variant="handlungsfeld" renders with bg-primary-10 text-primary. Test variant="megatrend" with bg-primary-20. Test that when href is provided, it renders as a link element.
- GREEN: implement Tag component with variant and optional href props
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-12): add Tag component for Handlungsfeld and Megatrend tags`

### P12-US-4: Als Verbandsmitglied moechte ich den Branchenfilter in den echten Verbandsfarben sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-12: Aktiver Toggle: Hintergrund in Verbandsfarbe, Text Weiss
- [ ] AC-13: Inaktiver Toggle: Hintergrund #EAE7E3, Text #363636
- [ ] AC-14: Branchen-Tags in Listen: Verbandsfarbe mit 15% Opacity als Hintergrund, Verbandsfarbe als Text

#### Task 4.4: Create BranchenFilter and BranchenTag components
**Fulfills:** AC-12, AC-13, AC-14

**Files:**
- Create: `apps/v2/src/components/filter/BranchenFilter.tsx`
- Create: `apps/v2/src/components/filter/__tests__/BranchenFilter.test.tsx`
- Create: `apps/v2/src/contexts/BranchenFilterContext.tsx` (copy from v1)

**What to build:** Copy `BranchenFilterContext.tsx` from v1 — it works as-is. Create BranchenFilter component that renders toggle buttons for each Branche. Active state: background in Branche.farbe, white text. Inactive state: bg-warm-medium, text-medium. Also create inline BranchenTag for use in trend lists: renders Branche name with 15% opacity background in Verbandsfarbe and full Verbandsfarbe as text color.

**TDD cycle:**
- RED: test that BranchenFilter renders 3 toggle buttons. Test active toggle has background-color matching the branche farbe. Test inactive toggle has bg #EAE7E3. Test clicking a toggle calls toggleBranche.
- GREEN: implement BranchenFilter using BranchenFilterContext and design tokens
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-12): add BranchenFilter with CI Verbandsfarben`

> ⚠️ **Gotcha:** The Branche.farbe values in the JSON data are now CI-correct (from Task 1.1). The component reads them dynamically — use inline style for the brand-specific color since it comes from data, not from static tokens.

### P12-US-5: Als Verbandsmitglied moechte ich Inhalte in sauberen Karten praesentiert sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-15: Karten-Hintergrund: Weiss #FFFFFF
- [ ] AC-16: Schatten: 0 1px 3px rgba(0, 48, 96, 0.08) (Navy-basiert, warm)
- [ ] AC-17: Border-Radius: 8px
- [ ] AC-18: Branchenspezifische Karten: 4px linker Farbrand in Verbandsfarbe

#### Task 4.5: Create Card component
**Fulfills:** AC-15, AC-16, AC-17, AC-18

**Files:**
- Create: `apps/v2/src/components/ui/Card.tsx`
- Create: `apps/v2/src/components/ui/__tests__/Card.test.tsx`

**What to build:** A Card component with white background, Navy-based shadow, 8px border-radius. Optional `brandColor` prop: when provided, renders a 4px left border in that color. Uses design tokens.

**TDD cycle:**
- RED: test that Card renders with bg-white, rounded-lg (8px), shadow. Test that brandColor="#207003" adds a left border in that color.
- GREEN: implement Card component
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-12): add Card component with optional brand accent`

### P12-US-6: Als Verbandsmitglied moechte ich jederzeit wissen, wo ich mich im Trendradar befinde
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-19: Font: Roboto 300, 14px
- [ ] AC-20: Trennzeichen: >
- [ ] AC-21: Vorherige Ebenen: #003060 (Navy, klickbar)
- [ ] AC-22: Aktuelle Seite: #363636 (nicht klickbar)

#### Task 4.6: Create Breadcrumb component
**Fulfills:** AC-19, AC-20, AC-21, AC-22

**Files:**
- Create: `apps/v2/src/components/navigation/Breadcrumb.tsx`
- Create: `apps/v2/src/components/navigation/__tests__/Breadcrumb.test.tsx`

**What to build:** A Breadcrumb component that takes an array of {label, href?} items. Items with href render as navy-colored Next.js Links. The last item (no href) renders as plain text in #363636. Separator is ">". Font uses the small/meta token (Roboto 300, 14px).

**TDD cycle:**
- RED: test that Breadcrumb items with href render as links with text-primary color. Test last item renders as span with text-medium color. Test separator ">" appears between items.
- GREEN: implement Breadcrumb component
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-12): add Breadcrumb component with CI styling`

---

## Wave 5 — Pages & Layouts

### P13-US-5: Als Verbandsmitglied moechte ich auf allen Seiten ein konsistentes Grundlayout sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-25: Gemeinsames Layout: Navy-Header oben, Inhalt auf Warm-Beige, Navy-Footer unten
- [ ] AC-26: Konsistenter maximaler Content-Bereich (max-width) auf Unterseiten
- [ ] AC-27: Grosszuegiges Spacing zwischen Sektionen (viel Weissraum gemaess CI)
- [ ] AC-28: Trennlinien zwischen Sektionen in #6683a0 (Primary 60) oder subtiler

**Smoke Test:**
- Route: `http://localhost:3001/`
- Verify: "Navy header visible at top with 'ARTISET Trendradar' text. Warm beige background. Navy footer at bottom."

#### Task 5.1: Create Header and Footer components
**Fulfills:** AC-25

**Files:**
- Create: `apps/v2/src/components/layout/Header.tsx`
- Create: `apps/v2/src/components/layout/Footer.tsx`
- Create: `apps/v2/src/components/layout/__tests__/Header.test.tsx`
- Create: `apps/v2/src/components/layout/__tests__/Footer.test.tsx`
- Modify: `apps/v2/src/app/layout.tsx`

**What to build:** Header: Navy #003060 background, white text, "ARTISET Trendradar" title in Roboto Slab 400, navigation link "Startseite". Footer: Navy #003060 background, muted white text, copyright. Add both to the root layout.tsx so they appear on all pages.

**TDD cycle:**
- RED: test that Header renders with bg-primary and contains "ARTISET Trendradar". Test Footer renders with bg-primary and contains copyright text.
- GREEN: implement Header and Footer, add to layout.tsx
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): add Header and Footer with Navy CI styling`

#### Task 5.2: Create ContentLayout wrapper for subpages
**Fulfills:** AC-26, AC-27, AC-28

**Files:**
- Create: `apps/v2/src/components/layout/ContentLayout.tsx`
- Create: `apps/v2/src/components/layout/__tests__/ContentLayout.test.tsx`

**What to build:** A layout wrapper for content pages (Handlungsfeld, Trend, Megatrend) that provides max-width (780px), horizontal padding, and generous vertical spacing. Also defines a SectionDivider component: a thin horizontal line using primary-60 or subtler. This wrapper is NOT used on the Startseite (which has its own 3-column grid).

**TDD cycle:**
- RED: test that ContentLayout renders children within a max-w-[780px] container with padding. Test SectionDivider renders an hr element.
- GREEN: implement ContentLayout and SectionDivider
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): add ContentLayout wrapper for subpages`

### P13-US-1: Als Verbandsmitglied moechte ich auf der Startseite den Radar im Zentrum sehen, flankiert von Neuste Entwicklungen und Megatrends
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Header in Navy #003060 mit Logo und Navigation
- [ ] AC-2: Seitenhintergrund in Warm-Beige #F5F3F1
- [ ] AC-3: Linke Sidebar "Neuste Entwicklungen" auf Warm-Beige Hintergrund
- [ ] AC-4: Rechte Sidebar "Megatrends" auf Warm-Beige Hintergrund
- [ ] AC-5: Branchenfilter unterhalb des Radars in CI-Farben
- [ ] AC-6: Footer in Navy #003060

**Smoke Test:**
- Route: `http://localhost:3001/`
- Verify: "3-column layout visible. Left sidebar shows 'Neuste Entwicklungen' with trend names. Center shows SVG radar with colored triangles. Right sidebar shows 'Megatrends' list. Branchenfilter below radar has 3 colored toggle buttons."

#### Task 5.3: Copy and adapt Radar components from v1
**Fulfills:** AC-5 (partially — radar rendering)

**Files:**
- Create: `apps/v2/src/components/radar/TrendRadar.tsx` (copy from v1, adapt styling)
- Create: `apps/v2/src/components/radar/RadarBlip.tsx` (copy from v1, adapt styling)
- Create: `apps/v2/src/components/radar/RadarTooltip.tsx` (copy from v1)
- Create: `apps/v2/src/components/radar/index.ts`
- Create: `apps/v2/src/lib/radar-geometry.ts` (copy from v1 as-is)
- Create: `apps/v2/src/components/radar/__tests__/TrendRadar.test.tsx`

**What to build:** Copy all radar components and radar-geometry.ts from v1. Adapt TrendRadar.tsx to use CI design tokens for ring fill colors (ring-handeln, ring-vorbereiten, ring-beobachten), ring borders (ring-border), and Handlungsfeld arc colors (hf-klientel, hf-mitarbeitende, hf-extern, hf-betrieb). RadarBlip reads Branche.farbe from data (already CI-correct). RadarTooltip uses Navy background.

**TDD cycle:**
- RED: test that TrendRadar renders an SVG with 3 circles (rings) and renders RadarBlip for each visible trend. Test that ring colors match CI tokens.
- GREEN: copy components from v1, update Tailwind classes and SVG fill/stroke values to use CI tokens
- REFACTOR: remove any v1-specific code that doesn't apply
- COMMIT: `feat(PROJ-13): copy and CI-adapt radar components from v1`

> ⚠️ **Gotcha:** `radar-geometry.ts` is pure math — copy as-is. The SVG rendering in TrendRadar.tsx may use hardcoded hex values — replace them with token references or CSS variables.

#### Task 5.4: Copy and adapt Sidebar components from v1
**Fulfills:** AC-3, AC-4

**Files:**
- Create: `apps/v2/src/components/sidebar/NeusteEntwicklungen.tsx` (copy from v1, adapt styling)
- Create: `apps/v2/src/components/sidebar/MegatrendSidebar.tsx` (copy from v1, adapt styling)
- Create: `apps/v2/src/components/sidebar/__tests__/NeusteEntwicklungen.test.tsx`
- Create: `apps/v2/src/components/sidebar/__tests__/MegatrendSidebar.test.tsx`

**What to build:** Copy sidebar components from v1. Restyle: warm-beige background (#F5F3F1), trend titles in Navy #003060 (not the old teal/green), dates in secondary text color. Megatrend items in Navy. Use design tokens throughout.

**TDD cycle:**
- RED: test that NeusteEntwicklungen renders trend names as links with Navy text color. Test MegatrendSidebar renders megatrend names with Navy text.
- GREEN: copy from v1, update classes to CI tokens
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): add CI-styled sidebar components`

#### Task 5.5: Build Startseite with HomeLayout
**Fulfills:** AC-1, AC-2, AC-3, AC-4, AC-5, AC-6

**Files:**
- Create: `apps/v2/src/components/layout/HomeLayout.tsx`
- Modify: `apps/v2/src/app/page.tsx`
- Create: `apps/v2/src/app/__tests__/page.test.tsx`

**What to build:** Create HomeLayout as a 3-column grid (sidebar left, radar center, sidebar right) with BranchenFilter below the radar, similar to v1's HomeLayout but styled with CI tokens. The page.tsx fetches all data from @trendradar/shared and passes it to HomeLayout. Include responsive sidebar toggle buttons for small screens (copy logic from v1).

**TDD cycle:**
- RED: test that the Startseite page renders HomeLayout containing NeusteEntwicklungen, TrendRadar, MegatrendSidebar, and BranchenFilter. Test that BranchenFilterProvider wraps the page.
- GREEN: implement HomeLayout grid and page.tsx data fetching
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): implement Startseite with 3-column CI layout`

### P13-US-2: Als Verbandsmitglied moechte ich auf der Handlungsfeld-Seite eine klare Struktur mit Beschreibung und Trendliste sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-7: Breadcrumb oben: "Startseite > [Handlungsfeld-Name]"
- [ ] AC-8: H1-Titel des Handlungsfeldes in Roboto Slab Light 54px
- [ ] AC-9: Beschreibungstext in Roboto Light 20px, #363636
- [ ] AC-10: CTA-Button "Trends anzeigen" in Orange #F59702
- [ ] AC-11: Trendliste mit Zeitbereich-Badges und Branchen-Indikatoren
- [ ] AC-12: Branchenfilter wirkt auf die angezeigte Trendliste

**Smoke Test:**
- Route: `http://localhost:3001/handlungsfeld/betrieb`
- Verify: "Breadcrumb shows 'Startseite > Betrieb'. H1 title visible. Description text below. Orange CTA button. Clicking it shows trend list with badges. Branchenfilter toggles filter the list."

#### Task 5.6: Create TrendList component
**Fulfills:** AC-11

**Files:**
- Create: `apps/v2/src/components/trends/TrendList.tsx`
- Create: `apps/v2/src/components/trends/__tests__/TrendList.test.tsx`

**What to build:** A TrendList component that renders a list of trends. Each item shows: a colored triangle icon (Branche.farbe), trend name as link to /trend/[slug], ZeitbereichBadge, and small branch dots (colored squares for each Branche). Uses Card wrapper for the list container. Items separated by warm-beige dividers.

**TDD cycle:**
- RED: test that TrendList renders one item per trend with name, ZeitbereichBadge, and branch indicator dots. Test that trend name is a link to /trend/[slug].
- GREEN: implement TrendList using ZeitbereichBadge, design tokens
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): add TrendList component with badges and branch indicators`

#### Task 5.7: Build Handlungsfeld page
**Fulfills:** AC-7, AC-8, AC-9, AC-10, AC-11, AC-12

**Files:**
- Create: `apps/v2/src/app/handlungsfeld/[slug]/page.tsx`
- Create: `apps/v2/src/app/handlungsfeld/__tests__/page.test.tsx`

**What to build:** SSG page that loads a Handlungsfeld by slug from @trendradar/shared. Renders: Breadcrumb ("Startseite > [Name]"), H1 title, description text, BranchenFilter, orange CTA Button ("Trends anzeigen"), and TrendList filtered by BranchenFilterContext. Uses ContentLayout wrapper. Generate static params for all Handlungsfelder.

**TDD cycle:**
- RED: test that the page renders breadcrumb with correct Handlungsfeld name, H1 title, description, CTA button, and a TrendList with the correct trends. Test that BranchenFilter is present.
- GREEN: implement the page with data fetching and ContentLayout
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): implement Handlungsfeld page with CI layout`

### P13-US-3: Als Verbandsmitglied moechte ich auf der Trend-Detailseite alle Informationen strukturiert sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-13: Breadcrumb: "Startseite > [Handlungsfeld] > [Trend-Name]"
- [ ] AC-14: H1-Titel mit Zeitbereich-Badge und Handlungsfeld-Tags
- [ ] AC-15: Beschreibungstext mit Trennlinien zwischen Sektionen
- [ ] AC-16: Reflexionsfragen-Sektion mit H2-Titel
- [ ] AC-17: Megatrend-Tags (klickbar, fuehren zur Megatrend-Seite)
- [ ] AC-18: Branchenspezifische Karten mit farbigem linkem Rand (nur wenn Inhalt vorhanden)
- [ ] AC-19: Karten-Reihenfolge: CURAVIVA, INSOS, YOUVITA

**Smoke Test:**
- Route: `http://localhost:3001/trend/automatisierte-administration`
- Verify: "Breadcrumb shows 3 levels. H1 title with Zeitbereich badge and Handlungsfeld tags. Description text with section dividers. Reflexionsfragen section if questions exist. Megatrend tags clickable. Branchenspezifische cards with colored left borders, in order CURAVIVA/INSOS/YOUVITA."

#### Task 5.8: Build Trend detail page
**Fulfills:** AC-13, AC-14, AC-15, AC-16, AC-17, AC-18, AC-19

**Files:**
- Create: `apps/v2/src/app/trend/[slug]/page.tsx`
- Create: `apps/v2/src/app/trend/__tests__/page.test.tsx`

**What to build:** SSG page loading a Trend by slug. Renders: 3-level Breadcrumb, H1 with ZeitbereichBadge + Handlungsfeld Tags, description with SectionDividers, Reflexionsfragen list (only if fragen array non-empty), Megatrend Tags (as links to /megatrend/[slug]), branchenspezifische Cards with left border in Branche.farbe (only for Branchen with non-empty branchenTexte, in order CURAVIVA/INSOS/YOUVITA). Uses ContentLayout wrapper.

**TDD cycle:**
- RED: test that page renders breadcrumb with 3 levels. Test ZeitbereichBadge and Handlungsfeld Tags next to title. Test Reflexionsfragen section renders when fragen exist and is hidden when empty. Test Megatrend tags are links. Test branchenspezifische cards render with correct left border color and only when text is non-empty.
- GREEN: implement page with data fetching, all sections, conditional rendering
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): implement Trend detail page with all CI sections`

### P13-US-4: Als Verbandsmitglied moechte ich auf der Megatrend-Seite den Megatrend und seine beeinflussten Trends sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-20: Breadcrumb: "Startseite > [Megatrend-Name]"
- [ ] AC-21: H1-Titel des Megatrends in Roboto Slab Light 54px
- [ ] AC-22: Beschreibungstext in Roboto Light 20px
- [ ] AC-23: Sektion "Beeinflusste Trends" mit H2-Titel
- [ ] AC-24: Trendliste mit Zeitbereich-Badges (gleiche Darstellung wie Handlungsfeld-Seite)

**Smoke Test:**
- Route: `http://localhost:3001/megatrend/demografischer-wandel`
- Verify: "Breadcrumb shows 'Startseite > Demografischer Wandel'. H1 title. Description text. 'Beeinflusste Trends' section with TrendList containing badges."

#### Task 5.9: Build Megatrend page
**Fulfills:** AC-20, AC-21, AC-22, AC-23, AC-24

**Files:**
- Create: `apps/v2/src/app/megatrend/[slug]/page.tsx`
- Create: `apps/v2/src/app/megatrend/__tests__/page.test.tsx`

**What to build:** SSG page loading a Megatrend by slug. Renders: 2-level Breadcrumb, H1 title, description, "Beeinflusste Trends" H2 section with TrendList (reusing the same component from Task 5.6). Uses ContentLayout wrapper. Generate static params for all Megatrends.

**TDD cycle:**
- RED: test that page renders breadcrumb with "Startseite > [name]". Test H1 title and description. Test "Beeinflusste Trends" section renders TrendList with correct trends.
- GREEN: implement page
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-13): implement Megatrend page with CI layout`

---

## Quality Gate

After all user stories are implemented and verified by Ralph loops:

### Gate 1 — Code Review
- Diff all changes since BASE_SHA: `git diff BASE_SHA..HEAD`
- Review against `references/code-reviewer.md` checklist
- Fix all P0/P1 findings immediately
- Log P2/P3 to `specs/PROJ-10-13-progress.md`

### Gate 2 — SonarCloud
- Get changed files: `git diff BASE_SHA..HEAD --name-only`
- Run scanner: `pnpm run sonar` (if available)
- Fetch issues for this branch and filter to changed files only
- Fix all BLOCKER/CRITICAL/MAJOR issues immediately
- Log MINOR/INFO to `specs/PROJ-10-13-progress.md`

**Exit criteria:** Zero P0/P1 code review findings, zero BLOCKER/CRITICAL/MAJOR sonar issues, all tests passing, no new lint errors.

## QA

After Quality Gate passes, run end-to-end QA **in the main agent context** (not a subagent — MCP tools required):

1. Start v2 dev server (`cd apps/v2 && pnpm dev --port 3001`)
2. Use Playwright MCP tools to test every AC in the browser
3. Document bugs in `specs/PROJ-10-13-progress.md`
4. Fix all Critical/High bugs (spawn fix subagents), re-verify after each fix
5. Present remaining Medium/Low bugs to user for decision
6. Final regression pass after all fixes

**QA is not optional — it runs automatically after every Quality Gate.**
