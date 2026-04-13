# Trendradar ARTISET — Implementation Plan (PROJ-1 bis PROJ-8)

**Goal:** Frontend-only Prototyp mit kreisfoermiger Radar-Visualisierung, 4 Seitentypen und Branchenfilter — befuellt mit echten CURAVIVA-Trenddaten. Monorepo-Struktur ermoeglicht parallele UI-Varianten.

**Architecture:** Monorepo mit geteiltem Daten-Package (`packages/shared`) und separaten Next.js Apps (`apps/v1`, spaeter `apps/v2`). SSG, SVG-Radar via React, Branchenfilter via React Context, Slug-basiertes Routing.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · pnpm Workspaces

**Monorepo-Struktur:**
```
Trendradar/
├── packages/
│   └── shared/                ← @trendradar/shared
│       ├── data/              ← JSON-Dateien (Trends, HF, MT, Branchen)
│       ├── src/
│       │   ├── types.ts       ← TypeScript-Interfaces
│       │   └── data.ts        ← Datenzugriffs-Layer
│       ├── __tests__/
│       └── package.json
├── apps/
│   └── v1/                    ← Erste Next.js App (Prototyp)
│       ├── apps/v1/src/app/           ← Routen
│       ├── apps/v1/src/components/    ← UI-Komponenten (Radar, Filter, etc.)
│       ├── apps/v1/src/contexts/      ← React Context
│       └── package.json
├── package.json               ← Workspace-Root
├── pnpm-workspace.yaml
└── specs/
```

---

## Implementation Waves

| Wave | Features | Kann starten wenn |
|------|----------|-------------------|
| 1 | PROJ-1 (Datenmodell & Seed-Daten) | sofort |
| 2 | PROJ-8 (Navigation), PROJ-2 (Radar) | Wave 1 fertig (parallel) |
| 3 | PROJ-3 (Branchenfilter) | Wave 2 fertig |
| 4 | PROJ-4 (Startseite), PROJ-5 (Handlungsfeld), PROJ-6 (Trend-Detail), PROJ-7 (Megatrend) | Wave 3 fertig (parallel) |

---

## Wave 1: Foundation

---

### PROJ-1: Datenmodell & Seed-Daten

---

## User Story 1: Als Entwickler moechte ich strukturierte JSON-Dateien laden, um Trenddaten im Frontend anzuzeigen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: `data/handlungsfelder.json` enthaelt 4 Handlungsfelder mit id, name, beschreibung
- [ ] AC-2: `data/megatrends.json` enthaelt 6 Megatrends mit id, name, beschreibung
- [ ] AC-3: `data/trends.json` enthaelt Trends mit id, name, beschreibung, zeitrahmen, handlungsfeldIds[], megatrendIds[], branchenIds[], fragen[]
- [ ] AC-4: `data/branchen.json` enthaelt 3 Branchen mit id, name, organisation, farbe
- [ ] AC-5: Alle IDs sind konsistent und referenzierbar zwischen den Dateien

### Task 1.1: Monorepo + Next.js Projekt Setup
**Fulfills:** Grundlage fuer AC-1 bis AC-5 (und alle folgenden Features)

**Files:**
- Create: `package.json` (workspace root)
- Create: `pnpm-workspace.yaml`
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `apps/v1/package.json`
- Create: `apps/v1/tsconfig.json`
- Create: `apps/v1/next.config.ts`
- Create: `apps/v1/apps/v1/src/app/layout.tsx`
- Create: `apps/v1/apps/v1/src/app/page.tsx` (Platzhalter)
- Create: `apps/v1/apps/v1/src/app/globals.css`

**What to build:** pnpm-Workspace mit zwei Packages: `@trendradar/shared` (Types + Daten) und `apps/v1` (Next.js 15 App mit App Router, TypeScript, Tailwind CSS v4). `apps/v1` hat `@trendradar/shared` als Workspace-Dependency. `pnpm run dev --filter v1` startet die App.

**TDD cycle:**
- RED: Test dass `pnpm run build --filter v1` erfolgreich durchlaeuft
- GREEN: Monorepo-Struktur erstellen, Next.js App initialisieren, Workspace-Dependency konfigurieren
- REFACTOR: Unnoetige Boilerplate-Dateien entfernen
- COMMIT: `feat(PROJ-1): initialize monorepo with shared package and Next.js v1 app`

### Task 1.2: JSON-Datendateien erstellen
**Fulfills:** AC-1, AC-2, AC-3, AC-4

**Files:**
- Create: `packages/shared/data/branchen.json`
- Create: `packages/shared/data/handlungsfelder.json`
- Create: `packages/shared/data/megatrends.json`
- Create: `packages/shared/data/trends.json`

**What to build:** 4 JSON-Dateien mit der definierten Struktur. Zunaechst mit minimalen Testdaten (je 1-2 Eintraege pro Entitaet). Jede Entitaet hat ein `id`-Feld (String) und ein `slug`-Feld. Trends haben `handlungsfeldIds[]`, `megatrendIds[]`, `branchenIds[]` als Arrays von ID-Strings. IDs muessen zwischen den Dateien konsistent sein.

