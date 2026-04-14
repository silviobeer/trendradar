"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Trend, Handlungsfeld, Branche } from "@trendradar/shared";
import { calculateBlipPositions, type BlipPosition } from "@/lib/radar-geometry";
import { RadarBlip } from "./RadarBlip";
import { RadarTooltip } from "./RadarTooltip";
import { useBranchenFilter } from "@/contexts/BranchenFilterContext";

interface TrendRadarProps {
  trends: Trend[];
  handlungsfelder: Handlungsfeld[];
  branchen: Branche[];
}

const CENTER = 300;
const VIEWBOX_SIZE = 600;

const ZOOM_STEPS = [1, 1.5, 2, 3] as const;
const ZOOM_LABELS = ["1×", "1.5×", "2×", "3×"] as const;

const COLORS = {
  ringStroke: "#ccc",
  dividerStroke: "#bbb",
  ringLabel: "#6b7280",     // gray-500
  segmentLabel: "#374151",  // gray-700
  multiBranchFill: "#666",
  multiBranchStroke: "#333",
} as const;

/** Ring definitions: label, inner radius, outer radius, fill color */
const RINGS = [
  { label: "BEOBACHTEN", rInner: 210, rOuter: 270, fill: "#edf1f5" },
  { label: "VORBEREITEN", rInner: 130, rOuter: 200, fill: "#dfe6ed" },
  { label: "HANDELN", rInner: 60, rOuter: 120, fill: "#c8d6e5" },
] as const;

