export type Top5Item = {
  title: string;
  blurb: string;
};

export type City = {
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  tagline: string;
  intro: string;
  eats: Top5Item[];
  experiences: Top5Item[];
  photoSpots: Top5Item[];
};

export type Country = {
  slug: string;
  name: string;
  flag: string;
  region: string;
  blurb: string;
  cities: City[];
};

/* Placeholder generators — swap these out with real write-ups city by city. */
function placeholderEats(city: string): Top5Item[] {
  return [1, 2, 3, 4, 5].map((n) => ({
    title: `${city} eat #${n} — name coming soon`,
    blurb: `A dish we ordered wrong at least once before getting it gloriously right. Full story and where to find it coming soon.`,
  }));
}

function placeholderExperiences(city: string): Top5Item[] {
  return [1, 2, 3, 4, 5].map((n) => ({
    title: `${city} experience #${n} — name coming soon`,
    blurb: `A local moment that didn't make the guidebooks — stumbled into by accident, kept on purpose. Details coming soon.`,
  }));
}

function placeholderPhotoSpots(city: string): Top5Item[] {
  return [1, 2, 3, 4, 5].map((n) => ({
    title: `${city} photo spot #${n} — name coming soon`,
    blurb: `The exact corner, hour, and angle we'd go back for. Coordinates and golden-hour notes coming soon.`,
  }));
}

function city(
  countrySlug: string,
  countryName: string,
  slug: string,
  name: string,
  tagline: string
): City {
  return {
    slug,
    name,
    countrySlug,
    countryName,
    tagline,
    intro: `Our ${name} notes are still in the darkroom. The five eats, five experiences, and five photo spots below are placeholders — each one gets replaced as we finish writing up the trip.`,
    eats: placeholderEats(name),
    experiences: placeholderExperiences(name),
    photoSpots: placeholderPhotoSpots(name),
  };
}

export const countries: Country[] = [
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    blurb: "Chai spills, wrong trains, and the best food mistakes of our lives.",
    cities: [
      city("india", "India", "delhi", "Delhi", "Old lanes, new appetites."),
      city("india", "India", "agra", "Agra", "More than one monument."),
      city("india", "India", "chandigarh", "Chandigarh", "A city drawn with a ruler."),
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Western Europe",
    blurb: "We biked the wrong way down exactly one canal. Once.",
    cities: [
      city("netherlands", "Netherlands", "amsterdam", "Amsterdam", "Canals, bikes, and brown cafés."),
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Western Europe",
    blurb: "Rain-proof itineraries, tested the hard way.",
    cities: [
      city("united-kingdom", "United Kingdom", "london", "London", "A hundred villages in a trench coat."),
      city("united-kingdom", "United Kingdom", "manchester", "Manchester", "Music, brick, and drizzle."),
      city("united-kingdom", "United Kingdom", "nottingham", "Nottingham", "Caves, castles, and folklore."),
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    blurb: "Everything is farther away than it looks. Everything.",
    cities: [
      city("australia", "Australia", "sydney", "Sydney", "Harbour light, ferry rides."),
      city("australia", "Australia", "melbourne", "Melbourne", "Laneways and long coffees."),
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    region: "East Asia",
    blurb: "We missed the last train so you don't have to.",
    cities: [
      city("japan", "Japan", "tokyo", "Tokyo", "Neon, noodles, and quiet shrines."),
      city("japan", "Japan", "kyoto", "Kyoto", "Old wood, older rituals."),
      city("japan", "Japan", "osaka", "Osaka", "The nation's kitchen."),
    ],
  },
  {
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    region: "East Asia",
    blurb: "Four cities, four hundred dumplings, zero regrets.",
    cities: [
      city("china", "China", "shanghai", "Shanghai", "Deco towers and dawn markets."),
      city("china", "China", "beijing", "Beijing", "Imperial scale, hutong detail."),
      city("china", "China", "chengdu", "Chengdu", "Pandas, peppercorns, patience."),
      city("china", "China", "chongqing", "Chongqing", "A city stacked on a mountain."),
    ],
  },
  {
    slug: "mexico",
    name: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    blurb: "Salt rim, sunset, repeat until corrected.",
    cities: [
      city("mexico", "Mexico", "puerto-vallarta", "Puerto Vallarta", "Cobblestones to the sea."),
      city("mexico", "Mexico", "cabo", "Cabo", "Desert meets two oceans."),
    ],
  },
  {
    slug: "dominican-republic",
    name: "Dominican Republic",
    flag: "🇩🇴",
    region: "Caribbean",
    blurb: "The oldest city in the Americas, and the newest mistakes.",
    cities: [
      city("dominican-republic", "Dominican Republic", "santo-domingo", "Santo Domingo", "First city of the New World."),
    ],
  },
  {
    slug: "usa",
    name: "USA",
    flag: "🇺🇸",
    region: "North America",
    blurb: "Five cities, five completely different countries.",
    cities: [
      city("usa", "USA", "los-angeles", "Los Angeles", "Golden hour lasts all day."),
      city("usa", "USA", "new-york-city", "New York City", "The city that never explains itself."),
      city("usa", "USA", "miami", "Miami", "Pastel deco, Cuban coffee."),
      city("usa", "USA", "seattle", "Seattle", "Mountains behind the espresso."),
      city("usa", "USA", "san-francisco", "San Francisco", "Fog with a view."),
    ],
  },
];

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getCity(countrySlug: string, citySlug: string): City | undefined {
  return getCountry(countrySlug)?.cities.find((c) => c.slug === citySlug);
}

export const allCities: City[] = countries.flatMap((c) => c.cities);

/* Cities showcased in the homepage cinematic slider. */
export const featuredCitySlugs: [string, string][] = [
  ["japan", "tokyo"],
  ["united-kingdom", "london"],
  ["india", "delhi"],
  ["australia", "sydney"],
  ["usa", "new-york-city"],
];

export const featuredCities: City[] = featuredCitySlugs
  .map(([countrySlug, citySlug]) => getCity(countrySlug, citySlug))
  .filter((c): c is City => Boolean(c));
