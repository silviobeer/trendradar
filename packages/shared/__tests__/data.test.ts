import { describe, it, expect } from "vitest";
import {
  getAllTrends,
  getTrendBySlug,
  getTrendsByHandlungsfeld,
  getMegatrendsByTrend,
  getHandlungsfelderByTrend,
  getNeusteTrends,
  trends,
} from "../src/index";

describe("Data access functions", () => {
  it("getTrendsByHandlungsfeld('betrieb') returns correct count", () => {
    const betriebTrends = getTrendsByHandlungsfeld("betrieb");
    const expected = trends.filter((t) =>
      t.handlungsfeldIds.includes("betrieb")
    ).length;
    expect(betriebTrends).toHaveLength(expected);
    expect(betriebTrends.length).toBeGreaterThan(0);
  });

  it("getTrendBySlug('diversitaet') returns Diversität", () => {
    const trend = getTrendBySlug("diversitaet");
    expect(trend).toBeDefined();
    expect(trend!.name).toBe("Diversität");
  });

  it("getTrendBySlug('nonexistent') returns undefined", () => {
    const trend = getTrendBySlug("nonexistent");
    expect(trend).toBeUndefined();
  });

  it("getMegatrendsByTrend returns correct megatrends for a known trend", () => {
    const trend = getTrendBySlug("diversitaet")!;
    const megatrends = getMegatrendsByTrend(trend);
    const ids = megatrends.map((m) => m.id);
    expect(ids).toEqual(expect.arrayContaining(trend.megatrendIds));
    expect(ids).toHaveLength(trend.megatrendIds.length);
  });

  it("getHandlungsfelderByTrend returns correct handlungsfelder", () => {
    const trend = getTrendBySlug("diversitaet")!;
    const hfs = getHandlungsfelderByTrend(trend);
    const ids = hfs.map((h) => h.id);
    expect(ids).toEqual(expect.arrayContaining(trend.handlungsfeldIds));
    expect(ids).toHaveLength(trend.handlungsfeldIds.length);
  });

  it("getNeusteTrends() returns max 10 trends sorted by date descending", () => {
    const neueste = getNeusteTrends();
    expect(neueste.length).toBeLessThanOrEqual(10);
    expect(neueste.length).toBeGreaterThan(0);
    for (let i = 1; i < neueste.length; i++) {
      expect(neueste[i - 1].erstellungsdatum >= neueste[i].erstellungsdatum).toBe(true);
    }
  });

  it("getNeusteTrends(3) returns exactly 3", () => {
    const neueste = getNeusteTrends(3);
    expect(neueste).toHaveLength(3);
  });
});
