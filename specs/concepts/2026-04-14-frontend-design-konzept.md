# Frontend-Design-Konzept: Trendradar ARTISET

**Datum:** 14. April 2026
**Status:** Entwurf
**Basiert auf:** Prototyp-Konzept (13.04.2026), ARTISET Corporate Identity, Deloitte Trendradar als Inspiration

---

## Leitprinzipien

Das visuelle Design folgt der ARTISET-Grafik-Sprache: **Wuerdevoll — Warm — Zurueckhaltend.**

- Kein kaltes Corporate-Design, sondern institutionell-warm
- Leichte Typografie (Fontweight 300) statt autoritaerer Schwere
- Warme Beige-Toene statt kaltem Weiss/Grau
- Viel Weissraum, wenig visuelle Spielereien
- Klarheit ueber Cleverness

---

## Farbsystem

### Radar & Layout

| Element | Farbe | HEX | Herkunft |
|---------|-------|-----|----------|
| Header / Footer | Navy | `#003060` | Primary 100 |
| Seitenhintergrund | Warm-Beige hell | `#F5F3F1` | Primary Light 10 |
| Karten / Panels | Weiss | `#FFFFFF` | Kontrast zu Beige-BG |
| Abgesetzte Bereiche | Warm-Beige mittel | `#EAE7E3` | Primary Light 20 |
| Ueberschriften | Navy | `#003060` | Text dunkel |
| Fliesstext | Dunkelgrau | `#363636` | Text mittel |
| Links | Navy | `#003060` | CI-konform |
| CTA-Buttons | Orange | `#F59702` | Accent 100 |
| CTA-Hover | Orange hell | `#F7AC35` | Accent Rollover |
| Fehler | Rot | `#C30017` | Error |

### Radar-Ringe (konzentrisch, innen nach aussen)

| Ring | Bedeutung | Fuellfarbe | Logik |
|------|-----------|------------|-------|
| Handeln (innen) | Unmittelbarer Bedarf | `#ccd6df` | Primary 20 — intensivster Ring |
| Vorbereiten (mitte) | Vorbereitung empfohlen | `#e5eaef` | Primary 10 — mittlere Intensitaet |
| Beobachten (aussen) | Langfristig beobachten | `#F5F3F1` | Primary Light 10 — dezentester Ring |
| Trennlinien | Ringgraenzen | `#6683a0` | Primary 60 |

### Verbandsfarben (Dreiecke im Radar)

| Verband | Farbe | HEX | Verwendung |
|---------|-------|-----|------------|
| CURAVIVA | Gruen | `#207003` | Dreiecke, Filter-Badge, Branchentexte |
| INSOS | Rot/Crimson | `#B8032C` | Dreiecke, Filter-Badge, Branchentexte |
| YOUVITA | Blau | `#2D518C` | Dreiecke, Filter-Badge, Branchentexte |
| Mehrere Branchen | Navy | `#003060` | Fallback fuer Trends mit allen 3 Branchen |

### Handlungsfeld-Farben (Segment-Boegen)

Die 4 Handlungsfelder brauchen eigene Farben fuer die aeusseren Boegen des Radars. Abgeleitet aus der ARTISET-Palette, ergaenzt um CI-nahe Toene:

| Handlungsfeld | Farbe | HEX | Herleitung |
|---------------|-------|-----|------------|
| Klientinnen und Klienten | Warmes Gruen | `#5A8A3C` | Mischung aus Caring-Gruen und CI-Waerme |
| Mitarbeitende | Warmes Blau | `#335980` | Primary 80 |
| Externes Umfeld | Warmes Braun | `#8C7B68` | Primary Light 120 |
| Betrieb | Gedaempftes Teal | `#3D7A80` | Ergaenzend, CI-kompatibel |

Inspiration: Deloitte nutzt ebenfalls farbige Segment-Boegen als aeusseren Ring. Bei uns sind diese Boegen klickbar und fuehren zur jeweiligen Handlungsfeld-Seite (F05).

---

## Typografie

Konsequent nach ARTISET CI — auffallend leicht:

