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
