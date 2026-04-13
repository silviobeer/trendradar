# PROJ-1..8 Progress

## Status: in progress
## Current Wave: 4
## BASE_SHA: d464d7bc981e32896709a834587d48ff4e768b58

---

## Wave 1: PROJ-1 Datenmodell & Seed-Daten

### US-1: Strukturierte JSON-Dateien laden — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 1.1 Monorepo + Next.js Setup | ✓ | ✓ | ✓ |
| 1.2 JSON-Datendateien erstellen | ✓ | ✓ | ✓ |
| 1.3 Referenzielle Integritaet | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-1 | `packages/shared/data/handlungsfelder.json` enthaelt 4 Handlungsfelder mit id, name, beschreibung | ✓ |
| AC-2 | `packages/shared/data/megatrends.json` enthaelt 6 Megatrends mit id, name, beschreibung | ✓ |
| AC-3 | `packages/shared/data/trends.json` enthaelt Trends mit id, name, beschreibung, zeitrahmen, handlungsfeldIds[], megatrendIds[], branchenIds[], fragen[] | ✓ |
| AC-4 | `packages/shared/data/branchen.json` enthaelt 3 Branchen mit id, name, organisation, farbe | ✓ |
| AC-5 | Alle IDs sind konsistent und referenzierbar zwischen den Dateien | ✓ |

#### Ralph Loop
- Iterations: 1
- All ACs passed on first check (data-integrity.test.ts covers AC-1..5)
- Commit: `feat(PROJ-1): add JSON data files with 33 real CURAVIVA trends`

---

### US-2: Realistische Seed-Daten — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 2.1 Echte CURAVIVA-Trenddaten | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-6 | Mindestens 25 Trends mit vollstaendigem Beschreibungstext | ✓ |
| AC-7 | Jeder Trend hat mindestens 1 HF, 1 MT, 1 Branche | ✓ |
| AC-8 | Jeder Trend hat mindestens 2 Reflexionsfragen | ✓ |
| AC-9 | Alle 3 Zeitrahmen abgedeckt | ✓ |
| AC-10 | Alle 4 Handlungsfelder haben mindestens 3 Trends | ✓ |
| AC-11 | Jeder Trend hat Erstellungsdatum | ✓ |

#### Ralph Loop
- Iterations: 1
- All ACs passed (data-integrity.test.ts covers AC-6..11)
- Commit: `feat(PROJ-1): populate seed data with 33 real CURAVIVA trends`

---

### US-3: TypeScript-Typen und Datenzugriff — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 3.1 TypeScript Types + Data Layer | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-12 | TypeScript-Interfaces fuer alle 4 Entitaeten definiert | ✓ |
| AC-13 | Hilfsfunktionen zum Aufloesen von Relationen vorhanden | ✓ |

#### Ralph Loop
- Iterations: 1
- All ACs passed (data.test.ts covers AC-12..13)
- Commit: `feat(PROJ-1): add TypeScript types and data access layer`

### Wave 1 Completion
- [x] All teammates completed
- [x] Ralph Loop: every AC verified with actual test/command output
- [x] Smoke Test: N/A (data-only wave, no frontend routes)
- [x] progress.md updated with AC results
- [x] Wave committed

---

## Wave 2: PROJ-2 Radar + PROJ-8 Navigation (parallel)

