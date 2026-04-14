# PROJ-11: Typografie

## Status: Planned

## Kontext

Der Trendradar verwendet aktuell Tailwinds Standard-Fonts (System-Fonts). Die ARTISET CI schreibt Roboto Slab (Serif, Ueberschriften) und Roboto (Sans-Serif, Fliesstext) vor — beide in auffallend leichtem Gewicht (300/Light). Die Fonts muessen self-hosted eingebunden werden (DSGVO-konform, keine Google-Fonts-Links).

## Abhaengigkeiten

- Benoetigt: PROJ-10 (Design-Tokens fuer Text-Farben)

## User Stories

### US-1: Als Verbandsmitglied moechte ich die vertraute ARTISET-Schrift sehen, damit der Trendradar als Teil der Verbandswelt erkennbar ist

**Given** der User oeffnet eine beliebige Seite des Trendradars
**When** er Ueberschriften und Fliesstexte liest
**Then** sind Ueberschriften in Roboto Slab Light und Fliesstexte in Roboto Light dargestellt

**Acceptance Criteria:**
- [ ] AC-1: Roboto Slab (Variable Font, weight 100-900) ist self-hosted eingebunden
- [ ] AC-2: Roboto (Variable Font, weight 100-900) ist self-hosted eingebunden
- [ ] AC-3: Keine externen Requests zu fonts.googleapis.com oder fonts.gstatic.com

### US-2: Als Verbandsmitglied moechte ich eine luftige, elegante Typografie erleben, die nicht autoritaer wirkt

**Given** der User liest Inhalte auf einer Seite
**When** er Ueberschriften, Body-Text und Meta-Informationen betrachtet
**Then** sind alle Texte in den CI-konformen Groessen und Gewichten dargestellt

**Acceptance Criteria:**
- [ ] AC-4: H1 (Seitentitel): Roboto Slab, 300 (Light), 54px, Zeilenhoehe 62px
- [ ] AC-5: H2 (Sektionen): Roboto Slab, 300 (Light), 32px, Zeilenhoehe 38px
- [ ] AC-6: H3 (Karten-Titel): Roboto Slab, 300 (Light), 24px, Zeilenhoehe 30px
- [ ] AC-7: Navigation: Roboto Slab, 400 (Regular), 16px
- [ ] AC-8: Body: Roboto, 300 (Light), 20px, Zeilenhoehe 32px
- [ ] AC-9: Small/Meta: Roboto, 300 (Light), 14px, Zeilenhoehe 20px
- [ ] AC-10: Tags/Badges: Roboto, 400 (Regular), 12px

### US-3: Als Entwickler moechte ich die Typografie-Skala zentral definiert haben, damit sie konsistent angewendet wird

**Given** ein Entwickler erstellt eine neue Komponente mit Text
**When** er Tailwind-Utility-Klassen verwendet
**Then** kann er auf vordefinierte Typografie-Klassen oder Tokens zugreifen

**Acceptance Criteria:**
- [ ] AC-11: Font-Familien sind als Tailwind-Theme-Variablen definiert (z.B. font-heading, font-body)
- [ ] AC-12: Font-Groessen und Zeilenhoehen sind als benannte Tailwind-Klassen verfuegbar
- [ ] AC-13: Bestehende Komponenten verwenden die neuen Typografie-Tokens statt generischer Tailwind-Klassen

## Edge Cases

- Font-Loading-Performance: Variable Fonts sind groesser als statische Subsets — `font-display: swap` und Preload nutzen, um Flash of Unstyled Text (FOUT) zu minimieren
- Fallback-Fonts: System-Fonts als Fallback definieren (Roboto Slab → serif, Roboto → sans-serif) fuer den Fall, dass Fonts nicht laden
- Radar-SVG: Text innerhalb des SVG (Handlungsfeld-Labels, Tooltip) muss ebenfalls die CI-Fonts verwenden
- Responsive Schriftgroessen: In Phase 1 sind die Groessen fix (Desktop-first), responsive Anpassungen spaeter

## Technische Anforderungen

- Fonts als WOFF2 (Variable Font) in apps/v1/public/fonts/ ablegen
- Next.js `next/font/local` fuer optimiertes Font-Loading verwenden
- DSGVO-konform: Self-hosted, keine externen Font-Requests
