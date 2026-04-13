export type Zeitrahmen = "handeln" | "vorbereiten" | "beobachten";

export interface Branche {
  id: string;
  name: string;
  organisation: string;
  slug: string;
  farbe: string;
}

export interface Handlungsfeld {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
  position: number;
}

export interface Megatrend {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
}

export interface Trend {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
  zeitrahmen: Zeitrahmen;
  handlungsfeldIds: string[];
  megatrendIds: string[];
  branchenIds: string[];
  fragen: string[];
  erstellungsdatum: string;
  branchenTexte: Record<string, string>;
}