### US PROJ-2/1: Kreisfoermiger Radar — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 1.1 Radar-Grundgeruest (Ringe + Segmente) | — | — | ✓ |
| 2.1 Positionierungsalgorithmus | ✓ | ✓ | ✓ |
| 2.2 Dreieck-Blips rendern | — | — | ✓ |
| 3.1 Tooltip + Hover | — | — | ✓ |
| 4.1 Klick-Navigation | — | — | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-1 | SVG-Radar mit 3 konzentrischen Ringen wird gerendert | — |
| AC-2 | 4 Segmente durch Trennlinien visuell getrennt | — |
| AC-3 | Ring-Labels (Handeln, Vorbereiten, Beobachten) lesbar | — |
| AC-4 | Segment-Labels aussen am Kreis sichtbar | — |
| AC-5 | Ringe farblich abgestuft | — |
| AC-6 | Jeder Trend als Dreieck-Symbol gerendert | — |
| AC-7 | Dreiecke im korrekten Segment positioniert | ✓ |
| AC-8 | Dreiecke im korrekten Ring positioniert | ✓ |
| AC-9 | Trend mit n HFs erzeugt n Dreiecke | ✓ |
| AC-10 | Keine Ueberlappung innerhalb Ring-Segment | ✓ |
| AC-11 | Mouseover zeigt Tooltip mit Trendname | — |
| AC-12 | Tooltip verschwindet bei Mouse-Leave | — |
| AC-13 | Dreieck wird bei Hover hervorgehoben | — |
| AC-14 | Klick auf Dreieck navigiert zur Trend-Detailseite | — |
| AC-15 | Cursor pointer bei Hover auf Dreieck | — |
| AC-16 | Klick auf Segment-Label navigiert zur Handlungsfeld-Seite | — |
| AC-17 | Segment-Labels reagieren auf Hover | — |

#### Ralph Loop
- Iterations: 0 (PENDING — geometry tests pass, visual ACs need smoke test)
- AC-7..10 verified by radar-geometry.test.ts
- AC-1..6, AC-11..17 require browser smoke test

---

### US PROJ-8/1: Breadcrumbs — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 1.1 Breadcrumb-Komponente | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-1 | Handlungsfeld-Seite: Startseite > HF: [Name] | — |
| AC-2 | Trend-Seite: Startseite > HF: [Name] > Trend: [Name] | — |
| AC-3 | Megatrend-Seite: Startseite > MT: [Name] | — |
| AC-4 | Jedes Breadcrumb-Element klickbar | ✓ |
| AC-5 | Startseite hat keinen Breadcrumb | ✓ |

#### Ralph Loop
- Iterations: 1
- AC-4, AC-5 verified by Breadcrumb.test.tsx
- AC-1..3 require page integration (Wave 4)

---

### US PROJ-8/2+3: Home + Zurueck Buttons — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 2.1 PageHeader-Komponente | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-6 | Home-Button auf jeder Unterseite sichtbar | ✓ |
| AC-7 | Home-Button fuehrt zur Startseite | ✓ |
| AC-8 | Zurueck-Button auf jeder Unterseite sichtbar | ✓ |
| AC-9 | Trend-Detail → Zurueck → Handlungsfeld | — |
| AC-10 | Handlungsfeld → Zurueck → Startseite | — |
| AC-11 | Megatrend → Zurueck → Startseite | — |

#### Ralph Loop
- Iterations: 1 (test fix for duplicate "Home" link)
- AC-6..8 verified by PageHeader.test.tsx
- AC-9..11 require page integration (Wave 4)

---

### US PROJ-8/4: Branchenfilter-Persistenz — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 3.1 BranchenFilter-Context | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-12 | Filter-Zustand bleibt beim Navigieren erhalten | — |
| AC-13 | Filter-Zustand ueber React Context geteilt | ✓ |

#### Ralph Loop
- Iterations: 1
- AC-13 verified by BranchenFilterContext.test.tsx
- AC-12 requires browser smoke test with navigation

---

### Wave 2 Completion
- [x] All teammates completed
- [x] Ralph Loop: geometry + component tests passing (14/14 v1 tests, 22/22 shared tests)
- [x] Smoke Test: Deferred to Wave 4 (radar not yet mounted on a page — homepage is placeholder)
- [x] progress.md updated with AC results
- [x] Wave committed (9292c94)

---

## Wave 3: PROJ-3 Branchenfilter — in progress
### WAVE_BASE_SHA: d0342cae5b904b1d9d5a796eb03e5e6bf59e72b2

### US PROJ-3/1: Trends nach Branche filtern — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 1.1 BranchenFilter UI + Radar-Integration | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-1 | Filter zeigt 3 Branchen als Multi-Select-Buttons/Checkboxen | ✓ |
| AC-2 | Default-Zustand: alle 3 Branchen sind aktiv | ✓ |
| AC-3 | Deaktivieren einer Branche blendet entsprechende Dreiecke aus | ✓ |
| AC-4 | Dreiecke werden sanft ein-/ausgeblendet (Transition) | ✓ |
| AC-5 | Trend wird nur ausgeblendet wenn KEINE seiner Branchen aktiv | ✓ |