export function TrendRadar({ trends, handlungsfelder, branchen }: TrendRadarProps) {
  const router = useRouter();
  const { isTrendVisible } = useBranchenFilter();
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    name: string;
  }>({ visible: false, x: 0, y: 0, name: "" });

  const [zoomIndex, setZoomIndex] = useState(0);
  const scale = ZOOM_STEPS[zoomIndex];
  const viewBoxSizeScaled = VIEWBOX_SIZE / scale;
  const viewBoxOffset = (VIEWBOX_SIZE - viewBoxSizeScaled) / 2;

  const sortedHf = useMemo(
    () => [...handlungsfelder].sort((a, b) => a.position - b.position),
    [handlungsfelder],
  );

  const numSegments = sortedHf.length;
  const segmentAngle = 360 / numSegments;

  const blipPositions = useMemo(
    () => calculateBlipPositions(trends, handlungsfelder),
    [trends, handlungsfelder],
  );

  const brancheMap = useMemo(() => {
    const map = new Map<string, Branche>();
    for (const b of branchen) map.set(b.id, b);
    return map;
  }, [branchen]);

  function getBlipColor(blip: BlipPosition): string {
    if (blip.branchenIds.length === 1) {
      const b = brancheMap.get(blip.branchenIds[0]);
      return b?.farbe ?? COLORS.multiBranchFill;
    }
    return COLORS.multiBranchFill;
  }

  function handleBlipClick(slug: string) {
    router.push(`/trend/${slug}`);
  }

  function handleSegmentClick(slug: string) {
    router.push(`/handlungsfeld/${slug}`);
  }

  return (
    <div
      className="w-full h-full min-h-0 flex items-center justify-center"
      style={{ containerType: "size" }}
    >
      <div
        className="relative"
        style={{ width: "min(100cqw, 100cqh)", height: "min(100cqw, 100cqh)" }}
      >
      <svg
        viewBox={`${viewBoxOffset} ${viewBoxOffset} ${viewBoxSizeScaled} ${viewBoxSizeScaled}`}
        className="w-full h-full"
        role="img"
        aria-label="Trendradar"
      >
        {/* Rings (draw outer first so inner paints on top) */}
        {RINGS.map((ring) => (
          <circle
            key={ring.label}
            cx={CENTER}
            cy={CENTER}
            r={ring.rOuter}
            fill={ring.fill}
            stroke={COLORS.ringStroke}
            strokeWidth={0.5}
          />
        ))}

        {/* Inner circle fill for handeln */}
        <circle cx={CENTER} cy={CENTER} r={60} fill="#fff" />

        {/* Segment divider lines */}
        {sortedHf.map((_, i) => {
          const angleDeg = i * segmentAngle - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x2 = CENTER + 270 * Math.cos(angleRad);
          const y2 = CENTER + 270 * Math.sin(angleRad);
          return (
            <line
              key={`divider-${i}`}
              x1={CENTER}
              y1={CENTER}
              x2={x2}
              y2={y2}
              stroke={COLORS.dividerStroke}
              strokeWidth={1}
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Ring labels (placed along the right side at 0 degrees / 3 o'clock position) */}
        {RINGS.map((ring) => {
          const labelRadius = (ring.rInner + ring.rOuter) / 2;
          return (
            <text
              key={`label-${ring.label}`}
              x={CENTER}
              y={CENTER - labelRadius}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
              fontWeight={600}
              fill={COLORS.ringLabel}
              letterSpacing="0.1em"
            >
              {ring.label}
            </text>
          );
        })}

        {/* Segment labels outside the circle */}
        {sortedHf.map((hf, i) => {
          const midAngleDeg = (i + 0.5) * segmentAngle - 90;
          const midAngleRad = (midAngleDeg * Math.PI) / 180;
          const labelRadius = 290;
          const x = CENTER + labelRadius * Math.cos(midAngleRad);
          const y = CENTER + labelRadius * Math.sin(midAngleRad);
          return (
            <text
              key={`seg-label-${hf.id}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fontWeight={600}
              fill={COLORS.segmentLabel}
              className="cursor-pointer hover:fill-blue-600"
              onClick={() => handleSegmentClick(hf.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSegmentClick(hf.slug); }
              }}
            >
              {hf.name}
            </text>
          );
        })}

        {/* Blips */}
        {blipPositions.map((blip) => {
          const visible = isTrendVisible({ branchenIds: blip.branchenIds });
          const isMulti = blip.branchenIds.length > 1;
          return (
            <RadarBlip
              key={`${blip.trendId}-${blip.handlungsfeldId}`}
              x={blip.x}
              y={blip.y}
              fill={getBlipColor(blip)}
              stroke={isMulti ? COLORS.multiBranchStroke : "#fff"}
              strokeWidth={isMulti ? 2 : 1}
              trendSlug={blip.trendSlug}
              trendName={blip.trendName}
              visible={visible}
              onClick={() => handleBlipClick(blip.trendSlug)}
              onMouseEnter={() =>
                setTooltip({ visible: true, x: blip.x, y: blip.y, name: blip.trendName })
              }
              onMouseLeave={() =>
                setTooltip((prev) => ({ ...prev, visible: false }))
              }
            />
          );
        })}
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1">
        <button
          aria-label="Herauszoomen"
          onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
          disabled={zoomIndex === 0}
          className="bg-white border border-gray-200 rounded-md px-2 py-1 text-sm shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          −
        </button>
        <span className="bg-white border border-gray-200 rounded-md px-2 py-1 text-xs font-medium shadow-sm min-w-[2.5rem] text-center">
          {ZOOM_LABELS[zoomIndex]}
        </span>
        <button
          aria-label="Hineinzoomen"
          onClick={() => setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, i + 1))}
          disabled={zoomIndex === ZOOM_STEPS.length - 1}
          className="bg-white border border-gray-200 rounded-md px-2 py-1 text-sm shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          +
        </button>
        {zoomIndex > 0 && (
          <button
            aria-label="Zoom zurücksetzen"
            onClick={() => setZoomIndex(0)}
            className="bg-white border border-gray-200 rounded-md px-2 py-1 text-xs shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            ↺
          </button>
        )}
      </div>

      {/* Tooltip (HTML overlay) */}
      <RadarTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        name={tooltip.name}
        viewBoxOffset={viewBoxOffset}
        viewBoxSize={viewBoxSizeScaled}
      />
      </div>
    </div>
  );
}
