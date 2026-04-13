"use client";

interface RadarBlipProps {
  x: number;
  y: number;
  fill: string;
  trendSlug: string;
  trendName: string;
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
      stroke="#fff"
      strokeWidth={1}
      className="cursor-pointer transition-transform duration-150 origin-center hover:scale-[1.3]"
      style={{ transformOrigin: `${x}px ${y}px` }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      aria-label={trendName}
      data-slug={trendSlug}
    />
  );
}
