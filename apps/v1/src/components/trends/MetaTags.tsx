import Link from "next/link";

interface MetaTagItem {
  label: string;
  href: string;
}

interface MetaTagsProps {
  items: MetaTagItem[];
  colorClass?: string;
}

export function MetaTags({ items, colorClass }: MetaTagsProps) {
  if (items.length === 0) return null;

  const pillClasses = [
    "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors hover:opacity-80",
    colorClass ?? "bg-gray-100 text-gray-800 border-gray-200",
  ].join(" ");

  return (
    <ul className="flex flex-wrap gap-2" role="list">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={pillClasses}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
