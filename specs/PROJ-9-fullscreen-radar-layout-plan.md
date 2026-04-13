# Fullscreen Radar Layout Implementation Plan

**Goal:** Make the radar dominate the homepage by filling the entire viewport — no scrolling, sidebars as narrow as possible at the edges, filter pinned to the bottom.

**Architecture:** CSS Grid with `h-screen` divides the viewport into 3 rows (header, content, filter) and 3 columns (left sidebar, radar, right sidebar). The SVG radar scales dynamically via its existing `viewBox` — no geometry changes needed. Below 1024px, sidebars collapse into toggleable overlays.

**Tech Stack:** Tailwind CSS v4, React useState (sidebar toggle), existing Next.js App Router SSG setup.

---

## User Story Dependencies

| US | Scope | Agent Type | Depends on | Can start when |
|----|-------|------------|------------|----------------|
| US-1 | frontend | frontend-implementer | — | immediately |
| US-2 | frontend | frontend-implementer | US-1 | US-1 complete |
| US-3 | frontend | frontend-implementer | US-1 | US-1 complete (parallel to US-2) |
| US-5 | frontend | frontend-implementer | US-1 | US-1 complete (parallel to US-2, US-3) |
| US-4 | frontend | frontend-implementer | US-1, US-2, US-3 | US-1–3 complete |

**Implementation order:**
1. US-1 (fullscreen grid + radar scaling — foundation)
2. US-2, US-3, US-5 (parallel — sidebars, filter, header within the grid)
3. US-4 (responsive sidebar toggle — depends on grid + sidebars being done)

---

## US-1: Als Nutzer moechte ich den Radar grossflaechig sehen, um alle Trends auf einen Blick zu erfassen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Startseite hat kein vertikales Scrollen (overflow hidden)
- [ ] AC-2: Radar-SVG skaliert dynamisch mit dem Viewport (kein fester max-w-[600px])
- [ ] AC-3: Radar bleibt quadratisch (1:1 Aspect Ratio via viewBox)
- [ ] AC-4: Radar ist horizontal zentriert im verfuegbaren Platz

**Smoke Test:**
- Route: `/`
- Verify: "Page has no vertical scrollbar. Radar SVG fills the center area between header and bottom filter. Radar is visually square and centered. No max-w-[600px] constraint visible."

### Task 1.1: Fullscreen Grid Layout on Homepage
**Fulfills:** AC-1, AC-4

**Files:**
- Modify: `apps/v1/src/app/page.tsx`

**What to build:** Replace the current `grid-cols-[1fr_auto_1fr] max-w-[1440px]` layout with a fullscreen CSS Grid: `h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[min-content_1fr_min-content] overflow-hidden`. The outer wrapper replaces `min-h-screen bg-gray-50` with `h-screen bg-gray-50 overflow-hidden`. Header gets `col-span-3`. The center column holds the radar in a flex container with `items-center justify-center`. Remove `max-w-[1440px]`, `px-6`, `py-6`, and `gap-6` from the main grid.

**TDD cycle:**
- RED: test that the homepage root element has classes `h-screen` and `overflow-hidden`; test that `max-w-[1440px]` is NOT present on any element
- GREEN: update page.tsx layout structure
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-9): implement fullscreen grid layout on homepage`

### Task 1.2: Radar SVG Dynamic Scaling
**Fulfills:** AC-2, AC-3

**Files:**
- Modify: `apps/v1/src/components/radar/TrendRadar.tsx`

**What to build:** In the TrendRadar component, change the SVG wrapper from `relative inline-block` to `relative w-full h-full flex items-center justify-center`. Change the SVG element from `w-full max-w-[600px]` to `max-w-full max-h-full` while keeping `viewBox="0 0 600 600"`. The viewBox preserves the 1:1 aspect ratio automatically — the SVG scales to fit whichever dimension (width or height) is smaller in the container. Add `aspect-square` to the SVG if needed to ensure the browser respects the ratio.

**TDD cycle:**
- RED: test that the SVG element does NOT have a `max-w-[600px]` class; test that it has `max-h-full` class; test that viewBox remains `0 0 600 600`
- GREEN: update TrendRadar.tsx SVG classes
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-9): enable dynamic radar SVG scaling`

---

