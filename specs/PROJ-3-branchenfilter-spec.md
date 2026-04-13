# PROJ-3: Branchenfilter

## Status: Planned

## Beschreibung

Multi-Select-Filter fuer die drei Branchen (CURAVIVA, INSOS, YOUVITA). Blendet Trends im Radar und auf Unterseiten ein/aus. Filter-Zustand bleibt beim Navigieren erhalten.

## User Stories

### US-1: Als Fachperson moechte ich Trends nach Branche filtern, um nur die fuer mich relevanten Trends zu sehen

**Given** der Radar zeigt alle Trends (Default: alle Branchen aktiv)
**When** ich eine Branche im Filter deaktiviere
**Then** werden Trends, die nur dieser Branche zugeordnet sind, ausgeblendet
**And** Trends, die auch anderen aktiven Branchen zugeordnet sind, bleiben sichtbar

**Acceptance Criteria:**
- [ ] AC-1: Filter zeigt 3 Branchen als Multi-Select-Buttons/Checkboxen
- [ ] AC-2: Default-Zustand: alle 3 Branchen sind aktiv
- [ ] AC-3: Deaktivieren einer Branche blendet die entsprechenden Dreiecke im Radar aus
- [ ] AC-4: Dreiecke werden sanft ein-/ausgeblendet (keine harten Spruenge)
- [ ] AC-5: Ein Trend wird nur ausgeblendet wenn KEINE seiner Branchen aktiv ist

### US-2: Als Fachperson moechte ich die Branchenfarben im Radar erkennen, um Trends meiner Branche visuell zu unterscheiden

**Given** der Radar zeigt Dreiecke
**When** ich den Radar betrachte
**Then** sind die Dreiecke farblich nach Branchenzugehoerigkeit kodiert

**Acceptance Criteria:**
- [ ] AC-6: Jede Branche hat eine distinkte, gut unterscheidbare Farbe
- [ ] AC-7: Dreiecke mit einer einzigen Branche tragen deren Farbe
- [ ] AC-8: Dreiecke mit mehreren Branchen sind visuell als "mehrfach zugeordnet" erkennbar (z.B. neutrale Farbe oder mehrfarbig)

### US-3: Als Fachperson moechte ich den Branchenfilter auch auf Unterseiten nutzen

**Given** ich bin auf einer Handlungsfeld-Seite
**When** ein Branchenfilter vorhanden ist
**Then** filtert er die Trendliste nach den gleichen Regeln wie auf der Startseite

**Acceptance Criteria:**
- [ ] AC-9: Handlungsfeld-Seite hat einen Branchenfilter fuer die Trendliste
- [ ] AC-10: Filterlogik ist identisch zur Startseite

## Edge Cases

- Alle Branchen deaktiviert — Radar zeigt keine Dreiecke (leerer Zustand mit Hinweis?)
- Trend ist keiner spezifischen Branche zugeordnet (alle 3 Branchen) — immer sichtbar solange mindestens 1 Branche aktiv
- Filter-Zustand geht bei Page-Refresh verloren — akzeptabel fuer Prototyp

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell), PROJ-2 (Radar-Visualisierung)
