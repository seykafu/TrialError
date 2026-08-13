import Link from "next/link";
import type { Country } from "@/data/destinations";

export default function CityTabs({
  country,
  activeCitySlug,
}: {
  country: Country;
  activeCitySlug?: string;
}) {
  return (
    <nav
      aria-label={`Cities in ${country.name}`}
      className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 py-1"
    >
      <Link
        href={`/destinations/${country.slug}`}
        className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
          !activeCitySlug
            ? "border-ink bg-ink text-paper"
            : "border-ink/15 bg-paper text-ink/70 hover:border-ink/40 hover:text-ink"
        }`}
      >
        Overview
      </Link>
      {country.cities.map((city) => {
        const active = city.slug === activeCitySlug;
        return (
          <Link
            key={city.slug}
            href={`/destinations/${country.slug}/${city.slug}`}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-terracotta bg-terracotta text-paper"
                : "border-ink/15 bg-paper text-ink/70 hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {city.name}
          </Link>
        );
      })}
    </nav>
  );
}
