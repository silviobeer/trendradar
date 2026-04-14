# PROJ-12: UI-Komponenten-Styling

## Status: Planned

## Kontext

Die bestehenden UI-Komponenten (Buttons, Tags, Karten, Breadcrumb, Branchenfilter) verwenden generische Tailwind-Klassen ohne CI-Bezug. Dieses Feature stylt alle Komponenten gemaess dem ARTISET-Design-Konzept um, basierend auf den Design-Tokens (PROJ-10) und der Typografie (PROJ-11).

## Abhaengigkeiten

- Benoetigt: PROJ-10 (Design-Tokens), PROJ-11 (Typografie)

## User Stories

### US-1: Als Verbandsmitglied moechte ich klare, einladende Aktions-Buttons sehen, die mich zur Interaktion einladen

**Given** der User sieht einen CTA-Button (z.B. "Trends anzeigen")
**When** er den Button betrachtet und mit der Maus darueberfaehrt
**Then** ist der Button in ARTISET-Orange gestaltet mit deutlichem Hover-Effekt

**Acceptance Criteria:**
- [ ] AC-1: Primary CTA: Hintergrund #F59702 (Orange), Text Weiss
- [ ] AC-2: Primary CTA Hover: Hintergrund #F7AC35 (heller Orange)
- [ ] AC-3: Secondary Button: Hintergrund #EAE7E3 (Warm-Beige), Text #003060 (Navy)
- [ ] AC-4: Secondary Hover: Hintergrund #E0DBD6
- [ ] AC-5: Ghost Button: Transparent, Text #003060, Rahmen 1px #003060

### US-2: Als Verbandsmitglied moechte ich auf einen Blick sehen, welchem Zeitbereich ein Trend zugeordnet ist

**Given** der User sieht eine Trendliste (auf Handlungsfeld- oder Megatrend-Seite)
**When** er die Zeitbereich-Badges neben den Trends betrachtet
**Then** sind Handeln, Vorbereiten und Beobachten durch abgestufte Navy-Toene unterscheidbar

**Acceptance Criteria:**
- [ ] AC-6: Badge "Handeln": Hintergrund #003060 (Navy), Text Weiss
- [ ] AC-7: Badge "Vorbereiten": Hintergrund #335980 (Primary 80), Text Weiss
- [ ] AC-8: Badge "Beobachten": Hintergrund #ccd6df (Primary 20), Text #003060 (Navy)

### US-3: Als Verbandsmitglied moechte ich Handlungsfeld- und Megatrend-Tags auf der Trend-Detailseite sehen

**Given** der User ist auf einer Trend-Detailseite
**When** er die zugeordneten Handlungsfelder und Megatrends sieht
**Then** sind diese als klickbare Tags in CI-Farben dargestellt

**Acceptance Criteria:**
- [ ] AC-9: Handlungsfeld-Tags: Hintergrund #e5eaef (Primary 10), Text #003060 (Navy)
- [ ] AC-10: Megatrend-Tags: Hintergrund #ccd6df (Primary 20), Text #003060 (Navy)
- [ ] AC-11: Tags sind klickbar und fuehren zur jeweiligen Seite

### US-4: Als Verbandsmitglied moechte ich den Branchenfilter in den echten Verbandsfarben sehen

**Given** der User sieht die Branchenfilter-Toggles
**When** ein Filter aktiv ist
**Then** ist der Toggle in der Verbandsfarbe gefaerbt; deaktivierte Filter sind neutral

**Acceptance Criteria:**
- [ ] AC-12: Aktiver Toggle: Hintergrund in Verbandsfarbe, Text Weiss
- [ ] AC-13: Inaktiver Toggle: Hintergrund #EAE7E3, Text #363636
- [ ] AC-14: Branchen-Tags in Listen: Verbandsfarbe mit 15% Opacity als Hintergrund, Verbandsfarbe als Text

### US-5: Als Verbandsmitglied moechte ich Inhalte in sauberen Karten praesentiert sehen

**Given** der User sieht Karten-Elemente (z.B. branchenspezifische Inhalte auf Trend-Seite)
**When** er die Karten betrachtet
**Then** haben sie ein einheitliches, warmes Styling

**Acceptance Criteria:**
- [ ] AC-15: Karten-Hintergrund: Weiss #FFFFFF
- [ ] AC-16: Schatten: 0 1px 3px rgba(0, 48, 96, 0.08) (Navy-basiert, warm)
- [ ] AC-17: Border-Radius: 8px
- [ ] AC-18: Branchenspezifische Karten: 4px linker Farbrand in Verbandsfarbe

### US-6: Als Verbandsmitglied moechte ich jederzeit wissen, wo ich mich im Trendradar befinde

**Given** der User ist auf einer Unterseite (Handlungsfeld, Trend, Megatrend)
**When** er die Breadcrumb-Navigation sieht
**Then** ist sie in CI-konformer Typografie und Farbgebung gestaltet

**Acceptance Criteria:**
- [ ] AC-19: Font: Roboto 300, 14px
- [ ] AC-20: Trennzeichen: >
- [ ] AC-21: Vorherige Ebenen: #003060 (Navy, klickbar)
- [ ] AC-22: Aktuelle Seite: #363636 (nicht klickbar)

## Edge Cases

- Branchenfilter mit 0 aktiven Branchen: Alle Dreiecke ausgeblendet, Filter-UI muss trotzdem benutzbar bleiben
- Tags mit langem Text: Text-Overflow mit Ellipsis, Tooltip bei Hover
- Karten ohne branchenspezifischen Inhalt: Karte wird nicht angezeigt (I09)
- Touch-Geraete: Hover-Effekte sind nice-to-have, nicht kritisch (Desktop-first Phase 1)
- Buttons im Radar-SVG (Zoom-Controls): Muessen ebenfalls CI-konform gestylt werden

## Technische Anforderungen

- Alle Komponenten verwenden Design-Tokens aus PROJ-10 (keine hardcodierten Farben)
- Alle Text-Elemente verwenden Typografie-Tokens aus PROJ-11
- Bestehende Tailwind-Utility-Klassen durch Token-basierte Klassen ersetzen
