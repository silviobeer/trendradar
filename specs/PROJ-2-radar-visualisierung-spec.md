# PROJ-2: Radar-Visualisierung

## Status: Planned

## Beschreibung

Kreisfoermige SVG-Visualisierung als Kernstueck der Anwendung. Zeigt alle Trends als Dreiecke, positioniert nach Handlungsfeld (Segment) und Zeitrahmen (Ring). Rein visuell — Filterlogik ist in PROJ-3, Seitenlayout in PROJ-4.

## User Stories

### US-1: Als Fachperson moechte ich einen kreisfoermigen Radar sehen, um alle Trends auf einen Blick zu erfassen

**Given** ich oeffne die Startseite
**When** der Radar geladen ist
**Then** sehe ich einen Kreis mit 3 konzentrischen Ringen und 4 Segmenten
**And** die Ringe sind beschriftet (Handeln, Vorbereiten, Beobachten)
**And** die Segmente tragen die Namen der Handlungsfelder

**Acceptance Criteria:**
- [ ] AC-1: SVG-Radar mit 3 konzentrischen Ringen wird gerendert
- [ ] AC-2: 4 Segmente sind durch Trennlinien visuell getrennt
- [ ] AC-3: Ring-Labels (Handeln, Vorbereiten, Beobachten) sind lesbar
- [ ] AC-4: Segment-Labels (Handlungsfeld-Namen) sind aussen am Kreis sichtbar
- [ ] AC-5: Ringe sind farblich abgestuft (Handeln = intensiv, Beobachten = dezent)

### US-2: Als Fachperson moechte ich Trends als Dreiecke im richtigen Bereich sehen, um ihre Dringlichkeit und thematische Zuordnung zu erkennen

**Given** der Radar ist geladen und Trenddaten sind vorhanden
**When** ich den Radar betrachte
**Then** ist jeder Trend als Dreieck im korrekten Segment (Handlungsfeld) und Ring (Zeitrahmen) positioniert
**And** Trends mit mehreren Handlungsfeldern erscheinen als mehrere Dreiecke in verschiedenen Segmenten

**Acceptance Criteria:**
- [ ] AC-6: Jeder Trend wird als Dreieck-Symbol gerendert
- [ ] AC-7: Dreiecke sind im korrekten Segment positioniert (Winkel entspricht Handlungsfeld)
- [ ] AC-8: Dreiecke sind im korrekten Ring positioniert (Abstand vom Zentrum entspricht Zeitrahmen)
- [ ] AC-9: Ein Trend mit n Handlungsfeldern erzeugt n Dreiecke in n verschiedenen Segmenten
- [ ] AC-10: Dreiecke innerhalb eines Ring-Segments ueberlappen sich nicht

### US-3: Als Fachperson moechte ich per Hover den Trendnamen sehen, um Trends identifizieren zu koennen

**Given** der Radar zeigt Dreiecke
**When** ich mit der Maus ueber ein Dreieck fahre
**Then** erscheint ein Tooltip mit dem Trendnamen

**Acceptance Criteria:**
- [ ] AC-11: Mouseover auf ein Dreieck zeigt einen Tooltip mit dem Trendnamen
- [ ] AC-12: Der Tooltip verschwindet wenn die Maus das Dreieck verlaesst
- [ ] AC-13: Das Dreieck wird beim Hover visuell hervorgehoben (z.B. groesser, heller)

### US-4: Als Fachperson moechte ich auf ein Dreieck klicken, um Details zum Trend zu lesen

**Given** der Radar zeigt Dreiecke
**When** ich auf ein Dreieck klicke
**Then** werde ich zur Trend-Detailseite navigiert

**Acceptance Criteria:**
- [ ] AC-14: Klick auf ein Dreieck navigiert zur korrekten Trend-Detailseite
- [ ] AC-15: Der Cursor aendert sich beim Hover auf ein Dreieck (pointer)

### US-5: Als Fachperson moechte ich auf ein Segment-Label klicken, um das Handlungsfeld zu erkunden

**Given** der Radar zeigt Segment-Labels
**When** ich auf ein Segment-Label klicke
**Then** werde ich zur Handlungsfeld-Seite navigiert

**Acceptance Criteria:**
- [ ] AC-16: Klick auf ein Segment-Label navigiert zur korrekten Handlungsfeld-Seite
- [ ] AC-17: Segment-Labels reagieren visuell auf Hover

## Edge Cases

- Sehr viele Dreiecke in einem Segment/Ring (z.B. 10+ in "Betrieb/Handeln") — duerfen sich nicht ueberlappen, muessen verteilt werden
- Nur wenige Dreiecke insgesamt — Radar darf nicht leer wirken
- Browser-Fenster ist sehr schmal — Radar soll skalieren (viewBox), nicht abgeschnitten werden
- Trend hat keinen Beschreibungstext — Klick fuehrt trotzdem zur Detailseite

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell & Seed-Daten)

## Technische Anforderungen

- SVG via React (kein D3.js)
- Responsive via SVG viewBox (skaliert mit Container)
- Positionierungsalgorithmus muss Ueberlappung vermeiden