**TDD cycle:**
- RED: Test dass jede JSON-Datei valides JSON ist und die erwarteten Felder hat. Test dass alle referenzierten IDs in den Ziel-Dateien existieren.
- GREEN: JSON-Dateien mit minimalen Testdaten erstellen
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-1): add JSON data schema with minimal test data`

### Task 1.3: Referenzielle Integritaet validieren
**Fulfills:** AC-5

**Files:**
- Create: `packages/shared/__tests__/data-integrity.test.ts`

**What to build:** Automatisierten Test der prueft dass alle IDs in Trend.handlungsfeldIds[] auf existierende Handlungsfelder zeigen, alle IDs in Trend.megatrendIds[] auf existierende Megatrends zeigen, alle IDs in Trend.branchenIds[] auf existierende Branchen zeigen. Dieser Test schuetzt gegen kaputte Referenzen bei Datenänderungen.

**TDD cycle:**
- RED: Test schreiben der alle Referenzen validiert — schlaegt fehl wenn ungueltige IDs vorhanden
- GREEN: Sicherstellen dass die minimalen Testdaten konsistent sind
- REFACTOR: Standard-Cleanup
- COMMIT: `test(PROJ-1): add referential integrity validation for JSON data`

---

## User Story 2: Als Entwickler moechte ich realistische Seed-Daten, um die Visualisierung mit echten Inhalten testen zu koennen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-6: Mindestens 25 Trends mit vollstaendigem Beschreibungstext vorhanden
- [ ] AC-7: Jeder Trend hat mindestens 1 Handlungsfeld, 1 Megatrend und 1 Branche zugeordnet
- [ ] AC-8: Jeder Trend hat mindestens 2 Reflexionsfragen
- [ ] AC-9: Alle 3 Zeitrahmen (Handeln, Vorbereiten, Beobachten) sind durch Trends abgedeckt
- [ ] AC-10: Alle 4 Handlungsfelder haben mindestens 3 zugeordnete Trends
- [ ] AC-11: Jeder Trend hat ein Erstellungsdatum (fuer "Neuste Entwicklungen")

### Task 2.1: Echte CURAVIVA-Trenddaten einfuellen
**Fulfills:** AC-6, AC-7, AC-8, AC-9, AC-10, AC-11

**Files:**
- Modify: `packages/shared/data/branchen.json`
- Modify: `packages/shared/data/handlungsfelder.json`
- Modify: `packages/shared/data/megatrends.json`
- Modify: `packages/shared/data/trends.json`

**What to build:** Alle ~28 echten CURAVIVA-Trends aus dem Kundendokument ("8 Handlungsfelder CURAVIVA final", 25.1.2026) in die JSON-Dateien uebertragen. Vollstaendige Beschreibungstexte, alle Reflexionsfragen, korrekte Zuordnungen zu Handlungsfeldern/Megatrends/Branchen. Erstellungsdatum "2026-01-25" fuer alle. 4 Handlungsfelder mit Beschreibungstexten. 6 Megatrends mit kurzen Platzhalterbeschreibungen. 3 Branchen mit Farben (CURAVIVA=#e07b39, INSOS=#4a6fa5, YOUVITA=#2a9d8f).

**Datenquelle:** Die Trends wurden im Brainstorming-Chat vom User geliefert. Enthaelt: Diversitaet, Langlebigkeit, Medizinischer Fortschritt, KI als Therapeutin, Betreuungsrobotik, Hybridisierung, Mentale Gesundheit, New Work, Predictive Healthcare, Multikrisen, Laenger daheim, Assistierter Suizid, Neues Alter, Skandalisierung, Konsolidierungsdruck, Regulationsdichte, Deinstitutionalisierung, Fachkraeftemangel, Kostentransparenz, Versorgungsluecke, Netto-Null-Ziel, Oeko-Kueche, Klimaneutrale Betriebskonzepte, Gruene Gebaeude, Hitze-Stress, Automatisierte Administration, Outcome-Finanzierung, Angehoerige, Kostendruck, Berufsprofile und Kompetenzen, Neuausrichtung pflegerischer Versorgungsmodelle, Nicht-lineare Bildungswege, Interprofessionalitaet.

**TDD cycle:**
- RED: Bestehender Integritaetstest plus neue Tests: mindestens 25 Trends, jeder Trend hat Beschreibung + mindestens 2 Fragen + mindestens 1 Handlungsfeld/Megatrend/Branche + Erstellungsdatum, alle 3 Zeitrahmen abgedeckt, alle 4 Handlungsfelder haben mindestens 3 Trends
- GREEN: JSON-Dateien mit echten Daten befuellen
- REFACTOR: Daten auf Konsistenz pruefen (Megatrend-Namen im Trend muessen den Namen in megatrends.json entsprechen)
- COMMIT: `feat(PROJ-1): populate seed data with 28+ real CURAVIVA trends`

---

## User Story 3: Als Entwickler moechte ich TypeScript-Typen fuer alle Entitaeten, um typsichere Datenzugriffe zu ermoeglichen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-12: TypeScript-Interfaces fuer alle 4 Entitaeten definiert
- [ ] AC-13: Hilfsfunktionen zum Aufloesen von Relationen vorhanden (z.B. getTrendsByHandlungsfeld, getMegatrendsByTrend)

### Task 3.1: TypeScript-Interfaces und Datenzugriffs-Layer
**Fulfills:** AC-12, AC-13

**Files:**
- Create: `packages/shared/src/types.ts`
- Create: `packages/shared/src/data.ts`
- Create: `packages/shared/__tests__/data.test.ts`

**What to build:** TypeScript-Interfaces: `Branche`, `Handlungsfeld`, `Megatrend`, `Trend` (mit `zeitrahmen` als Union-Type "handeln" | "vorbereiten" | "beobachten"). Datenzugriffs-Modul das JSON-Dateien importiert und typisiert. Hilfsfunktionen: `getAllTrends()`, `getTrendBySlug(slug)`, `getHandlungsfeldBySlug(slug)`, `getMegatrendBySlug(slug)`, `getTrendsByHandlungsfeld(id)`, `getTrendsByMegatrend(id)`, `getMegatrendsByTrend(trend)`, `getHandlungsfelderByTrend(trend)`, `getBrancheById(id)`.

**TDD cycle:**
- RED: Test dass getTrendsByHandlungsfeld den korrekten Subset zurueckgibt. Test dass getTrendBySlug den richtigen Trend findet. Test dass getMegatrendsByTrend die korrekten Megatrends fuer einen Trend aufloest.
- GREEN: Interfaces definieren, JSON importieren, Hilfsfunktionen implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-1): add TypeScript types and data access layer`

