# PROJ-13: Seiten-Layouts

## Status: Planned

## Kontext

Die Seiten-Layouts werden in `apps/v2` neu aufgebaut, orientiert am ARTISET-Design-Konzept und den Wireframes. Die Fullscreen-Radar-Architektur aus v1 (PROJ-9) dient als funktionale Referenz fuer das 3-Spalten-Layout der Startseite. Dieses Feature fokussiert auf Layout-Struktur, Spacing und visuelle Hierarchie — nicht auf einzelne Komponenten (PROJ-12).

**Scope: `apps/v2`** — Alle Seiten werden in v2 neu erstellt. v1-Layouts (insb. HomeLayout, Radar-Integration) dienen als Referenz fuer Grid-Struktur und responsive Sidebar-Logik.

## Abhaengigkeiten

- Benoetigt: PROJ-10 (Design-Tokens), PROJ-11 (Typografie), PROJ-12 (Komponenten-Styling)
- Referenz: apps/v1 (PROJ-9 Fullscreen-Radar-Layout fuer Startseite)

## User Stories

### US-1: Als Verbandsmitglied moechte ich auf der Startseite den Radar im Zentrum sehen, flankiert von Neuste Entwicklungen und Megatrends

**Given** der User oeffnet die Startseite des Trendradars
**When** die Seite geladen ist
**Then** sieht er das bestehende 3-Spalten-Layout (Sidebar links, Radar Mitte, Sidebar rechts) in CI-konformen Farben

**Acceptance Criteria:**
- [ ] AC-1: Header in Navy #003060 mit Logo und Navigation
- [ ] AC-2: Seitenhintergrund in Warm-Beige #F5F3F1
- [ ] AC-3: Linke Sidebar "Neuste Entwicklungen" auf Warm-Beige Hintergrund
- [ ] AC-4: Rechte Sidebar "Megatrends" auf Warm-Beige Hintergrund
- [ ] AC-5: Branchenfilter unterhalb des Radars in CI-Farben
- [ ] AC-6: Footer in Navy #003060

### US-2: Als Verbandsmitglied moechte ich auf der Handlungsfeld-Seite eine klare Struktur mit Beschreibung und Trendliste sehen

**Given** der User navigiert zu einer Handlungsfeld-Seite (z.B. "Klientinnen und Klienten")
**When** die Seite geladen ist
**Then** sieht er Breadcrumb, Titel, Beschreibung, Branchenfilter und eine aufklappbare Trendliste

**Acceptance Criteria:**
- [ ] AC-7: Breadcrumb oben: "Startseite > [Handlungsfeld-Name]"
- [ ] AC-8: H1-Titel des Handlungsfeldes in Roboto Slab Light 54px
- [ ] AC-9: Beschreibungstext in Roboto Light 20px, #363636
- [ ] AC-10: CTA-Button "Trends anzeigen" in Orange #F59702
- [ ] AC-11: Trendliste mit Zeitbereich-Badges und Branchen-Indikatoren
- [ ] AC-12: Branchenfilter wirkt auf die angezeigte Trendliste

### US-3: Als Verbandsmitglied moechte ich auf der Trend-Detailseite alle Informationen strukturiert sehen

**Given** der User navigiert zu einer Trend-Detailseite
**When** die Seite geladen ist
**Then** sieht er den Trend mit allen Metadaten, Beschreibung, Reflexionsfragen und branchenspezifischen Inhalten

**Acceptance Criteria:**
- [ ] AC-13: Breadcrumb: "Startseite > [Handlungsfeld] > [Trend-Name]"
- [ ] AC-14: H1-Titel mit Zeitbereich-Badge und Handlungsfeld-Tags
- [ ] AC-15: Beschreibungstext mit Trennlinien zwischen Sektionen
- [ ] AC-16: Reflexionsfragen-Sektion mit H2-Titel
- [ ] AC-17: Megatrend-Tags (klickbar, fuehren zur Megatrend-Seite)
- [ ] AC-18: Branchenspezifische Karten mit farbigem linkem Rand (nur wenn Inhalt vorhanden)
- [ ] AC-19: Karten-Reihenfolge: CURAVIVA, INSOS, YOUVITA

