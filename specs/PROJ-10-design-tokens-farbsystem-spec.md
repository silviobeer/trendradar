# PROJ-10: Design-Tokens & Farbsystem

## Status: Planned

## Kontext

Die aktuellen Farben im Trendradar sind Platzhalter und entsprechen nicht der ARTISET Corporate Identity. Dieses Feature fuehrt ein CI-konformes Farbsystem als CSS Custom Properties / Tailwind-Theme ein und korrigiert die Verbandsfarben in den Seed-Daten.

## Abhaengigkeiten

- Benoetigt: Keine (Basis-Feature, von allen anderen PROJ-10-13 benoetigt)
- Blockiert: PROJ-11, PROJ-12, PROJ-13

## User Stories

### US-1: Als Verbandsmitglied moechte ich die Verbaende an ihren echten Farben erkennen, um mich sofort orientieren zu koennen

**Given** der User oeffnet den Trendradar
**When** er Dreiecke, Filter-Buttons oder Branchen-Tags sieht
**Then** sind CURAVIVA-Elemente in Gruen (#207003), INSOS-Elemente in Rot (#B8032C) und YOUVITA-Elemente in Blau (#2D518C) dargestellt

**Acceptance Criteria:**
- [ ] AC-1: CURAVIVA-Farbe ist #207003 (Gruen) statt #e07b39 (Orange)
- [ ] AC-2: INSOS-Farbe ist #B8032C (Rot/Crimson) statt #4a6fa5 (Blau)
- [ ] AC-3: YOUVITA-Farbe ist #2D518C (Blau) statt #2a9d8f (Tuerkis)
- [ ] AC-4: Die Farben sind in den Seed-Daten (packages/shared) aktualisiert

### US-2: Als Verbandsmitglied moechte ich ein warmes, vertrauenswuerdiges Erscheinungsbild sehen, das zur ARTISET-Marke passt

**Given** der User oeffnet eine beliebige Seite des Trendradars
**When** er die Seitenhintergruende, Header und Text-Farben betrachtet
**Then** sieht er warme Beige-Toene statt kaltem Weiss/Grau, Navy statt Schwarz

**Acceptance Criteria:**
- [ ] AC-5: Seitenhintergrund verwendet Warm-Beige #F5F3F1 statt reinem Weiss
- [ ] AC-6: Ueberschriften und Links verwenden Navy #003060 statt Schwarz/Grau
- [ ] AC-7: Fliesstext verwendet Dunkelgrau #363636

### US-3: Als Entwickler moechte ich ein zentrales Farbsystem haben, damit Farbaenderungen an einer Stelle erfolgen

**Given** ein Entwickler will eine Farbe aendern
**When** er die Design-Tokens anpasst
**Then** wirkt sich die Aenderung konsistent auf alle Komponenten aus

**Acceptance Criteria:**
- [ ] AC-8: Alle CI-Farben sind als CSS Custom Properties oder Tailwind-Theme-Variablen definiert (globals.css)
- [ ] AC-9: Folgende Farbkategorien sind abgedeckt: Primary (Navy-Abstufungen), Accent (Orange), Text, Hintergruende (warme Beige-Toene), Error
- [ ] AC-10: Keine hardcodierten Hex-Werte in Komponenten — alle referenzieren Design-Tokens

### US-4: Als Verbandsmitglied moechte ich die Radar-Ringe visuell unterscheiden koennen

**Given** der User betrachtet den Trendradar
**When** er die drei konzentrischen Ringe sieht
**Then** sind Handeln (innen), Vorbereiten (mitte) und Beobachten (aussen) durch abgestufte Navy-Toene unterscheidbar

**Acceptance Criteria:**
- [ ] AC-11: Ring "Handeln" hat Fuellfarbe #ccd6df (Primary 20)
- [ ] AC-12: Ring "Vorbereiten" hat Fuellfarbe #e5eaef (Primary 10)
- [ ] AC-13: Ring "Beobachten" hat Fuellfarbe #F5F3F1 (Primary Light 10)
- [ ] AC-14: Trennlinien zwischen Ringen verwenden #6683a0 (Primary 60)

### US-5: Als Verbandsmitglied moechte ich die vier Handlungsfelder im Radar farblich unterscheiden koennen

**Given** der User betrachtet die aeusseren Boegen des Trendradars
**When** er die Segment-Beschriftungen sieht
**Then** hat jedes Handlungsfeld eine eigene, warme Farbe

**Acceptance Criteria:**
- [ ] AC-15: Klientinnen und Klienten: #5A8A3C (Warmes Gruen)
- [ ] AC-16: Mitarbeitende: #335980 (Primary 80 / Warmes Blau)
- [ ] AC-17: Externes Umfeld: #8C7B68 (Primary Light 120 / Warmes Braun)
- [ ] AC-18: Betrieb: #3D7A80 (Gedaempftes Teal)
- [ ] AC-19: Die Handlungsfeld-Farben sind als Design-Tokens definiert

## Edge Cases

- Farbkontrast der Dreiecke auf verschiedenen Radar-Ringen: Pragmatisch im Implementation-Step visuell testen und bei Bedarf hellere Varianten oder Umrandungen einsetzen
- Dreiecke fuer Trends mit allen 3 Branchen: Navy #003060 als Fallback-Farbe
- Barrierefreiheit: Farben allein tragen keine Information — Form (Dreieck) und Labels ergaenzen die Farbkodierung
- Dunkelmodus: Nicht in Phase 1 vorgesehen, aber Token-System ermoeglicht spaetere Erweiterung

## Technische Anforderungen

- Tailwind CSS v4 Token-System nutzen (CSS Custom Properties in globals.css oder @theme Direktive)
- Seed-Daten in packages/shared/data/ muessen die korrekten Verbandsfarben enthalten
- Bestehende Tests muessen nach Farb-Update angepasst werden
