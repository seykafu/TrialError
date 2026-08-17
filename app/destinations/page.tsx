import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  countriesWithPublishedCities,
  publishedCities,
} from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Destinations",
  description: `Browse ${publishedCities.length} city guides across ${countriesWithPublishedCities.length} countries, each with our top 5 eats, top 5 local experiences, and top 5 photo spots.`,
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Trial & Error destinations",
    itemListElement: countriesWithPublishedCities.map((country, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: country.name,
      url: `${SITE_URL}/destinations/${country.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Destinations
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium sm:text-6xl">
            Pick a country,
            <br />
            steal our mistakes.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-ink/70">
            Every stamp below opens a country page; every country breaks down
            into city guides with our top 5 eats, top 5 local experiences, and
            top 5 places for photos.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countriesWithPublishedCities.map((country) => (
              <Link
                key={country.slug}
                href={`/destinations/${country.slug}`}
                className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-ink/20 bg-paper-soft p-7 transition hover:-rotate-1 hover:border-terracotta hover:shadow-[0_20px_50px_rgba(64,28,8,0.14)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-3 -top-3 rotate-12 text-6xl opacity-15 transition group-hover:opacity-30"
                >
                  {country.flag}
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-ink/50">
                  {country.region} · {country.cities.length}{" "}
                  {country.cities.length === 1 ? "city" : "cities"}
                </p>
                <h2 className="font-display mt-2 text-3xl font-medium transition group-hover:text-terracotta">
                  {country.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  {country.blurb}
                </p>
                <p className="mt-5 text-sm font-semibold text-terracotta">
                  {country.cities.map((c) => c.name).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