### US-4: Als Verbandsmitglied moechte ich auf der Megatrend-Seite den Megatrend und seine beeinflussten Trends sehen

**Given** der User navigiert zu einer Megatrend-Seite (z.B. "Demografischer Wandel")
**When** die Seite geladen ist
**Then** sieht er Breadcrumb, Titel, Beschreibung und eine Liste beeinflusster Trends

**Acceptance Criteria:**
- [ ] AC-20: Breadcrumb: "Startseite > [Megatrend-Name]"
- [ ] AC-21: H1-Titel des Megatrends in Roboto Slab Light 54px
- [ ] AC-22: Beschreibungstext in Roboto Light 20px
- [ ] AC-23: Sektion "Beeinflusste Trends" mit H2-Titel
- [ ] AC-24: Trendliste mit Zeitbereich-Badges (gleiche Darstellung wie Handlungsfeld-Seite)

### US-5: Als Verbandsmitglied moechte ich auf allen Seiten ein konsistentes Grundlayout sehen

**Given** der User navigiert zwischen verschiedenen Seiten
**When** er Header, Footer und allgemeines Spacing betrachtet
**Then** ist das Grundlayout auf allen Seiten identisch

**Acceptance Criteria:**
- [ ] AC-25: Gemeinsames Layout: Navy-Header oben, Inhalt auf Warm-Beige, Navy-Footer unten
- [ ] AC-26: Konsistenter maximaler Content-Bereich (max-width) auf Unterseiten
- [ ] AC-27: Grosszuegiges Spacing zwischen Sektionen (viel Weissraum gemaess CI)
- [ ] AC-28: Trennlinien zwischen Sektionen in #6683a0 (Primary 60) oder subtiler

## Edge Cases

- Handlungsfeld-Seite ohne Trends (nach Branchenfilterung): Leerzustand mit Hinweistext anzeigen ("Keine Trends fuer die ausgewaehlten Branchen")
- Trend ohne Reflexionsfragen: Sektion nicht anzeigen
- Trend ohne branchenspezifische Inhalte: Sektion nicht anzeigen
- Trend mit nur einer Branche: Nur eine Karte anzeigen
- Sehr langer Trend-Titel: Umbruch, kein Overflow
- Megatrend ohne zugeordnete Trends: Leerzustand mit Hinweistext

## Technische Anforderungen

- Neue Layouts in `apps/v2/src/app/` und `apps/v2/src/components/layout/`
- v1 PROJ-9 Fullscreen-Radar-Layout als funktionale Referenz (Grid, Sidebar-Toggle, Radar-Integration)
- Radar-Komponenten aus v1 (`TrendRadar`, `RadarBlip`, `RadarTooltip`) werden nach v2 uebernommen und CI-gestylt
- Unterseiten-Layouts als wiederverwendbare Layout-Komponenten
- Spacing und Weissraum grosszuegig gemaess ARTISET CI ("die Seite atmet")
- Desktop-first (Phase 1), keine Mobile-Optimierung des Radars
- `packages/shared` wird fuer alle Daten und Types importiert — keine Duplikation

## Tech Design (Solution Architect)

### Key Tech-Entscheidungen

**1. Gleiche Routen-Struktur wie v1**
v2 hat die gleichen 4 Routen: `/`, `/handlungsfeld/[slug]`, `/trend/[slug]`, `/megatrend/[slug]`. Die Seitenstruktur ist durch die Daten und das Pflichtenheft vorgegeben. Nur das visuelle Erscheinungsbild aendert sich.

**2. Radar aus v1 uebernehmen**
Die Radar-Komponenten (`TrendRadar`, `RadarBlip`, `RadarTooltip`, `radar-geometry.ts`) werden aus v1 kopiert und CI-gestylt. Der Positionierungsalgorithmus ist komplex und getestet — Neuschreiben waere riskant und bringt keinen Mehrwert.

**3. BranchenFilterContext wiederverwenden**
Der React Context fuer den seitenuebergreifenden Branchenfilter-State funktioniert unabhaengig vom Styling und wird 1:1 uebernommen.

### Neue Dependencies

Keine. Gleicher Stack wie v1.

---

