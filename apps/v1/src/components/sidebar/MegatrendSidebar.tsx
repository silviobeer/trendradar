import Link from "next/link";
import type { Megatrend } from "@trendradar/shared";

interface MegatrendSidebarProps {
  megatrends: Megatrend[];
}

export function MegatrendSidebar({ megatrends }: MegatrendSidebarProps) {
  return (
    <aside aria-label="Megatrends">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Megatrends
      </h2>
      <ul className="flex flex-col gap-1">
        {megatrends.map((megatrend) => (
          <li key={megatrend.id}>
            <Link
              href={`/megatrend/${megatrend.slug}`}
              className="block rounded px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {megatrend.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
