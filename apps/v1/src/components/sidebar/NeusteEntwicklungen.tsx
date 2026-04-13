import Link from "next/link";
import type { Trend } from "@trendradar/shared";

interface NeusteEntwicklungenProps {
  trends: Trend[];
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function NeusteEntwicklungen({ trends }: NeusteEntwicklungenProps) {
  return (
    <aside aria-label="Neueste Entwicklungen">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Neueste Entwicklungen
      </h2>
      <ul className="flex flex-col gap-1">
        {trends.map((trend) => (
          <li key={trend.id}>
            <Link
              href={`/trend/${trend.slug}`}
              className="flex flex-col rounded px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-800">{trend.name}</span>
              <span className="text-xs text-gray-500">{formatDate(trend.erstellungsdatum)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
