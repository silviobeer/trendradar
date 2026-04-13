# Trendradar ARTISET

Interaktive Webanwendung zur Visualisierung gesellschaftlicher Trends fuer Mitglieder der Schweizer Sozialverbaende CURAVIVA, INSOS und YOUVITA (Dachverband: ARTISET).

## Phase

Phase 1 — Prototyp (Frontend-only, keine Datenbank, kein Backend)

## Monorepo-Struktur

```
packages/shared/          @trendradar/shared — Types, Daten, Data-Access-Layer
  data/                   JSON-Dateien (33 Trends, 4 Handlungsfelder, 6 Megatrends, 3 Branchen)
  src/types.ts            TypeScript-Interfaces (Trend, Handlungsfeld, Megatrend, Branche)
  src/data.ts             Hilfsfunktionen (getTrendBySlug, getTrendsByHandlungsfeld, etc.)

apps/v1/                  Erste Next.js App (Prototyp)
  src/app/                Routen (/, /handlungsfeld/[slug], /trend/[slug], /megatrend/[slug])
  src/components/radar/   SVG-Radar (TrendRadar, RadarBlip, RadarTooltip)
  src/components/navigation/  Breadcrumb, PageHeader
  src/contexts/           BranchenFilterContext
  src/lib/                radar-geometry.ts (Positionierungsalgorithmus)

apps/v2/                  (noch nicht erstellt — zweite UI-Variante, gleiche Daten)
```

## Stack

- Next.js 15 (App Router, SSG)
- TypeScript
- Tailwind CSS v4
- pnpm Workspaces
- SVG via React (kein D3.js)

## Befehle

```bash
pnpm dev                  # Dev-Server starten (apps/v1)
pnpm build                # Build (apps/v1)
pnpm --filter @trendradar/shared test   # Tests shared package (22 Tests)
pnpm --filter v1 test     # Tests v1 app (14 Tests)
```

## Architektur-Entscheidungen

- **SSG (Static Site Generation):** Alle Daten zur Build-Zeit bekannt, kein Server noetig
- **SVG via React:** Kein D3.js — React kontrolliert das DOM, nahtlose State-Integration
- **React Context fuer Branchenfilter:** Seitenuebergreifender State ohne externe Library
- **Automatische Dreieck-Positionierung:** Geometrie-Algorithmus verteilt Blips aequidistant im Segment/Ring
- **Monorepo:** `packages/shared` wird von allen App-Varianten importiert, UI-Varianten sind unabhaengig

## Datenmodell

- **Trend** → n:m zu Handlungsfeldern, Megatrends, Branchen (ID-Arrays)
- **Handlungsfeld** → 4 Segmente im Radar (Klientel, Mitarbeitende, Externes Umfeld, Betrieb)
- **Megatrend** → 6 uebergeordnete Trends (Demografie, Werte, Health, Tech, Oekonomie, Oekologie)
- **Branche** → 3 Verbaende (CURAVIVA=#e07b39, INSOS=#4a6fa5, YOUVITA=#2a9d8f)
- Ein Trend mit n Handlungsfeldern erscheint n-mal als Dreieck im Radar

## Implementierungsstand

Siehe `specs/PROJ-1-8-progress.md` fuer den aktuellen Stand.

Wave 1 (Daten) und Wave 2 (Radar + Navigation) sind implementiert.
Wave 3 (Branchenfilter) und Wave 4 (alle Seiten) stehen aus.

## Specs & Plaene

- `specs/INDEX.md` — Feature-Uebersicht und Abhaengigkeiten
- `specs/PROJ-*-spec.md` — Feature Specifications mit User Stories und ACs
- `specs/PROJ-1-8-implementation-plan.md` — Implementierungsplan (4 Waves)
- `specs/PROJ-1-8-progress.md` — Fortschritt und naechste Schritte
- `specs/mockups/*.html` — Klickbare UI-Mockups
- `specs/concepts/2026-04-13-trendradar-prototyp-concept.md` — Freigegebenes Konzept

## Kontext-Dokumente (Kundendaten)

Liegen unter `/home/silvio/Dropbox/beerventures/Kundenprojekte/Relyz/Trendradar/`:
- `kontext_pflichtenheft.md` — Anforderungen und Architekturstrategie
- `kontext_verbaende.md` — ARTISET, CURAVIVA, INSOS, YOUVITA
- `kontext_trendradar_konzept.md` — Methodik und Konzept
- `funktionen_anforderungen.md` — 46 explizite + 19 implizite Funktionen
- `recherche_trendradar_benchmarks.md` — Benchmarks und UI-Erkenntnisse
