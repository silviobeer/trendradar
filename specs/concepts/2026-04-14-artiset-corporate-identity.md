# ARTISET Corporate Identity — Farben und Design-System

Recherche vom 14. April 2026, basierend auf den Live-Websites artiset.ch, curaviva.ch, insos.ch, youvita.ch.

## Grafische Sprache — Qualitative Einordnung

### Gesamteindruck: Institutionell-warm, nicht kalt-corporate

ARTISET vermeidet bewusst den typischen "Schweizer Verband"-Look (kalt, steif, grau). Stattdessen wirkt alles zugänglich und menschlich, ohne dabei unprofessionell zu werden.

### Farbe: Dunkelblau mit Wärme

Das Navy `#003060` ist kein kaltes, technisches Blau — es hat Tiefe und Schwere, die Vertrauen und Beständigkeit signalisiert. Der entscheidende Trick: Die Sekundärfarben sind keine kühlen Grautöne, sondern warme Beige-Töne (`#F5F3F1`, `#EAE7E3`). Das ergibt einen weichen Kontrast statt eines harten. Das Orange (`#F59702`) als Akzent bricht die Seriosität gezielt auf — sparsam eingesetzt (nur CTAs), dadurch umso einladender.

### Typografie: Bewusst leicht

Durchgehendes Fontweight 300 (Light) ist die auffälligste Designentscheidung. Roboto Slab Light als Überschrift-Font ist ungewöhnlich — Slab-Serifs werden normalerweise bold eingesetzt. Hier wirkt es:

- **Elegant statt autoritär** — der Verband will nicht belehren, sondern begleiten
- **Luftig statt dicht** — viel Weissraum, grosse Zeilenhöhen
- **Lesbar statt dekorativ** — Roboto ist eine der neutralsten Schriften überhaupt

### Bildsprache: Echte Menschen, natürliche Settings

Die Fotos zeigen reale Szenen — Waldspaziergang, Begegnungen, keine gestellten Stock-Fotos. Die Illustrationen (z.B. Newsletter-Bereich) sind flächig, warm koloriert, fast kindlich-freundlich. Passt zum Caring-Kontext.

### Layout: Grosszügig und ruhig

- Sehr viel Weissraum — die Seite atmet
- Grosse Schriftgrössen (Body 20px, H1 54px)
- Wenige Elemente pro Viewport
- Keine visuellen Spielereien, kein Parallax, keine Animationen
- Klarheit über Cleverness

### Verbands-Differenzierung: Subtil aber klar

Die drei Verbände teilen 95% des Designs. Nur die eine Signalfarbe ändert sich (Grün/Rot/Blau). Das kommuniziert: "Wir gehören zusammen, haben aber je einen eigenen Fokus." Die Farben selbst sind gesättigt und kräftig — kein Pastell, kein Gradient.

### In drei Worten

**Würdevoll — Warm — Zurückhaltend**

Passt zur Mission (Art. 7 BV: "Die Würde des Menschen ist zu achten und zu schützen"). Die grafische Sprache spiegelt diesen Leitsatz visuell wider.

---

## Gemeinsames Design-System

Alle vier Websites teilen identische CSS Custom Properties (`:root`-Variablen). Die Unterscheidung zwischen den Verbänden erfolgt über brand-spezifische Akzentfarben.

## Dachmarke ARTISET — Farbpalette

### Primary (Navy-Blau)

| Stufe | HEX | Verwendung |
|-------|-----|------------|
| Primary 120 | `#002854` | Dunkelste Variante |
| **Primary 100** | **`#003060`** | **Hauptfarbe** (Header, Footer, Links, Überschriften) |
| Primary 80 | `#335980` | |
| Primary 60 | `#6683a0` | Linien, Links |
| Primary 40 | `#99acbf` | |
| Primary 20 | `#ccd6df` | Tags |
| Primary 10 | `#e5eaef` | |

### Akzent (Orange)

| Stufe | HEX | Verwendung |
|-------|-----|------------|
| **Accent 100** | **`#F59702`** | **CTA-Buttons, Newsletter-Anmeldung** |
| Accent Rollover | `#F7AC35` | Hover-Zustand |
| Tag exklusiv BG | `#FBD59A` | Spezial-Tags |
| Tag exklusiv Text | `#764300` | |

### Text

| Rolle | Wert | Verwendung |
|-------|------|------------|
| Text dunkel | `#003060` | Überschriften, Links |
| Text mittel | `#363636` | Fliesstext |
| Text hell | `rgba(54, 54, 54, 0.85)` | Sekundärer Text |

### Hintergründe (warme Grautöne)