---

## Wave 2: Radar + Navigation (parallel)

---

### PROJ-2: Radar-Visualisierung

---

## User Story 1: Als Fachperson moechte ich einen kreisfoermigen Radar sehen, um alle Trends auf einen Blick zu erfassen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: SVG-Radar mit 3 konzentrischen Ringen wird gerendert
- [ ] AC-2: 4 Segmente sind durch Trennlinien visuell getrennt
- [ ] AC-3: Ring-Labels (Handeln, Vorbereiten, Beobachten) sind lesbar
- [ ] AC-4: Segment-Labels (Handlungsfeld-Namen) sind aussen am Kreis sichtbar
- [ ] AC-5: Ringe sind farblich abgestuft (Handeln = intensiv, Beobachten = dezent)

**Smoke Test:**
- Route: `/`
- Verify: "SVG-Element mit 3 konzentrischen Kreisen sichtbar, 4 Segment-Trennlinien vorhanden, Ring-Labels 'Handeln', 'Vorbereiten', 'Beobachten' lesbar, Segment-Labels mit Handlungsfeld-Namen aussen sichtbar"

### Task 1.1: Radar-Grundgeruest (Ringe + Segmente)
**Fulfills:** AC-1, AC-2, AC-3, AC-4, AC-5

**Files:**
- Create: `apps/v1/src/components/radar/TrendRadar.tsx`
- Create: `apps/v1/src/components/radar/RadarRings.tsx`
- Create: `apps/v1/src/components/radar/RadarSegments.tsx`
- Create: `apps/v1/src/components/radar/__tests__/TrendRadar.test.tsx`

**What to build:** SVG-Komponente mit viewBox 600x600. 3 konzentrische Kreise (Radien z.B. 260, 180, 100) mit abgestufter Fuellfarbe. 4 Trennlinien (0°, 90°, 180°, 270°) von Zentrum zum Rand. Ring-Labels als SVG-Text innerhalb der Ringe. Segment-Labels aussen am Kreis als SVG-Text. Handlungsfelder und Ring-Konfiguration werden als Props uebergeben.

**TDD cycle:**
- RED: Test dass SVG mit 3 circle-Elementen gerendert wird. Test dass 4 Trennlinien vorhanden sind. Test dass Ring-Labels und Segment-Labels im DOM sind.
- GREEN: SVG-Elemente rendern mit korrekten Koordinaten
- REFACTOR: Geometrie-Berechnungen in eigene Hilfsfunktionen extrahieren
- COMMIT: `feat(PROJ-2): add radar base with rings, segments and labels`

---

## User Story 2: Als Fachperson moechte ich Trends als Dreiecke im richtigen Bereich sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-6: Jeder Trend wird als Dreieck-Symbol gerendert
- [ ] AC-7: Dreiecke sind im korrekten Segment positioniert (Winkel entspricht Handlungsfeld)
- [ ] AC-8: Dreiecke sind im korrekten Ring positioniert (Abstand vom Zentrum entspricht Zeitrahmen)
- [ ] AC-9: Ein Trend mit n Handlungsfeldern erzeugt n Dreiecke in n verschiedenen Segmenten
- [ ] AC-10: Dreiecke innerhalb eines Ring-Segments ueberlappen sich nicht

**Smoke Test:**
- Route: `/`
- Verify: "Dreiecke (polygon-Elemente) sichtbar im SVG, verteilt ueber verschiedene Segmente und Ringe, keine sichtbaren Ueberlappungen"

### Task 2.1: Positionierungsalgorithmus
**Fulfills:** AC-7, AC-8, AC-9, AC-10

**Files:**
- Create: `apps/v1/src/lib/radar-geometry.ts`
- Create: `apps/v1/src/lib/__tests__/radar-geometry.test.ts`

**What to build:** Funktion `calculateBlipPositions(trends, handlungsfelder, radarConfig)` die fuer jeden Trend und jedes seiner Handlungsfelder eine (x, y)-Position berechnet. Logik: Segment-Winkelbereich = 360° / Anzahl Segmente. Ring-Radialbereich bestimmt durch Zeitrahmen. Innerhalb eines Segment/Ring-Bereichs werden Dreiecke aequidistant im Winkelbogen verteilt. Rueckgabe: Array von `{ trendId, handlungsfeldId, x, y }`.

**TDD cycle:**
- RED: Test dass ein Trend im korrekten Segment-Winkelbereich positioniert wird. Test dass "handeln"-Trends naeher am Zentrum liegen als "beobachten"-Trends. Test dass ein Trend mit 3 Handlungsfeldern 3 Positionen in 3 verschiedenen Segmenten erzeugt. Test dass 5 Trends im gleichen Segment/Ring sich nicht ueberlappen (Mindestabstand).
- GREEN: Geometrie-Berechnungen implementieren
- REFACTOR: Konfiguration (Radien, Winkel) als Parameter extrahieren
- COMMIT: `feat(PROJ-2): implement blip positioning algorithm`

### Task 2.2: Dreieck-Blips rendern
**Fulfills:** AC-6

**Files:**
- Create: `apps/v1/src/components/radar/RadarBlip.tsx`
- Modify: `apps/v1/src/components/radar/TrendRadar.tsx`
- Create: `apps/v1/src/components/radar/__tests__/RadarBlip.test.tsx`

