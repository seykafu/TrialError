"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryPhoto } from "@/data/destinations";

/*
 * Clickable photo grid with a full-screen lightbox. With showFilters it also
 * renders per-city filter pills, for the all-destinations /gallery page.
 */
export default function PhotoGallery({
  photos,
  showFilters = false,
}: {
  photos: GalleryPhoto[];
  showFilters?: boolean;
}) {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const cities = useMemo(() => {
    const seen = new Map<string, GalleryPhoto>();
    for (const photo of photos) {
      const key = `${photo.countrySlug}/${photo.citySlug}`;
      if (!seen.has(key)) seen.set(key, photo);
    }
    return [...seen.values()];
  }, [photos]);

  const visible = useMemo(
    () =>
      activeCity
        ? photos.filter(
            (photo) => `${photo.countrySlug}/${photo.citySlug}` === activeCity
          )
        : photos,
    [photos, activeCity]
  );

  const isOpen = lightboxIndex !== null;
  const current = isOpen ? visible[lightboxIndex] : undefined;

  const close = useCallback(() => setLightboxIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((index) =>
        index === null ? index : (index + delta + visible.length) % visible.length
      );
    },
    [visible.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") step(-1);
      else if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  return (
    <div>
      {showFilters && cities.length > 1 && (
        <nav
          aria-label="Filter photos by city"
          className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 py-1"
        >
          <button
            type="button"
            onClick={() => {
              setActiveCity(null);
              setLightboxIndex(null);
            }}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
              !activeCity
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 bg-paper text-ink/70 hover:border-ink/40 hover:text-ink"
            }`}
          >
            All photos
          </button>
          {cities.map((city) => {
            const key = `${city.countrySlug}/${city.citySlug}`;
            const active = key === activeCity;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveCity(active ? null : key);
                  setLightboxIndex(null);
                }}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-terracotta bg-terracotta text-paper"
                    : "border-ink/15 bg-paper text-ink/70 hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {city.cityName}
              </button>
            );
          })}
        </nav>
      )}

      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-8" : ""}`}>
        {visible.map((photo, i) => (
          <figure key={photo.src.src}>
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`View photo: ${photo.alt}`}
              className="group block w-full overflow-hidden rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <span className="relative block h-72">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  placeholder="blur"
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, calc(100vw - 3rem)"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {showFilters && (
                  <span className="absolute bottom-3 left-3 rounded-full bg-dusk-deep/70 px-3 py-1 text-xs font-medium text-paper backdrop-blur">
                    {photo.cityName}, {photo.countryName}
                  </span>
                )}
              </span>
            </button>
            {photo.caption && (
              <figcaption className="mt-2 text-sm italic text-ink/55">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${current.alt}`}
          onClick={close}
          className="fixed inset-0 z-50 flex flex-col bg-dusk-deep/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-6 py-4 text-paper">
            <p className="text-sm text-paper/70">
              {(lightboxIndex ?? 0) + 1} / {visible.length}
              <span className="mx-2 text-paper/30">·</span>
              {current.cityName}, {current.countryName}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none transition hover:bg-paper/10"
            >
              ×
            </button>
          </div>

          <div
            className="relative mx-4 flex-1 sm:mx-20"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              placeholder="blur"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {visible.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-dusk-deep/60 text-2xl text-paper transition hover:bg-terracotta"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-dusk-deep/60 text-2xl text-paper transition hover:bg-terracotta"
              >
                →
              </button>
            </>
          )}

          <div
            className="px-6 py-5 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mx-auto max-w-2xl text-sm italic text-paper/80">
              {current.caption ?? current.alt}
            </p>
            <Link
              href={`/destinations/${current.countrySlug}/${current.citySlug}`}
              className="mt-2 inline-block text-sm font-medium text-amber transition hover:text-paper"
            >
              Read the {current.cityName} guide →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