| Element | Font | Gewicht | Groesse | Zeilenhoehe |
|---------|------|---------|---------|-------------|
| H1 (Seitentitel) | Roboto Slab | 300 (Light) | 54px | 62px |
| H2 (Sektionen) | Roboto Slab | 300 (Light) | 32px | 38px |
| H3 (Karten-Titel) | Roboto Slab | 300 (Light) | 24px | 30px |
| Navigation | Roboto Slab | 400 (Regular) | 16px | — |
| Body | Roboto | 300 (Light) | 20px | 32px |
| Small / Meta | Roboto | 300 (Light) | 14px | 20px |
| Tags / Badges | Roboto | 400 (Regular) | 12px | — |

**Einbindung:** Self-hosted als Variable Fonts (weight: 100-900), DSGVO-konform.

---

## Seiten-Layouts

### 1. Startseite / Radar-Uebersicht

Gemaess Prototyp-Konzept und Pflichtenheft (F01-F18):

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Navy #003060                                        │
│  [Logo]          Navigation (Roboto Slab 400)                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Neuste           ┌─────────────────────┐      Megatrends   │
│  Entwicklungen    │                     │      ┌──────────┐ │
│  ┌──────────┐     │   SVG Trendradar    │      │Demografie│ │
│  │Trend A   │     │                     │      │Werte     │ │
│  │12.03.2026│     │  ╭─── Boegen ───╮   │      │Health    │ │
│  │          │     │  │  ○  ○        │   │      │Tech      │ │
│  │Trend B   │     │  │    ▲  ▲   ○  │   │      │Oekonomie │ │
│  │08.03.2026│     │  │  ▲    ▲      │   │      │Oekologie │ │
│  │          │     │  ╰──────────────╯   │      └──────────┘ │
│  └──────────┘     └─────────────────────┘                   │
│                                                              │
│                   Branchenfilter (F08-F11)                   │
│                   [■ CURAVIVA] [■ INSOS] [■ YOUVITA]        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Footer: Navy #003060                                        │
└──────────────────────────────────────────────────────────────┘
```

**Radar-SVG im Detail:**

```
            Klientinnen & Klienten
                (Gruen-Bogen)
                    ╱    ╲
        Betrieb    ╱      ╲    Mitarbeitende
     (Teal-Bogen) │Beob.   │   (Blau-Bogen)
                  │ Vorb.  │
                  │Handeln │
        (Braun)    ╲      ╱
                    ╲    ╱
              Externes Umfeld
               (Braun-Bogen)
```

- Aeusserer Ring: 4 farbige Boegen mit Handlungsfeld-Labels (klickbar → Handlungsfeld-Seite)
- 3 innere Ringe: Handeln / Vorbereiten / Beobachten (Navy-Abstufungen)
- Dreiecke: Farbkodiert nach Verband (Gruen/Rot/Blau)
- Hover: Tooltip mit Trendname (F02)
- Klick: Navigation zur Trend-Detailseite (F03)

**Neuste Entwicklungen (links, F12-F13):**

- Chronologische Liste der zuletzt hinzugefuegten Trends
- Pro Eintrag: Trendname + Erstellungsdatum
- Klickbar → Trend-Detailseite
- Hintergrund: Warm-Beige `#F5F3F1`

**Megatrends (rechts, F06-F07):**

- Liste aller 6 Megatrends
- Klickbar → Megatrend-Seite
- Roboto Slab Light, Navy-Farbe

**Branchenfilter (unten, F08-F11):**

- 3 Toggle-Buttons in Verbandsfarben
- Default: alle aktiv
- Deaktiviert: Dreiecke der Branche werden ausgeblendet
- Zustand bleibt beim Navigieren erhalten (I04)

### 2. Handlungsfeld-Seite

Gemaess Prototyp-Konzept und Pflichtenheft (F19-F26):

```
┌──────────────────────────────────────────────────────────────┐
│  Header                                        [Home] [←]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Breadcrumb: Startseite > Klientinnen und Klienten           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Handlungsfeld:                                         │  │
│  │ Klientinnen und Klienten                               │  │
│  │                                          (H1, 54px)    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Beschreibungstext des Handlungsfeldes...                    │
│  (Roboto 300, 20px, #363636)                                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ [Trends zu Klientinnen und Klienten anzeigen ▼]        │  │
│  │  (Orange CTA-Button #F59702)                           │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Branchenfilter: [■ CURAVIVA] [■ INSOS] [■ YOUVITA]        │
│                                                              │
│  ▼ Aufgeklappte Trendliste (nach Klick auf Button):         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ▲ Personalisierte Betreuung      [Handeln]    ●●●     │  │
│  │ ▲ Selbstbestimmung               [Vorbereiten] ●●     │  │
│  │ ▲ Digitale Inklusion             [Beobachten]  ●      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Legende: ● = Branchenpunkte in Verbandsfarben              │
│  [Handeln/Vorbereiten/Beobachten] = Zeitbereich-Badge       │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**Zeitbereich-Badge (I06/I08):**

| Zeitbereich | Hintergrund | Text |
|-------------|-------------|------|
| Handeln | `#003060` (Navy) | Weiss |
| Vorbereiten | `#335980` (Primary 80) | Weiss |
| Beobachten | `#ccd6df` (Primary 20) | Navy |

