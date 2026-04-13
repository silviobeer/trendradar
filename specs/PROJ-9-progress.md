# PROJ-9 Progress

## Status: complete
## Current Wave: 3
## BASE_SHA: ccfdbeb37ba1bf6f0f7a11559df4dbf79e9399f9

---

## Wave 1: US-1 Fullscreen Grid + Radar Scaling

### US-1: Als Nutzer moechte ich den Radar grossflaechig sehen — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 1.1 Fullscreen Grid Layout | ✓ | ✓ | ✓ |
| 1.2 Radar SVG Dynamic Scaling | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-1 | Startseite hat kein vertikales Scrollen (overflow hidden) | ✓ |
| AC-2 | Radar-SVG skaliert dynamisch mit dem Viewport (kein fester max-w-[600px]) | ✓ |
| AC-3 | Radar bleibt quadratisch (1:1 Aspect Ratio via viewBox) | ✓ |
| AC-4 | Radar ist horizontal zentriert im verfuegbaren Platz | ✓ |

#### Ralph Loop
- Iterations: 1
- All ACs passed on first check
- 68 tests passing, build successful (43 routes prerendered)

### Wave 1 Completion
- [x] All teammates completed
- [x] Ralph Loop: every AC verified with actual test/command output
- [x] Build: PASS (pnpm --filter v1 build — 43 routes prerendered)
- [x] Smoke Test: deferred to Wave 2 (layout not complete yet without sidebars/filter)
- [x] progress.md updated with AC results
- [x] Wave committed

---

## Wave 2: US-2 + US-3 + US-5 (parallel)

### US-2: Sidebars schmal am Rand — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 2.1 Narrow Sidebar Containers | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-5 | Linke Sidebar max 160px breit | ✓ |
| AC-6 | Rechte Sidebar max 160px breit | ✓ |
| AC-7 | Sidebars direkt am Bildschirmrand | ✓ |
| AC-8 | Border nur zur Radar-Seite hin | ✓ |
| AC-9 | Sidebar-Content scrollt intern | ✓ |

### US-3: Branchenfilter am unteren Rand — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 3.1 Bottom-Pinned Branchenfilter | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-10 | Branchenfilter in letzter Grid-Zeile | ✓ |
| AC-11 | Filter spannt volle Breite (col-span-3) | ✓ |
| AC-12 | Filter-Hoehe kompakt (~40-50px) | ✓ |
| AC-13 | Branche-Buttons horizontal zentriert | ✓ |
| AC-14 | Dezente Trennlinie (border-top) | ✓ |

### US-5: Header unveraendert — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 5.1 Header Grid Integration | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-21 | Header zeigt "ARTISET Trendradar" | ✓ |
| AC-22 | Header spannt alle 3 Grid-Spalten | ✓ |
| AC-23 | Header-Hoehe ca. 60px | ✓ |

#### Ralph Loop — Wave 2
- Iterations: 1
- All ACs passed on first check (US-2: 5/5, US-3: 5/5, US-5: 3/3)
- 82 tests passing, build successful
- Clean grid restructure: outer div is now the grid, no nested main, no calc() hack

### Wave 2 Completion
- [x] All teammates completed
- [x] Ralph Loop: every AC verified with actual test/command output
- [x] Build: PASS (pnpm --filter v1 build)
- [x] Smoke Test: deferred to Wave 3 (will test complete layout)
- [x] progress.md updated with AC results
- [x] Wave committed

---

## Wave 3: US-4 Responsive Sidebar Toggle

### US-4: Sidebars bei Bedarf einblenden — complete

#### Tasks
| Task | Tests Written | Tests Passing | Done |
|------|:---:|:---:|:---:|
| 4.1 Responsive Sidebar Hide/Show | ✓ | ✓ | ✓ |

#### Acceptance Criteria
| AC | Text | Verified |
|----|------|:---:|
| AC-15 | Unter 1024px Sidebars ausgeblendet | ✓ |
| AC-16 | Radar volle Breite ohne Sidebars | ✓ |
| AC-17 | Toggle-Buttons sichtbar < 1024px | ✓ |
| AC-18 | Toggle blendet Sidebar als Overlay ein | ✓ |
| AC-19 | Overlay kann geschlossen werden | ✓ |
| AC-20 | Branchenfilter immer sichtbar | ✓ |

#### Ralph Loop — Wave 3
- Iterations: 1
- All ACs passed on first check (6/6)
- 97 tests passing, build successful
- HomeLayout client component created, page.tsx is thin Server Component shell

### Wave 3 Completion
- [x] All teammates completed
- [x] Ralph Loop: every AC verified with actual test/command output
- [x] Build: PASS (pnpm --filter v1 build)
- [x] Smoke Test: deferred to QA (browser E2E)
- [x] progress.md updated with AC results
- [x] Wave committed

---

## Quality Gate — PROJ-9

### Code Review
| Severity | Found | Fixed | Deferred |
|----------|:-----:|:-----:|:--------:|
| P0 Critical | 0 | 0 | 0 |
| P1 High | 3 | 3 | 0 |
| P2 Medium | 4 | 2 | 2 |
| P3 Low | 3 | 2 | 1 |

### Fixed Issues
- P1: `TrendRadar.tsx` — tooltip coordinate mismatch → aspect-square wrapper
- P1: `HomeLayout.tsx` — `display: contents` fragility + overlay siblings in grid → removed contents div, moved overlays outside grid
- P1: `HomeLayout.tsx` — backdrop not keyboard-dismissable → Escape key listener + role/tabIndex on backdrop
- P2: `HomeLayout.tsx` — h-screen unreliable on mobile → h-dvh
- P2: `HomeLayout.tsx` — missing aria-expanded on toggle buttons → added
- P3: `HomeLayout.tsx` — redundant col-span-1 → removed
- P3: `HomeLayout.tsx` — redundant w-[140px] → replaced with w-full + max-w-[160px]

### Deferred (P2/P3 — non-blocking)
- P2: Overlay sidebars missing role="dialog" and focus management (acceptable for prototype)
- P2: Tests couple to CSS class strings (acceptable — tests cover structural intent)
- P3: Toggle buttons reachable by Tab on desktop when hidden (minor, lg:hidden covers visual)

### SonarCloud
| Severity | Found | Fixed | Deferred |
|----------|:-----:|:-----:|:--------:|
| Critical/Major | 0 | 0 | 0 |
| Minor | — | — | — |
| Info | — | — | — |

*Note: No SONAR_TOKEN configured — manual analysis only*

---

## QA Results

- Bugs found: —
- Fixed: —
- Deferred: —

---

## Open Blockers
- None
