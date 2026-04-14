import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '..', 'data');

function loadJSON<T>(filename: string): T {
  const raw = readFileSync(resolve(dataDir, filename), 'utf-8');
  return JSON.parse(raw) as T;
}

interface Branche {
  id: string;
  name: string;
  organisation: string;
  slug: string;
  farbe: string;
}

interface Handlungsfeld {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
  position: number;
}

interface Megatrend {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
}

interface Trend {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
  zeitrahmen: 'handeln' | 'vorbereiten' | 'beobachten';
  handlungsfeldIds: string[];
  megatrendIds: string[];
  branchenIds: string[];
  fragen: string[];
  erstellungsdatum: string;
  branchenTexte: Record<string, unknown>;
}

const branchen = loadJSON<Branche[]>('branchen.json');
const handlungsfelder = loadJSON<Handlungsfeld[]>('handlungsfelder.json');
const megatrends = loadJSON<Megatrend[]>('megatrends.json');
const trends = loadJSON<Trend[]>('trends.json');

const branchenIds = new Set(branchen.map((b) => b.id));
const handlungsfeldIds = new Set(handlungsfelder.map((h) => h.id));
const megatrendIds = new Set(megatrends.map((m) => m.id));

describe('JSON data files are valid and have expected fields', () => {
  it('branchen.json has required fields', () => {
    expect(branchen.length).toBeGreaterThanOrEqual(3);
    for (const b of branchen) {
      expect(b).toHaveProperty('id');
      expect(b).toHaveProperty('name');
      expect(b).toHaveProperty('organisation');
      expect(b).toHaveProperty('slug');
      expect(b).toHaveProperty('farbe');
    }
  });

  it('branchen.json has correct ARTISET CI colors', () => {
    const curaviva = branchen.find((b) => b.id === 'curaviva');
    const insos = branchen.find((b) => b.id === 'insos');
    const youvita = branchen.find((b) => b.id === 'youvita');
    expect(curaviva?.farbe).toBe('#207003');
    expect(insos?.farbe).toBe('#B8032C');
    expect(youvita?.farbe).toBe('#2D518C');
  });

  it('handlungsfelder.json has required fields', () => {
    expect(handlungsfelder.length).toBeGreaterThanOrEqual(4);
    for (const h of handlungsfelder) {
      expect(h).toHaveProperty('id');
      expect(h).toHaveProperty('name');
      expect(h).toHaveProperty('slug');
      expect(h).toHaveProperty('beschreibung');
      expect(h).toHaveProperty('position');
    }
  });

  it('megatrends.json has required fields', () => {
    expect(megatrends.length).toBeGreaterThanOrEqual(6);
    for (const m of megatrends) {
      expect(m).toHaveProperty('id');
      expect(m).toHaveProperty('name');
      expect(m).toHaveProperty('slug');
      expect(m).toHaveProperty('beschreibung');
    }
  });

  it('trends.json has required fields', () => {
    for (const t of trends) {
      expect(t).toHaveProperty('id');
      expect(t).toHaveProperty('name');
      expect(t).toHaveProperty('slug');
      expect(t).toHaveProperty('zeitrahmen');
      expect(t).toHaveProperty('handlungsfeldIds');
      expect(t).toHaveProperty('megatrendIds');
      expect(t).toHaveProperty('branchenIds');
      expect(t).toHaveProperty('fragen');
      expect(t).toHaveProperty('erstellungsdatum');
      expect(t).toHaveProperty('branchenTexte');
    }
  });
});

describe('Referential integrity', () => {
  it('all handlungsfeldIds in trends reference existing handlungsfelder', () => {
    for (const trend of trends) {
      for (const hfId of trend.handlungsfeldIds) {
        expect(handlungsfeldIds.has(hfId), `Trend "${trend.name}" references unknown handlungsfeld "${hfId}"`).toBe(true);
      }
    }
  });

  it('all megatrendIds in trends reference existing megatrends', () => {
    for (const trend of trends) {
      for (const mtId of trend.megatrendIds) {
        expect(megatrendIds.has(mtId), `Trend "${trend.name}" references unknown megatrend "${mtId}"`).toBe(true);
      }
    }
  });

  it('all branchenIds in trends reference existing branchen', () => {
    for (const trend of trends) {
      for (const bId of trend.branchenIds) {
        expect(branchenIds.has(bId), `Trend "${trend.name}" references unknown branche "${bId}"`).toBe(true);
      }
    }
  });
});

describe('Minimum cardinality constraints', () => {
  it('all trends have at least 1 handlungsfeld', () => {
    for (const trend of trends) {
      expect(trend.handlungsfeldIds.length, `Trend "${trend.name}" has no handlungsfelder`).toBeGreaterThanOrEqual(1);
    }
  });

  it('all trends have at least 1 megatrend', () => {
    for (const trend of trends) {
      expect(trend.megatrendIds.length, `Trend "${trend.name}" has no megatrends`).toBeGreaterThanOrEqual(1);
    }
  });

  it('all trends have at least 1 branche', () => {
    for (const trend of trends) {
      expect(trend.branchenIds.length, `Trend "${trend.name}" has no branchen`).toBeGreaterThanOrEqual(1);
    }
  });

  it('all trends have at least 2 fragen', () => {
    for (const trend of trends) {
      expect(trend.fragen.length, `Trend "${trend.name}" has fewer than 2 fragen`).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('Coverage constraints', () => {
  it('all 3 zeitrahmen are covered', () => {
    const zeitrahmenSet = new Set(trends.map((t) => t.zeitrahmen));
    expect(zeitrahmenSet.has('handeln')).toBe(true);
    expect(zeitrahmenSet.has('vorbereiten')).toBe(true);
    expect(zeitrahmenSet.has('beobachten')).toBe(true);
  });

  it('all 4 handlungsfelder have at least 3 trends', () => {
    for (const hf of handlungsfelder) {
      const count = trends.filter((t) => t.handlungsfeldIds.includes(hf.id)).length;
      expect(count, `Handlungsfeld "${hf.name}" has only ${count} trends`).toBeGreaterThanOrEqual(3);
    }
  });

  it('at least 25 trends exist', () => {
    expect(trends.length).toBeGreaterThanOrEqual(25);
  });
});

describe('Date field', () => {
  it('all trends have erstellungsdatum', () => {
    for (const trend of trends) {
      expect(trend.erstellungsdatum, `Trend "${trend.name}" missing erstellungsdatum`).toBeTruthy();
      expect(typeof trend.erstellungsdatum).toBe('string');
    }
  });
});
