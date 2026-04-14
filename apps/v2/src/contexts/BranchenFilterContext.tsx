"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { branchen } from "@trendradar/shared";

const ALL_BRANCHEN = new Set(branchen.map((b) => b.id));

interface BranchenFilterContextValue {
  activeBranchen: Set<string>;
  toggleBranche: (id: string) => void;
  isBrancheActive: (id: string) => boolean;
  isTrendVisible: (trend: { branchenIds: string[] }) => boolean;
}

const BranchenFilterContext = createContext<BranchenFilterContextValue | null>(null);

export function BranchenFilterProvider({ children }: { children: ReactNode }) {
  const [activeBranchen, setActiveBranchen] = useState<Set<string>>(
    () => new Set(ALL_BRANCHEN),
  );

  const toggleBranche = useCallback((id: string) => {
    setActiveBranchen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isBrancheActive = useCallback(
    (id: string) => activeBranchen.has(id),
    [activeBranchen],
  );

  const isTrendVisible = useCallback(
    (trend: { branchenIds: string[] }) =>
      trend.branchenIds.some((id) => activeBranchen.has(id)),
    [activeBranchen],
  );

  return (
    <BranchenFilterContext.Provider
      value={{ activeBranchen, toggleBranche, isBrancheActive, isTrendVisible }}
    >
      {children}
    </BranchenFilterContext.Provider>
  );
}

export function useBranchenFilter(): BranchenFilterContextValue {
  const context = useContext(BranchenFilterContext);
  if (!context) {
    throw new Error("useBranchenFilter must be used within a BranchenFilterProvider");
  }
  return context;
}
