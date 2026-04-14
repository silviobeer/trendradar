import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-small font-light flex items-center gap-1">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} className="text-primary hover:underline">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-text-medium">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <span aria-hidden="true">{'>'}</span>}
        </span>
      ))}
    </nav>
  );
}
