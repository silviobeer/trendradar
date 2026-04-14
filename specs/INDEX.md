# Trendradar ARTISET — Specs Index

## Projekt

Interaktive Webanwendung zur Visualisierung gesellschaftlicher Trends fuer ARTISET (Dachverband CURAVIVA, INSOS, YOUVITA).

**Phase:** 1 — Prototyp (Frontend-only, lokale JSON-Daten)
**Stack:** Next.js App Router + TypeScript + Tailwind CSS + pnpm Workspaces
**Struktur:** Monorepo — `packages/shared` (Daten + Types) + `apps/v1` (erste UI-Variante)
**Status:** Architecture Complete

## Features

| ID | Feature | Status |
|---|---|---|
| PROJ-1 | Datenmodell & Seed-Daten | Designed |
| PROJ-2 | Radar-Visualisierung | Designed |
| PROJ-3 | Branchenfilter | Designed |
| PROJ-4 | Startseite Layout | Designed |
| PROJ-5 | Handlungsfeld-Seite | Designed |
| PROJ-6 | Trend-Detailseite | Designed |
| PROJ-7 | Megatrend-Seite | Designed |
| PROJ-8 | Navigation | Designed |
| PROJ-9 | Fullscreen Radar Layout | In Progress |
| PROJ-10 | Design-Tokens & Farbsystem (v2) | Designed |
| PROJ-11 | Typografie (v2) | Designed |
| PROJ-12 | UI-Komponenten-Styling (v2) | Designed |
| PROJ-13 | Seiten-Layouts (v2) | Designed |

## Abhaengigkeitskette

```
PROJ-1 (Daten) --> PROJ-2 (Radar) --> PROJ-3 (Filter) --> PROJ-4 (Startseite)
PROJ-1 + PROJ-8 (Nav) --> PROJ-5 (Handlungsfeld)
PROJ-1 + PROJ-8 (Nav) --> PROJ-6 (Trend-Detail)
PROJ-1 + PROJ-8 (Nav) --> PROJ-7 (Megatrend)
PROJ-2 + PROJ-3 + PROJ-4 --> PROJ-9 (Fullscreen Radar Layout)
PROJ-10 (Tokens) --> PROJ-11 (Typo) --> PROJ-12 (Komponenten) --> PROJ-13 (Layouts)
```

## Artefakte

- `specs/concepts/2026-04-13-trendradar-prototyp-concept.md` — Freigegebenes Konzept
- `specs/concepts/2026-04-14-artiset-corporate-identity.md` — ARTISET CI Recherche
- `specs/concepts/2026-04-14-frontend-design-konzept.md` — Frontend-Design-Konzept
- `specs/PROJ-*-spec.md` — Feature Specifications
- `specs/PROJ-1-8-implementation-plan.md` — Implementierungsplan
- `specs/mockups/*.html` — UI Mockups (klickbar)
