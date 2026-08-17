import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PhotoGallery from "@/components/PhotoGallery";
import { allGalleryPhotos, publishedCities } from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `${allGalleryPhotos.length} photos from ${publishedCities.length} cities: every frame from our trips in one browsable wall, filterable by destination.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Trial & Error photo gallery",
    url: `${SITE_URL}/gallery`,
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
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Gallery
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium sm:text-6xl">
            Every frame,
            <br />
            every wrong turn.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-ink/70">
            All {allGalleryPhotos.length} photos from our city guides in one
            wall. Filter by city, tap any shot to view it full-screen, and use
            the arrow keys to wander.
          </p>

          <div className="mt-14">
            <PhotoGallery photos={allGalleryPhotos} showFilters />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
