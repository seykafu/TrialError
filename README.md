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

All destination content lives in `data/destinations.ts`. City write-ups are
currently placeholders — replace the generated Top-5 items with real entries as
guides get written.

The homepage scene imagery and card pin icons are remote placeholder assets;
swap them for our own photography in `components/CinematicHero.tsx`.

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