### 3. Trend-Detailseite

Gemaess Prototyp-Konzept und Pflichtenheft (F27-F37):

```
┌──────────────────────────────────────────────────────────────┐
│  Header                                        [Home] [←]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Breadcrumb: Startseite > Klient. & Klienten > Trend-Name   │
│                                                              │
│  Trend:                                                      │
│  Personalisierte Betreuung                     (H1, 54px)   │
│                                                              │
│  [Handeln]  [Klient. & Klienten]  [Mitarbeitende]           │
│   (Badge)    (Handlungsfeld-Tags)                            │
│                                                              │
│  ──────────────────────────────────────────────              │
│                                                              │
│  Beschreibungstext...                                        │
│  (Roboto 300, 20px, #363636)                                │
│                                                              │
│  ──────────────────────────────────────────────              │
│                                                              │
│  Reflexionsfragen                              (H2, 32px)   │
│  • Wie veraendert sich die Erwartungshaltung...?            │
│  • Welche Ressourcen braucht es...?                         │
│                                                              │
│  ──────────────────────────────────────────────              │
│                                                              │
│  Megatrends                                    (H2, 32px)   │
│  [Demografischer Wandel]  [Wertewandel]                     │
│   (klickbare Tags, Primary 20 BG)                           │
│                                                              │
│  ──────────────────────────────────────────────              │
│                                                              │
│  Branchenspezifisch                            (H2, 32px)   │
│                                                              │
│  ┌── CURAVIVA (Gruen-Akzent) ──────────────────────────┐   │
│  │ Menschen im Alter:                                    │   │
│  │ Text spezifisch fuer die Altersbranche...             │   │
│  │ Fragen: ...                                           │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── INSOS (Rot-Akzent) ───────────────────────────────┐   │
│  │ Menschen mit Behinderung:                             │   │
│  │ Text spezifisch fuer die Behindertenbranche...        │   │
│  │ Fragen: ...                                           │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── YOUVITA (Blau-Akzent) ────────────────────────────┐   │
│  │ Kinder und Jugendliche:                               │   │
│  │ Text spezifisch fuer die Kinder-/Jugendbranche...     │   │
│  │ Fragen: ...                                           │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**Branchenspezifische Karten:**
- Linker Rand: 4px Farblinie in Verbandsfarbe
- Nur angezeigt wenn Inhalt vorhanden (I09)
- Hintergrund: Weiss auf Beige-Seite

### 4. Megatrend-Seite

Gemaess Prototyp-Konzept:

```
┌──────────────────────────────────────────────────────────────┐
│  Header                                        [Home] [←]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Breadcrumb: Startseite > Demografischer Wandel              │
│                                                              │
│  Megatrend:                                                  │
│  Demografischer Wandel                         (H1, 54px)   │
│                                                              │
│  Beschreibungstext...                                        │
│                                                              │
│  ──────────────────────────────────────────────              │
│                                                              │
│  Beeinflusste Trends                           (H2, 32px)   │
│  ┌────────────────────────────────────────────┐             │
│  │ ▲ Personalisierte Betreuung   [Handeln]    │             │
│  │ ▲ Fachkraeftemangel           [Vorbereiten] │             │
│  │ ▲ Generationenvertrag         [Beobachten]  │             │
│  └────────────────────────────────────────────┘             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## Komponenten-Bibliothek

### Buttons

| Typ | Hintergrund | Text | Rahmen | Verwendung |
|-----|-------------|------|--------|------------|
| Primary CTA | `#F59702` | Weiss | — | "Trends anzeigen", Haupt-Aktionen |
| Primary CTA Hover | `#F7AC35` | Weiss | — | Hover-Zustand |
| Secondary | `#EAE7E3` | `#003060` | — | Zurueck-Button, Filter-Buttons |
| Secondary Hover | `#E0DBD6` | `#003060` | — | Hover-Zustand |
| Ghost | transparent | `#003060` | 1px `#003060` | Home-Button |

