"use client";

import { useEffect, useRef, useState } from "react";
import {
  LngLatBounds,
  MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Bearing, MappedSpot } from "@/data/destinations";

/* OpenFreeMap: no key, no account, no request limits, and self-hostable. */
const POSITRON_STYLE = "https://tiles.openfreemap.org/styles/positron";

/*
 * Without this MapLibre resolves its worker against its bundled chunk, 404s,
 * and silently renders an empty map. scripts/copy-maplibre-worker.mjs puts the
 * matching build here on every dev run and production build.
 */
setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

const BEARING_DEGREES: Record<Bearing, number> = {
  N: 0,
  NE: 45,
  E: 90,
  SE: 135,
  S: 180,
  SW: 225,
  W: 270,
  NW: 315,
};

/*
 * Warms Positron's cool greys toward the site's paper palette. Applied to the
 * canvas alone so the pins drawn over it keep their own colour.
 */
const PAPER_TINT =
  "sepia(0.32) saturate(0.88) hue-rotate(-8deg) brightness(1.04)";

function createPin(spot: MappedSpot): HTMLDivElement {
  const pin = document.createElement("div");
  pin.style.cssText = "position:relative;width:44px;height:44px;cursor:pointer;";

  const { facing } = spot.location;
  if (facing) {
    /* Rotating an orbit rather than the pin keeps the number upright. */
    const orbit = document.createElement("div");
    orbit.style.cssText = `position:absolute;inset:0;transform:rotate(${BEARING_DEGREES[facing]}deg);`;
    const arrow = document.createElement("span");
    arrow.style.cssText =
      "position:absolute;top:0;left:50%;width:0;height:0;margin-left:-6px;" +
      "border-left:6px solid transparent;border-right:6px solid transparent;" +
      "border-bottom:10px solid #9c3f1e;";
    orbit.append(arrow);
    pin.append(orbit);
  }

  const badge = document.createElement("span");
  badge.textContent = String(spot.index);
  badge.style.cssText =
    "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" +
    "display:flex;align-items:center;justify-content:center;width:28px;height:28px;" +
    "border-radius:9999px;background:#c4552b;color:#f7ead9;" +
    "font:600 14px/1 system-ui,sans-serif;box-shadow:0 2px 10px rgba(34,20,16,0.45);";
  pin.append(badge);

  return pin;
}

/* Built as DOM rather than an HTML string so spot copy is never parsed as markup. */
function createPopupContent(spot: MappedSpot): HTMLDivElement {
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "max-width:15rem;font:400 13px/1.5 system-ui,sans-serif;color:#221410;";

  const heading = document.createElement("strong");
  heading.textContent = `${spot.index}. ${spot.location.label ?? spot.title}`;
  heading.style.cssText = "display:block;margin-bottom:4px;";
  wrap.append(heading);

  const { facing, facingNote, precision } = spot.location;
  if (facingNote) {
    const note = document.createElement("span");
    note.textContent = facing ? `Facing ${facing}: ${facingNote}` : facingNote;
    wrap.append(note);
  }

  if (precision !== "exact") {
    const caveat = document.createElement("em");
    caveat.textContent =
      precision === "approximate"
        ? "Approximate pin, within a block."
        : "Neighbourhood pin, not an exact spot.";
    caveat.style.cssText = "display:block;margin-top:6px;opacity:0.7;";
    wrap.append(caveat);
  }

  return wrap;
}

export default function CityPhotoMapCanvas({
  spots,
  cityName,
}: {
  spots: MappedSpot[];
  cityName: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading"
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || spots.length === 0) return;

    const bounds = new LngLatBounds();
    for (const spot of spots) {
      bounds.extend([spot.location.lng, spot.location.lat]);
    }

    /* Proportional so pins never sit flush against the edge on a small screen. */
    const padding = Math.max(
      24,
      Math.min(
        64,
        Math.floor(Math.min(container.clientWidth, container.clientHeight) / 6)
      )
    );

    const map = new MapLibreMap({
      container,
      style: POSITRON_STYLE,
      bounds,
      fitBoundsOptions: { padding, maxZoom: 15 },
      /*
       * The tile source carries its own OSM/OpenMapTiles credit; this only
       * keeps it expanded instead of collapsed behind the compact toggle.
       */
      attributionControl: { compact: false },
    });

    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    map.on("load", () => {
      map.getCanvas().style.filter = PAPER_TINT;
      setStatus("ready");
    });
    /* A dead tile source should say so, not leave a blank rectangle. */
    map.on("error", (event) => {
      console.error("City photo map failed to load", event.error);
      setStatus("failed");
    });

    const markers = spots.map((spot) =>
      new Marker({ element: createPin(spot) })
        .setLngLat([spot.location.lng, spot.location.lat])
        .setPopup(
          new Popup({ offset: 24, closeButton: false }).setDOMContent(
            createPopupContent(spot)
          )
        )
        .addTo(map)
    );

    return () => {
      for (const marker of markers) marker.remove();
      map.remove();
    };
  }, [spots]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        data-map-status={status}
        role="application"
        aria-label={`Map of the top 5 photo spots in ${cityName}`}
        className="h-[26rem] w-full overflow-hidden rounded-3xl border border-ink/10 sm:h-[32rem]"
      />
      {status === "failed" && (
        <p
          role="status"
          className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper/95 p-4 text-sm text-ink/70 shadow-lg"
        >
          The map couldn&apos;t load. The &ldquo;Open in Maps&rdquo; link on each
          spot below still works.
        </p>
      )}
    </div>
  );
}