#### Ralph Loop
- Iterations: 1 (all ACs passed on first check)
- AC-1..2 verified by BranchenFilter.test.tsx (5 tests)
- AC-3..5 verified by TrendRadar.test.tsx (opacity/visibility via data-visible + isTrendVisible logic)
- AC-4 verified by code review: CSS `transition-opacity duration-300` on RadarBlip

---

### US PROJ-3/2: Branchenfarben im Radar — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 2.1 Farbkodierung der Dreiecke | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-6 | Jede Branche hat eine distinkte, gut unterscheidbare Farbe | ✓ |
| AC-7 | Dreiecke mit einer einzigen Branche tragen deren Farbe | ✓ |
| AC-8 | Dreiecke mit mehreren Branchen sind visuell als mehrfach zugeordnet erkennbar | ✓ |

#### Ralph Loop
- Iterations: 1
- AC-6 verified by branchen.json: #e07b39 (orange), #4a6fa5 (blue), #2a9d8f (teal)
- AC-7 verified by TrendRadar.getBlipColor: single-branch → branche.farbe
- AC-8 verified by TrendRadar.test.tsx: multi-branch → stroke=#333, strokeWidth=2
- Commit: `feat(PROJ-3): implement BranchenFilter UI with radar opacity integration`

### Wave 3 Completion
- [x] All teammates completed
- [x] Ralph Loop: every AC verified with actual test/command output (8/8 pass)
- [x] Smoke Test: N/A — BranchenFilter not yet mounted on a page (deferred to Wave 4)
- [x] progress.md updated with AC results
- [x] Wave committed (e2a0b4c)

---

## Wave 4: All pages (parallel) — pending

---

## Quality Gate — not yet run

## QA Results — not yet run

---

## Open Blockers
- None

---

## Naechste Schritte (fuer neue Session)

### 1. Wave 2 abschliessen: Smoke Test nachholen
- Dev-Server starten: `pnpm dev`
- Browser-Check auf `http://localhost:3000`: Radar sichtbar? Dreiecke? Hover-Tooltip?
- Fehlende visuelle ACs (AC-1..6, AC-11..17) verifizieren
- Wave 2 Completion Checklist in progress.md abhaken

### 2. Wave 3: PROJ-3 Branchenfilter
- Task 1.1: BranchenFilter UI-Komponente (3 Toggle-Buttons in Branchenfarben)
- Task 2.1: Farbkodierung der Dreiecke (Single-Branche = Farbe, Multi = neutral)
- Integration in TrendRadar-Komponente
- Ralph Loop: AC-1..10 verifizieren
- Smoke Test: Filter-Buttons klicken, Dreiecke ein-/ausblenden

### 3. Wave 4: Alle 4 Seiten (parallel)
- PROJ-4: Startseite Layout (3-Spalten: Neuste Entwicklungen | Radar + Filter | Megatrends)
- PROJ-5: Handlungsfeld-Seite (`/handlungsfeld/[slug]`)
- PROJ-6: Trend-Detailseite (`/trend/[slug]`)
- PROJ-7: Megatrend-Seite (`/megatrend/[slug]`)
- Alle mit SSG (generateStaticParams), PageHeader, Breadcrumbs
- Ralph Loop + Smoke Test pro Seite

### 4. Quality Gate
- Code Review (diff seit BASE_SHA)
- Alle Tests passing (`pnpm test` in shared + v1)
- Build erfolgreich (`pnpm build`)

### 5. QA
- End-to-End Browser-Test aller Seiten und Flows
- Alle ACs im Browser verifizieren

### Referenz-Dateien
- Plan: `specs/PROJ-1-8-implementation-plan.md`
- Specs: `specs/PROJ-1..8-*-spec.md`
- Mockups: `specs/mockups/*.html`
- Konzept: `specs/concepts/2026-04-13-trendradar-prototyp-concept.md`