**What to build:** SVG polygon-Komponente die ein Dreieck an Position (x, y) rendert. TrendRadar-Komponente integriert den Positionierungsalgorithmus und rendert RadarBlip fuer jeden berechneten Punkt. Dreiecke erhalten eine Farbe basierend auf Branchenzuordnung.

**TDD cycle:**
- RED: Test dass RadarBlip ein SVG-Polygon mit 3 Punkten rendert. Test dass TrendRadar mindestens 25 Blips rendert (fuer die Seed-Daten). Test dass ein Trend mit 3 Handlungsfeldern 3 Blips erzeugt.
- GREEN: Komponenten implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-2): render trend triangles in radar`

---

## User Story 3: Als Fachperson moechte ich per Hover den Trendnamen sehen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-11: Mouseover auf ein Dreieck zeigt einen Tooltip mit dem Trendnamen
- [ ] AC-12: Der Tooltip verschwindet wenn die Maus das Dreieck verlaesst
- [ ] AC-13: Das Dreieck wird beim Hover visuell hervorgehoben

**Smoke Test:**
- Route: `/`
- Verify: "Hover ueber ein Dreieck zeigt Tooltip mit Trendname, Dreieck wird hervorgehoben, Tooltip verschwindet bei Mouse-Leave"

### Task 3.1: Tooltip und Hover-Effekt
**Fulfills:** AC-11, AC-12, AC-13

**Files:**
- Create: `apps/v1/src/components/radar/RadarTooltip.tsx`
- Modify: `apps/v1/src/components/radar/RadarBlip.tsx`
- Modify: `apps/v1/src/components/radar/TrendRadar.tsx`

**What to build:** HTML-Tooltip-Element (nicht SVG) das bei Hover ueber einem Dreieck erscheint. Position wird aus den SVG-Koordinaten des Dreiecks berechnet. Tooltip zeigt den Trendnamen. Bei Mouse-Leave verschwindet der Tooltip. Das Dreieck erhaelt beim Hover eine CSS-Transition (z.B. scale, opacity-Aenderung).

**TDD cycle:**
- RED: Test dass Hover auf ein Blip den Tooltip-Container mit dem Trendnamen sichtbar macht. Test dass Mouse-Leave den Tooltip entfernt.
- GREEN: Tooltip-Komponente und Hover-State implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-2): add tooltip and hover effect on radar blips`

---

## User Story 4 + 5: Klick-Navigation (Dreieck → Trend, Segment → Handlungsfeld)
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-14: Klick auf ein Dreieck navigiert zur korrekten Trend-Detailseite
- [ ] AC-15: Der Cursor aendert sich beim Hover auf ein Dreieck (pointer)
- [ ] AC-16: Klick auf ein Segment-Label navigiert zur korrekten Handlungsfeld-Seite
- [ ] AC-17: Segment-Labels reagieren visuell auf Hover

**Smoke Test:**
- Route: `/`
- Verify: "Klick auf ein Dreieck fuehrt zu `/trend/[slug]`. Klick auf ein Segment-Label fuehrt zu `/handlungsfeld/[slug]`. Cursor wird pointer bei Hover."

### Task 4.1: Klick-Handler fuer Blips und Segment-Labels
**Fulfills:** AC-14, AC-15, AC-16, AC-17

**Files:**
- Modify: `apps/v1/src/components/radar/RadarBlip.tsx`
- Modify: `apps/v1/src/components/radar/RadarSegments.tsx`
- Modify: `apps/v1/src/components/radar/TrendRadar.tsx`

**What to build:** RadarBlip erhaelt onClick-Handler der via Next.js Router zu `/trend/[slug]` navigiert. CSS cursor:pointer auf Blips. Segment-Labels erhalten onClick-Handler fuer Navigation zu `/handlungsfeld/[slug]`. Hover-Effekt auf Segment-Labels (z.B. Unterstreichung oder Farbwechsel).

**TDD cycle:**
- RED: Test dass Klick auf Blip den Router mit dem korrekten Trend-Slug aufruft. Test dass Klick auf Segment-Label den Router mit dem korrekten Handlungsfeld-Slug aufruft.
- GREEN: Click-Handler und Cursor-Styles hinzufuegen
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-2): add click navigation for blips and segment labels`

---

### PROJ-8: Navigation (parallel zu PROJ-2)

---

## User Story 1: Breadcrumbs
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Handlungsfeld-Seite zeigt: Startseite > Handlungsfeld: [Name]
- [ ] AC-2: Trend-Detailseite zeigt: Startseite > Handlungsfeld: [Name] > Trend: [Name]
- [ ] AC-3: Megatrend-Seite zeigt: Startseite > Megatrend: [Name]
- [ ] AC-4: Jedes Breadcrumb-Element ist klickbar und navigiert zur entsprechenden Seite
- [ ] AC-5: Startseite hat keinen Breadcrumb

### Task 1.1: Breadcrumb-Komponente
**Fulfills:** AC-1, AC-2, AC-3, AC-4, AC-5

**Files:**
- Create: `apps/v1/src/components/navigation/Breadcrumb.tsx`
- Create: `apps/v1/src/components/navigation/__tests__/Breadcrumb.test.tsx`

**What to build:** Wiederverwendbare Komponente die ein Array von `{ label: string, href: string }` annimmt und als klickbare Breadcrumb-Kette rendert. Letztes Element ist nicht klickbar (aktuelle Seite). Trennzeichen: ">". Auf der Startseite wird die Komponente nicht gerendert (leeres items-Array = kein Output).

**TDD cycle:**
- RED: Test dass 3 Items korrekt gerendert werden (2 Links + 1 Plain-Text). Test dass leeres Array nichts rendert. Test dass Links korrekte href-Attribute haben.
- GREEN: Komponente implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-8): add reusable Breadcrumb component`

