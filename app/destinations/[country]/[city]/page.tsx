import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CityTabs from "@/components/CityTabs";
import { countries, getCity, getCountry, type Top5Item } from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ country: string; city: string }>;
};

export function generateStaticParams() {
  return countries.flatMap((country) =>
    country.cities.map((city) => ({ country: country.slug, city: city.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const city = getCity(countrySlug, citySlug);
  if (!city) return {};
  return {
    title: `${city.name}, ${city.countryName} — top 5 eats, experiences & photo spots`,
    description: `Our ${city.name} guide: the top 5 things to eat, the top 5 local experiences, and the top 5 places for photos — tested by trial, refined by error.`,
    alternates: {
      canonical: `/destinations/${countrySlug}/${citySlug}`,
    },
  };
}

const SECTIONS = [
  {
    id: "eats",
    icon: "🍜",
    kicker: "Taste",
    title: "Top 5 Eats",
    key: "eats" as const,
  },
  {
    id: "experiences",
    icon: "🎟️",
    kicker: "Do",
    title: "Top 5 Local Experiences",
    key: "experiences" as const,
  },
  {
    id: "photos",
    icon: "📸",
    kicker: "Frame",
    title: "Top 5 Places for Photos",
    key: "photoSpots" as const,
  },
];

function TopFiveList({ items }: { items: Top5Item[] }) {
  return (
    <ol className="mt-8 space-y-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="group flex gap-5 rounded-3xl border border-ink/10 bg-paper p-6 transition hover:border-terracotta/50 hover:shadow-[0_14px_36px_rgba(64,28,8,0.10)]"
        >
          <span
            aria-hidden="true"
            className="font-display text-4xl font-medium leading-none text-terracotta/40 transition group-hover:text-terracotta"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">
              {item.blurb}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params;
  const country = getCountry(countrySlug);
  const city = getCity(countrySlug, citySlug);
  if (!country || !city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${city.name} — top 5 eats, experiences and photo spots`,
    about: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "Country", name: city.countryName },
    },
    url: `${SITE_URL}/destinations/${countrySlug}/${citySlug}`,
    publisher: { "@type": "Organization", name: "Trial & Error" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="bg-paper text-ink">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
            <Link href="/destinations" className="hover:text-terracotta">
              Destinations
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link
              href={`/destinations/${country.slug}`}
              className="hover:text-terracotta"
            >
              {country.name}
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <span className="text-ink">{city.name}</span>
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {country.flag} {country.name}
          </p>
          <h1 className="font-display mt-2 text-5xl font-medium sm:text-6xl">
            {city.name}
          </h1>
          <p className="mt-3 text-lg italic text-ink/60">{city.tagline}</p>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink/70">
            {city.intro}
          </p>

          <div className="sticky top-[65px] z-30 -mx-6 mt-10 border-y border-ink/10 bg-paper/95 px-6 py-3 backdrop-blur">
            <CityTabs country={country} activeCitySlug={city.slug} />
          </div>

          {/* In-page jump nav for the three lists */}
          <nav
            aria-label="Guide sections"
            className="mt-10 flex flex-wrap gap-3"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full bg-paper-soft px-4 py-2 text-sm font-medium text-ink/70 transition hover:bg-terracotta hover:text-paper"
              >
                {s.icon} {s.title}
              </a>
            ))}
          </nav>

          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-label={`${section.title} in ${city.name}`}
              className="mt-16 scroll-mt-32"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                {section.kicker}
              </p>
              <h2 className="font-display mt-2 text-3xl font-medium sm:text-4xl">
                {section.icon} {section.title}
              </h2>
              <TopFiveList items={city[section.key]} />
            </section>
          ))}

          <div className="mt-16 rounded-3xl bg-dusk p-8 text-center text-paper">
            <p className="font-display text-2xl">
              Been to {city.name}? We probably got something wrong.
            </p>
            <p className="mt-2 text-sm text-paper/60">
              That&apos;s the point — these lists improve one error at a time.
            </p>
            <Link
              href={`/destinations/${country.slug}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-6 text-sm font-medium text-ink transition hover:bg-amber"
            >
              ← More cities in {country.name}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
