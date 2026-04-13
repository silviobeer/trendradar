"use client";

interface RadarBlipProps {
  x: number;
  y: number;
  fill: string;
  trendSlug: string;
  trendName: string;
  visible?: boolean;
  isMultiBranch?: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/** Side length of the equilateral triangle */
const SIZE = 14;
const HEIGHT = (SIZE * Math.sqrt(3)) / 2;

/**
 * Renders an equilateral triangle (pointing up) centered at (x, y).
 */
export function RadarBlip({
  x,
  y,
  fill,
  trendSlug,
  trendName,
  visible = true,
  isMultiBranch = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RadarBlipProps) {
  // Vertices of equilateral triangle centered at (0, 0), pointing up
  const top = `${x},${y - (2 / 3) * HEIGHT}`;
  const bottomLeft = `${x - SIZE / 2},${y + (1 / 3) * HEIGHT}`;
  const bottomRight = `${x + SIZE / 2},${y + (1 / 3) * HEIGHT}`;
  const points = `${top} ${bottomLeft} ${bottomRight}`;

  return (
    <polygon
      points={points}
      fill={fill}
      stroke={isMultiBranch ? "#333" : "#fff"}
      strokeWidth={isMultiBranch ? 2 : 1}
      className="cursor-pointer transition-transform transition-opacity duration-300 hover:scale-[1.3]"
      style={{
        transformOrigin: `${x}px ${y}px`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={visible ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      aria-label={trendName}
      data-slug={trendSlug}
      data-visible={String(visible)}
    />
  );
}
