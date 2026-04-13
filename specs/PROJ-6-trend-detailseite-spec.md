# PROJ-6: Trend-Detailseite

## Status: Planned

## Beschreibung

Vollstaendige Detailansicht eines einzelnen Trends mit Beschreibung, Reflexionsfragen, Megatrend-Verknuepfungen und branchenspezifischen Texten.

## User Stories

### US-1: Als Fachperson moechte ich die vollstaendige Beschreibung eines Trends lesen, um den Trend zu verstehen

**Given** ich klicke auf ein Dreieck im Radar oder einen Trend-Link
**When** die Trend-Detailseite geladen ist
**Then** sehe ich den Titel "Trend: [Name]" und den allgemeinen Beschreibungstext
**And** der Zeitbereich des Trends ist ersichtlich

**Acceptance Criteria:**
- [ ] AC-1: Titel zeigt "Trend: [Name]"
- [ ] AC-2: Allgemeiner Beschreibungstext wird vollstaendig angezeigt
- [ ] AC-3: Zeitbereich (Handeln/Vorbereiten/Beobachten) ist visuell gekennzeichnet
- [ ] AC-4: Seite ist ueber die URL `/trend/[slug]` erreichbar

### US-2: Als Fachperson moechte ich Reflexionsfragen sehen, um den Trend strategisch einzuordnen

**Given** ich bin auf einer Trend-Detailseite
**When** ich zum Abschnitt Reflexionsfragen scrolle
**Then** sehe ich die strategischen Fragen zum Trend

**Acceptance Criteria:**
- [ ] AC-5: Reflexionsfragen werden als eigener Abschnitt angezeigt
- [ ] AC-6: Fragen sind als nummerierte oder aufgezaehlte Liste formatiert

### US-3: Als Fachperson moechte ich sehen, welche Megatrends diesen Trend beeinflussen

**Given** ich bin auf einer Trend-Detailseite
**When** der Trend mit Megatrends verknuepft ist
**Then** sehe ich die verknuepften Megatrends als klickbare Links

**Acceptance Criteria:**
- [ ] AC-7: Verknuepfte Megatrends werden namentlich angezeigt
- [ ] AC-8: Klick auf einen Megatrend navigiert zur Megatrend-Seite

### US-4: Als Fachperson moechte ich branchenspezifische Informationen sehen, um den Trend fuer meine Branche einzuordnen

**Given** ich bin auf einer Trend-Detailseite
**When** branchenspezifische Texte fuer den Trend existieren
**Then** werden diese in separaten Abschnitten pro Branche angezeigt

**Acceptance Criteria:**
- [ ] AC-9: Branchenspezifische Texte werden in getrennten Abschnitten angezeigt (CURAVIVA, INSOS, YOUVITA)
- [ ] AC-10: Abschnitte werden nur angezeigt wenn Inhalt vorhanden ist (keine leeren Bloecke)

### US-5: Als Fachperson moechte ich sehen, zu welchen Handlungsfeldern dieser Trend gehoert

**Given** ich bin auf einer Trend-Detailseite
**When** der Trend mehreren Handlungsfeldern zugeordnet ist
**Then** sehe ich alle zugeordneten Handlungsfelder als klickbare Links

**Acceptance Criteria:**
- [ ] AC-11: Zugeordnete Handlungsfelder werden angezeigt
- [ ] AC-12: Klick auf ein Handlungsfeld navigiert zur Handlungsfeld-Seite

## Edge Cases

- Trend hat keine branchenspezifischen Texte — Abschnitt wird nicht angezeigt
- Trend hat nur 1 Megatrend — wird trotzdem als Link angezeigt
- Trend hat keine Reflexionsfragen — Abschnitt wird nicht angezeigt
- Trend-Slug existiert nicht — 404-Seite oder Redirect

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell), PROJ-8 (Navigation fuer Breadcrumbs)