## US-2: Als Nutzer moechte ich die Sidebars schmal am Rand sehen, damit der Radar maximalen Platz bekommt
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-5: Linke Sidebar ("Neueste Entwicklungen") ist maximal 160px breit
- [ ] AC-6: Rechte Sidebar ("Megatrends") ist maximal 160px breit
- [ ] AC-7: Sidebars kleben direkt am Bildschirmrand (kein Padding zum Rand)
- [ ] AC-8: Sidebars haben dezenten Border nur zur Radar-Seite hin
- [ ] AC-9: Sidebar-Content scrollt intern bei Overflow (overflow-y: auto)

**Smoke Test:**
- Route: `/`
- Verify: "Left sidebar shows 'Neueste Entwicklungen' with narrow width, flush against left edge. Right sidebar shows 'Megatrends' flush against right edge. Both have border only on the side facing the radar. Sidebars are scrollable if content overflows."

### Task 2.1: Narrow Sidebar Containers
**Fulfills:** AC-5, AC-6, AC-7, AC-8, AC-9

**Files:**
- Modify: `apps/v1/src/app/page.tsx`

**What to build:** In page.tsx, replace the sidebar wrapper divs. Left sidebar: remove `bg-white rounded-lg border border-gray-200 p-4 self-start`, replace with `w-[140px] max-w-[160px] overflow-y-auto border-r border-gray-200 bg-white p-2`. Right sidebar: same but `border-l` instead of `border-r`. No outer padding — sidebars sit flush against viewport edges. The `min-content` grid column ensures they don't grow beyond their content/max-width.

**TDD cycle:**
- RED: test that left sidebar container has `max-w-[160px]` and `overflow-y-auto`; test that right sidebar container has `max-w-[160px]` and `overflow-y-auto`; test that left sidebar has `border-r` (not full border); test that right sidebar has `border-l` (not full border)
- GREEN: update sidebar wrappers in page.tsx
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-9): implement narrow edge-flush sidebars`

---

## US-3: Als Nutzer moechte ich den Branchenfilter immer am unteren Bildschirmrand sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-10: Branchenfilter ist in der letzten Grid-Zeile positioniert
- [ ] AC-11: Branchenfilter spannt die volle Breite (alle 3 Spalten)
- [ ] AC-12: Filter-Hoehe ist kompakt (~40-50px)
- [ ] AC-13: Branche-Buttons sind horizontal zentriert
- [ ] AC-14: Dezente Trennlinie (border-top) trennt Filter vom Radar

**Smoke Test:**
- Route: `/`
- Verify: "Branchenfilter is pinned to the bottom of the viewport. It spans the full width. The three branch buttons are horizontally centered. A subtle top border separates it from the radar area above."

### Task 3.1: Bottom-Pinned Branchenfilter
**Fulfills:** AC-10, AC-11, AC-12, AC-13, AC-14

**Files:**
- Modify: `apps/v1/src/app/page.tsx`

**What to build:** Move the BranchenFilter from inside the center column into the third grid row. Wrap it in a `col-span-3 border-t border-gray-200 bg-white px-4 py-2 flex justify-center items-center` container. Remove the old `bg-white rounded-lg border border-gray-200 p-4 w-full` wrapper that currently sits below the radar in the center column. The `auto` row height in the grid ensures it takes only the space it needs (~40-50px).

**TDD cycle:**
- RED: test that the BranchenFilter wrapper has `col-span-3` and `border-t`; test that the filter wrapper has `justify-center`; test that the filter is NOT nested inside the radar column
- GREEN: restructure page.tsx to move filter to grid row 3
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-9): pin Branchenfilter to bottom of viewport`

---

## US-5: Als Nutzer moechte ich dass der Header unveraendert bleibt
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-21: Header zeigt "ARTISET Trendradar"
- [ ] AC-22: Header spannt alle 3 Grid-Spalten
- [ ] AC-23: Header-Hoehe ist ca. 60px

**Smoke Test:**
- Route: `/`
- Verify: "Header shows 'ARTISET Trendradar' at the top, spans full width, visually same height as before."

### Task 5.1: Header Grid Integration
**Fulfills:** AC-21, AC-22, AC-23

**Files:**
- Modify: `apps/v1/src/app/page.tsx`

**What to build:** Add `col-span-3` to the existing header element so it spans all three grid columns. The header content ("ARTISET Trendradar") and styling remain unchanged. The `auto` first row in the grid ensures the header takes its natural height (~60px).