---

## User Story 2 + 3: Home-Button und Zurueck-Button
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-6: Home-Button (Haus-Symbol) ist auf jeder Unterseite sichtbar
- [ ] AC-7: Klick auf Home-Button fuehrt zur Startseite
- [ ] AC-8: Zurueck-Button ist auf jeder Unterseite sichtbar
- [ ] AC-9: Von der Trend-Detailseite fuehrt Zurueck zum Handlungsfeld
- [ ] AC-10: Von der Handlungsfeld-Seite fuehrt Zurueck zur Startseite
- [ ] AC-11: Von der Megatrend-Seite fuehrt Zurueck zur Startseite

### Task 2.1: PageHeader-Komponente mit Home und Zurueck
**Fulfills:** AC-6, AC-7, AC-8, AC-9, AC-10, AC-11

**Files:**
- Create: `apps/v1/src/components/navigation/PageHeader.tsx`
- Create: `apps/v1/src/components/navigation/__tests__/PageHeader.test.tsx`

**What to build:** PageHeader-Komponente die Breadcrumb, Home-Button und Zurueck-Button kombiniert. Props: `breadcrumbItems[]` und `backHref`. Home-Button ist immer ein Link auf `/`. Zurueck-Button navigiert zu `backHref`. Auf der Startseite werden weder Breadcrumb noch Buttons angezeigt.

**TDD cycle:**
- RED: Test dass Home-Button auf "/" verlinkt. Test dass Zurueck-Button auf backHref verlinkt. Test dass beide Buttons nicht auf der Startseite erscheinen (wenn isHome=true).
- GREEN: Komponente implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-8): add PageHeader with home and back navigation`

---

## User Story 4: Branchenfilter-Persistenz
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-12: Branchenfilter-Zustand bleibt beim Navigieren zwischen Seiten erhalten
- [ ] AC-13: Filter-Zustand wird ueber React State (Context oder URL-Parameter) geteilt

### Task 3.1: BranchenFilter-Context
**Fulfills:** AC-12, AC-13

**Files:**
- Create: `apps/v1/src/contexts/BranchenFilterContext.tsx`
- Modify: `apps/v1/src/app/layout.tsx`
- Create: `apps/v1/src/contexts/__tests__/BranchenFilterContext.test.tsx`

**What to build:** React Context mit Provider der ein Set von aktiven Branchen-IDs haelt. Default: alle 3 Branchen aktiv. Funktion `toggleBranche(id)` zum Ein-/Ausschalten. Funktion `isTrendVisible(trend)` die prueft ob mindestens eine der Trend-Branchen aktiv ist. Provider wird in `layout.tsx` eingebunden ("use client"-Boundary noetig).

**TDD cycle:**
- RED: Test dass Default-State alle 3 Branchen aktiv hat. Test dass toggleBranche eine Branche deaktiviert. Test dass isTrendVisible einen Trend ausblendet wenn keine seiner Branchen aktiv ist. Test dass isTrendVisible einen Multi-Branchen-Trend sichtbar laesst wenn mindestens eine Branche aktiv ist.
- GREEN: Context implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-8): add BranchenFilterContext for cross-page filter state`

---

## Wave 3: Branchenfilter

---

### PROJ-3: Branchenfilter

---

## User Story 1: Trends nach Branche filtern
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Filter zeigt 3 Branchen als Multi-Select-Buttons/Checkboxen
- [ ] AC-2: Default-Zustand: alle 3 Branchen sind aktiv
- [ ] AC-3: Deaktivieren einer Branche blendet die entsprechenden Dreiecke im Radar aus
- [ ] AC-4: Dreiecke werden sanft ein-/ausgeblendet (keine harten Spruenge)
- [ ] AC-5: Ein Trend wird nur ausgeblendet wenn KEINE seiner Branchen aktiv ist

**Smoke Test:**
- Route: `/`
- Verify: "3 Branchenfilter-Buttons sichtbar und alle aktiv. Klick auf einen Button deaktiviert ihn visuell. Dreiecke im Radar werden ausgeblendet. Trends mit mehreren Branchen bleiben sichtbar wenn mindestens eine aktiv."

### Task 1.1: BranchenFilter-UI-Komponente
**Fulfills:** AC-1, AC-2, AC-3, AC-4, AC-5

**Files:**
- Create: `apps/v1/src/components/filter/BranchenFilter.tsx`
- Create: `apps/v1/src/components/filter/__tests__/BranchenFilter.test.tsx`
- Modify: `apps/v1/src/components/radar/TrendRadar.tsx`

**What to build:** UI-Komponente mit 3 Toggle-Buttons in Branchenfarben. Liest/schreibt den BranchenFilter-Context. Aktive Buttons sind gefuellt, inaktive haben nur Border. TrendRadar-Komponente filtert Blips anhand von `isTrendVisible()` aus dem Context. Ausgeblendete Dreiecke erhalten CSS opacity-Transition (sanftes Ein-/Ausblenden).

