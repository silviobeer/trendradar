"use client";

interface RadarTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  name: string;
}

/**
 * HTML tooltip positioned absolutely over the SVG radar.
 * Coordinates are in SVG viewBox units (0-600) and converted to percentages.
 */
export function RadarTooltip({ visible, x, y, name }: RadarTooltipProps) {
  if (!visible) return null;

  // Convert SVG coordinates (0-600) to percentage positions
  const leftPercent = (x / 600) * 100;
  const topPercent = (y / 600) * 100;

  return (
    <div
      className="pointer-events-none absolute rounded bg-gray-800 px-2.5 py-1.5 text-xs font-medium text-white whitespace-nowrap shadow-md"
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
