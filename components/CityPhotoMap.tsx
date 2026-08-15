"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { MappedSpot } from "@/data/destinations";

/*
 * MapLibre needs a real browser, and per the Next 16 lazy-loading guide
 * `ssr: false` is only legal inside a Client Component — hence this wrapper.
 * The facade means the map's weight is only paid by readers who ask for it.
 */
const CityPhotoMapCanvas = dynamic(() => import("./CityPhotoMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[26rem] w-full items-center justify-center rounded-3xl border border-ink/10 bg-paper-soft/60 text-sm text-ink/60 sm:h-[32rem]">
      Loading the map…
    </div>
  ),
});

export default function CityPhotoMap({
  spots,
  cityName,
  totalSpots,
}: {
  spots: MappedSpot[];
  cityName: string;
  /* Total photo spots in the list, so a partly-pinned city says so. */
  totalSpots: number;
}) {
  const [shown, setShown] = useState(false);

  if (spots.length === 0) return null;

  const heading =
    spots.length === totalSpots
      ? `All ${totalSpots} spots on one map`
      : `${spots.length} of these ${totalSpots} spots on one map`;

  return (
    <div className="mt-8">
      {shown ? (
        <>
          <CityPhotoMapCanvas spots={spots} cityName={cityName} />
          {/*
            * Licence requirement, so it is plain DOM under the map rather than
            * only MapLibre's in-canvas control — it stays visible even if the
            * map itself fails to initialise.
            */}
          <p className="mt-3 text-xs text-ink/50">
            Map data ©{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta"
            >
              OpenStreetMap
            </a>{" "}
            contributors · Tiles by{" "}
            <a
              href="https://openfreemap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta"
            >
              OpenFreeMap
            </a>{" "}
            ·{" "}
            <a
              href="https://www.openmaptiles.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta"
            >
              OpenMapTiles
            </a>
          </p>
        </>
      ) : (
        <div className="rounded-3xl border border-ink/10 bg-paper-soft/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-display text-xl font-medium">{heading}</p>
            <button
              type="button"
              onClick={() => setShown(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition hover:bg-terracotta"
            >
              Show the map <span aria-hidden="true">↗</span>
            </button>
          </div>
          <ol className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {spots.map((spot) => (
              <li
                key={`${spot.index}-${spot.location.lat}-${spot.location.lng}`}
                className="flex gap-3 text-sm text-ink/70"
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta text-xs font-semibold text-paper"
                >
                  {spot.index}
                </span>
                <span>
                  {spot.location.label ?? spot.title}
                  {spot.location.facing && (
                    <span className="text-ink/45"> · facing {spot.location.facing}</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs text-ink/50">
            Loads an interactive map from OpenFreeMap. Map data ©{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-terracotta"
            >
              OpenStreetMap
            </a>{" "}
            contributors.
          </p>
        </div>
      )}
    </div>
  );
}