**TDD cycle:**
- RED: Test dass 3 Buttons gerendert werden. Test dass Klick auf einen Button den Context aktualisiert. Test dass TrendRadar gefilterte Blips korrekt ein-/ausblendet.
- GREEN: Komponente implementieren und in Radar integrieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-3): add BranchenFilter UI with radar integration`

---

## User Story 2: Branchenfarben im Radar
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-6: Jede Branche hat eine distinkte, gut unterscheidbare Farbe
- [ ] AC-7: Dreiecke mit einer einzigen Branche tragen deren Farbe
- [ ] AC-8: Dreiecke mit mehreren Branchen sind visuell als "mehrfach zugeordnet" erkennbar

### Task 2.1: Farbkodierung der Dreiecke
**Fulfills:** AC-6, AC-7, AC-8

**Files:**
- Modify: `apps/v1/src/components/radar/RadarBlip.tsx`

**What to build:** RadarBlip erhaelt die Branchen-IDs des Trends und bestimmt die Fuellfarbe: 1 Branche = Branchenfarbe, mehrere Branchen = neutrale Farbe (z.B. #666) oder Farbe der erstgenannten Branche mit visuellem Indikator (z.B. doppelter Rand). Farben kommen aus branchen.json (CURAVIVA=#e07b39, INSOS=#4a6fa5, YOUVITA=#2a9d8f).

**TDD cycle:**
- RED: Test dass ein Single-Branchen-Trend die Branchenfarbe als Fill erhaelt. Test dass ein Multi-Branchen-Trend visuell unterscheidbar ist.
- GREEN: Farblogik implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-3): add branch color coding to radar blips`

---

## User Story 3: Branchenfilter auf Unterseiten
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-9: Handlungsfeld-Seite hat einen Branchenfilter fuer die Trendliste
- [ ] AC-10: Filterlogik ist identisch zur Startseite

> Hinweis: Wird in PROJ-5 (Handlungsfeld-Seite) integriert. Die BranchenFilter-Komponente ist bereits wiederverwendbar.

---

## Wave 4: Alle Seiten (parallel)

---

### PROJ-4: Startseite Layout

---

## User Story 1: Megatrend-Sidebar
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Megatrend-Liste wird rechts vom Radar angezeigt
- [ ] AC-2: Alle 6 Megatrends sind aufgelistet
- [ ] AC-3: Klick auf einen Megatrend navigiert zur Megatrend-Seite

**Smoke Test:**
- Route: `/`
- Verify: "Rechte Sidebar zeigt 6 Megatrends als klickbare Liste. Klick auf einen Megatrend navigiert zu `/megatrend/[slug]`."

### Task 1.1: MegatrendSidebar-Komponente
**Fulfills:** AC-1, AC-2, AC-3

**Files:**
- Create: `apps/v1/src/components/sidebar/MegatrendSidebar.tsx`

**What to build:** Komponente die alle Megatrends als klickbare Liste rendert. Jeder Eintrag zeigt den Namen und einen farbigen Punkt. Klick navigiert zu `/megatrend/[slug]`. Daten werden als Props uebergeben.

**TDD cycle:**
- RED: Test dass 6 Megatrends gerendert werden. Test dass jeder Eintrag einen Link zu `/megatrend/[slug]` hat.
- GREEN: Komponente implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-4): add MegatrendSidebar component`

---

## User Story 2: Neuste Entwicklungen
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-4: "Neuste Entwicklungen"-Bereich wird links vom Radar angezeigt
- [ ] AC-5: Trends sind chronologisch sortiert (neueste zuerst)
- [ ] AC-6: Jeder Eintrag zeigt Trendname und Erstellungsdatum
- [ ] AC-7: Klick auf einen Eintrag navigiert zur Trend-Detailseite

**Smoke Test:**
- Route: `/`
- Verify: "Linke Sidebar zeigt Trends mit Name und Datum, sortiert neueste zuerst. Klick navigiert zu `/trend/[slug]`."

### Task 2.1: NeusteEntwicklungen-Komponente
**Fulfills:** AC-4, AC-5, AC-6, AC-7

**Files:**
- Create: `apps/v1/src/components/sidebar/NeusteEntwicklungen.tsx`

**What to build:** Komponente die Trends nach Erstellungsdatum sortiert (neueste zuerst), begrenzt auf 10 Eintraege. Jeder Eintrag zeigt Trendname und formatiertes Datum. Klick navigiert zu `/trend/[slug]`.

**TDD cycle:**
- RED: Test dass Trends nach Datum absteigend sortiert sind. Test dass maximal 10 Eintraege angezeigt werden. Test dass jeder Eintrag Name und Datum zeigt.
- GREEN: Komponente implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-4): add NeusteEntwicklungen sidebar component`

---

## User Story 3: Startseiten-Layout
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-8: Layout ordnet Radar zentral, Sidebars links/rechts an
- [ ] AC-9: Branchenfilter ist sichtbar und bedienbar
- [ ] AC-10: Seite hat einen klaren visuellen Aufbau ohne Ueberlappungen

**Smoke Test:**
- Route: `/`
- Verify: "3-Spalten-Layout: Neuste Entwicklungen links, Radar zentral mit Branchenfilter darunter, Megatrends rechts. Keine Ueberlappungen. Topbar mit Titel oben."

### Task 3.1: Startseite zusammenbauen
**Fulfills:** AC-8, AC-9, AC-10

**Files:**
- Modify: `apps/v1/src/app/page.tsx`
- Create: `apps/v1/src/app/layout.tsx` (anpassen: Topbar)

**What to build:** Startseite als 3-Spalten-Grid: links NeusteEntwicklungen, mitte TrendRadar + BranchenFilter, rechts MegatrendSidebar. Topbar mit "ARTISET Trendradar" Titel. Alle Daten werden zur Build-Zeit geladen (SSG). Radar und Filter sind "use client" Komponenten.

**TDD cycle:**
- RED: Test dass die Startseite alle 3 Bereiche rendert (Sidebars + Radar). Test dass der Branchenfilter sichtbar ist.
- GREEN: Layout zusammenbauen
- REFACTOR: Responsive Breakpoints pruefen
- COMMIT: `feat(PROJ-4): assemble homepage layout with radar and sidebars`

---

### PROJ-5: Handlungsfeld-Seite (parallel)

