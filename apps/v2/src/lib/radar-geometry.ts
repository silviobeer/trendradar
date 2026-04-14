import type { Trend, Handlungsfeld } from "@trendradar/shared";

const CENTER_X = 300;
const CENTER_Y = 300;

/** Ring radius ranges (inner edge, outer edge) */
const RING_RANGES: Record<string, [number, number]> = {
  handeln: [60, 120],
  vorbereiten: [130, 200],
  beobachten: [210, 270],
};

/** Angular padding from segment borders in radians */
const SEGMENT_PADDING_RAD = 0.08;

export interface BlipPosition {
  trendId: string;
  trendSlug: string;
  trendName: string;
  handlungsfeldId: string;
  x: number;
  y: number;
  branchenIds: string[];
}

/**
 * Calculate (x, y) positions for every trend in every handlungsfeld it belongs to.
 * Trends are placed within the appropriate ring (by zeitrahmen) and segment (by handlungsfeld index).
 */
export function calculateBlipPositions(
  trends: Trend[],
  handlungsfelder: Handlungsfeld[],
): BlipPosition[] {
  const numSegments = handlungsfelder.length;
  const segmentAngle = (2 * Math.PI) / numSegments;

  // Build a mapping: key = `${handlungsfeldId}:${zeitrahmen}` -> list of trends
  const buckets = new Map<string, Trend[]>();

  for (const trend of trends) {
    for (const hfId of trend.handlungsfeldIds) {
      const key = `${hfId}:${trend.zeitrahmen}`;
      if (!buckets.has(key)) {
        buckets.set(key, []);
      }
      buckets.get(key)!.push(trend);
    }
  }

  const results: BlipPosition[] = [];

  // Sort handlungsfelder by position
  const sortedHf = [...handlungsfelder].sort((a, b) => a.position - b.position);
  const hfIndexMap = new Map<string, number>();
  sortedHf.forEach((hf, i) => hfIndexMap.set(hf.id, i));

  for (const trend of trends) {
    for (const hfId of trend.handlungsfeldIds) {
      const segmentIndex = hfIndexMap.get(hfId);
      if (segmentIndex === undefined) continue;

      const ringRange = RING_RANGES[trend.zeitrahmen];
      if (!ringRange) continue;

      const key = `${hfId}:${trend.zeitrahmen}`;
      const bucket = buckets.get(key)!;
      const indexInBucket = bucket.indexOf(trend);
      const totalInBucket = bucket.length;

      // Angular range for this segment (with padding)
      const segmentStart = segmentIndex * segmentAngle + SEGMENT_PADDING_RAD;
      const segmentEnd = (segmentIndex + 1) * segmentAngle - SEGMENT_PADDING_RAD;
      const usableAngle = segmentEnd - segmentStart;

      // Distribute blips evenly across the angular range
      const angle =
        totalInBucket === 1
          ? segmentStart + usableAngle / 2
          : segmentStart + (usableAngle * indexInBucket) / (totalInBucket - 1);

      // Radial position: distribute evenly within the ring
      const [rMin, rMax] = ringRange;
      const radius =
        totalInBucket === 1
          ? (rMin + rMax) / 2
          : rMin + ((rMax - rMin) * indexInBucket) / (totalInBucket - 1);

      // Convert polar to cartesian (angle 0 = right, going clockwise)
      // Offset by -PI/2 so angle 0 starts at top
      const adjustedAngle = angle - Math.PI / 2;
      const x = CENTER_X + radius * Math.cos(adjustedAngle);
      const y = CENTER_Y + radius * Math.sin(adjustedAngle);

      results.push({
        trendId: trend.id,
        trendSlug: trend.slug,
        trendName: trend.name,
        handlungsfeldId: hfId,
        x,
        y,
        branchenIds: trend.branchenIds,
      });
    }
  }

  return results;
}

/** Get the center coordinates */
export function getCenter() {
  return { x: CENTER_X, y: CENTER_Y };
}

/** Get ring radius ranges */
export function getRingRanges() {
  return RING_RANGES;
}
