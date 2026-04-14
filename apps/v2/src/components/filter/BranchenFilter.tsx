"use client";

import { branchen, type Branche } from "@trendradar/shared";
import { useBranchenFilter } from "@/contexts/BranchenFilterContext";

export function BranchenFilter() {
  const { isBrancheActive, toggleBranche } = useBranchenFilter();

  return (
    <div className="flex flex-wrap gap-2">
      {branchen.map((branche) => {
        const isActive = isBrancheActive(branche.id);
        return (
          <button
            key={branche.id}
            onClick={() => toggleBranche(branche.id)}
            className={[
              "rounded-full px-4 py-1.5 text-small font-normal transition-colors",
              isActive
                ? "text-white"
                : "bg-bg-warm-medium text-text-medium",
            ].join(" ")}
            style={isActive ? { backgroundColor: branche.farbe } : {}}
            aria-pressed={isActive}
            type="button"
          >
            {branche.organisation}
          </button>
        );
      })}
    </div>
  );
}

interface BranchenTagProps {
  branche: Branche;
}

export function BranchenTag({ branche }: BranchenTagProps) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-tag font-normal"
      style={{
        backgroundColor: `${branche.farbe}26`,
        color: branche.farbe,
      }}
    >
      {branche.name}
    </span>
  );
}