---

## User Story 1: Handlungsfeld-Beschreibung
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Titel zeigt "Handlungsfeld: [Name]"
- [ ] AC-2: Beschreibungstext des Handlungsfeldes wird angezeigt
- [ ] AC-3: Seite ist ueber die URL `/handlungsfeld/[slug]` erreichbar

**Smoke Test:**
- Route: `/handlungsfeld/betrieb`
- Verify: "Titel 'Handlungsfeld: Betrieb' sichtbar. Beschreibungstext angezeigt. Breadcrumb: Startseite > Handlungsfeld: Betrieb."

### Task 1.1: Handlungsfeld-Seite erstellen
**Fulfills:** AC-1, AC-2, AC-3

**Files:**
- Create: `apps/v1/src/app/handlungsfeld/[slug]/page.tsx`

**What to build:** Dynamische Route mit generateStaticParams() fuer alle 4 Handlungsfelder. Seite zeigt Titel "Handlungsfeld: [Name]" und Beschreibungstext. PageHeader mit Breadcrumb und Navigation. 404-Handling fuer unbekannte Slugs.

**TDD cycle:**
- RED: Test dass `/handlungsfeld/betrieb` den korrekten Titel rendert. Test dass generateStaticParams 4 Params zurueckgibt.
- GREEN: Route und Seite implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-5): add Handlungsfeld page with description`

---

## User Story 2: Aufklappbare Trendliste
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-4: Button "Trends zu [Name] anzeigen" ist sichtbar
- [ ] AC-5: Klick auf den Button klappt die Trendliste auf/zu
- [ ] AC-6: Jeder Trend in der Liste zeigt Name und Zeitbereich-Kennzeichnung
- [ ] AC-7: Klick auf einen Trend navigiert zur Trend-Detailseite

**Smoke Test:**
- Route: `/handlungsfeld/betrieb`
- Verify: "Button 'Trends zu Betrieb anzeigen' sichtbar. Klick klappt Liste auf. Trends zeigen Name und Zeitbereich-Badge. Klick auf Trend navigiert zu `/trend/[slug]`."

### Task 2.1: TrendList-Komponente mit Toggle
**Fulfills:** AC-4, AC-5, AC-6, AC-7

**Files:**
- Create: `apps/v1/src/components/trends/TrendList.tsx`
- Modify: `apps/v1/src/app/handlungsfeld/[slug]/page.tsx`

**What to build:** Aufklappbare Liste (Default: eingeklappt). Toggle-Button mit Text "Trends zu [Name] anzeigen". Jeder Trend-Eintrag zeigt Name, Zeitbereich-Badge (farblich unterschieden: Handeln/Vorbereiten/Beobachten) und ist klickbar (Link zu `/trend/[slug]`).

**TDD cycle:**
- RED: Test dass Button sichtbar ist und Liste initial eingeklappt. Test dass Klick die Liste aufklappt. Test dass Trends Name und Zeitbereich-Badge zeigen.
- GREEN: Komponente implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-5): add collapsible TrendList to Handlungsfeld page`

---

## User Story 3: Branchenfilter auf Handlungsfeld-Seite
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-8: Branchenfilter ist auf der Handlungsfeld-Seite vorhanden
- [ ] AC-9: Filterung der Trendliste funktioniert analog zur Startseite

### Task 3.1: BranchenFilter in Handlungsfeld-Seite integrieren
**Fulfills:** AC-8, AC-9

**Files:**
- Modify: `apps/v1/src/app/handlungsfeld/[slug]/page.tsx`

**What to build:** BranchenFilter-Komponente (aus PROJ-3) auf der Handlungsfeld-Seite einbinden. TrendList filtert ihre Eintraege anhand des BranchenFilter-Context.

**TDD cycle:**
- RED: Test dass Branchenfilter auf der Seite sichtbar ist. Test dass Deaktivieren einer Branche die Trendliste filtert.
- GREEN: Filter integrieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-5): integrate BranchenFilter on Handlungsfeld page`

---

### PROJ-6: Trend-Detailseite (parallel)

---

## User Story 1: Trend-Beschreibung
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Titel zeigt "Trend: [Name]"
- [ ] AC-2: Allgemeiner Beschreibungstext wird vollstaendig angezeigt
- [ ] AC-3: Zeitbereich (Handeln/Vorbereiten/Beobachten) ist visuell gekennzeichnet
- [ ] AC-4: Seite ist ueber die URL `/trend/[slug]` erreichbar

**Smoke Test:**
- Route: `/trend/automatisierte-administration`
- Verify: "Titel 'Trend: Automatisierte Administration' sichtbar. Beschreibungstext vollstaendig. Zeitbereich-Badge 'Vorbereiten' sichtbar."

### Task 1.1: Trend-Detailseite erstellen
**Fulfills:** AC-1, AC-2, AC-3, AC-4

**Files:**
- Create: `apps/v1/src/app/trend/[slug]/page.tsx`

**What to build:** Dynamische Route mit generateStaticParams() fuer alle Trends. Seite zeigt Titel "Trend: [Name]", Beschreibungstext und Zeitbereich-Badge. PageHeader mit Breadcrumb (Startseite > Handlungsfeld: [Erstes HF] > Trend: [Name]).

**TDD cycle:**
- RED: Test dass `/trend/automatisierte-administration` den korrekten Titel und Beschreibungstext rendert. Test dass Zeitbereich-Badge sichtbar ist.
- GREEN: Route und Seite implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-6): add Trend detail page with description and Zeitbereich`

---

