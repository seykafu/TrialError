# Trial & Error — a travel journal of happy accidents

A travel blog built on getting it wrong first. Every city guide distills our
mistakes into three honest lists: **Top 5 Eats**, **Top 5 Local Experiences**,
and **Top 5 Places for Photos**.

## Stack

- [Next.js](https://nextjs.org) (App Router, fully static generation for SEO)
- Tailwind CSS v4
- TypeScript

## Structure

- `/` — cinematic scroll homepage (layered parallax scenes, scroll-scrubbed
  choreography, featured-city slider) plus a crawlable country/city index
- `/destinations` — country picker ("passport stamp" grid)
- `/destinations/[country]` — country overview with city subtabs
- `/destinations/[country]/[city]` — the three Top-5 lists per city

All destination content lives in `data/destinations.ts`. Amsterdam, San
Francisco, Delhi, and Agra have real write-ups; the remaining cities use
generated placeholders — replace them as guides get written. Trip photos live
in `public/photos/<city-slug>/` (kebab-case filenames) and are statically
imported in `data/destinations.ts`, which gives each `next/image` automatic
dimensions and blur-up placeholders.

The homepage scene imagery and card pin icons are remote placeholder assets;
swap them for our own photography in `components/CinematicHero.tsx`.

## Photo spot maps

Photo spots can carry `locations: SpotLocation[]` — a hand-checked vantage
point rather than a geocoder centroid, since where you *stand* and what a place
*is* are often different points. Each pin states its own `precision` (`exact` /
`approximate` / `neighborhood`), which the page prints verbatim so an
approximate pin never reads as an exact one, and an optional 8-point `facing`
bearing, omitted rather than guessed where a spot has no single direction.

Every located spot gets a keyless `Open in Maps` deep link. Cities with at
least one pin also get one map above the list, numbered to match it —
OpenFreeMap tiles via MapLibre GL JS, no API key or account, lazy-mounted on
click so nothing loads until a reader asks. Cities without pins render neither.

Two things worth knowing before touching this:

- `scripts/copy-maplibre-worker.mjs` runs on every `dev`/`build`. MapLibre
  resolves its worker relative to its own bundle, a path Turbopack never emits,
  so without the copied worker the map silently renders zero tiles.
- OSM/OpenFreeMap attribution is a licence requirement. It is rendered as plain
  DOM under the map as well as in MapLibre's own control, so it survives even
  if the map fails to initialise. Don't hide it behind a toggle, and don't
  fetch OSM tiles at build time — their tile policy prohibits it.

All 18 published cities are pinned, 88 spots in total. Two are deliberately
unpinned because OpenStreetMap has no record of them and a guessed coordinate
is worse than none: Beijing's Forbidden City corner turret, and Shanghai's
longtang lanes. Pin numbers key to list position, so those cities number
1, 3, 4, 5 rather than renumbering, and the map heading says how many of the
five it is showing.

Coordinates come from Nominatim and are hand-checked against the spot each one
belongs to. Bearings are derived from what the write-up actually says, not
inferred from the place: where a spot is shot in two opposing directions (a
ferry deck, a rooftop with a view off each side), `facing` is left off and the
prose carries both. Beijing, Chengdu and Los Angeles have one spot well outside
the centre each, so those maps open at metro scale, as San Francisco's does.

## SEO

- Per-page metadata + canonical URLs (`generateMetadata`)
- JSON-LD structured data (WebSite, ItemList, Article)
- `sitemap.xml` and `robots.txt` generated from the destination data
- Set the production domain in `lib/site.ts`

## Development

```bash
npm run dev    # local dev server
npm run build  # production build (static)
```
