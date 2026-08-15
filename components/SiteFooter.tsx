import Link from "next/link";
import { countriesWithPublishedCities } from "@/data/destinations";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-paper/10 bg-dusk-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[2fr_3fr]">
        <div>
          <p className="font-display text-2xl">
            Trial <span className="italic text-amber">&amp;</span> Error
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
            A travel journal of happy accidents. Every city guide: top 5 eats,
            top 5 local experiences, top 5 places for photos.
          </p>
        </div>
        <nav aria-label="All destinations" className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
          {countriesWithPublishedCities.map((country) => (
            <Link
              key={country.slug}
              href={`/destinations/${country.slug}`}
              className="text-paper/70 transition hover:text-amber"
            >
              {country.flag} {country.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-paper/10 py-5 text-center text-xs text-paper/40">
        <p>© {new Date().getFullYear()} Trial &amp; Error. Get lost responsibly.</p>
        <p className="mt-2">
          Maintained with love by{" "}
          <a
            href="https://kaseyfu.com"
            target="_blank"
            rel="noreferrer"
            className="text-paper/70 underline underline-offset-4 transition hover:text-amber"
          >
            Kasey Fu
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
