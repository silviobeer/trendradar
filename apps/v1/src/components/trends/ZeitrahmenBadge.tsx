import type { Zeitrahmen } from "@trendradar/shared";

const ZEITRAHMEN_CONFIG: Record<
  Zeitrahmen,
  { label: string; classes: string }
> = {
  handeln: { label: "Handeln", classes: "bg-green-100 text-green-800" },
  vorbereiten: {
    label: "Vorbereiten",
    classes: "bg-yellow-100 text-yellow-800",
  },
  beobachten: { label: "Beobachten", classes: "bg-blue-100 text-blue-800" },
};

interface ZeitrahmenBadgeProps {
  zeitrahmen: Zeitrahmen;
  className?: string;
}

export function ZeitrahmenBadge({ zeitrahmen, className }: ZeitrahmenBadgeProps) {
  const config = ZEITRAHMEN_CONFIG[zeitrahmen];
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}${className ? ` ${className}` : ""}`}
    >
      {config.label}
    </span>
  );
}