**TDD cycle:**
- RED: test that the header element contains text "ARTISET Trendradar"; test that header has class for spanning full width (col-span-3 or equivalent)
- GREEN: add col-span class to header
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-9): integrate header into fullscreen grid`

---

## US-4: Als Nutzer auf einem schmalen Screen moechte ich die Sidebars bei Bedarf einblenden koennen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-15: Unter 1024px Viewport-Breite sind Sidebars ausgeblendet
- [ ] AC-16: Radar nutzt die volle Breite wenn Sidebars ausgeblendet sind
- [ ] AC-17: Je ein Toggle-Button fuer linke und rechte Sidebar ist sichtbar (< 1024px)
- [ ] AC-18: Klick auf Toggle blendet die Sidebar als Overlay ein
- [ ] AC-19: Overlay-Sidebar kann wieder geschlossen werden
- [ ] AC-20: Branchenfilter bleibt auf allen Screengroessen sichtbar

**Smoke Test:**
- Route: `/` (viewport 800px wide)
- Verify: "Sidebars are hidden. Two toggle buttons visible (one left edge, one right edge). Clicking left toggle shows 'Neueste Entwicklungen' as overlay. Clicking close or toggle again hides it. Branchenfilter stays visible at bottom. Radar fills the full width."

### Task 4.1: Responsive Sidebar Hide/Show
**Fulfills:** AC-15, AC-16, AC-17, AC-18, AC-19, AC-20

**Files:**
- Modify: `apps/v1/src/app/page.tsx`

**What to build:** The page.tsx must become a client component (add `"use client"` or extract the responsive logic into a client wrapper). Add two `useState<boolean>` for left/right sidebar visibility. On screens >= 1024px (`lg:` breakpoint in Tailwind), sidebars render normally in the grid. On screens < 1024px: sidebar grid columns collapse (grid changes to `grid-cols-[1fr]`), toggle buttons appear (small icon buttons at left/right edges, positioned fixed or absolute), and clicking a toggle renders the corresponding sidebar as a fixed overlay (`fixed inset-y-0 left-0 z-50 w-[200px] bg-white shadow-lg` for left, `right-0` for right) with a close button. The Branchenfilter stays in the grid regardless of viewport size — it is not affected by the sidebar toggle.

> ⚠️ **Gotcha:** `page.tsx` is currently a Server Component. Adding `useState` requires either converting it to a client component or extracting the responsive sidebar logic into a separate client component that wraps the layout. The latter is cleaner — keep page.tsx as server component and create a `HomeLayout` client component that handles the toggle state.

**TDD cycle:**
- RED: test that at viewport < 1024px, sidebar containers have `hidden` class (or equivalent); test that toggle buttons render at < 1024px; test that clicking left toggle sets left sidebar visible; test that clicking close button hides the sidebar; test that BranchenFilter is always rendered regardless of sidebar state
- GREEN: create HomeLayout client component with sidebar toggle logic, update page.tsx to use it
- REFACTOR: standard cleanup
- COMMIT: `feat(PROJ-9): add responsive sidebar toggle for small screens`

---

## Quality Gate

After all user stories are implemented and verified by Ralph loops:

### Gate 1 — Code Review
- Diff all changes since BASE_SHA: `git diff BASE_SHA..HEAD`
- Review against `references/code-reviewer.md` checklist
- Fix all P0/P1 findings immediately
- Log P2/P3 to `progress.md`

### Gate 2 — SonarCloud
- Get changed files: `git diff BASE_SHA..HEAD --name-only`
- Run scanner: `npm run sonar`
- Fetch issues for this branch and filter to changed files only
- Fix all BLOCKER/CRITICAL/MAJOR issues immediately
- Log MINOR/INFO to `progress.md`

**Exit criteria:** Zero P0/P1 code review findings, zero BLOCKER/CRITICAL/MAJOR sonar issues, all tests passing, no new lint errors.

## QA

After Quality Gate passes, run end-to-end QA **in the main agent context** (not a subagent — MCP tools required):

1. Start dev server (`pnpm dev`)
2. Use Playwright MCP tools to test every AC in the browser
3. Document bugs in `progress.md`
4. Fix all Critical/High bugs (spawn fix subagents), re-verify after each fix
5. Present remaining Medium/Low bugs to user for decision
6. Final regression pass after all fixes

**QA is not optional — it runs automatically after every Quality Gate.**
