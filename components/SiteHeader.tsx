import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight text-ink"
        >
          Trial <span className="italic text-terracotta">&amp;</span> Error
        </Link>
        <nav aria-label="Main menu" className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-ink/70 transition hover:text-ink">
            Home
          </Link>
          <Link href="/gallery" className="text-ink/70 transition hover:text-ink">
            Gallery
          </Link>
          <Link
            href="/destinations"
            className="rounded-full bg-ink px-4 py-2 text-paper transition hover:bg-terracotta"
          >
            Destinations
          </Link>
        </nav>
      </div>
    </header>
  );
}
