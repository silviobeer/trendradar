import type { Branche, Handlungsfeld, Megatrend, Trend } from "./types";

import branchenJson from "../data/branchen.json" with { type: "json" };
import handlungsfelderJson from "../data/handlungsfelder.json" with { type: "json" };
import megatrendsJson from "../data/megatrends.json" with { type: "json" };
import trendsJson from "../data/trends.json" with { type: "json" };

export const branchen: Branche[] = branchenJson as Branche[];
export const handlungsfelder: Handlungsfeld[] = handlungsfelderJson as Handlungsfeld[];
export const megatrends: Megatrend[] = megatrendsJson as Megatrend[];
export const trends: Trend[] = trendsJson as Trend[];

export function getAllTrends(): Trend[] {
  return trends;
}

export function getTrendBySlug(slug: string): Trend | undefined {
  return trends.find((t) => t.slug === slug);
}

export function getHandlungsfeldBySlug(slug: string): Handlungsfeld | undefined {
  return handlungsfelder.find((h) => h.slug === slug);
}

export function getMegatrendBySlug(slug: string): Megatrend | undefined {
  return megatrends.find((m) => m.slug === slug);
}

export function getBrancheById(id: string): Branche | undefined {
  return branchen.find((b) => b.id === id);
}

export function getTrendsByHandlungsfeld(handlungsfeldId: string): Trend[] {
  return trends.filter((t) => t.handlungsfeldIds.includes(handlungsfeldId));
}

export function getTrendsByMegatrend(megatrendId: string): Trend[] {
  return trends.filter((t) => t.megatrendIds.includes(megatrendId));
}

export function getTrendsByBranche(branchenId: string): Trend[] {
  return trends.filter((t) => t.branchenIds.includes(branchenId));
}

export function getHandlungsfelderByTrend(trend: Trend): Handlungsfeld[] {
  return handlungsfelder.filter((h) => trend.handlungsfeldIds.includes(h.id));
}

export function getMegatrendsByTrend(trend: Trend): Megatrend[] {
  return megatrends.filter((m) => trend.megatrendIds.includes(m.id));
}

export function getBranchenByTrend(trend: Trend): Branche[] {
  return branchen.filter((b) => trend.branchenIds.includes(b.id));
}

export function getNeusteTrends(limit: number = 10): Trend[] {
  return [...trends]
    .sort((a, b) => b.erstellungsdatum.localeCompare(a.erstellungsdatum))
    .slice(0, limit);
}
