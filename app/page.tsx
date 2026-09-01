import type { Metadata } from "next";
import Link from "next/link";
import CinematicHero from "@/components/CinematicHero";
import SmoothScroll from "@/components/SmoothScroll";
import SiteFooter from "@/components/SiteFooter";
import {
  countriesWithPublishedCities,
  countryIndex,
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

      <SmoothScroll />
      <CinematicHero
        countryIndex={countryIndex}
        cityCount={publishedCities.length}
        countryCount={countriesWithPublishedCities.length}
      />

      {/* Crawlable country/city index below the cinematic scroll */}

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
