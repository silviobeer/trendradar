# Trendradar ARTISET

> Interactive web app visualizing societal trends for members of Swiss social-sector associations CURAVIVA, INSOS, and YOUVITA (umbrella: ARTISET).

## Current State

**Last updated:** 2026-04-14
**Features implemented:** 13 (PROJ-1 through PROJ-13)
**Status:** Prototype (frontend-only, no database, no backend)
**Test coverage:** 222 tests (22 shared + 14 v1 + 200 v2, all passing, ~186 more than v1)

## Architecture Overview

### Tech Stack
- **Framework:** Next.js 15 (App Router, SSG via `generateStaticParams`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom `@theme` design tokens
- **Fonts:** Roboto + Roboto Slab (self-hosted via `next/font`)
- **Package manager:** pnpm Workspaces (monorepo)
- **Rendering:** SVG radar via React (no D3.js)
- **Deployment:** Vercel

### Key Architecture Decisions
- **Monorepo with shared data package:** `packages/shared` provides types, JSON data, and data-access functions consumed by both `apps/v1` and `apps/v2` with zero duplication.
- **SSG everywhere:** All data is known at build time (33 trends, 4 Handlungsfelder, 6 Megatrends, 3 Branchen). No server or API needed.
- **SVG via React, not D3:** React owns the DOM. The radar is a pure React component tree with geometry math in `radar-geometry.ts`.
- **Two independent UI variants:** `apps/v1` is the functional prototype; `apps/v2` applies ARTISET corporate identity. Both share `packages/shared`.
- **React Context for cross-page filter:** `BranchenFilterContext` manages which Branchen are active, shared across all pages without external state libraries.

### Directory Structure
```
packages/shared/           @trendradar/shared
  data/                    JSON seed data (trends, handlungsfelder, megatrends, branchen)
  src/types.ts             TypeScript interfaces
  src/data.ts              Data-access functions (getBySlug, getByX, etc.)

apps/v1/                   First UI variant (generic Tailwind)
  src/app/                 Routes: /, /handlungsfeld/[slug], /trend/[slug], /megatrend/[slug]
  src/components/radar/    TrendRadar, RadarBlip, RadarTooltip
  src/components/layout/   HomeLayout (fullscreen 3-column grid)
  src/lib/radar-geometry.ts  Triangle positioning algorithm

apps/v2/                   Second UI variant (ARTISET CI)
  src/app/                 Same 4 routes, ARTISET-styled
  src/app/globals.css      Design tokens (@theme), base typography styles
  src/components/ui/       Button, Tag, Card (CI-styled primitives)
  src/components/layout/   Header, Footer, ContentLayout, HomeLayout
  src/components/radar/    Copied from v1, CI-styled
  src/components/trends/   TrendList, ZeitbereichBadge
  src/components/filter/   BranchenFilter (CI toggle buttons)
  src/components/navigation/  Breadcrumb

specs/                     Feature specs, architecture docs, implementation plans
  PROJ-*-spec.md           Feature specifications with user stories and ACs
  PROJ-*-progress.md       Implementation progress and QA results
  mockups/*.html           Clickable HTML mockups
  concepts/                Design concepts and research
```

### Data Model
```
Trend (33) --n:m--> Handlungsfeld (4)   [radar segments]
Trend (33) --n:m--> Megatrend (6)       [overarching trends]
Trend (33) --n:m--> Branche (3)         [CURAVIVA, INSOS, YOUVITA]
```
A trend appearing in N Handlungsfelder renders N triangles on the radar.

## Features

### PROJ-1: Data Model & Seed Data
**Purpose:** Provide a typed, consistent data foundation for all UI variants.
**Scope:** 33 real CURAVIVA trends with descriptions, Reflexionsfragen, and branchenspezifische texts. 4 Handlungsfelder, 6 Megatrends, 3 Branchen. TypeScript types and data-access layer.
**Key files:** `packages/shared/`
**Spec:** `specs/PROJ-1-datenmodell-seed-daten-spec.md`

### PROJ-2: Radar Visualization
**Purpose:** Interactive SVG radar showing trends as colored triangles in four segments (Handlungsfelder) and three rings (Zeitrahmen).
**Scope:** `TrendRadar` component, `RadarBlip` triangles with tooltips, equidistant positioning algorithm, segment/ring layout.
**Key files:** `apps/v1/src/components/radar/`, `apps/v1/src/lib/radar-geometry.ts`
**Spec:** `specs/PROJ-2-radar-visualisierung-spec.md`

### PROJ-3: Branchenfilter
**Purpose:** Let users filter trends by association (CURAVIVA, INSOS, YOUVITA) across all pages.
**Scope:** `BranchenFilterContext` (React Context), toggle buttons, visibility logic.
**Key files:** `apps/v1/src/contexts/BranchenFilterContext.tsx`, `apps/v1/src/components/filter/`

### PROJ-4..8: Pages & Navigation (v1)
**Purpose:** Four page types (Startseite, Handlungsfeld, Trend-Detail, Megatrend) with breadcrumb navigation.
**Scope:** Basic layouts with generic Tailwind styling. Functional prototype.
**Key files:** `apps/v1/src/app/` (4 routes), `apps/v1/src/components/navigation/`

### PROJ-9: Fullscreen Radar Layout
**Purpose:** Maximize radar visibility with a 3-column grid: left sidebar (Neueste Entwicklungen), center (radar + filter), right sidebar (Megatrends).
**Scope:** Responsive grid with mobile overlay sidebars, escape-to-close, toggle buttons. Desktop shows inline sidebars, mobile shows overlay drawers.
**Key files:** `apps/v1/src/components/layout/HomeLayout.tsx`
**Spec:** `specs/PROJ-9-fullscreen-radar-layout-spec.md`

### PROJ-10: Design Tokens & Color System (v2)
**Purpose:** Establish the ARTISET corporate identity color system as reusable Tailwind theme tokens.
**Scope:** Navy primary scale (7 shades), warm beige backgrounds, orange accent, Handlungsfeld colors, corrected Branchen CI colors (CURAVIVA=#207003, INSOS=#B8032C, YOUVITA=#2D518C), radar ring tokens.
**Key files:** `apps/v2/src/app/globals.css` (`@theme` block)
**Spec:** `specs/PROJ-10-design-tokens-farbsystem-spec.md`

### PROJ-11: Typography (v2)
**Purpose:** Self-hosted ARTISET fonts with a defined type scale.
**Scope:** Roboto (body) + Roboto Slab (headings) via `next/font`. Type scale from 12px (tags) to 54px (h1). Base styles for headings, body, and links.
**Key files:** `apps/v2/src/lib/fonts.ts`, `apps/v2/src/app/globals.css` (`@layer base`)
**Spec:** `specs/PROJ-11-typografie-spec.md`

### PROJ-12: UI Components (v2)
**Purpose:** CI-styled component library replacing v1's generic Tailwind components.
**Scope:** Button (primary/secondary/ghost), ZeitbereichBadge (3 navy tones), Tag (handlungsfeld/megatrend), BranchenFilter (CI color toggles), Card (with optional brand-color left border), Breadcrumb (CI typography).
**Key files:** `apps/v2/src/components/ui/`, `apps/v2/src/components/trends/`, `apps/v2/src/components/navigation/`
**Spec:** `specs/PROJ-12-ui-komponenten-styling-spec.md`

### PROJ-13: Pages & Layouts (v2)
**Purpose:** Rebuild all four page types with ARTISET CI styling, consistent layout, and generous whitespace.
**Scope:** Navy header/footer, warm-beige content area, 780px max-width for subpages, section dividers, 3-column homepage with radar. Radar components copied from v1 and CI-styled.
**Key files:** `apps/v2/src/app/` (4 routes), `apps/v2/src/components/layout/`
**Spec:** `specs/PROJ-13-seiten-layouts-spec.md`

## Known Limitations

- **Desktop-first:** No mobile optimization for the radar SVG (Phase 1 scope). Sidebar overlays work on mobile, but the radar itself is not touch-optimized.
- **No backend:** All data is static JSON. No user accounts, no persistence, no API.
- **No search:** Users navigate via radar clicks, sidebar links, or breadcrumbs. No text search.
- **v1 and v2 are independent:** No shared UI components between apps. Only `packages/shared` (data) is shared.
- **Branchenfilter state resets on reload:** React Context is in-memory only, not persisted to URL or localStorage.

## Gotchas for Future Developers

- **Radar geometry is complex:** `radar-geometry.ts` uses an equidistant triangle-positioning algorithm. Changes to segment count or ring count require careful geometry updates. Well-tested — don't rewrite lightly.
- **v2 copies radar from v1:** The radar components in `apps/v2/src/components/radar/` are copies, not imports. If you fix a radar bug, fix it in both places.
- **Tailwind v4 `@theme` tokens:** v2 uses Tailwind v4's native `@theme` directive in `globals.css`, not a `tailwind.config.ts`. Color tokens like `bg-primary`, `text-accent`, etc. are defined there.
- **`BranchenFilterProvider` must wrap pages:** Any component using `useBranchenFilter()` (like `TrendList`, `BranchenFilter`) needs the provider in its ancestor tree. It's in `layout.tsx` for both apps.
- **Server/Client boundary:** v2 pages are Server Components by default. Client components like `TrendList` and `BranchenFilter` are marked `"use client"` and can be imported directly into server pages — React handles the boundary.
