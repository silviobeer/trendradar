# PROJ-9: Fullscreen Radar Layout

## Status: Planned

## Konzept

Siehe [Fullscreen Radar Layout Concept](concepts/2026-04-13-fullscreen-radar-layout-concept.md)

## Abhaengigkeiten

- Benoetigt: PROJ-2 (Radar), PROJ-3 (Branchenfilter), PROJ-4 (Startseite Layout) — alle abgeschlossen

## User Stories

### US-1: Als Nutzer moechte ich den Radar grossflaechig sehen, um alle Trends auf einen Blick zu erfassen

**Given** ich oeffne die Startseite auf einem Desktop-Browser (>= 1280px)
**When** die Seite geladen ist
**Then** fuellt der Radar den verfuegbaren Viewport zwischen Header und Branchenfilter aus
**And** es gibt keinen vertikalen Scroll auf der Startseite
**And** der Radar skaliert proportional (Aspect Ratio 1:1 bleibt erhalten)

**Acceptance Criteria:**
- [ ] AC-1: Startseite hat kein vertikales Scrollen (overflow hidden)
- [ ] AC-2: Radar-SVG skaliert dynamisch mit dem Viewport (kein fester max-w-[600px])
- [ ] AC-3: Radar bleibt quadratisch (1:1 Aspect Ratio via viewBox)
- [ ] AC-4: Radar ist horizontal zentriert im verfuegbaren Platz

### US-2: Als Nutzer moechte ich die Sidebars schmal am Rand sehen, damit der Radar maximalen Platz bekommt

**Given** ich bin auf der Startseite mit einem breiten Viewport (>= 1280px)
**When** die Seite geladen ist
**Then** sind "Neueste Entwicklungen" (links) und "Megatrends" (rechts) als schmale Spalten direkt am Bildschirmrand sichtbar
**And** die Sidebars haben maximal 160px Breite
**And** bei langem Content scrollen die Sidebars intern

**Acceptance Criteria:**
- [ ] AC-5: Linke Sidebar ("Neueste Entwicklungen") ist maximal 160px breit
- [ ] AC-6: Rechte Sidebar ("Megatrends") ist maximal 160px breit
- [ ] AC-7: Sidebars kleben direkt am Bildschirmrand (kein Padding zum Rand)
- [ ] AC-8: Sidebars haben dezenten Border nur zur Radar-Seite hin
- [ ] AC-9: Sidebar-Content scrollt intern bei Overflow (overflow-y: auto)

### US-3: Als Nutzer moechte ich den Branchenfilter immer am unteren Bildschirmrand sehen

**Given** ich bin auf der Startseite
**When** die Seite geladen ist
**Then** klebt der Branchenfilter am unteren Bildschirmrand
**And** die drei Branche-Buttons sind horizontal zentriert
**And** der Filter hat eine dezente Trennlinie nach oben

**Acceptance Criteria:**
- [ ] AC-10: Branchenfilter ist in der letzten Grid-Zeile positioniert
- [ ] AC-11: Branchenfilter spannt die volle Breite (alle 3 Spalten)
- [ ] AC-12: Filter-Hoehe ist kompakt (~40-50px)
- [ ] AC-13: Branche-Buttons sind horizontal zentriert
- [ ] AC-14: Dezente Trennlinie (border-top) trennt Filter vom Radar

### US-4: Als Nutzer auf einem schmalen Screen moechte ich die Sidebars bei Bedarf einblenden koennen

**Given** ich bin auf der Startseite mit einem Viewport < 1024px
**When** die Seite geladen ist
**Then** sind die Sidebars ausgeblendet und der Radar nutzt die volle Breite
**And** ein Toggle-Button pro Sidebar ist sichtbar
**When** ich auf einen Toggle-Button klicke
**Then** wird die entsprechende Sidebar als Overlay eingeblendet

**Acceptance Criteria:**
- [ ] AC-15: Unter 1024px Viewport-Breite sind Sidebars ausgeblendet
- [ ] AC-16: Radar nutzt die volle Breite wenn Sidebars ausgeblendet sind
- [ ] AC-17: Je ein Toggle-Button fuer linke und rechte Sidebar ist sichtbar (< 1024px)
- [ ] AC-18: Klick auf Toggle blendet die Sidebar als Overlay ein
- [ ] AC-19: Overlay-Sidebar kann wieder geschlossen werden
- [ ] AC-20: Branchenfilter bleibt auf allen Screengroessen sichtbar

### US-5: Als Nutzer moechte ich dass der Header unver­aen­dert bleibt

**Given** ich bin auf der Startseite
**When** die Seite geladen ist
**Then** zeigt der Header "ARTISET Trendradar" wie bisher
**And** der Header spannt die volle Breite

**Acceptance Criteria:**
- [ ] AC-21: Header zeigt "ARTISET Trendradar"
- [ ] AC-22: Header spannt alle 3 Grid-Spalten
- [ ] AC-23: Header-Hoehe ist ca. 60px

## Edge Cases

1. **Sehr hoher Viewport (z.B. 2560x1440):** Radar skaliert proportional, wird nicht breiter als die verfuegbare Hoehe erlaubt — bleibt quadratisch und zentriert
2. **Sehr schmaler Viewport (< 768px):** Sidebars ausgeblendet, Radar nutzt volle Breite, Branchenfilter bleibt unten
3. **Sidebar-Content laenger als Viewport:** Sidebar scrollt intern, Rest der Seite bleibt fixiert
4. **Browser-Zoom (125%, 150%):** Layout passt sich an wie bei kleinerem Viewport — gleiche Breakpoint-Logik
5. **Tooltip bei grossem Radar:** Tooltip muss relativ zum SVG positioniert bleiben, nicht absolut zum Viewport

## Tech Design (Solution Architect)

### System Boundaries

Keine Aenderung. Alles bleibt Frontend-only (SSG, lokale JSON-Daten). Keine neuen externen Abhaengigkeiten.

### Key Tech Decisions

1. **CSS Grid fuer Viewport-Layout (statt Flexbox):** Grid erlaubt gleichzeitige Kontrolle von Zeilen UND Spalten. Flexbox wuerde verschachtelte Container brauchen und Radar-Sizing erschweren.

2. **SVG skaliert via viewBox (keine Koordinaten-Aenderung):** Radar-Geometrie (viewBox 600x600, Ringradien, Blip-Positionen) bleibt identisch. CSS-Begrenzung (max-w-[600px]) wird entfernt. SVG viewBox skaliert automatisch proportional. Kein Refactoring der Geometrie-Logik.

3. **Client-side State fuer Sidebar-Toggle (< 1024px):** Lokaler useState in der Startseite. Kein neuer Context noetig — konsistent mit bestehendem Pattern.

### Dependencies

Keine neuen Packages. Alles mit Tailwind CSS und bestehendem React umsetzbar.

## Technische Anforderungen

- Keine Aenderungen am Datenmodell oder shared package
- Radar-Geometrie (viewBox, Koordinaten) bleibt identisch
- Unterseiten (Handlungsfeld, Trend, Megatrend) sind nicht betroffen
- Bestehende Tests fuer Radar-Geometrie muessen weiterhin bestehen
