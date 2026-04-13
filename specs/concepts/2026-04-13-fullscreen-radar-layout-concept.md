# Fullscreen Radar Layout

**Datum:** 2026-04-13
**Status:** Freigegeben

## Ziel

Der Radar dominiert die Startseite. Die gesamte Viewport-Breite und -Hoehe wird ausgenutzt. Kein Scrollen auf der Startseite.

## Ansatz: CSS-Grid Fullscreen Layout

```
┌──────────────────────────────────────────────┐
│  Header (auto ~60px, col-span-3)             │
├────┬────────────────────────────────┬────────┤
│Side│                                │  Side  │
│bar │         RADAR (1fr)            │  bar   │
│min │    skaliert mit Viewport       │  min   │
│    │                                │        │
├────┴────────────────────────────────┴────────┤
│  Branchenfilter (auto ~40-50px, col-span-3)  │
└──────────────────────────────────────────────┘
```

### Grid-Definition

```
h-screen
grid-template-rows:    auto  1fr  auto
grid-template-columns: min-content  1fr  min-content
overflow: hidden (auf Startseite)
```

## Sektionen

### 1. Header

- Bleibt wie bisher (Titel "ARTISET Trendradar")
- Spannt alle 3 Spalten (col-span-3)
- Fixe Hoehe ~60px

### 2. Radar (Mitte)

- Container: `w-full h-full`, Flex mit `items-center justify-center`
- SVG behaelt `viewBox="0 0 600 600"` (interne Koordinaten unveraendert)
- `max-w-[600px]` wird entfernt
- SVG skaliert proportional via `w-full h-full` — Aspect Ratio bleibt durch viewBox erhalten
- Auf 1920x1080: Radar ca. 900-950px
- Auf 1440x900: Radar ca. 750px

### 3. Sidebars

- **Breite:** `w-[140px]` Basis, `max-w-[160px]`
- **Hoehe:** Fuellen Zeile 2 komplett, internes Scrollen falls noetig (`overflow-y: auto`)
- **Position:** Direkt am Bildschirmrand, kein Padding zum Rand
- **Styling:** Weisser Hintergrund, dezenter Border nur zur Radar-Seite hin
- **Text:** Kompakt, kleinere Schrift

### 4. Branchenfilter

- Letzte Grid-Zeile, spannt alle 3 Spalten
- Kompakt ~40-50px Hoehe
- Drei Branche-Buttons horizontal zentriert
- Dezente Trennlinie nach oben
- Klebt direkt am unteren Bildschirmrand

## Betroffene Dateien

- `apps/v1/src/app/page.tsx` — Grid-Layout der Startseite
- `apps/v1/src/components/radar/TrendRadar.tsx` — SVG Sizing (max-w entfernen, w-full h-full)
- `apps/v1/src/components/filter/BranchenFilter.tsx` — Kompaktere Darstellung
- `apps/v1/src/components/sidebar/MegatrendSidebar.tsx` — Schmale Darstellung
- `apps/v1/src/components/sidebar/NeusteEntwicklungen.tsx` — Schmale Darstellung

## Nicht betroffen

- Unterseiten (Handlungsfeld, Trend, Megatrend) — Layout bleibt
- Datenmodell, shared package — keine Aenderungen
- Radar-Geometrie (viewBox, Koordinaten) — bleibt identisch
