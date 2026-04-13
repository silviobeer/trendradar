import { describe, it, expect } from "vitest";
import { calculateBlipPositions, getCenter } from "../radar-geometry";
import type { Trend, Handlungsfeld } from "@trendradar/shared";

const CENTER = getCenter();

const handlungsfelder: Handlungsfeld[] = [
  { id: "hf-a", name: "HF A", slug: "hf-a", beschreibung: "", position: 0 },
  { id: "hf-b", name: "HF B", slug: "hf-b", beschreibung: "", position: 1 },
  { id: "hf-c", name: "HF C", slug: "hf-c", beschreibung: "", position: 2 },
  { id: "hf-d", name: "HF D", slug: "hf-d", beschreibung: "", position: 3 },
];

function makeTrend(overrides: Partial<Trend> & { id: string }): Trend {
  return {
    name: overrides.id,
    slug: overrides.id,
    beschreibung: "",
    zeitrahmen: "handeln",
    handlungsfeldIds: ["hf-a"],
    megatrendIds: [],
    branchenIds: [],
    fragen: [],
    erstellungsdatum: "2026-01-01",
    branchenTexte: {},
    ...overrides,
  };
}

function distanceFromCenter(x: number, y: number): number {
  return Math.sqrt((x - CENTER.x) ** 2 + (y - CENTER.y) ** 2);
}

function distanceBetween(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

describe("calculateBlipPositions", () => {
  it("places a trend with zeitrahmen 'handeln' within the inner ring radius range", () => {
    const trend = makeTrend({
      id: "t1",
      zeitrahmen: "handeln",
      handlungsfeldIds: ["hf-a"],
    });

    const positions = calculateBlipPositions([trend], handlungsfelder);
    expect(positions).toHaveLength(1);

    const dist = distanceFromCenter(positions[0].x, positions[0].y);
    expect(dist).toBeGreaterThanOrEqual(60);
    expect(dist).toBeLessThanOrEqual(120);
  });

  it("places a trend with zeitrahmen 'beobachten' within the outer ring radius range", () => {
    const trend = makeTrend({
      id: "t2",
      zeitrahmen: "beobachten",
      handlungsfeldIds: ["hf-b"],
    });

    const positions = calculateBlipPositions([trend], handlungsfelder);
    expect(positions).toHaveLength(1);

    const dist = distanceFromCenter(positions[0].x, positions[0].y);
    expect(dist).toBeGreaterThanOrEqual(210);
    expect(dist).toBeLessThanOrEqual(270);
  });

  it("produces 3 positions for a trend with 3 handlungsfeldIds in different angular ranges", () => {
    const trend = makeTrend({
      id: "t3",
      zeitrahmen: "vorbereiten",
      handlungsfeldIds: ["hf-a", "hf-b", "hf-c"],
    });

    const positions = calculateBlipPositions([trend], handlungsfelder);
    expect(positions).toHaveLength(3);

    // Each position should be in a different segment (different angular range)
    const angles = positions.map((p) =>
      Math.atan2(p.y - CENTER.y, p.x - CENTER.x),
    );

    // All angles should be distinct (at least 45 degrees / 0.78 rad apart for 4 segments)
    for (let i = 0; i < angles.length; i++) {
      for (let j = i + 1; j < angles.length; j++) {
        let diff = Math.abs(angles[i] - angles[j]);
        if (diff > Math.PI) diff = 2 * Math.PI - diff;
        expect(diff).toBeGreaterThan(0.5);
      }
    }

    // All should have the correct handlungsfeldIds
    expect(positions.map((p) => p.handlungsfeldId).sort()).toEqual(
      ["hf-a", "hf-b", "hf-c"].sort(),
    );
  });

  it("ensures multiple trends in same segment/ring don't overlap (min distance > 10px)", () => {
    const trends = Array.from({ length: 5 }, (_, i) =>
      makeTrend({
        id: `overlap-${i}`,
        zeitrahmen: "vorbereiten",
        handlungsfeldIds: ["hf-a"],
      }),
    );

    const positions = calculateBlipPositions(trends, handlungsfelder);
    expect(positions).toHaveLength(5);

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = distanceBetween(positions[i], positions[j]);
        expect(dist).toBeGreaterThan(10);
      }
    }
  });
});
