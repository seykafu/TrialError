import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CityTabs from "@/components/CityTabs";
import PhotoGallery from "@/components/PhotoGallery";
import CityPhotoMap from "@/components/CityPhotoMap";
import {
  countriesWithPublishedCities,
  getPublishedCity,
  getPublishedCountry,
  mappedSpots,
  type SpotLocation,
  type Top5Item,
} from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ country: string; city: string }>;
};

export function generateStaticParams() {
  return countriesWithPublishedCities.flatMap((country) =>
    country.cities.map((city) => ({ country: country.slug, city: city.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const city = getPublishedCity(countrySlug, citySlug);
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

/*
 * Said out loud, because a pin that looks precise and isn't sends someone to
 * the wrong corner. Only "exact" claims we stood on the spot.
 */
const PRECISION_COPY: Record<SpotLocation["precision"], string> = {
  exact: "Exact vantage point",
  approximate: "Approximate, within a block",
  neighborhood: "Neighborhood pin, not an exact spot",
};

function SpotDirections({
  location,
  spotTitle,
}: {
  location: SpotLocation;
  spotTitle: string;
}) {
  const { lat, lng, precision, facing, facingNote, label } = location;
  return (
    <div className="mt-4 rounded-2xl border border-ink/10 bg-paper-soft/70 p-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${label ?? spotTitle} in Maps`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-paper transition hover:bg-terracotta"
        >
          Open in Maps <span aria-hidden="true">↗</span>
        </a>
        {label && <span className="text-sm text-ink/70">{label}</span>}
        <span className="text-xs uppercase tracking-wider text-ink/50">
          {PRECISION_COPY[precision]}
        </span>
      </div>
      {facingNote && (
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          {facing && (
            <span className="font-semibold text-terracotta">
              Facing {facing}:{" "}
            </span>
          )}
          {facingNote}
        </p>
      )}
    </div>
  );
}

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
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">
              {item.blurb}
            </p>
            {item.photo && (
              <figure className="mt-4">
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  placeholder="blur"
                  sizes="(min-width: 896px) 768px, calc(100vw - 6rem)"
                  className="max-h-[28rem] w-full rounded-2xl object-cover"
                />
                {item.photo.caption && (
                  <figcaption className="mt-2 text-xs italic text-ink/50">
                    {item.photo.caption}
                  </figcaption>
                )}
              </figure>
            )}
            {item.locations?.map((location, j) => (
              <SpotDirections key={j} location={location} spotTitle={item.title} />
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params;
  const country = getPublishedCountry(countrySlug);
  const city = getPublishedCity(countrySlug, citySlug);
  if (!country || !city) notFound();

  /* Empty for cities whose photo spots have no pins yet; the map then renders nothing. */
  const spotPins = mappedSpots(city);

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

          {city.story && (
            <section aria-label={`Field notes from ${city.name}`} className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Field notes
              </p>
              <div className="mt-3 max-w-2xl space-y-4 leading-relaxed text-ink/80">
                {city.story.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {city.cultureTips && city.cultureTips.length > 0 && (
            <section
              aria-label={`How to respect the local culture in ${city.name}`}
              className="mt-10 rounded-3xl border border-ink/10 bg-paper-soft/70 p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Before you go
              </p>
              <h2 className="font-display mt-2 text-2xl font-medium sm:text-3xl">
                How to respect the local culture
              </h2>
              <ul className="mt-4 max-w-2xl space-y-2.5">
                {city.cultureTips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-ink/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

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
              {section.key === "photoSpots" && (
                <CityPhotoMap
                  spots={spotPins}
                  cityName={city.name}
                  totalSpots={city.photoSpots.length}
                />
              )}
              <TopFiveList items={city[section.key]} />
            </section>
          ))}

          {city.gallery && city.gallery.length > 0 && (
            <section
              aria-label={`More photos from ${city.name}`}
              className="mt-16"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Outtakes
              </p>
              <h2 className="font-display mt-2 text-3xl font-medium sm:text-4xl">
                📷 From the camera roll
              </h2>
              <div className="mt-8">
                <PhotoGallery
                  photos={city.gallery.map((photo) => ({
                    ...photo,
                    citySlug: city.slug,
                    cityName: city.name,
                    countrySlug: country.slug,
                    countryName: country.name,
                  }))}
                />
              </div>
            </section>
          )}

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
