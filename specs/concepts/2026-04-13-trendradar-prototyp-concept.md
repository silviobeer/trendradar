# Konzept: Trendradar ARTISET — Phase 1 Prototyp

**Datum:** 13. April 2026
**Status:** Freigegeben

---

## Ziel

Frontend-only Prototyp zur Validierung der Radar-Visualisierung und Interaktion. Keine Datenbank, kein Backend, kein Admin-UI. Lokale JSON-Dateien als Datenquelle. Alle Seiten/Views des Pflichtenhefts werden umgesetzt.

---

## Tech-Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **SVG via React** fuer die Radar-Visualisierung (kein D3.js)
- **Lokale JSON-Dateien** als Datenquelle (`data/*.json`)

---

## Datenmodell (JSON-Files)

4 getrennte Dateien mit Relationen ueber IDs:

| Datei | Inhalt |
|---|---|
| `data/handlungsfelder.json` | 4 Handlungsfelder mit Beschreibungen |
| `data/megatrends.json` | 6 Megatrends |
| `data/trends.json` | ~28 Trends mit n:m-Zuordnungen zu Handlungsfeldern, Megatrends und Branchen |
| `data/branchen.json` | 3 Branchen (CURAVIVA, INSOS, YOUVITA) |

**Wichtig:** Trends erscheinen einmal pro zugeordnetem Handlungsfeld als Dreieck im Radar (n:m-Beziehung Trend <-> Handlungsfeld).

### Handlungsfelder

1. Klientinnen und Klienten
2. Mitarbeitende
3. Externes Umfeld
4. Betrieb

### Megatrends

1. Demografischer Wandel
2. Wertewandel
3. Health Shift
4. Technologisierung
5. Oekonomisierung
6. Oekologisierung

### Branchen

1. CURAVIVA — Menschen im Alter
2. INSOS — Menschen mit Behinderungen
3. YOUVITA — Kinder und Jugendliche

### Zeitrahmen (konzentrische Ringe)

1. **Handeln** (innen) — Unmittelbarer Handlungsbedarf
2. **Vorbereiten** (mitte) — Vorbereitung empfohlen
3. **Beobachten** (aussen) — Langfristig im Blick behalten

---

## Seiten / Views

### 1. Startseite / Radar-Uebersicht

- Kreisfoermige SVG-Visualisierung mit Dreiecken als Trend-Blips
- 3 konzentrische Ringe (Handeln, Vorbereiten, Beobachten)
- 4 Segmente (Handlungsfelder) mit klickbaren Labels
- Hover-Tooltips auf Dreiecken (Trendname)
- Klick auf Dreieck -> Trend-Detailseite
- Klick auf Segment-Label -> Handlungsfeld-Seite
- Branchenfilter (Multi-Select, Default: alle aktiv)
- Megatrend-Liste (rechts, klickbar)
- Neuste Entwicklungen (links, chronologisch nach Erstellungsdatum)

### 2. Handlungsfeld-Seite

- Breadcrumb (Startseite -> Handlungsfeld)
- Titel: "Handlungsfeld: [Name]"
- Beschreibungstext
- Button "Trends zu [Name] anzeigen" -> aufklappbare Trendliste
- Branchenfilter fuer die Trendliste
- Zeitbereich-Kennzeichnung pro Trend
- Home-Button + Zurueck-Button

### 3. Trend-Detailseite

- Breadcrumb (Startseite -> Handlungsfeld -> Trend)
- Titel: "Trend: [Name]"
- Allgemeiner Beschreibungstext
- Reflexionsfragen (strategische Fragen)
- Verknuepfte Megatrends (klickbar)
- Branchenspezifische Texte (nur angezeigt wenn vorhanden)
- Home-Button + Zurueck-Button

### 4. Megatrend-Seite

- Breadcrumb (Startseite -> Megatrend)
- Titel: "Megatrend: [Name]"
- Beschreibungstext
- Liste aller beeinflussten Trends (klickbar)
- Home-Button + Zurueck-Button

---

## Radar-Visualisierung

### Aufbau

- 3 konzentrische Ringe: Handeln (innen), Vorbereiten (mitte), Beobachten (aussen)
- 4 Segmente: Je ein Handlungsfeld pro Viertel (erweiterbar)
- Dreiecke als Blips: Position = Segment (Winkel) + Ring (Abstand vom Zentrum)

### Positionierung

- Radiale Position ergibt sich automatisch aus der Zuordnung (Handlungsfeld + Zeitrahmen)
- Innerhalb eines Ring-Segments werden Dreiecke verteilt, sodass sie sich nicht ueberlappen
- Ein Trend mit 3 Handlungsfeldern = 3 Dreiecke in 3 verschiedenen Segmenten

### Farbkodierung

- 3 Branchenfarben fuer die Dreiecke (CURAVIVA, INSOS, YOUVITA)
- Trends mit mehreren Branchen: mehrfarbig oder neutrale Farbe
- Ringe farblich abgestuft (Handeln = intensiv, Beobachten = dezent)

### Interaktion

- Hover -> Tooltip mit Trendname
- Klick auf Dreieck -> Navigation zur Trend-Detailseite
- Klick auf Segment-Label -> Navigation zur Handlungsfeld-Seite
- Branchenfilter (Multi-Select) -> blendet nicht gewaehlte Branchen aus

---

## Navigation & UX

- Breadcrumbs auf allen Unterseiten
- Home-Button + Zurueck-Button auf jeder Seite
- Branchenfilter-Zustand bleibt beim Navigieren erhalten
- Neuste Entwicklungen: chronologische Liste auf der Startseite
- Megatrend-Sidebar auf der Startseite

---

## Bewusst ausgeklammert (Phase 1)

- PDF-Export
- Suchfunktion
- Mehrsprachigkeit (DE/FR/IT)
- Backend / CMS / Admin-UI
- Benutzerverwaltung / Rollen
- Praxisbeispiele als eigene Entitaet
- Mobile-Optimierung des Radars (Desktop-first, responsive Layout fuer Unterseiten)
- "Trendradar lesen"-Anleitung
- Zoom in Segment

---

## Seed-Daten

~28 echte CURAVIVA-Trends werden als JSON aufbereitet. Der Prototyp arbeitet von Anfang an mit realistischen Inhalten.

Datenquelle: "8 Handlungsfelder CURAVIVA final" (25.1.2026)
