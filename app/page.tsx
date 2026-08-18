import type { Metadata } from "next";
import Link from "next/link";
import CinematicHero from "@/components/CinematicHero";
import SiteFooter from "@/components/SiteFooter";
import {
  countriesWithPublishedCities,
  countryPills,
  featuredCityCards,
  publishedCities,
} from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Trial & Error",
    url: SITE_URL,
    description:
      "A travel journal of our top 5 eats and local experiences for every city.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CinematicHero
        featuredCities={featuredCityCards}
        countryPills={countryPills}
        cityCount={publishedCities.length}
        countryCount={countriesWithPublishedCities.length}
      />

      {/* Crawlable country/city index below the cinematic scroll */}
      <section id="browse" className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            The map so far
          </p>
          <h2 className="font-display mt-3 text-4xl font-medium sm:text-5xl">
            {publishedCities.length} cities, {countriesWithPublishedCities.length} countries,
            <br className="hidden sm:block" /> countless wrong turns.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countriesWithPublishedCities.map((country) => (
              <article
                key={country.slug}
                className="group rounded-3xl border border-ink/10 bg-paper-soft p-6 shadow-[0_14px_40px_rgba(64,28,8,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(64,28,8,0.14)]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-medium">
                    <Link
                      href={`/destinations/${country.slug}`}
                      className="transition group-hover:text-terracotta"
                    >
                      {country.flag} {country.name}
                    </Link>
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-ink/50">
                    {country.region}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {country.blurb}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {country.cities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/destinations/${country.slug}/${c.slug}`}
                        className="inline-block rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-medium transition hover:border-terracotta hover:bg-terracotta hover:text-paper"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-dusk text-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
            Why “Trial &amp; Error”
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl">
            The itinerary is a rough draft.
          </h2>
          <p className="mt-5 leading-relaxed text-paper/70">
            Most travel blogs show you the highlight reel. We keep the outtakes,
            because that&apos;s where the good stuff hides: the noodle shop we
            found while lost, the viewpoint we reached by taking the wrong bus,
            the festival we crashed by accident. Each city guide distills those
            mistakes into three honest lists: the top five things to eat, to do,
            and to photograph.
          </p>
          <Link
            href="/destinations"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-7 font-medium text-ink shadow-lg transition hover:bg-amber"
          >
            <span aria-hidden="true">↗</span> Start exploring
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
