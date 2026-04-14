"use client";

import { useState } from "react";
import Link from "next/link";
import type { Trend } from "@trendradar/shared";
import { useBranchenFilter } from "@/contexts/BranchenFilterContext";
import { ZeitrahmenBadge } from "@/components/trends/ZeitrahmenBadge";

interface TrendListProps {
  handlungsfeldName: string;
  trends: Trend[];
}

export function TrendList({ handlungsfeldName, trends }: TrendListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isTrendVisible } = useBranchenFilter();

  const visibleTrends = trends.filter(isTrendVisible);
  const listId = `trendlist-${handlungsfeldName.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={listId}
      >
        <span>
          {isOpen
            ? `Trends zu ${handlungsfeldName} verbergen`
            : `Trends zu ${handlungsfeldName} anzeigen`}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul id={listId} className="mt-2 flex flex-col gap-1" role="list">
          {visibleTrends.map((trend) => (
            <li
              key={trend.id}
              className="flex items-center justify-between rounded px-3 py-2 hover:bg-gray-50"
            >
              <Link
                href={`/trend/${trend.slug}`}
                className="text-sm font-medium text-gray-900 hover:text-gray-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              >
                {trend.name}
              </Link>
              <span className="ml-3 shrink-0">
                <ZeitrahmenBadge zeitrahmen={trend.zeitrahmen} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
