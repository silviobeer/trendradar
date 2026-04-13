# PROJ-1: Datenmodell & Seed-Daten

## Status: Planned

## Beschreibung

Strukturierte JSON-Dateien als lokale Datenquelle fuer den Prototyp. Enthaelt alle Entitaeten (Handlungsfelder, Megatrends, Trends, Branchen) mit Relationen ueber IDs. Befuellt mit ~28 echten CURAVIVA-Trends.

## User Stories

### US-1: Als Entwickler moechte ich strukturierte JSON-Dateien laden, um Trenddaten im Frontend anzuzeigen

**Given** die Anwendung wird gestartet
**When** eine Seite Trenddaten benoetigt
**Then** werden die Daten aus lokalen JSON-Dateien geladen
**And** alle Relationen (Trend -> Handlungsfelder, Trend -> Megatrends, Trend -> Branchen) sind ueber IDs aufloesbar

**Acceptance Criteria:**
- [ ] AC-1: `packages/shared/data/handlungsfelder.json` enthaelt 4 Handlungsfelder mit id, name, beschreibung
- [ ] AC-2: `packages/shared/data/megatrends.json` enthaelt 6 Megatrends mit id, name, beschreibung
- [ ] AC-3: `packages/shared/data/trends.json` enthaelt Trends mit id, name, beschreibung, zeitrahmen, handlungsfeldIds[], megatrendIds[], branchenIds[], fragen[]
- [ ] AC-4: `packages/shared/data/branchen.json` enthaelt 3 Branchen mit id, name, organisation, farbe
- [ ] AC-5: Alle IDs sind konsistent und referenzierbar zwischen den Dateien

### US-2: Als Entwickler moechte ich realistische Seed-Daten, um die Visualisierung mit echten Inhalten testen zu koennen

**Given** die JSON-Dateien existieren
**When** ich die Daten lade
**Then** enthalten sie ~28 echte CURAVIVA-Trends mit vollstaendigen Beschreibungen, Reflexionsfragen und korrekten Zuordnungen

**Acceptance Criteria:**
- [ ] AC-6: Mindestens 25 Trends mit vollstaendigem Beschreibungstext vorhanden
- [ ] AC-7: Jeder Trend hat mindestens 1 Handlungsfeld, 1 Megatrend und 1 Branche zugeordnet
- [ ] AC-8: Jeder Trend hat mindestens 2 Reflexionsfragen
- [ ] AC-9: Alle 3 Zeitrahmen (Handeln, Vorbereiten, Beobachten) sind durch Trends abgedeckt
- [ ] AC-10: Alle 4 Handlungsfelder haben mindestens 3 zugeordnete Trends
- [ ] AC-11: Jeder Trend hat ein Erstellungsdatum (fuer "Neuste Entwicklungen")

### US-3: Als Entwickler moechte ich TypeScript-Typen fuer alle Entitaeten, um typsichere Datenzugriffe zu ermoeglichen

**Given** die JSON-Dateien eine definierte Struktur haben
**When** ich im Code auf Trenddaten zugreife
**Then** stehen TypeScript-Interfaces fuer Trend, Handlungsfeld, Megatrend und Branche zur Verfuegung

**Acceptance Criteria:**
- [ ] AC-12: TypeScript-Interfaces fuer alle 4 Entitaeten definiert
- [ ] AC-13: Hilfsfunktionen zum Aufloesen von Relationen vorhanden (z.B. getTrendsByHandlungsfeld, getMegatrendsByTrend)

## Edge Cases

- Ein Trend hat nur 1 Handlungsfeld (Minimum) — muss korrekt positioniert werden
- Ein Trend hat alle 4 Handlungsfelder — erscheint 4x im Radar
- Ein Handlungsfeld hat keine Trends zugeordnet — Segment bleibt leer
- Ein Megatrend wird von keinem Trend referenziert — erscheint trotzdem in der Liste
- Branchenspezifische Texte fehlen fuer eine Branche — Abschnitt wird nicht angezeigt

## Abhaengigkeiten

- Keine (Grundlage fuer alle anderen Features)

---

## Tech Design (Solution Architect)

**Monorepo-Struktur:** Geteiltes Package `packages/shared` (Types, Daten, Data-Access-Layer) wird von allen App-Varianten (`apps/v1`, `apps/v2`, ...) importiert.

**Datenhaltung:** 4 JSON-Dateien in `packages/shared/data/` — werden zur Build-Zeit gelesen (Static Site Generation). Kein Runtime-Fetch im Browser.

**Relationen:** Alle n:m-Beziehungen als ID-Arrays im Trend-Objekt (handlungsfeldIds[], megatrendIds[], branchenIds[]). Keine separaten Join-Dateien.

**Slugs:** Jede Entitaet bekommt ein `slug`-Feld (z.B. "automatisierte-administration") fuer URL-Routing.

**Datenzugriff:** TypeScript-Hilfsfunktionen lesen JSON-Dateien und loesen Relationen auf. Diese Funktionen werden von allen Seiten geteilt.

**Branchenspezifische Texte:** Optional im Trend-Objekt als Objekt mit Branchen-IDs als Keys. Fehlende Eintraege = Abschnitt wird nicht angezeigt.
