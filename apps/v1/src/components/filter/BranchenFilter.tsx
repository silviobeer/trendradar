"use client";

import type { Branche } from "@trendradar/shared";
import { useBranchenFilter } from "@/contexts/BranchenFilterContext";

interface BranchenFilterProps {
  branchen: Branche[];
}

export function BranchenFilter({ branchen }: BranchenFilterProps) {
  const { isBrancheActive, toggleBranche } = useBranchenFilter();

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Branchenfilter">
      {branchen.map((branche) => {
        const isActive = isBrancheActive(branche.id);
        return (
          <button
            key={branche.id}
            type="button"
            aria-pressed={isActive}
            data-active={String(isActive)}
            onClick={() => toggleBranche(branche.id)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              isActive
                ? {
                    backgroundColor: branche.farbe,
                    borderColor: branche.farbe,
                    color: "#fff",
                  }
                : {
                    backgroundColor: "transparent",
                    borderColor: branche.farbe,
                    color: "#6b7280",
                  }
            }
          >
            {branche.organisation}
          </button>
        );
      })}
    </div>
  );
}
