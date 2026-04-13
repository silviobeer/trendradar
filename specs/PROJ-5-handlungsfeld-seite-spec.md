# PROJ-5: Handlungsfeld-Seite

## Status: Planned

## Beschreibung

Detailseite fuer ein einzelnes Handlungsfeld. Zeigt Beschreibungstext und eine aufklappbare Liste aller zugehoerigen Trends mit Branchenfilter.

## User Stories

### US-1: Als Fachperson moechte ich die Beschreibung eines Handlungsfeldes lesen, um den thematischen Kontext zu verstehen

**Given** ich klicke auf ein Segment-Label im Radar oder einen Handlungsfeld-Link
**When** die Handlungsfeld-Seite geladen ist
**Then** sehe ich den Titel "Handlungsfeld: [Name]" und den Beschreibungstext

**Acceptance Criteria:**
- [ ] AC-1: Titel zeigt "Handlungsfeld: [Name]"
- [ ] AC-2: Beschreibungstext des Handlungsfeldes wird angezeigt
- [ ] AC-3: Seite ist ueber die URL `/handlungsfeld/[slug]` erreichbar

### US-2: Als Fachperson moechte ich die Trends eines Handlungsfeldes sehen, um gezielt relevante Trends zu erkunden

**Given** ich bin auf einer Handlungsfeld-Seite
**When** ich auf den Button "Trends zu [Name] anzeigen" klicke
**Then** klappt eine Liste aller zugehoerigen Trends auf
**And** jeder Trend zeigt Name und Zeitbereich (Handeln/Vorbereiten/Beobachten)

**Acceptance Criteria:**
- [ ] AC-4: Button "Trends zu [Name] anzeigen" ist sichtbar
- [ ] AC-5: Klick auf den Button klappt die Trendliste auf/zu
- [ ] AC-6: Jeder Trend in der Liste zeigt Name und Zeitbereich-Kennzeichnung
- [ ] AC-7: Klick auf einen Trend navigiert zur Trend-Detailseite

### US-3: Als Fachperson moechte ich die Trendliste nach Branche filtern

**Given** die Trendliste ist aufgeklappt
**When** ich den Branchenfilter benutze
**Then** werden nur Trends der gewaehlten Branchen angezeigt

**Acceptance Criteria:**
- [ ] AC-8: Branchenfilter ist auf der Handlungsfeld-Seite vorhanden
- [ ] AC-9: Filterung der Trendliste funktioniert analog zur Startseite

## Edge Cases

- Handlungsfeld hat keine Trends (theoretisch) — Button wird angezeigt, Liste ist leer mit Hinweis
- Handlungsfeld-Slug existiert nicht in den Daten — 404-Seite oder Redirect zur Startseite
- Sehr viele Trends in einem Handlungsfeld (15+) — Liste scrollbar

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell), PROJ-8 (Navigation fuer Breadcrumbs)