| Rolle | HEX | Verwendung |
|-------|-----|------------|
| BG hell | `#F5F3F1` | Helle Sektionen |
| BG mittel | `#EAE7E3` | Abgesetzte Bereiche |
| Button hell | `#EAE7E3` | |
| Button mittel | `#E0DBD6` | |
| Button dunkel | `#D6CFC8` | |

### Warme Beige-Töne (Primary Light)

| Stufe | HEX |
|-------|-----|
| Primary Light 120 | `#8C7B68` |
| Primary Light 100 | `#988875` |
| Primary Light 80 | `#ADA091` |
| Primary Light 60 | `#C1B8AC` |
| Primary Light 40 | `#D6CFC8` |
| Primary Light 20 | `#EAE7E3` |
| Primary Light 10 | `#F5F3F1` |

### Fehler

| Rolle | HEX |
|-------|-----|
| Error | `#C30017` |

## Brand-Farben der Verbände

### CURAVIVA — Grün

| Variante | RGB | HEX | Verwendung |
|----------|-----|-----|------------|
| **Hauptfarbe** | `rgb(32, 112, 3)` | **`#207003`** | Hero, Header-Menü, Platzhalter |
| Dunkel/Logo | `rgb(26, 99, 2)` | `#1A6302` | Login-Text, Akzent-Elemente |

Logo: "CURA" in Navy-Blau (`#003060`), "VIVA" mit rotem "V" und grünem Rest.

### INSOS — Rot/Crimson

| Variante | RGB | HEX | Verwendung |
|----------|-----|-----|------------|
| **Hauptfarbe** | `rgb(184, 3, 44)` | **`#B8032C`** | Header-Menü, Footer, Login-Text |
| Hell | `rgb(193, 4, 52)` | `#C10434` | Platzhalter-Bilder |
| Sekundär (Teal) | `rgb(0, 130, 147)` | `#008293` | Submit-Buttons |

Logo: Blockbuchstaben mit weissen Buchstaben auf roten Quadraten.

### YOUVITA — Blau

| Variante | RGB | HEX | Verwendung |
|----------|-----|-----|------------|
| **Hauptfarbe** | `rgb(45, 81, 140)` | **`#2D518C`** | Hero, Header-Menü |
| Hell | `rgb(53, 93, 152)` | `#355D98` | Login-Text |
| Sekundär (Grün) | `rgb(129, 162, 71)` | `#81A247` | Akzent |

Logo: "YOU" in Navy, "V" mit Grün-Akzent, "ITA" in Navy.

## Schriften

ARTISET verwendet die **Google Fonts** Familie **Roboto** in zwei Varianten (self-hosted als TTF):

### Roboto Slab (Serif) — Überschriften und Navigation

| Element | Gewicht | Grösse | Zeilenhöhe |
|---------|---------|--------|------------|
| H1 | 300 (Light) | 54px | 62px |
| H2 | 300 (Light) | 32px | 38px |
| Navigation | 400 (Regular) | 16px | — |
| Hero-Text | 300 (Light) | 30px | 39px |

### Roboto (Sans-Serif) — Fliesstext

| Element | Gewicht | Grösse | Zeilenhöhe |
|---------|---------|--------|------------|
| Body | 300 (Light) | 20px | 32px |

### Variablen-Fonts

Beide Fonts sind als Variable Fonts eingebunden (`weight: 100 900`), erlauben also beliebige Gewichtsstufen. ARTISET nutzt primär die Gewichte **300 (Light)** und **400 (Regular)**.

### Besonderheiten

- Auffallend leichtes Schriftgewicht (300) fuer fast alle Elemente — wirkt elegant und luftig
- Roboto Slab als Serifen-Überschrift kombiniert mit Roboto Sans als Body ist ein klassisches Google-Fonts-Paar
- Self-hosted (keine externen Google-Fonts-Links) — DSGVO-konform

## Vergleich: Aktuelle Trendradar-Farben vs. echte CI

| Verband | Aktuell im Code | Echte CI-Farbe | Korrekt? |
|---------|----------------|----------------|----------|
| CURAVIVA | `#e07b39` (Orange) | `#207003` (Grün) | Falsch |
| INSOS | `#4a6fa5` (Blau) | `#B8032C` (Rot) | Falsch |
| YOUVITA | `#2a9d8f` (Türkis) | `#2D518C` (Blau) | Falsch |

## Empfehlung

Die Verbandsfarben im Trendradar sollten an die echte CI angepasst werden. Dabei ist zu beachten:
- Die drei Verbandsfarben (Grün, Rot, Blau) müssen im Radar-SVG gut unterscheidbar sein
- Auf dem dunklen ARTISET-Navy (`#003060`) müssen sie ausreichend Kontrast bieten
- Die Orange-Akzentfarbe (`#F59702`) könnte für CTA-Elemente übernommen werden
