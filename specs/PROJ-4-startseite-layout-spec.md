# PROJ-4: Startseite Layout

## Status: Planned

## Beschreibung

Gesamtlayout der Startseite mit Radar (zentral), Megatrend-Sidebar (rechts), Neuste Entwicklungen (links) und Branchenfilter. Orchestriert die Komponenten aus PROJ-2 und PROJ-3.

## User Stories

### US-1: Als Fachperson moechte ich die Megatrends auf der Startseite sehen, um uebergeordnete Zusammenhaenge zu verstehen

**Given** ich bin auf der Startseite
**When** die Seite geladen ist
**Then** sehe ich rechts eine Liste aller Megatrends
**And** jeder Megatrend ist anklickbar und fuehrt zur Megatrend-Seite

**Acceptance Criteria:**
- [ ] AC-1: Megatrend-Liste wird rechts vom Radar angezeigt
- [ ] AC-2: Alle 6 Megatrends sind aufgelistet
- [ ] AC-3: Klick auf einen Megatrend navigiert zur Megatrend-Seite

### US-2: Als Fachperson moechte ich die neusten Entwicklungen sehen, um ueber aktuelle Trends informiert zu bleiben

**Given** ich bin auf der Startseite
**When** die Seite geladen ist
**Then** sehe ich links eine chronologische Liste der zuletzt hinzugefuegten Trends
**And** jeder Eintrag zeigt Titel und Erstellungsdatum

**Acceptance Criteria:**
- [ ] AC-4: "Neuste Entwicklungen"-Bereich wird links vom Radar angezeigt
- [ ] AC-5: Trends sind chronologisch sortiert (neueste zuerst)
- [ ] AC-6: Jeder Eintrag zeigt Trendname und Erstellungsdatum
- [ ] AC-7: Klick auf einen Eintrag navigiert zur Trend-Detailseite

### US-3: Als Fachperson moechte ich eine uebersichtliche Startseite, die alle Elemente sinnvoll anordnet

**Given** ich oeffne die Anwendung
**When** die Startseite geladen ist
**Then** sehe ich den Radar zentral, Megatrends rechts, Neuste Entwicklungen links und den Branchenfilter

**Acceptance Criteria:**
- [ ] AC-8: Layout ordnet Radar zentral, Sidebars links/rechts an
- [ ] AC-9: Branchenfilter ist sichtbar und bedienbar
- [ ] AC-10: Seite hat einen klaren visuellen Aufbau ohne Ueberlappungen

## Edge Cases

- Bildschirm ist sehr breit — Sidebars duerfen nicht zu weit vom Radar entfernt sein
- Wenige Trends vorhanden — "Neuste Entwicklungen" zeigt alle vorhandenen
- Kein Trend hat ein Erstellungsdatum — Liste bleibt leer oder zeigt Fallback

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell), PROJ-2 (Radar), PROJ-3 (Branchenfilter)
