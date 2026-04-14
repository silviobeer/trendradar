import Link from "next/link";

export function Header() {
  return (
    <header className="bg-primary px-6 py-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-white font-serif font-normal text-nav">
          ARTISET Trendradar
        </Link>
        <nav>
          <Link href="/" className="text-white/80 hover:text-white text-small">
            Startseite
          </Link>
        </nav>
      </div>
    </header>
  );
}