### Tags / Badges

| Typ | Hintergrund | Text | Verwendung |
|-----|-------------|------|------------|
| Zeitbereich (Handeln) | `#003060` | Weiss | Trendlisten |
| Zeitbereich (Vorbereiten) | `#335980` | Weiss | Trendlisten |
| Zeitbereich (Beobachten) | `#ccd6df` | `#003060` | Trendlisten |
| Handlungsfeld | `#e5eaef` | `#003060` | Trend-Detailseite |
| Megatrend | `#ccd6df` | `#003060` | Trend-Detailseite |
| Branche CURAVIVA | `#207003` 15% opacity | `#207003` | Filter, Trendlisten |
| Branche INSOS | `#B8032C` 15% opacity | `#B8032C` | Filter, Trendlisten |
| Branche YOUVITA | `#2D518C` 15% opacity | `#2D518C` | Filter, Trendlisten |

### Branchenfilter-Toggles

```
Aktiv:      [■ CURAVIVA]     Hintergrund: Verbandsfarbe, Text: Weiss
Inaktiv:    [□ CURAVIVA]     Hintergrund: #EAE7E3, Text: #363636
```

### Karten

- Hintergrund: Weiss `#FFFFFF`
- Schatten: `0 1px 3px rgba(0, 48, 96, 0.08)` (Navy-basierter, warmer Schatten)
- Border-Radius: 8px
- Branchenspezifische Karten: 4px linker Farbrand in Verbandsfarbe

### Breadcrumb

- Font: Roboto 300, 14px
- Trennzeichen: `>`
- Aktuelle Seite: `#363636` (nicht klickbar)
- Vorherige Ebenen: `#003060` (klickbar, Link-Farbe)

---

## Inspiration von Deloitte — Was wir uebernehmen

| Element | Deloitte | Unsere Adaption |
|---------|----------|-----------------|
| Farbige Segment-Boegen | Makro-Trends als aeusserer Ring | 4 Handlungsfeld-Boegen als aeusserer Ring |
| Klickbare Boegen | Filter-Funktion (Inline) | **Navigation zur Handlungsfeld-Seite** (Pflichtenheft-konform) |
| Accordion-Trendliste | Unter dem Radar, Inline | **Auf der Handlungsfeld-Seite** hinter "Trends anzeigen"-Button (F22/F23) |
| Warmtoeniges Design | Weiss + gedaempfte Farben | Beige `#F5F3F1` + Navy + warme Abstufungen |
| Leichte Typografie | — | Roboto Slab 300 + Roboto 300 (CI-konform) |

---

## Bewusst ausgeklammert (Phase 1)

Wie im Prototyp-Konzept definiert:

- PDF-Export (F34-F35)
- Suchfunktion
- Mehrsprachigkeit (F17)
- Mobile-Optimierung des Radars (Desktop-first)
- "Trendradar lesen"-Anleitung (F15-F16)
- Praxisbeispiele (I10)
- Zoom in Segment

---

## Pflichtenheft-Konformitaet

Alle expliziten Frontend-Funktionen (F01-F18, F19-F26, F27-F37) sowie die relevanten impliziten Funktionen (I01-I09) sind im Design beruecksichtigt. Ausnahmen sind explizit als "Phase 1 ausgeklammert" markiert und im Prototyp-Konzept dokumentiert.

| Funktion | Status |
|----------|--------|
| F01-F07: Radar + Interaktion | Abgedeckt |
| F08-F11: Branchenfilter | Abgedeckt |
| F12-F13: Neuste Entwicklungen | Abgedeckt |
| F14-F16: Navigationsleiste | Ausgeklammert (Phase 1) |
| F17: Sprachauswahl | Ausgeklammert (Phase 1) |
| F18: Zeitringe farblich | Abgedeckt |
| F19-F26: Handlungsfeld-Seite | Abgedeckt |
| F27-F37: Trend-Detailseite | Abgedeckt (ohne PDF) |
| I01: Farbliche Hervorhebung | Abgedeckt (Dreiecke in Verbandsfarben) |
| I04: Filterzustand erhalten | Abgedeckt |
| I06/I08: Zeitbereich in Listen | Abgedeckt (Zeitbereich-Badges) |
| I09: Branchentexte nur wenn vorhanden | Abgedeckt |
