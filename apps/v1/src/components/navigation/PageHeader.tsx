import Link from "next/link";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
  breadcrumbItems: BreadcrumbItem[];
  backHref?: string;
}

export function PageHeader({ breadcrumbItems, backHref }: PageHeaderProps) {
  if (breadcrumbItems.length === 0) return null;

  return (
    <header className="flex flex-col gap-3 py-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          aria-label="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            ← Zurück
          </Link>
        )}
      </div>
    </header>
  );
}
