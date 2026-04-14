import Link from "next/link";
import type { Megatrend } from "@trendradar/shared";

interface MegatrendSidebarProps {
  megatrends: Megatrend[];
}

export function MegatrendSidebar({ megatrends }: MegatrendSidebarProps) {
  return (
    <aside aria-label="Megatrends">
      <h2 className="mb-3 text-small font-normal uppercase tracking-wide text-primary-60">
        Megatrends
      </h2>
      <ul className="flex flex-col gap-1">
        {megatrends.map((megatrend) => (
          <li key={megatrend.id}>
            <Link
              href={`/megatrend/${megatrend.slug}`}
              className="block rounded px-3 py-2 text-small font-medium text-primary hover:bg-primary-10 transition-colors"
            >
              {megatrend.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