## User Story 2 + 3 + 4 + 5: Reflexionsfragen, Megatrends, Branchen-Texte, Handlungsfelder
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-5: Reflexionsfragen werden als eigener Abschnitt angezeigt
- [ ] AC-6: Fragen sind als nummerierte Liste formatiert
- [ ] AC-7: Verknuepfte Megatrends werden namentlich angezeigt
- [ ] AC-8: Klick auf einen Megatrend navigiert zur Megatrend-Seite
- [ ] AC-9: Branchenspezifische Texte werden in getrennten Abschnitten angezeigt
- [ ] AC-10: Abschnitte werden nur angezeigt wenn Inhalt vorhanden ist
- [ ] AC-11: Zugeordnete Handlungsfelder werden angezeigt
- [ ] AC-12: Klick auf ein Handlungsfeld navigiert zur Handlungsfeld-Seite

**Smoke Test:**
- Route: `/trend/automatisierte-administration`
- Verify: "Reflexionsfragen als nummerierte Liste. Megatrend-Tags 'Technologisierung' und 'Oekonomisierung' als klickbare Links. Handlungsfeld-Tags 'Betrieb' und 'Mitarbeitende' als klickbare Links."

### Task 2.1: Trend-Detail-Sektionen
**Fulfills:** AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11, AC-12

**Files:**
- Modify: `apps/v1/src/app/trend/[slug]/page.tsx`
- Create: `apps/v1/src/components/trends/ReflexionsFragen.tsx`
- Create: `apps/v1/src/components/trends/MetaTags.tsx`

**What to build:** Sektionen auf der Trend-Detailseite: (1) Reflexionsfragen als nummerierte Liste. (2) Meta-Bereich: Handlungsfelder als klickbare Tags (Link zu `/handlungsfeld/[slug]`), Megatrends als klickbare Tags (Link zu `/megatrend/[slug]`). (3) Branchenspezifische Texte in separaten farbcodierten Abschnitten — nur rendern wenn Inhalt vorhanden. Alle Daten kommen aus dem Trend-Objekt.

**TDD cycle:**
- RED: Test dass Reflexionsfragen als geordnete Liste gerendert werden. Test dass Megatrend-Tags klickbar sind und korrekte hrefs haben. Test dass leere Branchentexte nicht gerendert werden.
- GREEN: Sektionen implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-6): add questions, megatrends, branches and Handlungsfeld sections`

---

### PROJ-7: Megatrend-Seite (parallel)

---

## User Story 1: Megatrend-Beschreibung
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-1: Titel zeigt "Megatrend: [Name]"
- [ ] AC-2: Beschreibungstext wird angezeigt
- [ ] AC-3: Seite ist ueber die URL `/megatrend/[slug]` erreichbar

**Smoke Test:**
- Route: `/megatrend/demografischer-wandel`
- Verify: "Titel 'Megatrend: Demografischer Wandel' sichtbar. Beschreibungstext angezeigt. Breadcrumb: Startseite > Megatrend: Demografischer Wandel."

### Task 1.1: Megatrend-Seite erstellen
**Fulfills:** AC-1, AC-2, AC-3

**Files:**
- Create: `apps/v1/src/app/megatrend/[slug]/page.tsx`

**What to build:** Dynamische Route mit generateStaticParams() fuer alle 6 Megatrends. Seite zeigt Titel "Megatrend: [Name]" und Beschreibungstext. PageHeader mit Breadcrumb.

**TDD cycle:**
- RED: Test dass `/megatrend/demografischer-wandel` den korrekten Titel rendert.
- GREEN: Route und Seite implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-7): add Megatrend page with description`

---

## User Story 2: Liste beeinflusster Trends
**Scope:** frontend → frontend-implementer

**Acceptance Criteria:**
- [ ] AC-4: Liste aller verknuepften Trends wird angezeigt
- [ ] AC-5: Jeder Trend zeigt Name und Zeitbereich-Kennzeichnung
- [ ] AC-6: Klick auf einen Trend navigiert zur Trend-Detailseite

**Smoke Test:**
- Route: `/megatrend/demografischer-wandel`
- Verify: "Trendliste mit mindestens 5 Eintraegen. Jeder Eintrag zeigt Name und Zeitbereich-Badge. Klick navigiert zu `/trend/[slug]`."

### Task 2.1: Trendliste auf Megatrend-Seite
**Fulfills:** AC-4, AC-5, AC-6

**Files:**
- Modify: `apps/v1/src/app/megatrend/[slug]/page.tsx`

**What to build:** Liste aller Trends die diesen Megatrend in megatrendIds[] haben. Sortiert nach Zeitbereich (Handeln > Vorbereiten > Beobachten). Jeder Eintrag zeigt Name, Handlungsfelder und Zeitbereich-Badge. Klick navigiert zu `/trend/[slug]`. Wiederverwendung der TrendList-Darstellung aus PROJ-5.

**TDD cycle:**
- RED: Test dass die korrekte Anzahl Trends fuer "Demografischer Wandel" angezeigt wird. Test dass Trends nach Zeitbereich sortiert sind.
- GREEN: Trendliste implementieren
- REFACTOR: Standard-Cleanup
- COMMIT: `feat(PROJ-7): add linked trends list to Megatrend page`

---

## Quality Gate

After all user stories are implemented and verified by Ralph loops:

### Gate 1 — Code Review
- Diff all changes since BASE_SHA: `git diff BASE_SHA..HEAD`
- Review against code quality checklist
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

1. Start dev server (`npm run dev`)
2. Use Playwright MCP tools to test every AC in the browser
3. Document bugs in `progress.md`
4. Fix all Critical/High bugs (spawn fix subagents), re-verify after each fix
5. Present remaining Medium/Low bugs to user for decision
6. Final regression pass after all fixes

**QA is not optional — it runs automatically after every Quality Gate.**
