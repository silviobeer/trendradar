"use client";

import Link from "next/link";
import type { Trend } from "@trendradar/shared";
import { ZeitbereichBadge } from "./ZeitbereichBadge";
import { useBranchenFilter } from "@/contexts/BranchenFilterContext";
import { branchen as allBranchen } from "@trendradar/shared";

interface TrendListProps {
  trends: Trend[];
}

export function TrendList({ trends }: TrendListProps) {
  const { isTrendVisible } = useBranchenFilter();
  const visibleTrends = trends.filter((t) => isTrendVisible(t));

  return (
    <div className="divide-y divide-primary-60/20">
      {visibleTrends.map((trend) => {
        const trendBranchen = allBranchen.filter((b) =>
          trend.branchenIds.includes(b.id)
        );
        return (
          <div key={trend.id} className="py-4 flex items-center gap-3">
            <Link
              href={`/trend/${trend.slug}`}
              className="flex-1 text-primary hover:underline font-normal"
            >
              {trend.name}
            </Link>
            <ZeitbereichBadge zeitrahmen={trend.zeitrahmen} />
            <div className="flex gap-1">
              {trendBranchen.map((b) => (
                <span
                  key={b.id}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: b.farbe }}
                  title={b.organisation}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
