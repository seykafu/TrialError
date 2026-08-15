import type { MetadataRoute } from "next";
import { countriesWithPublishedCities } from "@/data/destinations";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/destinations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...countriesWithPublishedCities.map((country) => ({
      url: `${SITE_URL}/destinations/${country.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...countriesWithPublishedCities.flatMap((country) =>
      country.cities.map((city) => ({
        url: `${SITE_URL}/destinations/${country.slug}/${city.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
  ];
}