## QA Test Results

**Date:** 2026-04-14
**Tester:** QA Agent (code-level review + unit test run)
**Dev server:** `http://localhost:3001` (pnpm --filter v2 dev)
**Test run:** `pnpm --filter v2 test` → 1 failed, 199 passed (200 total)

### Test Suite Results

| File | Passed | Failed |
|------|:------:|:------:|
| `app/__tests__/layout.test.tsx` | ✓ | — |
| `app/__tests__/page.test.tsx` | ✓ | — |
| `app/handlungsfeld/__tests__/page.test.tsx` | 7/8 | **1** |
| `app/trend/__tests__/page.test.tsx` | ✓ | — |
| `app/megatrend/__tests__/page.test.tsx` | ✓ | — |
| `components/…` (16 files) | ✓ | — |

### Acceptance Criteria

#### US-1: Startseite 3-Spalten

| AC | Text | Result | Notes |
|----|------|:------:|-------|
| AC-1 | Header in Navy #003060 | PASS | `bg-primary` = #003060 in Header |
| AC-2 | Seitenhintergrund Warm-Beige #F5F3F1 | PASS | `bg-bg-warm-light` on body |
| AC-3 | Linke Sidebar auf Warm-Beige | PASS | `bg-bg-warm-light p-3` |
| AC-4 | Rechte Sidebar auf Warm-Beige | PASS | `bg-bg-warm-light p-3` |
| AC-5 | Branchenfilter unterhalb Radar in CI-Farben | PASS | `BranchenFilter` mit Verbandsfarben |
| AC-6 | Footer in Navy #003060 | PASS | `bg-primary` in Footer |

#### US-2: Handlungsfeld-Seite

| AC | Text | Result | Notes |
|----|------|:------:|-------|
| AC-7 | Breadcrumb "Startseite > [Name]" | PASS | Breadcrumb-Komponente korrekt |
| AC-8 | H1 in Roboto Slab Light 54px | PASS | `font-serif font-light text-h1` via globals.css |
| AC-9 | Beschreibungstext Roboto Light 20px, #363636 | PASS | body=20px, text-medium=#363636 |
| AC-10 | CTA-Button "Trends anzeigen" in Orange #F59702 | **FAIL** | BUG-1: `<Link>` statt `<button>` — Test schlaegt fehl |
| AC-11 | Trendliste mit Zeitbereich-Badges und Branchen-Indikatoren | PASS | TrendList zeigt beides |
| AC-12 | Branchenfilter wirkt auf Trendliste | PASS | TrendList nutzt `useBranchenFilter` |

#### US-3: Trend-Detailseite

| AC | Text | Result | Notes |
|----|------|:------:|-------|
| AC-13 | Breadcrumb "Startseite > [HF] > [Trend]" | PASS | firstHf als mittlere Ebene |
| AC-14 | H1 mit Badge und Handlungsfeld-Tags | PASS | ZeitbereichBadge + Tag-Komponenten |
| AC-15 | Beschreibungstext mit Trennlinien | PASS | SectionDivider verwendet |
| AC-16 | Reflexionsfragen-Sektion (nur wenn vorhanden) | PASS | `trend.fragen.length > 0` guard |
| AC-17 | Megatrend-Tags klickbar (Megatrend-Seite) | PASS | `Tag variant="megatrend" href="/megatrend/..."` |
| AC-18 | Branchenspezifische Karten mit farbigem Rand (nur wenn Inhalt) | PASS | `branchenTextEntries.filter(trim)` + `Card brandColor` |
| AC-19 | Reihenfolge CURAVIVA, INSOS, YOUVITA | PASS | `brancheOrder` Array erzwingt Reihenfolge |

#### US-4: Megatrend-Seite

| AC | Text | Result | Notes |
|----|------|:------:|-------|
| AC-20 | Breadcrumb "Startseite > [Megatrend]" | PASS | Korrekt implementiert |
| AC-21 | H1 Roboto Slab Light 54px | PASS | Globale h1-Styles |
| AC-22 | Beschreibungstext Roboto Light 20px | PASS | Globale body-Styles |
| AC-23 | Sektion "Beeinflusste Trends" mit H2 | PASS | Vorhanden, inkl. Leerstate |
| AC-24 | Trendliste mit Badges (gleiche Darstellung wie HF-Seite) | **FAIL** | BUG-3: Eigene Inline-Liste statt `<TrendList>` — fehlende Branchen-Dots, kein Branchenfilter |

