import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CityTabs from "@/components/CityTabs";
import {
  countriesWithPublishedCities,
  getPublishedCountry,
} from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ country: string }>;
};

export function generateStaticParams() {
  return countriesWithPublishedCities.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getPublishedCountry(slug);
  if (!country) return {};
  return {
    title: `${country.name} travel guides`,
    description: `${country.name} city guides from Trial & Error: ${country.cities
      .map((c) => c.name)
      .join(", ")}: top 5 eats, local experiences, and photo spots for each.`,
    alternates: { canonical: `/destinations/${country.slug}` },
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getPublishedCountry(slug);
  if (!country) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${country.name} city guides`,
    itemListElement: country.cities.map((city, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: city.name,
      url: `${SITE_URL}/destinations/${country.slug}/${city.slug}`,
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
          <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
            <Link href="/destinations" className="hover:text-terracotta">
              Destinations
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <span className="text-ink">{country.name}</span>
          </nav>

          <h1 className="font-display mt-4 text-4xl font-medium sm:text-6xl">
            {country.flag} {country.name}
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
            {country.blurb}
          </p>

          <div className="sticky top-[65px] z-30 -mx-6 mt-10 border-y border-ink/10 bg-paper/95 px-6 py-3 backdrop-blur">
            <CityTabs country={country} />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {country.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/destinations/${country.slug}/${city.slug}`}
                className="group rounded-3xl border border-ink/10 bg-paper-soft p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(64,28,8,0.14)]"
              >
                <h2 className="font-display text-3xl font-medium transition group-hover:text-terracotta">
                  {city.name}
                </h2>
                <p className="mt-2 text-sm italic text-ink/60">{city.tagline}</p>
                <ul className="mt-5 space-y-1 text-sm text-ink/70">
                  <li>🍜 Top 5 eats</li>
                  <li>🎟️ Top 5 local experiences</li>
                  <li>📸 Top 5 places for photos</li>
                </ul>
                <p className="mt-5 text-sm font-semibold text-terracotta">
                  Open the {city.name} guide →
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
