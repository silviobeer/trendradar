"use client";

interface RadarTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  name: string;
  viewBoxOffset: number;
  viewBoxSize: number;
}

/**
 * HTML tooltip positioned absolutely over the SVG radar.
 * Coordinates are in SVG viewBox units (0-600) and converted to percentages
 * relative to the current viewBox window (accounts for zoom).
 */
export function RadarTooltip({ visible, x, y, name, viewBoxOffset, viewBoxSize }: RadarTooltipProps) {
  if (!visible) return null;

  // Convert SVG coordinates to percentage relative to current viewBox window
  const leftPercent = ((x - viewBoxOffset) / viewBoxSize) * 100;
  const topPercent = ((y - viewBoxOffset) / viewBoxSize) * 100;

  return (
    <div
      className="pointer-events-none absolute rounded bg-primary px-2.5 py-1.5 text-xs font-medium text-white whitespace-nowrap shadow-md"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: "translate(-50%, -130%)",
      }}
    >
      {name}
    </div>
  );
}
