# PROJ-7: Megatrend-Seite

## Status: Planned

## Beschreibung

Detailseite fuer einen einzelnen Megatrend. Zeigt Beschreibungstext und eine Liste aller Trends, die von diesem Megatrend beeinflusst werden.

## User Stories

### US-1: Als Fachperson moechte ich einen Megatrend verstehen, um uebergeordnete Zusammenhaenge zu erkennen

**Given** ich klicke auf einen Megatrend in der Sidebar oder auf einer Trend-Detailseite
**When** die Megatrend-Seite geladen ist
**Then** sehe ich den Titel "Megatrend: [Name]" und einen Beschreibungstext

**Acceptance Criteria:**
- [ ] AC-1: Titel zeigt "Megatrend: [Name]"
- [ ] AC-2: Beschreibungstext wird angezeigt
- [ ] AC-3: Seite ist ueber die URL `/megatrend/[slug]` erreichbar

### US-2: Als Fachperson moechte ich sehen, welche Trends von diesem Megatrend beeinflusst werden

**Given** ich bin auf einer Megatrend-Seite
**When** Trends mit diesem Megatrend verknuepft sind
**Then** sehe ich eine Liste aller beeinflussten Trends mit Name und Zeitbereich
**And** jeder Trend ist klickbar und fuehrt zur Trend-Detailseite

**Acceptance Criteria:**
- [ ] AC-4: Liste aller verknuepften Trends wird angezeigt
- [ ] AC-5: Jeder Trend zeigt Name und Zeitbereich-Kennzeichnung
- [ ] AC-6: Klick auf einen Trend navigiert zur Trend-Detailseite

## Edge Cases

- Megatrend hat keine verknuepften Trends — Hinweis "Keine Trends zugeordnet"
- Megatrend hat keinen Beschreibungstext — nur Titel und Trendliste anzeigen
- Megatrend-Slug existiert nicht — 404-Seite oder Redirect

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell), PROJ-8 (Navigation fuer Breadcrumbs)

## Hinweis zu Seed-Daten

Die Megatrend-Beschreibungstexte sind in den aktuellen Kundendaten nicht enthalten. Fuer den Prototyp werden kurze Platzhalterbeschreibungen erstellt, die den Megatrend in 2-3 Saetzen erklaeren.