#### US-5: Konsistentes Grundlayout

| AC | Text | Result | Notes |
|----|------|:------:|-------|
| AC-25 | Navy-Header, Warm-Beige Inhalt, Navy-Footer | PASS | RootLayout korrekt |
| AC-26 | Konsistenter max-width auf Unterseiten | PASS | `max-w-[780px]` in ContentLayout |
| AC-27 | Grosszuegiges Spacing | PASS | `py-12`, `mt-6..mt-10` |
| AC-28 | Trennlinien in #6683a0 oder subtiler | PASS | `border-primary-60/30` = #6683a0 @ 30% |

### Bugs

#### BUG-1 (High) — "Trends anzeigen" CTA ist ein Link, kein Button

- **Datei:** `apps/v2/src/app/handlungsfeld/[slug]/page.tsx:41`
- **Symptom:** Test `renders "Trends anzeigen" CTA button` schlaegt fehl mit `Unable to find an accessible element with the role "button"`. Das Element ist ein `<a>` (role=link), nicht ein `<button>`.
- **Spec AC-10:** "CTA-Button 'Trends anzeigen' in Orange #F59702"
- **Fix:** `<Link>` durch `<Button variant="primary">` oder durch `<a>` mit `role="button"` ersetzen. Da es zu einem Anker (`#trendliste`) scrollt, ist ein Anchor mit Scroll-Verhalten semantisch korrekt — der Test muss dann auf `getByRole('link')` angepasst werden, ODER die Komponente wird zu einem echten `<button>` mit `onClick`-Scroll.

#### BUG-2 (Medium) — TrendList: Leerzustand fehlt

- **Datei:** `apps/v2/src/components/trends/TrendList.tsx`
- **Symptom:** Wenn der Branchenfilter alle Trends ausblendet, rendert `TrendList` ein leeres `<div>`. Kein Hinweistext sichtbar.
- **Edge Case Spec:** "Keine Trends fuer die ausgewaehlten Branchen"
- **Fix:** After `visibleTrends.length === 0` guard: `<p className="py-4 text-text-light">Keine Trends fuer die ausgewaehlten Branchen</p>`

#### BUG-3 (Medium) — Megatrend-Seite nutzt eigene Trendliste statt `<TrendList>`

- **Datei:** `apps/v2/src/app/megatrend/[slug]/page.tsx:52–65`
- **Symptom:** Eigene Inline-Implementierung statt der `<TrendList>`-Komponente. Branchen-Indikatoren (farbige Dots) fehlen. Branchenfilter hat keinen Effekt.
- **Spec AC-24:** "gleiche Darstellung wie Handlungsfeld-Seite"
- **Fix:** `<TrendList trends={trends} />` statt der Inline-Variante verwenden (erfordert BranchenFilterContext, der bereits im RootLayout verfuegbar ist).

#### BUG-4 (Low) — ZeitbereichBadge: Hardcodierter Pixelwert statt Token

- **Datei:** `apps/v2/src/components/trends/ZeitbereichBadge.tsx:25`
- **Symptom:** `text-[12px]` statt `text-tag` (Token aus globals.css). Gleicher Wert, aber verletzt Design-Token-Konvention.
- **Fix:** `text-[12px]` → `text-tag`

### Zusammenfassung

| Metrik | Wert |
|--------|------|
| Acceptance Criteria gesamt | 28 |
| Bestanden | 26 |
| Fehlgeschlagen | 2 (AC-10, AC-24) |
| Bugs Critical | 0 |
| Bugs High | 1 |
| Bugs Medium | 2 |
| Bugs Low | 1 |
| Production-ready | **NEIN** |

**Urteil:** Nicht production-ready. BUG-1 (High) laesst den Test-Build fehlschlagen. BUG-3 (Medium) verletzt explizite AC. Nach Behebung von BUG-1 und BUG-3 erneutes QA empfohlen.
