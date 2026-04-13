# PROJ-8: Navigation

## Status: Planned

## Beschreibung

Uebergreifende Navigation: Breadcrumbs, Home-Button, Zurueck-Button und Persistenz des Branchenfilter-Zustands beim Seitenwechsel.

## User Stories

### US-1: Als Fachperson moechte ich jederzeit wissen wo ich mich befinde, um mich im Trendradar zu orientieren

**Given** ich bin auf einer Unterseite (Handlungsfeld, Trend oder Megatrend)
**When** die Seite geladen ist
**Then** sehe ich einen Breadcrumb-Pfad der meine Position zeigt

**Acceptance Criteria:**
- [ ] AC-1: Handlungsfeld-Seite zeigt: Startseite > Handlungsfeld: [Name]
- [ ] AC-2: Trend-Detailseite zeigt: Startseite > Handlungsfeld: [Name] > Trend: [Name]
- [ ] AC-3: Megatrend-Seite zeigt: Startseite > Megatrend: [Name]
- [ ] AC-4: Jedes Breadcrumb-Element ist klickbar und navigiert zur entsprechenden Seite
- [ ] AC-5: Startseite hat keinen Breadcrumb

### US-2: Als Fachperson moechte ich schnell zur Uebersicht zurueckkehren

**Given** ich bin auf einer beliebigen Unterseite
**When** ich den Home-Button klicke
**Then** werde ich zur Startseite (Radar-Uebersicht) navigiert

**Acceptance Criteria:**
- [ ] AC-6: Home-Button (Haus-Symbol) ist auf jeder Unterseite sichtbar
- [ ] AC-7: Klick auf Home-Button fuehrt zur Startseite

### US-3: Als Fachperson moechte ich zur vorherigen Seite zuruecknavigieren

**Given** ich bin auf einer Unterseite
**When** ich den Zurueck-Button klicke
**Then** werde ich zur vorherigen Ebene navigiert

**Acceptance Criteria:**
- [ ] AC-8: Zurueck-Button ist auf jeder Unterseite sichtbar
- [ ] AC-9: Von der Trend-Detailseite fuehrt Zurueck zum Handlungsfeld
- [ ] AC-10: Von der Handlungsfeld-Seite fuehrt Zurueck zur Startseite
- [ ] AC-11: Von der Megatrend-Seite fuehrt Zurueck zur Startseite

### US-4: Als Fachperson moechte ich dass mein Branchenfilter beim Navigieren erhalten bleibt

**Given** ich habe auf der Startseite eine Branche deaktiviert
**When** ich zu einer Handlungsfeld-Seite navigiere und zurueckkehre
**Then** ist mein Filter-Zustand noch aktiv

**Acceptance Criteria:**
- [ ] AC-12: Branchenfilter-Zustand bleibt beim Navigieren zwischen Seiten erhalten
- [ ] AC-13: Filter-Zustand wird ueber React State (Context oder URL-Parameter) geteilt

## Edge Cases

- Trend wurde ueber "Neuste Entwicklungen" geoeffnet (nicht ueber Handlungsfeld) — Breadcrumb zeigt trotzdem Handlungsfeld (erstes zugeordnetes)
- Trend hat mehrere Handlungsfelder — Breadcrumb zeigt das Handlungsfeld ueber das navigiert wurde, oder das erstgenannte
- Direkter URL-Zugriff auf Trend-Seite ohne vorherige Navigation — Breadcrumb wird aus Daten generiert
- Page-Refresh — Filter-State geht verloren (akzeptabel fuer Prototyp)

## Abhaengigkeiten

- Benoetigt: PROJ-1 (Datenmodell)
- Wird benoetigt von: PROJ-5, PROJ-6, PROJ-7 (Breadcrumbs)

---

## Tech Design (Solution Architect)

**Breadcrumbs:** Wiederverwendbare Komponente. Bekommt strukturierte Daten (Label + URL-Paare). Jede Seite uebergibt ihre eigene Breadcrumb-Konfiguration.

**Home/Zurueck-Buttons:** Teil des App-Layouts. Home = Link auf `/`. Zurueck = kontextabhaengig (aus Breadcrumb-Daten ableitbar).

**Filter-Persistenz:** Ueber React Context (siehe PROJ-3). Der Context-Provider im Root-Layout bleibt beim Client-seitigen Navigieren erhalten. Kein Datenverlust bei Next.js Link-Navigation.
