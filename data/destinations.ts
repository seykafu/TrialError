import type { StaticImageData } from "next/image";

/* Amsterdam */
import amsFrites from "@/public/photos/amsterdam/frites.jpg";
import amsVanGogh from "@/public/photos/amsterdam/van-gogh-museum.jpg";
import amsBiking from "@/public/photos/amsterdam/biking.jpg";
import amsCanalBridge from "@/public/photos/amsterdam/canal-bridge.jpg";
import amsCanalBoats from "@/public/photos/amsterdam/canal-boats.jpg";
import amsRijksmuseum from "@/public/photos/amsterdam/rijksmuseum.jpg";
/* Delhi */
import delHumayun from "@/public/photos/delhi/humayuns-tomb.jpg";
import delLodiGardens from "@/public/photos/delhi/lodi-gardens.jpg";
import delIndiaGate from "@/public/photos/delhi/india-gate.jpg";
/* Agra */
import agraTaj from "@/public/photos/agra/taj-mahal.jpg";
import agraTajMe from "@/public/photos/agra/taj-mahal-me.jpg";
import agraTajMonkeys from "@/public/photos/agra/taj-monkeys.jpg";
import agraTrainStation from "@/public/photos/agra/agra-train-station.jpg";
import agraTrainRide from "@/public/photos/agra/train-ride.jpg";
/* San Francisco */
import sfGoldenGate from "@/public/photos/san-francisco/golden-gate-bridge.jpg";
import sfTwinPeaks from "@/public/photos/san-francisco/twin-peaks.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

/* 8-point compass rose: coarse enough to be honest, precise enough to draw. */
export type Bearing = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type SpotLocation = {
  lat: number;
  lng: number;
  /*
   * How much to trust the pin:
   * "exact"        we stood here; the pin is the vantage point.
   * "approximate"  right spot, within a block or so.
   * "neighborhood" the general area; go wander and find the angle.
   */
  precision: "exact" | "approximate" | "neighborhood";
  /* Which way to look once you're standing there. Drawn as an arrow on the map. */
  facing?: Bearing;
  /* The same instruction in prose. Omitted where a spot has no single facing. */
  facingNote?: string;
  /* Distinguishes pins when one spot eventually carries two, e.g. "The steps". */
  label?: string;
};

export type Top5Item = {
  title: string;
  blurb: string;
  photo?: Photo;
  /*
   * Array from the start: nothing uses a second slot yet, but a spot that
   * needs splitting later becomes a data edit instead of a schema migration.
   */
  locations?: SpotLocation[];
};

export type City = {
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  contentStatus: "draft" | "published";
  tagline: string;
  intro: string;
  /* First-person field notes from the trip write-up. */
  story?: string[];
  /*
   * "How to respect the local culture": at most five short notes, shown near
   * the top of the city page. Researched per city, never generic filler.
   */
  cultureTips?: string[];
  /*
   * A single "Where to stay" pick with an accommodation-provider URL. Plain
   * link on purpose: the Stay22 script rewrites compatible provider links
   * into affiliate links at runtime. Currently piloted on one city.
   */
  stay?: {
    title: string;
    blurb: string;
    url: string;
    /* Optional Stay22 embed map URL (https://www.stay22.com/embed/...),
       shown inside the stay card as a browsable map of nearby options. */
    mapEmbedUrl?: string;
  };
  /* An embedded YouTube video from the trip, shown near the top of the page. */
  video?: {
    /* The 11-character YouTube video ID, not a full URL. */
    youtubeId: string;
    title: string;
    caption?: string;
  };
  eats: Top5Item[];
  experiences: Top5Item[];
  photoSpots: Top5Item[];
  /* Photos that deserve a spot on the page but aren't tied to a list entry. */
  gallery?: Photo[];
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
    contentStatus: "draft",
    tagline,
    intro: `Our ${name} notes are still in the darkroom. The five eats, five experiences, and five photo spots below are placeholders — each one gets replaced as we finish writing up the trip.`,
    eats: placeholderEats(name),
    experiences: placeholderExperiences(name),
    photoSpots: placeholderPhotoSpots(name),
  };
}

const amsterdam: City = {
  slug: "amsterdam",
  name: "Amsterdam",
  countrySlug: "netherlands",
  countryName: "Netherlands",
  contentStatus: "published",
  tagline: "Canals, bikes, and brown cafés.",
  intro:
    "Amsterdam made its first impression fast: jet lag, a double espresso, and a contact high we didn't order.",
  story: [
    "When I first landed, it was 9 am. I was coming off flying in from Canada and was jetlagged beyond belief. So what's my first solution to that? Go get some coffee, of course. I was too excited to catch up on sleep debt.",
    "I googled for nearby cafes, and found many with over 4.5 star ratings on Google and thousands of reviews. I don't even need a travel guide to know these are some nice spots, I thought.",
    "Well, I had my first culture shock when, upon stepping into every single cafe I pinpointed, every single one of them smelled of weed. Dutch weed isn't light, either. That shit was strong, brother. And when paired with a double shot espresso, I felt my head floating on a cloud blazing through an F1 race. With more bikes than people, more canals than Venice, and seemingly more weed cafes than regular cafes, Amsterdam is one unique place on Earth.",
  ],
  stay: {
    title: "Mr. Jordaan, the Jordaan",
    blurb:
      "A 1644 canal house on the Bloemgracht that started as a local's informal guest room and grew into a small hotel spanning the houses next door, which is a very Jordaan way to become a hotel. Café Chris is around the corner for the brown-café homework, and the Anne Frank House, my favourite part of the whole trip, is a five-minute walk.",
    url: "https://www.expedia.com/Amsterdam-Hotels-Mr-Jordaan.h14869509.Hotel-Information",
  },
  cultureTips: [
    "That red asphalt is a road for bikes, so never stand, pose or wheel a suitcase in it, and if a bell rings behind you step out rather than freeze.",
    "A coffeeshop sells weed and a cafe sells coffee and beer, and lighting a joint on a cafe terrace gets you politely shown the door.",
    "Smoking weed on the street is banned in the old centre and Red Light District, so finish it in the coffeeshop you bought it from.",
    "Never photograph the women in the Red Light District windows, wide shots included; these are people at work, and the door staff enforce it hard.",
    "Those big uncurtained canal-house windows are Dutch openness, not an invitation, so don't peer in or step onto a houseboat deck for a photo.",
  ],
  eats: [
    {
      title: "Mannekenpis (Dutch frites)",
      blurb:
        "The sign says Voted No. 1 Holland fries, and the line out the door agrees. A warm paper cone of thick-cut frites, a mountain of mayo, a dusting of spice.",
      photo: {
        src: amsFrites,
        alt: "A paper cone of thick-cut frites topped with mayo and spice powder, held up in front of the Mannekenpis frites shop in Amsterdam",
        caption: "The cone that justified the line at Mannekenpis.",
      },
    },
    {
      title: "Black Gold - Korte Koningsstraat",
      blurb:
        "An actual coffee-first café, caffeine only, no contact high included. It's half specialty bar and half record shop, sitting on a mellow street in Lastage a few minutes from Nieuwmarkt, opened by a guy who walked away from a fifteen-year office career because coffee and vinyl are, in his words, both analog. White Label roasts the house coffee, there are usually four or more V60 options on the go, and the guest grinder turns over monthly, so ask what's on it instead of ordering blind. The racks run funk, afrobeat, and 90s hip hop. This is not a laptop farm, so go planning to stay a while.",
    },
    {
      title: "Warung Spang Makandra, De Pijp",
      blurb:
        "The most Amsterdam meal in the city is Surinamese, which is Dutch colonial history hiding inside a cheap dinner. This family-run Javanese-Surinamese room on Gerard Doustraat has been at it since 1978, and the order is the roti: it arrives deconstructed, chicken on the bone with stewed potatoes, green beans, and a boiled egg, plus a stack of soft flatbread you tear and wrap yourself. Add bakabana, fried plantain with peanut sauce. The room is small and it fills up, so reserve.",
    },
    {
      title: "Frens Haringhandel, Koningsplein",
      blurb:
        "Raw herring from a wooden cart is the one Dutch food ritual with no restaurant version, and Frens has been running the same square by the flower market for thirty-odd years. Get a broodje haring, a soft roll with raw onion and pickle, if you want a handle on it, or the fillet plain if you're committing. They slice to order, which is the whole quality tell. Ask for Hollandse Nieuwe in June for the new-season fish, and know that the sign advertising it stays up all year, so the sign proves nothing.",
    },
    {
      title: "Bitterballen and a beer in a brown café",
      blurb:
        "Third kind of café, third completely different room: no weed, no espresso worth mentioning, just centuries of tobacco-stained wood, which is where the name comes from. Café Chris on Bloemstraat has been pouring since the 1600s and is one of the oldest in the city; 't Smalle on Egelantiersgracht has the canal terrace. Order bitterballen with a small beer or a jenever, then bite a hole in the first one and wait, because they come out at roughly the temperature of the sun. Mustard is not optional.",
    },
  ],
  experiences: [
    {
      title: "Vincent van Gogh Art Museum",
      blurb:
        "The immersive room puts you inside the paintings, brushstrokes floor to ceiling. We stayed way longer than planned. The museum claims the largest collection of his work in the world, and it's not a claim anyone bothers arguing with. Tickets are online only with a timed entry slot, and slots can sell out, so book well before you land.",
      photo: {
        src: amsVanGogh,
        alt: "Standing on a balcony inside the Van Gogh Museum with Wheatfield with Crows projected across the surrounding walls",
        caption: "Inside the paintings at the Van Gogh Museum.",
      },
    },
    {
      title: "Rent a bike and ride around the whole city",
      blurb:
        "More bikes than people isn't a stat, it's a lifestyle. The whole city opens up once you're on two wheels. Rental shops cluster around Centraal Station and Vondelpark, and the Vondelpark loop is the right first ride: flat, largely traffic-free, zero stakes. Graduate to the canal ring once riding in Dutch traffic stops feeling like an exam, because that's the iconic one.",
      photo: {
        src: amsBiking,
        alt: "Cyclists passing a corner coffeeshop on a brick street lined with dark canal houses in Amsterdam",
        caption: "Two wheels, brick streets, and a coffeeshop on every corner.",
      },
    },
    {
      title: "Anne Frank House",
      blurb: "Probably my favorite part of the whole trip. Go quietly, take your time. This is the actual house on the Prinsengracht, Secret Annex and all, not a reconstruction. Tickets are online only, never sold at the door, released in weekly batches for dates six weeks out, so plan around the release day instead of hoping to walk up.",
    },
    {
      title: "Red Light District",
      blurb: "Just to see it… and that's all we'll say about that.",
    },
    {
      title: "Ride in the canal on a tour",
      blurb:
        "More canals than Venice, and the best way to count them is from the water. The 17th-century ring, Singel through Prinsengracht, is UNESCO-listed swampland drained into concentric arcs, which is a lot of hydraulic engineering to admire from a cushion. Book a small open boat with a live skipper over the big glass-top ones: they sit lower, slip under the low historic bridges the covered boats have to skip, and the stories come from a person instead of a recording.",
      photo: {
        src: amsCanalBridge,
        alt: "A bike-lined bridge crossing an Amsterdam canal with crooked canal houses on both sides",
        caption: "Bridge, bikes, canal: the Amsterdam starter pack.",
      },
    },
  ],
  photoSpots: [
    {
      title: "Papiermolensluis, where Brouwersgracht meets Prinsengracht",
      blurb:
        "Reportedly the most photographed canal view in the city, and the hour is the whole trick. Between seven and eight in the morning the water goes mirror flat before the boat traffic starts, and the canal doubles every gable back at you. Stand on the lock and shoot west down Brouwersgracht, with the warehouse facades and houseboats stacked in one frame. Golden hour looks nice too, but by then the reflections are gone, and market days around Noordermarkt push crowds down the water.",
      locations: [
        {
          lat: 52.3804,
          lng: 4.8886,
          precision: "approximate",
          facing: "W",
          facingNote:
            "west down Brouwersgracht, with the warehouse gables and the houseboats stacked into one frame",
        },
      ],
    },
    {
      title: "Reguliersgracht, the seven bridges",
      blurb:
        "Seven arched bridges receding one inside the next, each smaller than the last. Stand on the Reguliersgracht bridge at Keizersgracht, or over at Thorbeckeplein, and look south. This is a night photograph: the arches are lit and read like a row of vintage vanity mirrors doubled in the canal. Shoot blue hour rather than full dark, and bring something to brace on, because it's a long exposure. Some photographers swear it's better from a boat, which makes it a free upgrade if your canal tour goes that way.",
      locations: [
        {
          lat: 52.3653,
          lng: 4.8958,
          precision: "neighborhood",
          facing: "S",
          facingNote:
            "south down Reguliersgracht, where the arches stack away from you one inside the next",
        },
      ],
    },
    {
      title: "Groenburgwal, from the wooden drawbridge at Staalstraat",
      blurb:
        "Best story per frame in Amsterdam. Stand on the southern drawbridge and line up the Zuiderkerk spire straight down a quiet canal, gables on both sides, the whole thing doubled in still water. Monet painted this exact view in 1874 and the canvas lives in Philadelphia now. The stretch is car-free, so it works at almost any hour, though still-water mornings are best. It's two minutes from the Nieuwmarkt chaos and almost nobody turns down it.",
      locations: [
        {
          lat: 52.3682,
          lng: 4.8977,
          precision: "exact",
          facing: "NE",
          facingNote:
            "northeast up the canal, with the Zuiderkerk spire lined up dead centre",
        },
      ],
    },
    {
      title: "The free IJ ferry to NDSM, behind Centraal",
      blurb:
        "Amsterdam from the water, for free: the ferries behind Centraal run constantly and cost nothing at all. Stand at the front of the boat for clean sightlines and you get the scale of Centraal Station, the EYE Filmmuseum, the Silodam block, and the harbour cranes at the far end. Late afternoon puts the sun behind the old city on the return leg. Wind is real out there, so shorter lens and faster shutter, and NDSM itself is a converted shipyard covered in large-scale street art, which is a second set of frames on the same free ticket.",
      locations: [
        {
          lat: 52.3806,
          lng: 4.8991,
          precision: "neighborhood",
          label: "Ferry piers behind Centraal",
          facingNote:
            "no single direction on a moving boat: Centraal and the EYE on the way out, the old city backlit on the way home",
        },
      ],
    },
    {
      title: "The NEMO Science Museum rooftop",
      blurb:
        "A wide-open panorama over the old centre and the IJ from a stepped green roof, and no ticket required, which is the part that surprises people. Amsterdam charges for the views with a bar attached; this one is free and aimed back at the historic centre instead of away from it, reached by the lift in the museum foyer or the exterior stairs on the east side. Check the closing time before you plan a sunset around it, because the roof often shuts well before the sun does.",
      locations: [
        {
          lat: 52.3739,
          lng: 4.9121,
          precision: "exact",
          facing: "W",
          facingNote: "west, back over the old centre toward Centraal",
        },
      ],
    },
  ],
  gallery: [
    {
      src: amsRijksmuseum,
      alt: "The brick towers of the Rijksmuseum at the end of Museumstraat on a sunny day in Amsterdam",
      caption: "The Rijksmuseum, holding court at the end of Museumstraat.",
    },
    {
      src: amsCanalBoats,
      alt: "Boats moored along a tree-lined Amsterdam canal under a blue sky",
      caption: "Boats idling along the canal on a blue-sky day.",
    },
  ],
};

const sanFrancisco: City = {
  slug: "san-francisco",
  name: "San Francisco",
  countrySlug: "usa",
  countryName: "USA",
  contentStatus: "published",
  tagline: "Fog with a view.",
  intro:
    "Affordable eats and free views in a city that will happily charge you for both.",
  story: [
    "You know what was the most SF thing I ever saw? When I was staying at my buddies' place near the Tenderloin (I'll get to that in a moment) we rented a car to drive around the city. To return the car, we had to drive through the Tenderloin, and we were stuck behind a Waymo, who was taking its time swerving past tents, poo, and the like. The autonomous vehicle knew what it was doing. It was the most dystopian thing I've ever seen.",
    "SF is expensive, so I'm going to focus on more affordable eats and experiences here. If you came here expecting high splashes of cash, you might want to visit another travel guide, or just ask AI.",
  ],
  stay: {
    title: "Hotel Boheme, North Beach",
    blurb:
      "A small independent in an 1880s building on Columbus, two blocks from Vesuvio, City Lights and Jack Kerouac Alley, with hallways hung in photographs of 1950s and 60s North Beach Beat life. Ginsberg stayed here in his later years, so the literary evening the Vesuvio entry promises can end with a walk up the street to bed.",
    url: "https://www.expedia.com/San-Francisco-Hotels-Hotel-Boheme.h6455.Hotel-Information",
  },
  cultureTips: [
    "Tip 18 to 20 percent at sit-down and a dollar or two per drink; California servers earn full minimum wage, and tipping is still fully expected anyway.",
    "The people living on these streets are home, not scenery, so no photos, no filming, no staring; a \"sorry, not today\" with eye contact beats pretending someone doesn't exist.",
    "Say San Francisco or the City, never San Fran; Frisco at least has some reclaimed working-class history, so it earns an eye-roll rather than an offense.",
    "Jaywalking stopped being ticketable in 2023 when it's safe, but between the hills, streetcar tracks and blind crests, locals cross with judgment, so borrow theirs.",
    "The Mission's mural alleys and the Painted Ladies stoops are lived-in community places, not sets, so don't block doorways or shoot into windows.",
  ],
  eats: [
    {
      title: "Brenda's French Soul Food",
      blurb:
        "It earned the top spot. Creole-New Orleans cooking on Polk Street, which is to say right inside the same few blocks where I watched that Waymo do its thing. Get the flight of beignets, twelve bucks for plain, chocolate, apple, and crawfish, and the savoury one sounds wrong and isn't. Then shrimp and grits, or the fried chicken eggs Benedict, with chicory coffee to make the point. Weekend brunch waits run up to an hour and the room gets loud, so go on a weekday morning and the whole problem evaporates.",
    },
    {
      title: "Taylor Street Coffee Shop",
      blurb:
        "Our kind of no-nonsense coffee stop, which is a joke, because the coffee is reportedly the weakest thing on the menu. This is an old American breakfast counter that closes up in the early afternoon and calls it a day, not a coffee bar. Come for the plate instead: the thick-cut candied bacon, black pepper and brown sugar, and the sailor's hash of seafood and eggs. Portions are large, prices are diner prices, and seating is tight, though the queue moves. This stretch of the Tenderloin can feel rough first thing in the morning, which is the same San Francisco from up above.",
    },
    {
      title: "Vesuvio Cafe",
      blurb:
        "A North Beach institution, and not a café in the coffee sense at all: it's a bar, opened in 1948 as a bohemian gathering spot, in a 1913 building with Jack Kerouac Alley running along one side. On 17 October 1955, Neal Cassady stopped in here on his way to the Six Gallery, the night Ginsberg first read Howl. There's a cocktail named after Kerouac, which is obviously the thing to order, and the balcony over Columbus is where to drink it. City Lights is across the street and free to browse, so one drink buys you an entire literary evening.",
    },
    {
      title: "La Taqueria, in the Mission",
      blurb:
        "The Mission burrito is a San Francisco invention, not a Mexican one, and La Taqueria breaks the local rule on purpose: no rice. Less filler, more meat, a burrito you can actually finish. Order the carne asada and ask for it dorado style, which isn't written on any menu and gets the tortilla griddled gold on the outside. It's the closest thing this city has to a password. El Farolito does the exact opposite, enormous and rice-packed and open late, and SF has been arguing about which is correct for thirty years. Pick a side. The line is worst at weekend lunch.",
    },
    {
      title: "El Gallo Giro taco truck, 23rd and Treat",
      blurb:
        "This is the whole thesis of the guide in one order. Carnitas or al pastor at $3.50 a taco, which makes three of them a ten-dollar dinner in the most expensive city in America, and they're better than most of the forty-dollar ones. Cabeza if you're feeling brave. The truck has held that residential Mission corner for something like two dozen years and got named on a 2026 cheap-eats panel by a local chef who called them literally insane tacos. No seating, no ambience, no problem.",
    },
  ],
  experiences: [
    {
      title: "Twin Peaks",
      blurb:
        "The best free show in town: the whole grid, the bay, and the skyline in one look. The named overlook is Christmas Tree Point, and short stair climbs continue to the two actual summits above it; the eastern half of the loop road is permanently car-free now, a walk-and-bike promenade. The wind up there is Pacific-grade, and when the fog is in you see nothing but grey, so bring layers, yes, even in summer.",
      photo: {
        src: sfTwinPeaks,
        alt: "The view from Twin Peaks over San Francisco's rooftops toward the downtown skyline and the bay",
        caption: "The whole city from Twin Peaks, free of charge.",
      },
    },
    {
      title: "Sausalito",
      blurb:
        "Across the bay and a world calmer. Here's the move that makes it cheap: ride the Golden Gate north like the entry below, coast down into town, then take the ferry back with the bike on board. It's about thirty minutes, bikes ride free of drama, and the deck hands you the bridge and the skyline from the water with no return climb. Once you're there, the Bay Model is a 1.5-acre working hydraulic replica of the entire bay and delta that actually runs tides, built by the Army Corps of Engineers, free to walk into, and nearly empty. Then walk the Waldo Point docks, where four hundred-plus houseboats make up a real lived-in neighbourhood. Bring your own sandwich, because the town itself is priced for people who arrived by yacht.",
    },
    {
      title: "Pier 39",
      blurb:
        "The classic pier stop, and I'll be honest about it: the arcades, the carousel, and the chowder in a bread bowl are priced for people who aren't coming back. The sea lions on K-Dock are the exception, and they're free. They turned up in January 1990 and never left, the record haul was 1,701 of them back in 2009, and winter is peak because plenty head south to breed over the summer. They're loud, they smell, they belly-flop onto each other for dock space, and they are the best free show on the wharf. Go in the morning for the noise. Look at the animals, then go eat somewhere else.",
    },
    {
      title: "Rent a bike and ride the city, including the Golden Gate Bridge",
      blurb:
        "Crossing the Golden Gate under your own power is the way to earn the view, hills and all. The classic loop runs from the waterfront across the span and downhill into Sausalito, where the ferry carries you and the bike back; cyclists get routed onto one sidewalk or the other depending on when you go, so follow the signs rather than your instincts. The afternoon wind funnelling through the Gate is very real, and earlier is easier.",
      photo: {
        src: sfGoldenGate,
        alt: "Looking up at a red tower of the Golden Gate Bridge mid-crossing, suspension cables fanning overhead",
        caption: "Crossing the Golden Gate with whatever wheels you've got.",
      },
    },
    {
      title: "Clarion Alley and the Mission mural walk",
      blurb:
        "Free, outdoors, and the most concentrated dose of the Mission's actual character. One block-long alley between Mission and Valencia has carried more than 900 murals since the project started in 1992, and the work is explicitly political rather than decorative, which is the point of it. The walls rotate constantly, so this year's alley isn't last year's. Walk it slowly, then head over to Balmy Alley off 24th for the older murals going back to the Central American solidarity movements of the 1970s. Murals, then a burrito, then a pupusa if you're still hungry: a whole Mission afternoon for under twenty bucks.",
    },
  ],
  photoSpots: [
    {
      title: "Battery Spencer, Marin Headlands",
      blurb:
        "The postcard frame, and nothing else in the Bay Area gets this angle: you stand almost directly on top of the bridge's north tower and look back down the span with the city behind it. Sunrise gives you the skyline lit and a fraction of the people. This is also the fog-inversion spot, where the deck disappears into cloud and the towers stand above it, which is a better photograph than a clear day. Free parking, old gun batteries to poke around, and it is genuinely cold and windy up there year-round, so bring the layer.",
      locations: [
        {
          lat: 37.828,
          lng: -122.4821,
          precision: "exact",
          facing: "SE",
          facingNote:
            "southeast, down the length of the bridge with the city behind it",
        },
      ],
    },
    {
      title: "The 16th Avenue Tiled Steps up to Grandview Park",
      blurb:
        "Two shots for one climb. 163 mosaic steps whose tiles run as one continuous image from the ocean floor at the bottom to the sun at the top: shoot from the bottom, centred and low, in morning or late afternoon, because flat midday light kills the tile texture. Then keep climbing to Grandview Park for the Pacific, the Golden Gate, Golden Gate Park, and downtown in one sweep. It's free and always open, in a quiet residential pocket of the Inner Sunset. If the fog comes in, that's a feature, and the panorama turns into island tops.",
      locations: [
        {
          lat: 37.7565,
          lng: -122.4718,
          precision: "approximate",
          facingNote:
            "east up the middle of the mural from the bottom, then west to the ocean once you're at the top",
        },
      ],
    },
    {
      title: "Alamo Square and the Painted Ladies",
      blurb:
        "A row of pastel Victorians with the downtown towers stacked behind them. Cliché, and still the single most recognisable frame in the city. Shoot from the top of the park's hill instead of the sidewalk so the roofline sits below the skyline, and do it at golden hour when the low sun warms the facades against a darkening downtown. Crowds are heavy, so early on a weekday is the fix. Afterwards, walk the surrounding blocks, because the Victorians keep going and nobody bothers photographing those.",
      locations: [
        {
          lat: 37.7764,
          lng: -122.4347,
          precision: "approximate",
          facing: "E",
          facingNote:
            "east from the top of the hill, Victorians in front and the skyline stacked behind",
        },
      ],
    },
    {
      title: "Lands End and the Sutro Baths ruins",
      blurb:
        "The concrete skeleton of a Victorian bathhouse sitting in the surf at the city's northwest corner, with cliffs, cypress, and open Pacific behind it. Doesn't look like San Francisco, doesn't really look like anywhere. Golden hour, shooting west into the light over the water: go wide from the trail above the ruins, then down among the concrete for texture. It's free national park land, park at the Merrie Way lot, and the Lands End Trail runs on through cypress and eucalyptus with overlooks the whole way. The park service says stay on the trails and back from the cliffs, and that one isn't boilerplate.",
      locations: [
        {
          lat: 37.7803,
          lng: -122.5136,
          precision: "exact",
          facing: "W",
          facingNote: "west, straight out to sea, this is the sunset one",
        },
      ],
    },
    {
      title: "Lombard Street's crooked block at dawn",
      blurb:
        "This is the touristy one and I'm not going to pretend otherwise. The reason it's on the list is that the time is the advice: at first light you get eight empty hairpins reading as clean overlapping bands, hedges and hydrangeas layered into each other, Coit Tower down the axis. By mid-morning it's a crawl of cars on the bricks and a crowd in everyone's frame. Shoot from the top of the block looking down for the layering, or from the bottom on Leavenworth for the classic postcard. Fog helps here, adding depth to the curves. Everybody photographs this street, almost nobody photographs it well, and the entire difference is setting an alarm.",
      locations: [
        {
          lat: 37.8021,
          lng: -122.4187,
          precision: "approximate",
          facingNote:
            "down the hairpins from the top at Hyde, or back up at them from Leavenworth at the bottom",
        },
      ],
    },
  ],
};

const delhi: City = {
  slug: "delhi",
  name: "Delhi",
  countrySlug: "india",
  countryName: "India",
  contentStatus: "published",
  tagline: "Old lanes, new appetites.",
  intro:
    "One city here can feel like a completely different country from the next. Delhi was our loud, generous, overwhelming introduction to India.",
  story: [
    "India was amazing, and honestly, I need to go back there soon to explore more cities since one city from a state can feel like a completely different country compared to another. The diversity is immense, and the cuisine is unmatchable.",
    "As we traveled from Delhi to Agra and then back to Delhi, we took the train, and we experienced local areas, like Connaught Place in Delhi. I can't comprehend how people are able to balance 3 whole luggages twice their size on top of their heads when they're traveling via train. I saw some crazy stuff: my friend wanted to take us to the banks of the Ganges river for sunset photos, but he directed our rickshaw driver to a random, sketchy place. As we got out of the rickshaw, all I saw was a halo of mosquitoes over his head, and a bunch of dudes hanging out in a dump truck in front of us. I high tailed our asses out of that area fast. I also saw a rickshaw driver have his lunch stolen behind him by a monkey and then him getting into a fight with said monkey (he picked up a stick and chased it).",
    "India is the land of extremes. Extreme wealth, extreme pollution, extreme traffic, extreme noise, extreme poverty, extreme beauty. I loved it there, telling people I'm from East Assam so they wouldn't bother me. I can't wait to be back.",
  ],
  stay: {
    title: "The Claridges, Lutyens' Delhi",
    blurb:
      "A heritage independent running since 1955 in Lutyens' Delhi, with Lodi Gardens under a mile away and Khan Market and Pandara Road in immediate range. Nearly everything this page recommends, Gulati included, is a walk or a few minutes from the door, and in a city of extreme traffic that is the whole game.",
    url: "https://www.expedia.com/Delhi-Hotels-The-Claridges-New-Delhi.h974008.Hotel-Information",
  },
  cultureTips: [
    "Cover shoulders and knees and expect to lose your shoes constantly; temples, tombs and homes all run the same script, and bare shoulders or shorts will get you turned away at religious sites.",
    "Gurdwaras like Bangla Sahib lend free head scarves at the entrance, so take one; Akshardham bans every electronic including your phone, and showing up unprepared means a locker queue.",
    "Eat, pay and hand things over with your right hand; the left is traditionally the bathroom hand, and nobody will lecture a foreigner, but locals notice.",
    "Ask before pointing a camera at people, especially women in the Old Delhi lanes; strangers will ask for selfies with you too, and yes or no are both fine answers.",
    "Bargain in Chandni Chowk because it is the expected script, skip it in fixed-price shops, and never grind a cycle-rickshaw driver over ten rupees.",
  ],
  eats: [
    {
      title: "Gulati Restaurant in Pandara Road Market",
      blurb:
        "It earned the top spot. Gulati started as a dhaba in 1959, and the white-tablecloth version still cooks like it has something to prove: butter chicken, dal makhani, and a garlic naan to mop up every last bit. The weekend queue is part of the meal.",
    },
    {
      title: "Any street chai",
      blurb:
        "If you get a stomach ache later you can blame me, but you won't regret it. The real thing is boiled hard with milk, ginger and cardamom, poured short and strong, sometimes into a kulhad, an unglazed clay cup that adds an earthy note and traditionally gets smashed when you're done. Pick the busiest stall you can find: high turnover means the chai never sits, which is most of the food-safety math right there.",
    },
    {
      title: "Any McDonald's",
      blurb:
        "No, I'm not joking. The paneer burgers were actually good. I was doubtful too when my friend first bought it. Then I tried it and was like: wtf, it's good…",
    },
    {
      title: "Andhra Bhavan Canteen",
      blurb:
        "The Andhra Pradesh state house runs a canteen a short hop from Connaught Place, and it's where Delhiites take out-of-towners to prove a point about value. You sit down, an unlimited thali appears, and men with buckets keep refilling your plate until you physically cover it with your hands. Surrender early.",
    },
    {
      title: "Devan's South Indian Coffee & Tea, Lodhi Colony",
      blurb:
        "A family roaster that's been working the same Khanna Market lane since 1962, and the whole lane smells like it. Grab a filter coffee or a flat white, buy a bag of their beans to take home, then walk it all off in Lodi Gardens ten minutes away.",
    },
  ],
  experiences: [
    {
      title: "Humayun's Tomb",
      blurb:
        "Red sandstone, white marble, and the blueprint the Taj learned from. Commissioned in the 1550s by Humayun's widow and built by a Persian architect, it was the first grand Mughal garden-tomb on the subcontinent, UNESCO-listed and set in a four-quadrant charbagh paradise garden split by water channels. Sunder Nursery, further down this list, sits right against the complex.",
      photo: {
        src: delHumayun,
        alt: "Humayun's Tomb in Delhi, its white dome above red sandstone arches, with a fountain in the foreground",
        caption: "Humayun's Tomb, the Taj before the Taj.",
      },
    },
    {
      title: "Lodi Gardens",
      blurb:
        "One of my favorite spots. Constructed in 1490 CE, the Lodi Gardens was one of the most beautiful walks we experienced. It's a free public park of about ninety acres, with Sayyid and Lodi dynasty tombs from the mid-15th through early 16th centuries scattered casually across it. Delhi treats it as home turf: morning walkers, joggers, yoga groups and picnickers going about their day among the monuments, which is exactly the right way to use 500-year-old architecture.",
      photo: {
        src: delLodiGardens,
        alt: "A domed 15th-century tomb rising over the stone plaza in Lodi Gardens, Delhi, with the sun behind it",
        caption: "Lodi Gardens, a 500-year-old reason to slow down.",
      },
    },
    {
      title: "Lotus Temple",
      blurb:
        "A giant marble lotus that's actually a Bahá'í house of worship, and the quietest room in Delhi. After the honking outside, the silence inside feels like a glitch.",
    },
    {
      title: "Walking around Khan Market",
      blurb: "In case you want a more elevated, Western experience. The U-shaped double-storey block went up in 1951 as a rehabilitation project for Partition refugees, and it's now regularly ranked India's most expensive retail street, which is quite the character arc. Bahrisons Booksellers, founded by one of those refugees in the fifties, is still the anchor institution and the stop worth making.",
    },
    {
      title: "Sunder Nursery",
      blurb:
        "Ninety acres of restored Mughal garden that Delhi has adopted as its picnic living room: this is where locals go when they're tired of every other park. Bring snacks, spread out on a lawn, and collect the bonus Mughal tombs and peacocks as you wander. It shares a wall with Humayun's Tomb, so one trip covers both.",
    },
  ],
  photoSpots: [
    {
      title: "Humayun's Tomb at opening time",
      blurb:
        "Get there when the gates open and the red sandstone does its sunrise glow with nobody else in your frame. Shoot straight down the central watercourse for the symmetry, then let the arched side chambers frame the dome.",
      locations: [
        {
          lat: 28.5933,
          lng: 77.2506,
          precision: "approximate",
          facingNote:
            "straight down the central watercourse, where the symmetry does the work, then let the arched side chambers frame the dome",
        },
      ],
    },
    {
      title: "Agrasen ki Baoli",
      blurb:
        "A 14th-century stepwell hiding between office towers just off Connaught Place: 103 steps of repeating stone arches sinking into the ground. Go early morning, shoot from the top step down the well's throat, and wait for the pigeons to do their thing.",
      locations: [
        {
          lat: 28.626,
          lng: 77.225,
          precision: "exact",
          facingNote:
            "from the top step, straight down the well's throat, early enough that the pigeons are the only company",
        },
      ],
    },
    {
      title: "Lodi Gardens at golden hour",
      blurb:
        "Put the low sun behind the Bara Gumbad dome and the silhouette shot is free; our own photo above is the proof. Mornings are walkers and parakeets; late afternoon is when the 500-year-old stone goes warm.",
      locations: [
        {
          lat: 28.5946,
          lng: 77.2219,
          precision: "neighborhood",
          facing: "W",
          facingNote:
            "west with the low sun behind the Bara Gumbad dome, which hands you the silhouette for free",
        },
      ],
    },
    {
      title: "India Gate after dark",
      blurb:
        "This one is a night shot, full stop. It's floodlit, on national occasions it wears the tricolour, and the balloon sellers and ice-cream carts hand you foreground life for free. The lawns are wide enough to back way up for a clean centered frame.",
      locations: [
        {
          lat: 28.6129,
          lng: 77.2295,
          precision: "approximate",
          facingNote:
            "back up across the wide lawns for a clean centred frame once it is floodlit",
        },
      ],
    },
    {
      title: "Jama Masjid's southern minaret",
      blurb:
        "They'll charge you a camera fee even if your camera is a phone. Pay it, then pay the small extra to climb the southern minaret, because Old Delhi from above finally explains Old Delhi at street level. Dress modestly, plan around prayer times, and note the posted rules don't allow unaccompanied women up the minaret.",
      locations: [
        {
          lat: 28.6507,
          lng: 77.233,
          precision: "approximate",
          facingNote:
            "out over Old Delhi from the top of the southern minaret, which is what finally explains the street below",
        },
      ],
    },
  ],
  gallery: [
    {
      src: delIndiaGate,
      alt: "India Gate at night, lit up in the orange, white, and green of the Indian flag, with crowds gathered below",
      caption: "India Gate at night, dressed in the tricolour.",
    },
  ],
};

const agra: City = {
  slug: "agra",
  name: "Agra",
  countrySlug: "india",
  countryName: "India",
  contentStatus: "published",
  tagline: "More than one monument.",
  intro:
    "Everyone comes for the Taj. The train ride, the bazar, and the monkeys come free.",
  story: [
    "We rode the train from Delhi to Agra and back, and honestly the ride was half the show: breakfast trays on fold-down tables, chai in paper cups, and luggage-balancing feats I still can't explain.",
    "If you're traveling to India, you're probably visiting the Taj Mahal, so my prediction is you'll pass through the Kinari Bazar anyway. Be mindful and keep your items secure: the surrounding area isn't gentrified, and a lot of people will want to talk to you, offering rickshaw rides and the like.",
  ],
  stay: {
    title: "Hotel Sidhartha, Taj Ganj West Gate",
    blurb:
      "Not a palace hotel, on purpose: a family-run place with rooms around a garden courtyard, about two minutes on foot from the West Gate along the pedestrianised approach. When the plan is a sunrise entry, rolling out of bed and into the queue before dawn beats stars every time, and Treat and the Kinari Bazar lanes are right there for afterwards.",
    url: "https://www.expedia.com/Agra-Hotels-Hotel-Sidhartha.h2642260.Hotel-Information",
  },
  cultureTips: [
    "The Taj is a tomb rather than a temple, so nobody enforces a dress code, but modest is still the expectation, and the free shoe covers go on over your shoes for the marble platform.",
    "Treat the monkeys as pickpockets with teeth: no feeding, no visible food or plastic bags, no eye contact, and a firm grip on your sunglasses and phone.",
    "Kinari Bazaar runs on haggling and tourist prices tend to open high, so bargain without guilt; walking away is the last move, and it works.",
    "Ask before photographing people around the Taj gates; a camera without a nod reads as entitled, and plenty of strangers will ask for a selfie with you anyway.",
    "Keep public affection to hand-holding; Agra runs more conservative than Delhi, and kissing in public draws stares you do not want.",
  ],
  eats: [
    {
      title: "Pinch of Spice",
      blurb:
        "It earned the top spot. The order is Dal Bukhara, Afghani kebabs, a paneer gravy, and soft naans to carry it all; book ahead or eat early, because peak-hour service crawls. Exactly what you want after a dawn Taj visit.",
    },
    {
      title: "Treat Restaurant",
      blurb:
        "The same family has run this little spot at the Taj's south gate since 1986. Paneer pasanda, butter naan, banana lassi, done, and it's right by the Kinari Bazar, which you'll be walking through anyway on your way to the Taj.",
    },
    {
      title: "Bedai and jalebi breakfast at Deviram Sweets",
      blurb:
        "Agra's actual breakfast: a spicy stuffed puri with curried potatoes, eaten standing up before 10 am, then a hot jalebi for the syrup chaser. Deviram Sweets is the name locals say. My street-chai disclaimer applies here too: blame me later, thank me first.",
    },
    {
      title: "Panchhi Petha (the real one)",
      blurb:
        "Petha, the translucent ash-gourd sweet, basically is Agra, and Panchhi has been making it since 1926. The catch: the city is full of knock-off shops with one letter changed in the sign, so finding the genuine store in Sadar Bazaar is a mini side quest. Start with angoori and kesar; the boxes travel well.",
    },
    {
      title: "Mama Chicken Mama Franky House",
      blurb:
        "A loud Sadar Bazaar counter famous for tandoori chicken and its franky rolls. Go in the evening, order a chicken franky, and accept the chaos at the counter as part of the dish. The crowd is the review.",
    },
  ],
  experiences: [
    {
      title: "The Taj Mahal",
      blurb:
        "If I don't say the Taj, I'm lying to myself. One of the greatest humanmade structures I've ever seen. It straight up looks like a fantasy. Keep an eye out for monkeys near the outskirts of the garden.",
      photo: {
        src: agraTaj,
        alt: "The Taj Mahal reflected in the long garden pool, framed by cypress trees and flowers in the morning haze",
        caption: "The Taj, first thing in the morning.",
      },
    },
    {
      title: "Agra Fort",
      blurb:
        "The other half of the Taj's story, and weirdly the better one: Shah Jahan built the Taj, then his own son locked him up in this fort. Work through the red sandstone courtyards and end at Musamman Burj, the marble tower where he reportedly spent his last years staring at the tomb he built across the river.",
    },
    {
      title: "Mehtab Bagh",
      blurb:
        "A Mughal garden directly across the Yamuna from the Taj, with the classic back view and a fraction of the crowd. Come for the last hour of light and watch the dome go silhouette over the river; the ticket counter shuts before sunset, so don't cut it fine.",
    },
    {
      title: "Itmad-ud-Daulah, the Baby Taj",
      blurb:
        "Same move as Humayun's Tomb in Delhi: the smaller, older, emptier monument that taught the famous one its tricks. The marble inlay is finer up close than the Taj's, and on the quiet side of the river you'll have a Mughal masterpiece nearly to yourself.",
    },
    {
      title: "Kinari Bazar wander",
      blurb:
        "I already told you to keep your items secure here, so consider this a promotion from warning to recommendation. Wedding finery, marigolds, spice sacks, rickshaw gridlock: this is commerce for Agra, not for tourists, and none of it is staged. Walk it, don't ride it.",
    },
  ],
  photoSpots: [
    {
      title: "The Great Gate and reflecting pool at sunrise",
      blurb:
        "Enter at first light and you get soft gold on white marble, a mirror-still pool, and no selfie lines. The bench and the raised marble platform are the two staple vantage points, and the garden edges deliver candid monkey traffic; our gallery has the proof.",
      locations: [
        {
          lat: 27.1716,
          lng: 78.0422,
          precision: "exact",
          facing: "N",
          facingNote:
            "north from the bench and the raised marble platform, with the pool mirroring the whole thing back",
        },
      ],
    },
    {
      title: "Mehtab Bagh at sunset",
      blurb:
        "River foreground, dome silhouette, almost nobody around: the unobstructed rear view the postcards forget. Time the last hour of light, and remember the ticket counter closes before the sun does.",
      locations: [
        {
          lat: 27.179,
          lng: 78.0421,
          precision: "approximate",
          facing: "S",
          facingNote:
            "south across the Yamuna to the back of the dome, river in the foreground, almost nobody around",
        },
      ],
    },
    {
      title: "The Yamuna bank behind Agra Fort",
      blurb:
        "There is a right way to do the riverbank sunset shot, and it's not whatever our rickshaw driver did; that ended in a halo of mosquitoes and a dump truck full of dudes. Photographers use the ghats behind the fort (Haathi Ghat is the search term); go in fading daylight with a driver who actually knows the spot, not after dark.",
      locations: [
        {
          lat: 27.1798,
          lng: 78.0208,
          precision: "neighborhood",
          facingNote:
            "the ghats behind the fort, Haathi Ghat is the search term, in fading daylight and with a driver who actually knows the spot",
        },
      ],
    },
    {
      title: "Musamman Burj, inside Agra Fort",
      blurb:
        "The Taj framed through carved marble arches, shot from the tower where Shah Jahan was imprisoned with a view of the thing he built. Best story per square meter in Agra, and late afternoon puts warm light on the red sandstone on your way out.",
      locations: [
        {
          lat: 27.1798,
          lng: 78.0208,
          precision: "approximate",
          facing: "E",
          label: "Musamman Burj, inside the fort",
          facingNote:
            "east to the Taj, framed through the carved marble arches of the tower Shah Jahan was imprisoned in",
        },
      ],
    },
    {
      title: "A Taj Ganj rooftop",
      blurb:
        "Saniya Palace's rooftop is the known one: three decks pointed straight at the Taj, non-guests welcome. Order a chai and shoot the dome over the rooftops as the light changes. Go for the frame, not the food, because the service is famously unhurried.",
      locations: [
        {
          lat: 27.1671,
          lng: 78.0435,
          precision: "neighborhood",
          facing: "N",
          label: "Taj Ganj rooftops",
          facingNote:
            "north over the rooftops to the dome; Saniya Palace's three decks point straight at it",
        },
      ],
    },
  ],
  gallery: [
    {
      src: agraTajMe,
      alt: "Walking across the sandstone plaza beside the Taj Mahal in the early morning light",
      caption: "The obligatory Taj walkabout, no regrets.",
    },
    {
      src: agraTajMonkeys,
      alt: "Monkeys perched on the red sandstone battlements near the Taj Mahal's outer gate",
      caption: "The welcoming committee on the garden walls.",
    },
    {
      src: agraTrainRide,
      alt: "Breakfast trays on fold-down tables in a sleeper train compartment between Delhi and Agra",
      caption: "Breakfast service on the rails to Agra.",
    },
    {
      src: agraTrainStation,
      alt: "The long covered platform at Agra's train station, with a red train waiting on one side",
      caption: "Agra's platform, early and already awake.",
    },
  ],
};

const rome: City = {
  slug: "rome",
  name: "Rome",
  countrySlug: "italy",
  countryName: "Italy",
  contentStatus: "published",
  tagline: "Ruins with rush hour.",
  intro:
    "Rome runs on ritual: espresso standing up, pizza cut with scissors, and a cannon that goes off at noon on purpose. Learn the rules fast, because the city won't slow down to explain them.",
  stay: {
    title: "Hotel San Anselmo, the Aventine",
    blurb:
      "A 19th-century villa with its own garden on the quiet residential Aventine, part of a small family-run group of villas on the hill. The keyhole and the Orange Garden are the walk up, Mercato di Testaccio is the walk down, and that early keyhole shot stops being a logistics problem when you wake up on the same hill.",
    url: "https://www.expedia.com/Rome-Hotels-Hotel-SantAnselmo.h2528434.Hotel-Information",
  },
  cultureTips: [
    "Sitting or eating on the Spanish Steps is an actual rule, not a vibe; police will whistle you up and fines apply.",
    "Stay out of the fountains and off Trevi's rim, fines apply; the coin over the shoulder is the part that's actually tradition.",
    "Take your pizza al taglio to a piazza bench or Villa Borghese, because the historic centre's decorum rules ban messy eating around the monuments.",
    "Church dress codes get enforced here, shoulders and knees covered at St Peter's and the basilicas, so carry a scarf in summer and keep the flash off.",
    "Cappuccino after mid-morning marks you as a visitor, so take an espresso standing at the bar, and don't order at bar price then sit down at a table.",
  ],
  eats: [
    {
      title: "Cesare al Casaletto",
      blurb:
        "Ride tram 8 to the end of the line and get off where the tour groups don't. Start with the fritti (the fried gnocchi and polpette are the signature move), then the carbonara or gricia. The room is Romans doing long lunches, which is the whole point.",
    },
    {
      title: "Flavio al Velavevodetto",
      blurb:
        "A Testaccio trattoria dug into a hill of 2,000-year-old broken amphorae, so you eat next to a window of ancient pottery shards. Order the tonnarelli cacio e pepe, heavy on the pecorino, and book ahead. The Romans do.",
    },
    {
      title: "Mordi e Vai, Mercato di Testaccio",
      blurb:
        "A veteran Roman butcher's market stall turning braised home cooking into sandwiches. Get the allesso, roll dipped straight in the braising broth, and accept that some of it ends up down your wrist. Go before noon; the fillings genuinely run out.",
    },
    {
      title: "Pizzarium (Gabriele Bonci)",
      blurb:
        "The reference point for gourmet pizza al taglio, steps from the Vatican Museums exit. It's priced by weight, cut with scissors, and eaten standing on the sidewalk. Pointing and saying \"un po' di questo, un po' di quello\" is the entire ordering system.",
    },
    {
      title: "Sant'Eustachio Il Caffè",
      blurb:
        "Yes, the famous one near the Pantheon, roasting on-site since 1938. Here's the insider part: the Gran Caffè arrives pre-sugared, whipped into the crema behind a screen, so order it \"amaro\" if you want it straight. Knowing that is the difference between tourist and local. Drink it standing at the bar.",
    },
  ],
  experiences: [
    {
      title: "Sunday on the Appia Antica by bike",
      blurb:
        "On Sundays the ancient Appian Way closes to cars and fills with Roman families walking and cycling between ruins and catacombs. Rent a bike near the Tomb of Cecilia Metella and let the original basalt slabs rattle your handlebars. The city's oldest road, moonlighting as a neighborhood park.",
    },
    {
      title: "Morning at Mercato di Testaccio",
      blurb:
        "Rome's best food neighborhood compressed into one covered market: produce stalls, quinto-quarto butchers, and lunch counters side by side. Go hungry, go early, and build a grazing lunch stall by stall. You'll be queueing with nonnas, not tour groups.",
    },
    {
      title: "The noon cannon at the Gianicolo",
      blurb:
        "Every day since 1847 a cannon fires at exactly noon below Piazzale Garibaldi, originally to sync the city's church bells. Be on the terrace by quarter to and watch the locals cover their ears with practiced timing. Most visitors have no idea this happens.",
    },
    {
      title: "Quartiere Coppedè and the Aventine",
      blurb:
        "Coppedè is a tiny fairy-tale pocket of Art Nouveau-meets-Gothic around Piazza Mincio that almost nobody reaches; the Aventine is Rome's quietest classic hill, Orange Garden included. Both are where Romans take visiting friends when they're tired of the center.",
    },
    {
      title: "Aperitivo in Pigneto",
      blurb:
        "Rome's creative eastern quarter, a short hop east of Termini: street art, natural wine bars, and an evening crowd of young Romans rather than visitors. Show up at aperitivo hour, drink along the pedestrianized Via del Pigneto, and eat late like everyone else.",
    },
  ],
  photoSpots: [
    {
      title: "Terrazza del Gianicolo",
      blurb:
        "The full-city panorama, domes and terracotta from above Trastevere, and quieter than most famous terraces. Golden hour hits the skyline face-on. Come midday instead and you get the cannon thrown in.",
      locations: [
        {
          lat: 41.8914,
          lng: 12.4608,
          precision: "exact",
          facing: "E",
          facingNote:
            "east over Trastevere to the domes and terracotta, with golden hour hitting the skyline face on",
        },
      ],
    },
    {
      title: "The Aventine keyhole and Orange Garden",
      blurb:
        "The green door on Piazza Cavalieri di Malta frames St. Peter's dome perfectly down a hedge tunnel. This is a morning shot: go early for zero queue and soft light, because at sunset the backlight blows the whole thing out. The Orange Garden next door frames the dome down the Tiber for round two.",
      locations: [
        {
          lat: 41.8828,
          lng: 12.4786,
          precision: "exact",
          facing: "NW",
          facingNote:
            "northwest through the keyhole, where the hedge tunnel lines up St Peter's dome",
        },
      ],
    },
    {
      title: "Via Piccolomini",
      blurb:
        "The optical-illusion street where St. Peter's dome shrinks as you walk toward it and grows as you back away. Shoot down the street's axis, then film the walk; the video sells it better than any still. Easy detour off the Gianicolo.",
      locations: [
        {
          lat: 41.8915,
          lng: 12.4426,
          precision: "approximate",
          facing: "NE",
          facingNote:
            "northeast down the street's axis, where the dome shrinks as you walk toward it and grows as you back away",
        },
      ],
    },
    {
      title: "Ponte Umberto I at sunset",
      blurb:
        "The classic Castel Sant'Angelo and St. Peter's stack, shot from the east side of the bridge. Bring the longest lens you own to compress castle and dome into one frame, and arrive well before sunset; the parapet fills with tripods.",
      locations: [
        {
          lat: 41.9027,
          lng: 12.4713,
          precision: "exact",
          facing: "W",
          facingNote:
            "west from the east side of the bridge, longest lens you own, to compress the castle and the dome into one frame",
        },
      ],
    },
    {
      title: "Campidoglio terraces over the Forum",
      blurb:
        "Walk Michelangelo's ramp up to the piazza, then slip around Palazzo Senatorio to the free terraces above the Roman Forum. At blue hour the ruins light up with almost nobody around. The emptiest great view in the center.",
      locations: [
        {
          lat: 41.8932,
          lng: 12.483,
          precision: "approximate",
          facing: "SE",
          facingNote:
            "southeast over the Forum from the free terraces behind Palazzo Senatorio, best at blue hour",
        },
      ],
    },
  ],
};

const florence: City = {
  slug: "florence",
  name: "Florence",
  countrySlug: "italy",
  countryName: "Italy",
  contentStatus: "published",
  tagline: "The Renaissance, walkable.",
  intro:
    "The postcard Florence is real, but the good stuff lives one bridge over: artisan workshops, market lunches, and a sandwich made from a cow's fourth stomach. Trust the locals on that last one.",
  stay: {
    title: "Hotel Palazzo Guadagni, Piazza Santo Spirito",
    blurb:
      "A Renaissance palazzo from 1505 sitting directly on Piazza Santo Spirito, the square this page calls the Oltrarno's living room, with a guesthouse lineage running back to 1912. Its rooftop loggia is an Oltrarno landmark and now the terrace bar, so lingering on the square after dark stops being advice and becomes the route to bed.",
    url: "https://www.expedia.com/Florence-Hotels-Hotel-Palazzo-Guadagni.h3196305.Hotel-Information",
  },
  cultureTips: [
    "Florence has repeatedly banned standing and eating on Via de' Neri and the streets around the Uffizi at meal hours, with serious fines, so walk your panino to the Arno instead.",
    "Cover shoulders and knees for the Duomo and the churches; here it gets checked, not just requested.",
    "Book Uffizi and Accademia timed slots and show up at your time, not an hour early to crowd the door; the walk-up queue is mostly people who didn't book.",
    "Coffee grammar is the same as the rest of Italy: espresso standing at the bar, cappuccino is breakfast, and bar price is not table price.",
    "The centre's streets are medieval-narrow with sometimes barely a pavement, so don't walk three abreast or stop dead in the flow.",
  ],
  eats: [
    {
      title: "Trattoria Mario",
      blurb:
        "Lunch only, no reservations, shared tables, and a handwritten menu that changes daily: the reference Florentine working lunch since the 1950s. Queue before it opens with the market workers and students, order the ribollita or whatever the board says, and embrace the chaos. That's the point.",
    },
    {
      title: "Trattoria Sabatino",
      blurb:
        "The cheapest honest sit-down meal in Florence, out by Porta San Frediano: daily handwritten menu, family service, a room full of neighborhood regulars. Too plain, too far west, and too Italian-only to draw crowds, which is exactly why we'd send you.",
    },
    {
      title: "Sergio Pollini Lampredotto",
      blurb:
        "The connoisseurs' lampredotto stand by the Sant'Ambrogio market: cow's fourth stomach, simmered and stuffed into a roll. The ordering script is \"bagnato, con salsa verde e piccante\": dipped in broth, green sauce, a little chili. Eat it standing with a cup of wine and don't overthink the anatomy.",
    },
    {
      title: "Semel",
      blurb:
        "A closet-sized panini counter on the edge of Sant'Ambrogio with a blackboard that changes daily: think wild boar sausage with broccoli rabe, or donkey stew with pear and pecorino. No seats, no queue theater, no social-media menu. The local counterprogram to the famous panini lines.",
    },
    {
      title: "La Sorbettiera",
      blurb:
        "Artisan gelato on Piazza Tasso, a residents' square in San Frediano, where the afternoon rush is local schoolkids. We take that as the strongest possible review. Covered steel tins and a short seasonal list are the tells it's the real craft; try the chocolate with salted milk, and yes, they'll let you taste first.",
    },
  ],
  experiences: [
    {
      title: "Morning at Mercato di Sant'Ambrogio",
      blurb:
        "The Mercato Centrale went food hall; Sant'Ambrogio still feeds the city. Shop the outdoor produce stalls on a weekday morning, then have lunch at Pollini or Semel. The most Florentine few hours you can spend without a ticket.",
    },
    {
      title: "Artisan-workshop crawl in the Oltrarno",
      blurb:
        "Gilders, bookbinders, and goldsmiths still work out of street-level botteghe in San Niccolò and San Frediano: actual working spaces, not artisan-branded boutiques. Alessandro Dari's sculptural jewelry atelier on Via San Niccolò is the showpiece.",
    },
    {
      title: "Vespers at San Miniato al Monte",
      blurb:
        "Monks have held this hilltop since 1373 and still sing the daily offices in Latin plainchant inside Florence's finest Romanesque basilica. Sit quietly, skip the photos, and check the posted schedule since the timing shifts with the seasons. It's ten minutes above the Piazzale Michelangelo mob, and almost nobody follows the stairs up.",
    },
    {
      title: "Aperitivo in San Niccolò",
      blurb:
        "The smallest Oltrarno quarter turns into Florence's most local evening scene under Porta San Niccolò, cheaper and calmer than anything near the Ponte Vecchio, snacks included with your drink. On weeknights the crowd is residents and students.",
    },
    {
      title: "Piazza Santo Spirito after dark",
      blurb:
        "The Oltrarno's living room: Florentines of every age on the church steps and at the bars around the square. Have a drink, eat nearby, then linger on the basilica steps like everyone else.",
    },
  ],
  photoSpots: [
    {
      title: "San Miniato al Monte steps",
      blurb:
        "Higher, quieter, and better framed than Piazzale Michelangelo below: dome, Palazzo Vecchio tower, and the Arno from broad stone steps, with the green-and-white marble facade glowing at your back. Come well before sunset and stay for the gold-to-indigo shift.",
      locations: [
        {
          lat: 43.7594,
          lng: 11.2651,
          precision: "exact",
          facing: "NW",
          facingNote:
            "northwest from the broad stone steps: dome, the Palazzo Vecchio tower and the Arno, with the marble facade glowing at your back",
        },
      ],
    },
    {
      title: "Ponte Santa Trinita, looking east",
      blurb:
        "The Ponte Vecchio postcard is taken from one bridge west, never on it. Stand mid-bridge on Santa Trinita at sunset for the full arched silhouette, shops overhanging the water, and the river doubling the sky. On the Ponte Vecchio itself you're just in everyone else's shot.",
      locations: [
        {
          lat: 43.769,
          lng: 11.2503,
          precision: "exact",
          facing: "E",
          facingNote:
            "east from mid-bridge to the full arched silhouette of the Ponte Vecchio, shops overhanging the water",
        },
      ],
    },
    {
      title: "Bellosguardo hill",
      blurb:
        "The 19th-century English travelers' view: the whole city from the southwest with almost no tourists, a stiff uphill walk from Porta Romana. Late-afternoon side light does the work for you.",
      locations: [
        {
          lat: 43.7638,
          lng: 11.2312,
          precision: "neighborhood",
          facing: "NE",
          facingNote:
            "northeast over the whole city, with late afternoon side light doing the work for you",
        },
      ],
    },
    {
      title: "Giardino Bardini belvedere",
      blurb:
        "The elevated, Duomo-centered frame that beats Boboli for photography, from the terrace of a ticketed garden. Go late afternoon when the light rakes across the city, and in April the wisteria tunnel is the single most photogenic thing in Florence.",
      locations: [
        {
          lat: 43.7642,
          lng: 11.2571,
          precision: "exact",
          facing: "N",
          facingNote:
            "north from the terrace with the Duomo dead centre, late enough that the light rakes across the city",
        },
      ],
    },
    {
      title: "Giotto's Campanile",
      blurb:
        "The one climb where Brunelleschi's dome is in your photo instead of under your feet: eye level with the cupola from the top terrace. It's 414 steps with no elevator, so book a timed slot, go early or late for softer light, and earn it.",
      locations: [
        {
          lat: 43.7728,
          lng: 11.2557,
          precision: "exact",
          facing: "NE",
          facingNote:
            "northeast at eye level with the cupola from the top terrace, 414 steps up and no elevator",
        },
      ],
    },
  ],
};

const shanghai: City = {
  slug: "shanghai",
  name: "Shanghai",
  countrySlug: "china",
  countryName: "China",
  contentStatus: "published",
  tagline: "Deco towers and dawn markets.",
  intro:
    "Shanghai runs on two clocks: the dawn rush of griddles and steamers, and the long glossy skyline evenings. Set the alarm; the good buns sell out before most tourists find breakfast.",
  stay: {
    title: "Capella Shanghai, Former French Concession",
    blurb:
      "The only hotel in the city built inside a restored 1930s shikumen lane compound, so the longtang walk above is literally the walk to your room, with Wukang Mansion and the Fuxing Park dawn crowd in the same pocket of plane trees. A splurge, honestly, but the one splurge that matches the page.",
    url: "https://www.expedia.com/Shanghai-Hotels-Capella-Shanghai.h19922546.Hotel-Information",
  },
  cultureTips: [
    "Sort your payments before you land: Alipay and WeChat Pay take foreign cards with passport verification and street life runs on QR codes, so apps first, cash as backup since small vendors often can't make change.",
    "The metro means no eating or drinking, no audio played out loud, and airport-style bag scans at every station, so budget the queue time.",
    "Dishes are communal, so use the serving chopsticks where provided, don't excavate a shared plate, and never plant chopsticks upright in the rice.",
    "There's no tipping, and if a local invites you out they expect to pay; make one genuine offer, then say thank you and let it go.",
    "Keep your camera off police, soldiers, and security checkpoints, full stop.",
  ],
  eats: [
    {
      title: "DaHu Chun (sheng jian bao)",
      blurb:
        "Skip the tourist-default Yang's and eat the pan-fried pork buns older Shanghainese grew up on: a hundred years of the old-school clear-water style, breadier bun, caramelized bottom, less soup grenade. Bite a small hole first, drink the juice, then flip it crust-up on the spoon. The curry beef soup is the traditional sidekick.",
    },
    {
      title: "Wei Xiang Zhai (sesame sauce noodles)",
      blurb:
        "Eighty-plus years of majiang mian out of a cramped Huangpu shophouse: thick sesame paste cut with peanut, tossed at the table, proportions unchanged for decades. Order the beef soup too and alternate bites like the regulars. You will share a table. That's part of it.",
    },
    {
      title: "Old Jesse (benbang cuisine)",
      blurb:
        "Seven tables, open since 1990, and the answer Shanghainese give when you ask what benbang actually means: sweet, dark, glossy, unapologetically home-style. Get the red-braised pork, and know the scallion-roasted fish head runs out daily. Plan ahead and expect to wait anyway.",
    },
    {
      title: "The Four Warriors breakfast run",
      blurb:
        "Breakfast is the most local meal in Shanghai: dabing, youtiao, cifan, and fresh soy milk (the four items older locals actually call the Four Warriors), eaten standing on the pavement before the stalls sell out mid-morning. Order the cifan, a sticky-rice roll hugging a youtiao with pickles and pork floss. If the queue gods smile, A Da's scallion pancakes in Jing'an are still made two at a time by the man himself.",
    },
    {
      title: "RAC Coffee on Anfu Road",
      blurb:
        "Shanghai has more coffee shops than any city on earth, and Anfu Road is the scene's living room. RAC's sunny lane-house courtyard has outlasted several hype cycles; take a flat white to a courtyard table on a weekday morning and watch young Shanghai walk by.",
    },
  ],
  experiences: [
    {
      title: "People's Park marriage market",
      blurb:
        "Weekend afternoons in the park's corner, parents advertise their unmarried kids on open umbrellas: age, height, salary, hukou. Browse respectfully and keep the camera away from the resumes. Fair warning: if you look anywhere between 20 and 40, someone may ask about your salary, and honestly, take it as a compliment.",
    },
    {
      title: "The ¥2 Huangpu commuter ferry",
      blurb:
        "Two yuan buys the best commute in China: across the river with the rush-hour scooter crowd, Bund on one side, the bottle-opener skyline on the other. Stand at the bow rail and ride it both ways. Tourists are the minority, which is exactly the point.",
    },
    {
      title: "Longtang lane walk",
      blurb:
        "Shikumen lane compounds in Hongkou or off the plane-tree streets, late afternoon: laundry poles, mahjong, stools in doorways. These are homes, so keep your voice down; a nod and a \"nong hao\" goes a long way. End at Guangtou Shengjian in Hongkou, a bun queue with almost no tourists in it.",
    },
    {
      title: "Fuxing Park at dawn",
      blurb:
        "Tai chi squads, ballroom dancers, saxophone practicers, kite flyers, card sharks: the French Concession's morning stage, and visitors get waved into the dancing more often than not. The best free show in the city, and it's over by the time most hotels serve breakfast.",
    },
    {
      title: "The Anfu–Wukang citywalk",
      blurb:
        "\"Citywalk\" is the actual Chinese-internet word for this stroll, and young locals do it on purpose: coffee in hand, Wukang Mansion, Hudec facades, boutiques, ending at a wine bar. Go on a weekday. Weekends at the Wukang corner are a crush.",
    },
  ],
  photoSpots: [
    {
      title: "The Bund at sunrise",
      blurb:
        "Everyone shoots the Bund; almost nobody shoots it at dawn, when tai chi groups and dancers become your foreground instead of tour flags. Shoot east into the hazy Pudong skyline, then come back late afternoon for the reverse angle on the colonial facades.",
      locations: [
        {
          lat: 31.2353,
          lng: 121.4876,
          precision: "neighborhood",
          facing: "E",
          facingNote:
            "east into the hazy Pudong skyline at dawn, with the tai chi groups as foreground instead of tour flags",
        },
      ],
    },
    {
      title: "Wukang Mansion corner",
      blurb:
        "The 1924 Hudec flatiron, shot from the pedestrian island across the intersection. Morning for soft light and thin crowds, golden hour if you want street life in the frame.",
      locations: [
        {
          lat: 31.2063,
          lng: 121.4337,
          precision: "approximate",
          facingNote:
            "from the pedestrian island across the intersection, back at the 1924 Hudec flatiron",
        },
      ],
    },
    {
      title: "North Bund riverside",
      blurb:
        "The full Lujiazui panorama with a fraction of the Bund's crowds. The bridge at Jiulong and Changzhi puts a canal and old buildings in the foreground; walk the riverside through sunset into blue hour and let the lights come to you.",
      locations: [
        {
          lat: 31.2497,
          lng: 121.4964,
          precision: "neighborhood",
          facing: "S",
          facingNote:
            "south to the full Lujiazui panorama; the bridge at Jiulong and Changzhi puts a canal and old buildings in front of it",
        },
      ],
    },
    {
      title: "Mid-river from the ferry deck",
      blurb:
        "The only ¥2 skyline shot in China: Bund on one side, the bottle opener, corkscrew, and pearl on the other. Time a crossing for golden hour, then just ride it back and shoot the other bank.",
      locations: [
        {
          lat: 31.2347,
          lng: 121.489,
          precision: "approximate",
          label: "Jinling East Road ferry pier",
          facingNote:
            "both banks from a moving deck: the Bund one way, the bottle opener, corkscrew and pearl the other",
        },
      ],
    },
    {
      title: "Longtang lanes in late side-light",
      blurb:
        "Narrow shikumen alleys with laundry, bikes, and doorway life, when the late sun rakes down the lane. Zhang Yuan for the restored version, Hongkou for the lived-in one. People first, photos second.",
    },
  ],
};

const beijing: City = {
  slug: "beijing",
  name: "Beijing",
  countrySlug: "china",
  countryName: "China",
  contentStatus: "published",
  tagline: "Imperial scale, hutong detail.",
  intro:
    "Beijing does imperial scale like nowhere else, then serves you noodles in a courtyard the size of your kitchen. Come for the Wall, stay for the breakfast drink that smells like sour dishwater. We'll explain.",
  stay: {
    title: "Mandarin Oriental Qianmen, the Caochang hutongs",
    blurb:
      "The rooms are restored single-storey courtyard houses scattered through a living hutong grid near Qianmen gate, walkable to the Forbidden City moat with the Temple of Heaven a short hop south. The tagline up top says imperial scale, hutong detail; this is sleeping in the second half of that sentence, and yes, it's a splurge.",
    url: "https://www.expedia.com/Beijing-Hotels-Mandarin-Oriental-Qianmen.h106184839.Hotel-Information",
  },
  cultureTips: [
    "Tiananmen Square needs an advance reservation with your passport number plus airport-style security, and the mechanics keep changing, so check the current process; no drones, no tripods, and don't film the guards.",
    "The Lama Temple is an active place of worship, not a museum, so take the free incense, light three sticks at the courtyard burners, and keep the camera down inside the halls.",
    "The hutongs are lived-in neighborhoods, so don't shoot through open courtyard doors or wander into a siheyuan; those photogenic doorways are people's front doors.",
    "Skip Taiwan, 1989, and Xinjiang with people you've just met, since it can genuinely put a local in an uncomfortable position, and deflection isn't rudeness.",
    "When toasting, keep your rim below an elder's or your host's glass, and you can toast with tea as long as you say so up front.",
  ],
  eats: [
    {
      title: "No. 69 Fangzhuanchang Zhajiangmian",
      blurb:
        "A hutong courtyard shop that serves exactly one dish, and the founder still makes the fried soybean sauce every morning. Mix it violently and immediately: the sauce settles, the noodles clump, and hesitation marks you as a first-timer. Go off-peak unless you enjoy queues measured in hours.",
    },
    {
      title: "Siji Minfu (Peking duck)",
      blurb:
        "The duck Beijingers actually queue for: carved table-side, none of the state-banquet stiffness of the famous brand. The sugar-dipped skin bite comes first for a reason. Grab a queue number before you're hungry, because the wait is real.",
    },
    {
      title: "Nanmen Shuanrou (copper-pot hotpot)",
      blurb:
        "Old-Beijing lamb hotpot, the anti-Sichuan version: charcoal copper pot, clear broth, nothing to hide behind but the quality of the meat. Order the hand-cut fresh lamb, swish it for seconds, drown it in the house sesame sauce. Locals stir an egg yolk into the dip; trust them.",
    },
    {
      title: "Lao Ciqikou Douzhi (the breakfast dare)",
      blurb:
        "Douzhi is a 300-year-old fermented mung-bean sour that defeats most visitors, Chinese ones included, and this shop near the Temple of Heaven is the canonical place to face it. Order the set (hot douzhi, crisp jiaoquan rings, sharp pickles) and alternate. It clicks by the third sip, or it doesn't, and either way you leave with the story.",
    },
    {
      title: "Metal Hands on Wudaoying Hutong",
      blurb:
        "Beijing's flagship hutong roaster since 2016, in a courtyard near the Lama Temple. Pour-over of their own roast plus whatever dessert is on the counter, surrounded by hutong neighbors and the city's young creative class. Anchor the Wudaoying and Guozijian walk around it.",
    },
  ],
  experiences: [
    {
      title: "The Great Wall at Huanghuacheng",
      blurb:
        "Skip Badaling. Huanghuacheng is the section Beijing weekenders pick for themselves: arms of wall diving straight into a reservoir, crowds thin, half a day enough. Mutianyu is the pragmatic fallback locals book for visiting relatives, toboggan included. Wear real shoes.",
    },
    {
      title: "Houhai mornings, ice swimmers included",
      blurb:
        "The lakes before the bar street wakes up: chess, fishing, opera practice, and in winter, swimmers breaking the ice for their daily plunge. They're mostly over 60 and they will absolutely invite you in. Walk the hutongs toward the Drum Tower after.",
    },
    {
      title: "Panjiayuan market at dawn",
      blurb:
        "China's biggest secondhand market, and the serious haggling happens just after dawn on weekends. Open at a quarter of the asking price with a smile, and buy stories, not \"Ming vases\"; the fakes are part of the game.",
    },
    {
      title: "Temple of Heaven, park first",
      blurb:
        "The hall is the checklist; the morning park is the point. Corridors of choirs, ribbon dancers, shuttlecock kickers, and water calligraphers painting the pavement with brushes the size of mops. Do the douzhi dare around the corner and earn the complete Beijing morning.",
    },
    {
      title: "Liangma River evenings",
      blurb:
        "Where the city itself goes on summer nights: riverside lights, paddleboarders, families, dogs, picnic blankets. There's a short, cheap night cruise that locals genuinely use. Bring snacks and settle in.",
    },
  ],
  photoSpots: [
    {
      title: "Jingshan Park at sunset",
      blurb:
        "The Forbidden City overview shot, golden roofs lit from the west, and the only place the imperial axis makes visual sense. Claim a rail spot at Wanchun Pavilion well before sunset, or come at opening on a weekday for the crowd-free version.",
      locations: [
        {
          lat: 39.9245,
          lng: 116.3904,
          precision: "approximate",
          facing: "S",
          facingNote:
            "south from the Wanchun Pavilion rail, straight down the imperial axis with the roofs lit from the west",
        },
      ],
    },
    {
      title: "The corner turret over the moat",
      blurb:
        "The Forbidden City's corner tower doubled in the moat at dusk is Beijing's classic tripod gathering, and it's free, outside the ticketed zone. Blue hour gives you the lit turret against a teal sky.",
    },
    {
      title: "Drum Tower from Wanning Bridge",
      blurb:
        "The grey bulk of the Drum Tower looming over hutong rooftops, shot up the axis of Yandaixie Street. Late-afternoon light, with rickshaws and power lines doing the foreground work.",
      locations: [
        {
          lat: 39.935,
          lng: 116.3899,
          precision: "exact",
          facing: "N",
          facingNote:
            "north to the grey bulk of the Drum Tower over the hutong rooftops, up the axis of Yandaixie Street",
        },
      ],
    },
    {
      title: "Huanghuacheng's lake wall",
      blurb:
        "Wall meets water: half-submerged ramparts in morning light with hardly anyone in frame. Doubles as your Great Wall day, which is the kind of efficiency we endorse.",
      locations: [
        {
          lat: 40.4075,
          lng: 116.3387,
          precision: "neighborhood",
          facingNote:
            "half submerged ramparts where the wall meets the water, in morning light with hardly anyone in frame",
        },
      ],
    },
    {
      title: "Liangma River at blue hour",
      blurb:
        "Shoot from the footbridges toward the CBD glass with kayakers in frame. The lights come on in the evening; bring a tripod and stay for the show.",
      locations: [
        {
          lat: 39.956,
          lng: 116.4819,
          precision: "neighborhood",
          facing: "S",
          facingNote:
            "south from the footbridges toward the CBD glass, with kayakers in the frame once the lights come on",
        },
      ],
    },
  ],
};

const chengdu: City = {
  slug: "chengdu",
  name: "Chengdu",
  countrySlug: "china",
  countryName: "China",
  contentStatus: "published",
  tagline: "Pandas, peppercorns, patience.",
  intro:
    "Chengdu runs at two speeds: numbing-hot and completely horizontal. The pandas nap by mid-morning, and honestly, so should you.",
  stay: {
    title: "The Temple House, beside Daci Temple",
    blurb:
      "You enter through a restored Qing-dynasty courtyard beside the thousand-year-old Daci Temple, the same courtyard-and-teahouse grammar as Heming and Wenshu above, ten minutes on foot from the Anshun Bridge night shot. Its Mi Xun Teahouse holds a Michelin star for vegetarian cooking, which in a city of fly restaurants is a pretty funny flex.",
    url: "https://www.expedia.com/Chengdu-Hotels-The-Temple-House.h10912041.Hotel-Information",
  },
  cultureTips: [
    "Teahouses run on lid language: roughly, a tilted gaiwan lid asks for a refill, a lid left ajar or upside down says you're done, and an object on the lid holds your seat, though the signals vary house to house.",
    "At the Panda Base it's no flash, since their eyes are light-sensitive, voices down, and never feed or throw anything; staff enforce the posted rules.",
    "Asking for wei la, mildly spicy, is a normal and respected request rather than a cop-out; locals calibrate too.",
    "Chengdu moves slower than Beijing or Shanghai and seems to like it that way, so don't rush a teahouse server or hover for a table.",
    "Hotpot is communal, so use the serving side of the ladle for the shared pot and mind the same chopstick taboos as everywhere in China.",
  ],
  eats: [
    {
      title: "Ming Ting (the king of fly restaurants)",
      blurb:
        "\"Fly restaurant\" is an affectionate term: a shabby canteen locals swarm like flies because the wok work is superb, and this alley spot by a Jinniu vegetable market is the most famous one in Chengdu. Order the doufu naohua, their invented pig-brain tofu: a creamier, richer mapo with tender pig brains in the numbing sauce. Sounds like a dare, eats like a discovery.",
    },
    {
      title: "Zhang Laoer Liangfen (sweet water noodles)",
      blurb:
        "A no-frills window opposite Wenshu Monastery, on the same spot since 1944: thick hand-cut noodles under chili oil, brown-sugar syrup, and crushed peanuts. Three bites of chew, then sweetness, then the creeping burn. Get the mung-bean jelly too, pay at the window, find a stool.",
    },
    {
      title: "Piaoxiang Hotpot in Yulin",
      blurb:
        "Neighborhood beef-tallow hotpot since 1997, no marketing budget, sustained entirely by word of mouth. Fresh tripe swished seven-up-eight-down, duck blood, pork throat, everything dipped in garlic and sesame oil to cool the burn. Take a queue number on your phone before leaving the hotel; walk-ins at dinnertime wait an hour.",
    },
    {
      title: "Shuangliu Laoma Tutou (rabbit heads)",
      blurb:
        "Sichuan eats a couple hundred million rabbit heads a year and most of them disappear around Chengdu, so do as young Chengdu does: split them with friends over beer. Thumbs at the jaw hinge, crack, cheeks first. Locals watch newcomers with open delight. Lean into it. One mala and one five-spice per person is the standard order.",
    },
    {
      title: "Heming Teahouse in People's Park",
      blurb:
        "The 1923 flagship of Chengdu teahouse culture: bamboo chairs by the lake, lidded gaiwan cups, endless hot-water refills. The tea price is the seat rental, and nobody is rushed, ever. Leave your lid ajar and the hot-water man keeps coming.",
    },
  ],
  experiences: [
    {
      title: "Say yes to the ear cleaner",
      blurb:
        "At People's Park you'll hear him before you see him: long tuning-fork tongs chiming down the rows of bamboo chairs. The cleaning is ticklish, oddly euphoric, and one hundred percent Chengdu. Gentle haggling is normal; flinching is optional.",
    },
    {
      title: "Guanyin Pavilion Old Teahouse, Pengzhen",
      blurb:
        "A century-old teahouse in a former Ming-era temple outside town: dirt floor, faded murals, regulars who start arriving before dawn. Go early on a weekday, buy tea (that's the entry fee and the ethic), and remember the old men with their pipes are not performing. They were there first.",
    },
    {
      title: "A Yulin neighborhood night",
      blurb:
        "The district from the song \"Chengdu\": charcoal skewers on the pavement, murals, retirees' mahjong next to craft beer and folk poets. Grab your chuanchuan skewers from the fridge yourself; you're billed by counting sticks at the end.",
    },
    {
      title: "The Panda Base, done correctly",
      blurb:
        "Morning or nothing. Book your real-name slot the moment they open a week out, be at the gate first thing, head straight for the cubs, and leave when the naps start mid-morning. The breakfast feeding is the show; afternoon pandas are furry rocks.",
    },
    {
      title: "The Wenshu Monastery circuit",
      blurb:
        "A working monastery founded in the Tang dynasty: incense courtyards, resident cats, its own teahouse, and a snack economy in the surrounding lanes, sweet water noodles included. Free entry. Go mid-morning while worshippers still outnumber phones.",
    },
  ],
  photoSpots: [
    {
      title: "Anshun Bridge at night",
      blurb:
        "The covered bridge glowing over the Jin River, shot from the riverside promenade or Hejiang Pavilion, never from the bridge itself. Weeknights are quieter, and the last minutes before the lights go out empty the frame.",
      locations: [
        {
          lat: 30.6442,
          lng: 104.0834,
          precision: "approximate",
          label: "Anshun Bridge, shot from the bank",
          facingNote:
            "from the riverside promenade or Hejiang Pavilion, never from the bridge itself",
        },
      ],
    },
    {
      title: "Guanyin Pavilion at dawn",
      blurb:
        "Shafts of window light through tea steam and pipe smoke onto a dirt floor: the most photographed teahouse interior in China, and it earns it. Gesture before close portraits, and buy the tea.",
      locations: [
        {
          lat: 30.5857,
          lng: 103.869,
          precision: "exact",
          facingNote:
            "inside, into the shafts of window light coming through the tea steam; gesture before close portraits, and buy the tea",
        },
      ],
    },
    {
      title: "Heming Teahouse details",
      blurb:
        "Backlit steam off gaiwan lids, rows of bamboo chairs along the lake, the ear-cleaner's tongs. Mid-morning sun through the trees; detail shots beat wide ones here.",
      locations: [
        {
          lat: 30.6594,
          lng: 104.0558,
          precision: "exact",
          facingNote:
            "close in on backlit steam off the gaiwan lids and the rows of bamboo chairs; details beat wide shots here",
        },
      ],
    },
    {
      title: "Eastern Suburb Memory",
      blurb:
        "Soviet-era factory pipes and brick refitted into a music and art district: industrial textures that love an overcast sky, neon after dark. Save it for the rainy day.",
      locations: [
        {
          lat: 30.6708,
          lng: 104.1263,
          precision: "neighborhood",
          facingNote:
            "Soviet era pipes and brick, which love an overcast sky, then neon after dark",
        },
      ],
    },
    {
      title: "Jiuyanqiao at blue hour",
      blurb:
        "The bar-district bend of the Jin River, bridges and tower lights doubling in the water. Pairs with Anshun Bridge upstream into one evening walk.",
      locations: [
        {
          lat: 30.6424,
          lng: 104.0863,
          precision: "neighborhood",
          facingNote:
            "the bar district bend of the Jin River, bridges and tower lights doubling in the water",
        },
      ],
    },
  ],
};

const newYorkCity: City = {
  slug: "new-york-city",
  name: "New York City",
  countrySlug: "usa",
  countryName: "USA",
  contentStatus: "published",
  tagline: "Cheap dumplings, expensive skyline.",
  intro:
    "The New York people actually live in is the one at the end of the L, the G, the 7, and the ferry. Spend ten bucks on dinner and put the rest toward the view.",
  stay: {
    title: "Wythe Hotel, Williamsburg",
    blurb:
      "A converted 1901 barrel factory on the Williamsburg waterfront, beds built from the factory's own reclaimed timber, with the East River ferry at the doorstep and a rooftop bar facing the skyline across the water. This page's New York runs on the L, the G and the ferry anyway, so staying in Brooklyn is the first choice here, not the compromise.",
    url: "https://www.expedia.com/New-York-Hotels-Wythe-Hotel.h4952112.Hotel-Information",
  },
  cultureTips: [
    "Tip 20 percent at restaurants and a dollar or two per drink; the norm here runs stronger than the national average, and rounding down gets noticed.",
    "The sidewalk is a traffic lane, so never stop mid-stream, pull to the curb to check your phone, and keep it to two abreast.",
    "On the subway, let people off first, move to the middle, and never hold a closing door; you're delaying the whole line, and the MTA says as much.",
    "Jaywalking became legal in 2025 and everyone crosses sensibly anyway, but you have no right of way outside a crosswalk; the law removed the tickets, not the physics.",
    "Don't photograph people in crisis on the subway; practiced non-staring is the one privacy courtesy in a city with none to spare.",
  ],
  eats: [
    {
      title: "Shu Jiao Fu Zhou, Chinatown",
      blurb:
        "A family-run Fujianese counter on Grand Street where a plate of dumplings runs about five dollars and the communal tables are students, line cooks, and whoever else knows. Order the boiled pork dumplings and the peanut butter noodles, stir the chili oil into the noodles, and you'll walk out for around ten bucks happier than most hundred-dollar meals leave you. Bring cash, expect zero decor.",
    },
    {
      title: "L'Industrie Pizzeria, Williamsburg",
      blurb:
        "The burrata slice is the whole argument: a regular slice re-fired, then finished with fresh burrata, basil, parm, and olive oil. It got named Pizza Today's 2026 Pizzeria of the Year, which means the line is real, and New Yorkers still agree it's worth standing in, which basically never happens. Go on a weekday afternoon; the West Village outpost is the pressure valve.",
    },
    {
      title: "Taqueria Ramirez, Greenpoint",
      blurb:
        "Choricera and trompo spinning in the window, standing counters, and a menu that is tacos and not much else. That's not a limitation, that's the position. The entrance is on Oak Street rather than Franklin, so everyone walks past it once, and it's closed Mondays.",
    },
    {
      title: "Mariscos El Submarino, Jackson Heights",
      blurb:
        "Sinaloa-style mariscos under the elevated 7 train, on a stretch of Roosevelt Avenue that has never once appeared on a tourist itinerary. Get the aguachile: rojo, verde, or negro, each keyed to a different chile, and negro is the sleeper. Sundays it opens early, because Queens does seafood for breakfast.",
    },
    {
      title: "Charles Pan-Fried Chicken, Harlem",
      blurb:
        "Charles Gabriel pan-fries his chicken in seasoned cast iron the way he learned in North Carolina, which makes this one of the last real pan-fried operations left in the city. Go to the 145th Street flagship, order dark meat with the classic sides, and go at lunch when it comes straight out of the pan.",
    },
  ],
  experiences: [
    {
      title: "Green-Wood Cemetery, Sunset Park",
      blurb:
        "Skip the obvious parks. Four hundred and seventy-eight acres of Victorian landscape, free to walk in, with harbor views from Battle Hill and Brooklyn's best fall color. Look up when you come in at 25th Street: feral monk parakeets colonized the gothic gates and nobody seems to find this strange.",
    },
    {
      title: "Governors Island by ferry and bike",
      blurb:
        "A car-free island eight minutes from Lower Manhattan with hammock groves, lavender fields, and the cheapest good look at the skyline and the Statue you'll get. Rent a bike, ride the perimeter loop, then stay for the sunset picnic like every local who caught the ferry straight from work. Go on a weekday evening; summer weekends fill up.",
    },
    {
      title: "A late set at Smalls Jazz Club",
      blurb:
        "The definitive West Village jazz basement, and the cover undercuts the famous rooms while the players are often the same people. Take the second or third set, when the room loosens up, and stay for the jam session. This is where musicians go on their own nights off.",
    },
    {
      title: "The Roosevelt Avenue crawl under the 7 train",
      blurb:
        "Take the 7 to 82nd or 90th Street and eat your way along the elevated tracks: Mexican, Ecuadorian, Colombian, Tibetan, Nepali, Bangladeshi, one cart to the next. It's the most concentrated immigrant food culture in America and none of it is curated for you. Finish at El Submarino and call it a night.",
    },
    {
      title: "The ferry to Rockaway Beach",
      blurb:
        "Open water from Pier 11 to an actual surf beach for roughly what a fancy coffee costs, which makes it the best-value boat ride in New York. Go out on a summer morning, do the beach and the boardwalk tacos, then ride back at golden hour with the skyline coming at you off the deck. Weekdays; the summer weekend boats are packed.",
    },
  ],
  photoSpots: [
    {
      title: "Washington Street in DUMBO",
      blurb:
        "The Manhattan Bridge framed between brick warehouses at Washington and Water, with the Empire State Building sitting inside the arch. At 5pm it's a zoo and at 7am it's a private film set, so choose accordingly. Shoot from the crown of the cobblestones and keep an eye out for cars, because they do not care about your frame.",
      locations: [
        {
          lat: 40.7021,
          lng: -73.9897,
          precision: "approximate",
          facing: "N",
          facingNote:
            "north up the cobblestones, the bridge framed between the warehouses with the Empire State sitting inside the arch",
        },
      ],
    },
    {
      title: "Brooklyn Bridge Park, Pier 1",
      blurb:
        "The classic bridge-and-downtown composition, with the old wooden pilings off Pier 1 giving you leading lines and foreground texture for free. Sunrise puts gold on the bridge; blue hour lights the skyline behind it. Walk up to the Brooklyn Heights Promenade after for the elevated version of the same shot.",
      locations: [
        {
          lat: 40.7009,
          lng: -73.9966,
          precision: "approximate",
          facing: "N",
          facingNote:
            "north to the bridge and downtown together, with the old wooden pilings giving you leading lines for free",
        },
      ],
    },
    {
      title: "Top of the Rock",
      blurb:
        "The one deck where the Empire State Building is in your photo instead of under your feet, with Central Park out the other side. Book the slot 45 to 60 minutes before sunset and you get daylight, golden hour, and city lights on one ticket. Sunset slots sell out days ahead in summer, and an early morning visit is the crowd-free consolation prize.",
      locations: [
        {
          lat: 40.759,
          lng: -73.9794,
          precision: "exact",
          facingNote:
            "south to the Empire State off one side, north over Central Park off the other, which is the whole point of this deck",
        },
      ],
    },
    {
      title: "Gantry Plaza State Park, Long Island City",
      blurb:
        "Restored industrial gantries and the old Pepsi-Cola sign with all of Midtown across the water. You're facing west, so the sun drops behind Manhattan and silhouettes the whole skyline, then blue hour lights the buildings up and that's the keeper. Take the 7 to Vernon Blvd-Jackson Ave or the ferry to Hunters Point South.",
      locations: [
        {
          lat: 40.7463,
          lng: -73.958,
          precision: "exact",
          facing: "W",
          facingNote:
            "west across the water at all of Midtown, so the sun drops behind Manhattan and silhouettes the skyline",
        },
      ],
    },
    {
      title: "Battle Hill, Green-Wood Cemetery",
      blurb:
        "Gothic arches, Victorian monuments, and an elevated harbor view with the Statue of Liberty way off in the distance. Late afternoon side-light does the work on the stone, and late October into early November is the foliage version. No other New York guide is sending you here, which is the point.",
      locations: [
        {
          lat: 40.6522,
          lng: -73.9911,
          precision: "neighborhood",
          facing: "NW",
          label: "Green-Wood Cemetery, Battle Hill is inside",
          facingNote:
            "northwest over the harbour with the Statue of Liberty way off in the distance, late enough that the side light works the stone",
        },
      ],
    },
  ],
};

const losAngeles: City = {
  slug: "los-angeles",
  name: "Los Angeles",
  countrySlug: "usa",
  countryName: "USA",
  contentStatus: "published",
  tagline: "Come for tacos, stay for the light.",
  intro:
    "The best street food in America, wearing a Michelin guide as an accessory. Learn one thing before you land: the mistake isn't missing the sunset, it's showing up at it.",
  stay: {
    title: "Silver Lake Pool & Inn, Silver Lake",
    blurb:
      "A former motel turned small independent at Sunset Junction, right where Sunset and Santa Monica Boulevards meet, walking distance from the reservoir loop and up the road from the Griffith approaches. Visitors skip Silver Lake almost entirely, which is exactly the argument for waking up in it.",
    url: "https://www.expedia.com/Los-Angeles-Hotels-Silver-Lake-Pool-Inn.h34504058.Hotel-Information",
  },
  cultureTips: [
    "Tip 18 to 22 percent, and tip the valet and the rideshare driver too.",
    "Jaywalking is decriminalized statewide, but drivers on those wide boulevards genuinely do not expect a mid-block pedestrian; legal and survivable are different questions.",
    "Freeways take the definite article, the 405, the 10, the 101, and locals will hear anything else instantly.",
    "The local code on celebrities is notice and move on, no photos, no approaching mid-meal; that restraint is the whole reason famous people can live here.",
    "Skid Row and the encampments are not a sightseeing route, and the same goes at freeway ramps; someone's worst stretch is not your content.",
  ],
  eats: [
    {
      title: "Mariscos Jalisco, Boyle Heights",
      blurb:
        "The most famous taco truck in America, parked on the same Boyle Heights block for decades, and it earned that on tacos dorados de camarón: shrimp folded into a corn tortilla, fried crisp, topped with avocado and salsa roja. Jonathan Gold kept coming back and Michelin eventually caught up, and none of it changed the truck or the price. It's a daylight operation, so don't plan on dinner. Eat them standing on the curb; that's the format.",
    },
    {
      title: "Sonoratown, Downtown",
      blurb:
        "Paper-thin flour tortillas made from Sonoran flour and lard, wrapped around mesquite-grilled carne asada. Watch them press the tortillas while you wait, because that's the entire reason the taco tastes like that. The lunch line is downtown workers, which is the review.",
    },
    {
      title: "Holbox, Mercado La Paloma",
      blurb:
        "A Michelin-starred Mexican seafood counter inside a community food hall run by a nonprofit, which means the ceviche arrives on a food-court tray with USC students at your elbow. Order whatever tostadas and ceviche are on the board and go at lunch, when it's calm and cheap and the star comes without the ceremony. Closed Mondays.",
    },
    {
      title: "Anajak Thai, Sherman Oaks",
      blurb:
        "A forty-year-old family Thai place in a strip mall that the founders' son turned into one of the best rooms in the city without moving out of the strip mall. Thai Taco Tuesday is the Valley's defining food night, and the wine list has no business being attached to a neighborhood restaurant. The booking policy has shifted around lately, so check with the restaurant before you bank on walking in.",
    },
    {
      title: "Langer's Delicatessen, Westlake",
      blurb:
        "The #19: hand-cut hot pastrami on double-baked rye with coleslaw and Swiss, going since 1947, and the sandwich New Yorkers quietly concede might beat theirs. After a real closure scare, the family committed to keeping it open through the 2028 Olympics and the whole city exhaled. Take the Metro B or D to Westlake/MacArthur Park and it's across the street. Closed Sundays, and it's a daytime counter.",
    },
  ],
  experiences: [
    {
      title: "Smorgasburg LA at ROW DTLA",
      blurb:
        "Every Sunday, free to walk in, eighty-plus vendors in the Arts District, and it's where the city's next cult food business quietly starts. Go hungry right at opening before the lines set in, graze the whole thing, then land in the beer garden. Ten years running now, so it's a standing ritual rather than an event you have to catch.",
    },
    {
      title: "Friday wine night on the Barnsdall lawn",
      blurb:
        "Summer Fridays, the eastside spreads blankets on the lawn of Hollyhock House, which is Frank Lloyd Wright and the only UNESCO World Heritage Site in Los Angeles, and drinks wine while the sun goes down behind the Hollywood Hills. There are pours, food trucks, DJs, and a crowd that is almost entirely local. It's a seasonal fundraiser for the park's arts programming and it sells out, so check the season and buy ahead rather than rolling up.",
    },
    {
      title: "Wi Spa at midnight, Koreatown",
      blurb:
        "Four floors of jjimjilbang that never closes: salt, jade, clay, and ice rooms, mineral baths, a sleeping floor, and a restaurant where everyone eats in the house uniform. Midnight is the correct time to go. There's no re-entry, so settle in and don't step out for anything.",
    },
    {
      title: "Kenneth Hahn State Recreation Area",
      blurb:
        "This is the honest answer to where locals watch the sunset: Baldwin Hills, upper lots, downtown on one side, the Hollywood sign in the middle, the ocean at the end. It's a family-cookout park first and a viewpoint second, which is exactly why it never gets crowded. Bring a folding chair and tacos from the drive over.",
    },
    {
      title: "The Silver Lake Reservoir loop",
      blurb:
        "Two and a quarter miles of dog walkers, joggers, and other people's phone calls, then a wander toward Sunset Junction for record shops, coffee, and wine bars. Visitors skip Silver Lake almost entirely. It's the lowest-effort way to spend half a day living like an Angeleno instead of visiting one.",
    },
  ],
  photoSpots: [
    {
      title: "The Griffith Observatory terraces",
      blurb:
        "Hollywood sign on one side, the entire basin on the other, Art Deco domes as foreground. Get there an hour before sunset because parking, not light, is the bottleneck, then stay through blue hour when the grid switches on. Sunrise on the east terrace is the empty version, and walking up the Fern Dell trail instead of circling for a space is how locals do it.",
      locations: [
        {
          lat: 34.1182,
          lng: -118.3003,
          precision: "exact",
          facingNote:
            "Hollywood sign off one side, the entire basin off the other, with the Art Deco domes as foreground",
        },
      ],
    },
    {
      title: "El Matador State Beach, Malibu",
      blurb:
        "Sea stacks, arches, and caves, and the most cinematic stretch of coast in the county. Check the tide table first, because low tide is what opens the caves and the reflections, and give yourself 45 minutes of margin since the stairs down are steep. Fair warning: in May and June the marine layer can gray out the coast entirely while the hills stay golden, so fall is the reliable season.",
      locations: [
        {
          lat: 34.038,
          lng: -118.8745,
          precision: "exact",
          facingNote:
            "down onto the sea stacks and arches at low tide, which is what opens the caves and the reflections",
        },
      ],
    },
    {
      title: "The Kenneth Hahn overlook",
      blurb:
        "The skyline-to-ocean panorama from the upper lot, and the shot that makes people ask how they'd never heard of the place. You're facing north and east, so at sunset the buildings catch the warm light instead of turning into silhouettes. Haze is lowest after winter rain or on a windy day.",
      locations: [
        {
          lat: 34.0122,
          lng: -118.37,
          precision: "approximate",
          facing: "NE",
          facingNote:
            "north and east from the upper lot, so at sunset the buildings catch the warm light instead of turning into silhouettes",
        },
      ],
    },
    {
      title: "The Venice Canals",
      blurb:
        "Arched footbridges, still water, ducks, and houses that clearly answer to nobody. Golden hour gives you warm reflections; early morning gives you glassy water and no people. People live here, so stay on the public walkways and keep the lens off their windows.",
      locations: [
        {
          lat: 33.9869,
          lng: -118.4736,
          precision: "neighborhood",
          facingNote:
            "along the arched footbridges and the still water; people live here, so stay on the public walkways",
        },
      ],
    },
    {
      title: "Urban Light at LACMA",
      blurb:
        "Chris Burden's 202 restored streetlamps, and the most photographed piece of public art in the city for good reason. Blue hour is the window: lamps lit, sky still holding color. You won't be the only photographer there, so shoot low and through the columns for depth.",
      locations: [
        {
          lat: 34.0637,
          lng: -118.3589,
          precision: "approximate",
          facingNote:
            "low and through the columns for depth, at blue hour with the lamps lit and the sky still holding colour",
        },
      ],
    },
  ],
};

const seattle: City = {
  slug: "seattle",
  name: "Seattle",
  countrySlug: "usa",
  countryName: "USA",
  contentStatus: "published",
  tagline: "Mountains behind the espresso.",
  intro:
    "Water, salmon, and espresso, and the versions worth your time all sit a short ride outside the tourist funnel. Summer is when everything below runs at full strength, and yes, bring the jacket anyway.",
  stay: {
    title: "Hotel Ballard, Ballard Avenue",
    blurb:
      "A small locally-owned hotel built and run by the family behind the athletic club next door, sitting on cobblestoned Ballard Ave itself with the Sunday farmers market and half this page's picks a few doors away. No downtown tower can serve an itinerary this Ballard-heavy; from here the Walrus wait is a stroll, not a trip.",
    url: "https://www.expedia.com/Seattle-Hotels-Hotel-Ballard.h6224796.Hotel-Information",
  },
  cultureTips: [
    "Wait for the walk signal even at a bone-empty intersection; the city's refusal to jaywalk is legendary, and crossing against it marks you instantly.",
    "Thank the bus driver on your way out; front-door people say it aloud, and back-door people call it forward.",
    "Tip 15 to 20 percent despite the famous minimum wage, and read the bill first, because some restaurants fold in a service charge.",
    "The Seattle Freeze is reserve, not rudeness, so let conversations be opt-in and nobody will mind you at all.",
    "Trail etiquette is basically civic religion here: uphill hikers get the right of way, stay on the trail, and pack out everything.",
  ],
  eats: [
    {
      title: "Un Bien, Ballard",
      blurb:
        "The Caribbean roast pork sandwich: slow-braised pork, caramelized onions, aioli, all of it on a Macrina baguette, and it's the single most defended sandwich in Seattle. Run by the sons of the man behind the original Paseo, and the line is regulars all the way down. Get it spicy from the Shilshole location and eat it sitting on the driftwood at Golden Gardens. Best lunch in the city, no qualifiers.",
    },
    {
      title: "Communion Restaurant & Bar, Central District",
      blurb:
        "Kristi Brown cooks what she calls Seattle soul, Southern roots sourced from the Pacific Northwest, in the historic heart of Black Seattle. She built the room so that, in her words, \"the millionaire can sit with the homie,\" and you can see that's true the moment you walk in. The cocktails are half the point. Closed Mondays and Tuesdays, and Sunday brunch is the sleeper move.",
    },
    {
      title: "Maneki, Japantown",
      blurb:
        "Serving since 1904, the oldest Japanese restaurant in the city and Seattle's first sushi bar, still running as a neighborhood izakaya with multi-generation regulars. It survived the wartime incarceration of the community around it and 120 years of Seattle booms and busts. Ask for a tatami room, because those go first, and note that reservations are by text. It also closes early, which is extremely Seattle of it.",
    },
    {
      title: "The Walrus and the Carpenter, Ballard",
      blurb:
        "The oyster bar that put Ballard Ave on the map: Pacific Northwest oysters at a marble bar, seasonal small plates, and no reservations, ever. The local move is a weekday afternoon at the bar right as happy hour opens, which is also the cheapest way in. Otherwise put your name in early and go walk Ballard Ave until they call you.",
    },
    {
      title: "Espresso Vivace, Capitol Hill",
      blurb:
        "David Schomer is the person most credited with developing American latte art and the obsessive espresso technique behind it, and he's been at it here for 38 years. Order a cappuccino at the Brix cafe on Broadway and watch the rosetta get poured. Locals will argue it was Schomer, not Starbucks, who made coffee huge in this city, and drinking here means you've picked a side.",
    },
  ],
  experiences: [
    {
      title: "A Ballard Sunday: farmers market, then the Locks",
      blurb:
        "The market runs every Sunday on cobblestoned Ballard Ave, year-round, rain or shine, Washington growers only, and it predates the whole farmers-market boom. Graze it, then walk fifteen minutes to the Chittenden Locks and watch boats stair-step between Puget Sound and the ship canal for free. Salmon run through in season, Chinook in August and coho in September, and this is genuinely how locals entertain visiting parents.",
    },
    {
      title: "Kayaking Lake Union from Agua Verde",
      blurb:
        "You rent the boat off the dock of a Mexican cafe on Portage Bay, paddle past houseboats while seaplanes take off over your head, then push into Lake Union for the skyline. It might be the most Seattle hour available. Tacos at the cafe after, obviously. Their hours move with the weather, so call before you drive over.",
    },
    {
      title: "Discovery Park to the West Point Lighthouse",
      blurb:
        "Five hundred acres of forest, meadow, bluff, and beach inside city limits, with a loop of about five miles that ends at an 1881 lighthouse looking across the Sound at the Olympics. Free, no permits, no ceremony. The trail turns to mud after rain, so wear real shoes and skip the white sneakers.",
    },
    {
      title: "The Bainbridge Island ferry, round trip",
      blurb:
        "Walk on at Colman Dock without a car, stand on the stern deck as the skyline pulls away, get coffee and wander Winslow, then ride back at golden hour for the approach. Locals ride this thing purely for the ride, especially on a clear day when, as they say here, \"the mountain is out.\" Best skyline-and-Rainier view you can buy at a walk-on fare.",
    },
    {
      title: "Volunteer Park water tower and conservatory",
      blurb:
        "A 1906 brick water tower with an observation deck over the city and the Space Needle, free to climb, plus a Victorian glass conservatory next door. This is the viewpoint locals send you to when you tell them Kerry Park was mobbed. Pair it with the Capitol Hill record shops and a Vivace cappuccino and you've got an afternoon.",
    },
  ],
  photoSpots: [
    {
      title: "Kerry Park, Queen Anne",
      blurb:
        "The Seattle postcard, and it earns it: Space Needle, downtown, Elliott Bay, and Mt. Rainier floating behind the whole thing on a clear day. Sunset into blue hour is the window, and in summer you need an hour's head start to get a tripod spot. If it's mobbed, walk downhill to Marshall Park or duck into Parsons Gardens across the street.",
      locations: [
        {
          lat: 47.6294,
          lng: -122.3599,
          precision: "exact",
          facing: "SE",
          facingNote:
            "southeast to the Space Needle, downtown and Elliott Bay, with Rainier floating behind the whole thing on a clear day",
        },
      ],
    },
    {
      title: "Gas Works Park, Wallingford",
      blurb:
        "Rusted gasification towers as industrial foreground with the full skyline across Lake Union behind them, sailboats and seaplanes included. Shoot south at golden hour, then climb the kite hill for the elevated angle with the sundial. Summer evenings get lively, so go on a weekday if you want the frame clean.",
      locations: [
        {
          lat: 47.6456,
          lng: -122.3349,
          precision: "exact",
          facing: "S",
          facingNote:
            "south across Lake Union with the rusted towers as foreground, then up the kite hill for the elevated angle",
        },
      ],
    },
    {
      title: "Pike Place Market before 9am",
      blurb:
        "The neon Public Market Center sign from the corner of Pike and 1st, empty cobblestones, morning light raking down the street, and vendors setting up around you. By late morning it's shoulder to shoulder and none of that is possible. Photograph the early market, come back and eat in the noon one, and skip the original Starbucks line entirely.",
      locations: [
        {
          lat: 47.6094,
          lng: -122.3414,
          precision: "approximate",
          facingNote:
            "the neon Public Market Center sign from the corner of Pike and 1st, with morning light raking down empty cobblestones",
        },
      ],
    },
    {
      title: "West Point Lighthouse, Discovery Park",
      blurb:
        "An 1881 lighthouse on a driftwood-strewn point with the Olympics across the water, and at sunset the light drops behind the range and the sky does the full Pacific Northwest routine. Budget for the climb back up, which is a steep half mile in fading light. Carry a headlamp in the shoulder seasons.",
      locations: [
        {
          lat: 47.662,
          lng: -122.4357,
          precision: "exact",
          facing: "W",
          facingNote:
            "west to the Olympics across the water, with the sun dropping behind the range",
        },
      ],
    },
    {
      title: "Seacrest Park, West Seattle",
      blurb:
        "The whole downtown skyline across Elliott Bay at water level, which is the composition you can't get from any hill. Late afternoon light hits the towers face-on and blue hour, once they light up, is the keeper. Ride the water taxi over from downtown and shoot from the stern on the way, because the boat is the better platform.",
      locations: [
        {
          lat: 47.5888,
          lng: -122.3801,
          precision: "exact",
          facing: "NE",
          facingNote:
            "northeast across Elliott Bay at the skyline from water level, which is the composition no hill gives you",
        },
      ],
    },
  ],
};

const london: City = {
  slug: "london",
  name: "London",
  countrySlug: "united-kingdom",
  countryName: "United Kingdom",
  contentStatus: "published",
  tagline: "A hundred villages in a trench coat.",
  intro:
    "London isn't one city, it's forty neighbourhoods grudgingly sharing a transit map and a weather forecast. Bring the jacket you don't mind ruining, and eat wherever the queue is made of people who clearly live nearby.",
  stay: {
    title: "The Rookery, Clerkenwell",
    blurb:
      "A warren of restored 18th-century Georgian houses down a lane by Smithfield, all period panelling, stone floors and open fires. St. John and Leather Lane are a short walk, and Farringdon station is a minute away with direct links toward the Heath, which covers the bone marrow and the cold swim in one postcode.",
    url: "https://www.expedia.com/London-Hotels-The-Rookery-Hotel.h544087.Hotel-Information",
  },
  cultureTips: [
    "Stand on the right of the escalator and walk on the left, no exceptions; it's the one rule Londoners will actually say something about.",
    "The queue is sacred, so join the back and board in turn; nobody will shout, they'll just radiate disapproval.",
    "On the Tube, let people off first, move down inside and take the backpack off in a crush; the silence is normal, not rudeness.",
    "In pubs you order and pay at the bar, catching the bartender's eye rather than waving, and if someone buys you a drink you've joined a round and owe one back.",
    "Check the bill before tipping, because restaurants often add a discretionary service charge you shouldn't tip on top of, and since late 2024 the law requires all of it to reach staff.",
  ],
  eats: [
    {
      title: "St. John, Farringdon",
      blurb:
        "The restaurant that turned nose-to-tail into a movement, and thirty years on the dining room is still full of Clerkenwell regulars rather than tour groups. Order the roast bone marrow with the parsley salad: scoop, salt, pile onto toast, repeat. Get one Eccles cake per person, because sharing causes arguments.",
    },
    {
      title: "Normah's, Queensway Market",
      blurb:
        "A family-run Malaysian counter tucked inside the market in Queensway: no linen, no theatre, just the best laksa in West London. Take it with the crispy onion and add the deep-fried seabass with chilli. West Londoners quietly queue here and don't post about it, which is the whole review.",
    },
    {
      title: "Singburi, Shoreditch",
      blurb:
        "Widely called London's most-loved Thai restaurant, and for years it was a Leytonstone neighbourhood legend before growing into a bigger Shoreditch room. Food people here track its moves the way music fans track a band. Order off the specials board (watermelon salad, lamb short rib, nam tok) and book ahead, because the demand isn't a rumour.",
    },
    {
      title: "E. Pellicci, Bethnal Green",
      blurb:
        "Same family since 1900, a heritage-listed 1946 marquetry interior, and a room that functions as Bethnal Green's living room. Full English or the cannelloni, builder's tea, cash in your pocket. Go early on a weekday, and if you dither over the menu the family will simply decide for you.",
    },
    {
      title: "Prufrock Coffee, Leather Lane",
      blurb:
        "One of the original rooms of London's specialty coffee scene, sitting on Leather Lane in Holborn with its own barista training centre attached. Espresso or a single-origin filter; time it with the weekday street market outside for the people-watching, or roll in mid-afternoon if you want a seat. The clientele is Hatton Garden jewellers, legal-London laptops and off-duty baristas, so it's a working cafe rather than a content set.",
    },
  ],
  experiences: [
    {
      title: "Saturday morning at Maltby Street Market, Bermondsey",
      blurb:
        "Borough's local cousin: a narrow ropewalk of food stalls, railway-arch bakeries and wine shops packed under the tracks. Saturday morning is the move and early is the only correct time, because by lunch it's shoulder to shoulder. The Bermondsey beer arches are right there if the morning wants to become an afternoon.",
    },
    {
      title: "Swim the Hampstead Heath ponds, then climb Parliament Hill",
      blurb:
        "Centuries-old bathing ponds, cold open water, and regulars who swim straight through winter in the Men's and Ladies' ponds; the Mixed Pond is a summer-only affair. The etiquette is quiet: no phones, get in without making a scene, don't announce how cold it is. Dry off and take the skyline from Parliament Hill as payment.",
    },
    {
      title: "Columbia Road Flower Market on a Sunday",
      blurb:
        "A Victorian street that turns into a wall of flowers and cockney traders' patter one day a week. The maths: arrive at opening for the photos and first pick, or near closing when the traders would rather cut prices than cart dahlias home. Duck into the independents along the row, then walk ten minutes to E. Pellicci for breakfast.",
    },
    {
      title: "God's Own Junkyard, Walthamstow",
      blurb:
        "A warehouse in E17 crammed with decades of neon signs and movie-prop lighting built by the Bracey family, with a cafe-bar sitting in the middle of the glow. It only opens at weekends and shuts for private events, so check the calendar before you trek out. A Sunday afternoon and a beer among the buzzing neon is the correct version.",
    },
    {
      title: "Regent's Canal towpath, Little Venice to Camden",
      blurb:
        "Slow London: narrowboats, Regency villas, the back fence of London Zoo, and Camden Lock's chaos waiting at the finish. Start at Warwick Avenue and walk it in about an hour, or take the canal boat if the sky opens up. If your legs hold, carry on from Camden along the water to Coal Drops Yard.",
    },
  ],
  photoSpots: [
    {
      title: "Parliament Hill, Hampstead Heath",
      blurb:
        "The panoramic one: the Shard, the City cluster and Canary Wharf lined up over a wild green foreground, rated by photographers as London's best elevated view. Golden hour before sunset is the window. Bring the longest lens you own and compress the skyline into something more dramatic than your eyes are seeing.",
      locations: [
        {
          lat: 51.5596,
          lng: -0.1598,
          precision: "exact",
          facing: "SE",
          facingNote:
            "southeast to the Shard, the City cluster and Canary Wharf lined up over wild green, with the longest lens you own",
        },
      ],
    },
    {
      title: "Primrose Hill at sunrise",
      blurb:
        "Everyone piles up here for sunset. Local photographers come at dawn instead, because the hill faces east and the paths are empty: same skyline with the BT Tower and the Shard, none of the crowd. Sunrise beats sunset almost everywhere in central London, and this is the clearest case.",
      locations: [
        {
          lat: 51.539,
          lng: -0.1625,
          precision: "exact",
          facing: "SE",
          facingNote:
            "southeast to the same skyline, BT Tower and the Shard, at dawn when the light comes up over the east side and the paths are empty",
        },
      ],
    },
    {
      title: "St Dunstan in the East",
      blurb:
        "Church ruins between Tower and Monument that the trees have quietly taken over. Weekday mornings give you soft light and empty frames. Shoot through the gothic window arches and let the greenery do the rest.",
      locations: [
        {
          lat: 51.5097,
          lng: -0.0825,
          precision: "exact",
          facingNote:
            "through the gothic window arches, letting the greenery do the rest; weekday mornings are soft and empty",
        },
      ],
    },
    {
      title: "Tower Bridge from the south bank",
      blurb:
        "Set up near Shad Thames and Butler's Wharf, and set up early: morning blue hour rolling into sunrise gets you warm light and empty walkways. Evening blue hour works for the illuminated version, but you'll be elbowing for parapet. The pros pick the morning, every time.",
      locations: [
        {
          lat: 51.5055,
          lng: -0.0754,
          precision: "approximate",
          label: "Tower Bridge, shot from the south bank",
          facingNote:
            "set up near Shad Thames and Butler's Wharf, and set up early: morning blue hour into sunrise beats the evening scrum",
        },
      ],
    },
    {
      title: "The Garden at 120 and One New Change",
      blurb:
        "Two free City rooftops with no ticket gymnastics required. The Garden at 120 near Fenchurch Street lines up Tower Bridge and the Gherkin; One New Change's terrace puts St Paul's dome head-on, strongest at sunset when the stone goes warm. Entry rules do change, so check before you build an evening around them.",
      locations: [
        {
          lat: 51.5123,
          lng: -0.0808,
          precision: "approximate",
          label: "The Garden at 120",
          facingNote:
            "Tower Bridge and the Gherkin from here; St Paul's head on from One New Change, a separate rooftop, strongest at sunset",
        },
      ],
    },
  ],
};

const manchester: City = {
  slug: "manchester",
  name: "Manchester",
  countrySlug: "united-kingdom",
  countryName: "United Kingdom",
  contentStatus: "published",
  tagline: "Music, brick, and drizzle.",
  intro:
    "Manchester grew two Michelin stars in a converted mill district and still does some of its best work in a curry caff where you order by pointing. Bring a coat that shrugs off drizzle, because the city has no intention of waiting for it to stop.",
  stay: {
    title: "The Cow Hollow Hotel, Northern Quarter",
    blurb:
      "A restored Victorian textile warehouse on Newton Street at the NQ's edge, independent and husband-and-wife owned, with the whole record-shop-and-curry-caff circuit above in walking distance and Ancoats an easy stroll. The tagline says music, brick and drizzle, and the building supplies two of the three; the sky handles the rest.",
    url: "https://www.expedia.com/Manchester-Hotels-The-Cow-Hollow-Hotel.h22488566.Hotel-Information",
  },
  cultureTips: [
    "Recalibrate from London, because people talk to you here and that's normal; chat with the bartender, and a cheers, driver on the way off the bus is a genuine northern custom worth adopting.",
    "On the Metrolink, buy or tap in before you board; there's no conductor, and inspections carry penalty fares.",
    "Pub grammar runs like London's but gets taken more seriously here: order at the bar, honour your rounds, and know that ducking one is remembered.",
    "Don't assume everyone supports United; the City and United split runs through families, so on matchdays check whose pub you're in before wearing colours.",
    "Tipping means checking the bill for a service charge first, then roughly ten percent for table service and nothing at the bar, and the same law sends all of it to staff.",
  ],
  eats: [
    {
      title: "Higher Ground, city centre",
      blurb:
        "Small plates dictated by the owners' own organic farm out in Cheshire, which means the menu answers to the weather rather than to a chef's ego. It was named the top restaurant in the UK at the National Restaurant Awards and somehow stayed unflashy: whole-animal butchery, vegetables taken seriously, no tasting-menu ceremony. Mancunians rate it for precisely that.",
    },
    {
      title: "Erst, Ancoats",
      blurb:
        "The room that made the case for Ancoats: minimalist wine-bar cooking with a light touch that local and national critics keep returning to. The puffed flatbread is the cult order; add oysters and the steak tartare, and drink whatever natural thing they point you at. Walk-in bar seats mean you can treat it as a drop-in rather than a project.",
    },
    {
      title: "This & That, Northern Quarter",
      blurb:
        "A curry caff down a Northern Quarter side street where the name is the ordering system: rice, then point at three things. They'll tell you this is where rice-and-three was invented back in 1984, and nobody in this city seems keen to argue. Lunchtime is prime, when the queue is cabbies, students and office workers standing in the same line.",
    },
    {
      title: "Mughli Charcoal Pit, Rusholme",
      blurb:
        "The Curry Mile is mostly shisha smoke these days, so walk past all of it to Mughli, which has held the strip's standard since 1991. Order off the koyla section (tandoori chicken thighs, charred lamb chops, the scorpion prawns) and let the charcoal do the talking. This is the family-run place locals send you to when you ask whether the Mile is still any good.",
    },
    {
      title: "Idle Hands, Northern Quarter",
      blurb:
        "Specialty coffee with a rotating guest roaster and brunch worth the queue: Turkish eggs, homemade pies, filter that changes with whoever's roasting that month. It sits inside a tight NQ circuit with North Tea Power over on Tib Street and roastery-led Ancoats Coffee Co at Royal Mills. Do all three in a morning if you're brave about caffeine.",
    },
  ],
  experiences: [
    {
      title: "Salford Lads Club, Ordsall",
      blurb:
        "The red-brick 1903 boys' club from the sleeve of The Queen Is Dead, still a working youth club rather than a museum; visitors from 73 countries turned up in a single year and the kids' sessions kept running regardless. Open days are limited and you can't book, so check which days before crossing the river, then see the Smiths Room and the old boxing gym. Photograph the doorway from across the street like the album, and leave a donation, because the visits fund the club.",
    },
    {
      title: "Chetham's Library guided tour",
      blurb:
        "The oldest free public reference library in the English-speaking world, in continuous use since 1653 inside a sandstone complex from 1421, with the window seat where Marx and Engels worked. Access is by pre-booked guided tour only, since the site is shared with a working music school, and the slots sell out. Book weeks ahead. Most Mancunians have never been; the ones who have never shut up about it.",
    },
    {
      title: "Northern Quarter record-shop crawl",
      blurb:
        "They call the NQ Vinyl Valley and it's earned. Piccadilly Records has been on Oldham Street since 1978 and its hand-written staff review cards are the best free read in Manchester; Vinyl Exchange handles secondhand, Eastern Bloc is the dance and techno import legend, and Vinyl Resting Place is up inside Afflecks, four storeys that are an experience on their own. These shops predate and outlived Madchester, and the staff recommendation is the real souvenir.",
    },
    {
      title: "Mackie Mayor, Swan Street",
      blurb:
        "A restored Victorian market hall reborn as a communal food hall: pizza, rotisserie, tacos, coffee and local beer under one roof, shared tables, no decisions required. It's the blueprint every other food hall in Greater Manchester copied afterwards. Locals default to it when nobody can agree, so go off-peak if you'd like to actually sit down.",
    },
    {
      title: "Castlefield canal-basin wander",
      blurb:
        "Roman fort site turned Victorian canal junction: narrowboats, iron viaducts and waterside pubs stacked into one compact basin. Loop it from Deansgate, get a pint canalside, and look up at the 1892 steel viaduct from underneath. The sky park up on the viaduct is shut for works, which is no loss; the view from the water was always the better one, and summer evenings down here are a genuine local ritual.",
    },
  ],
  photoSpots: [
    {
      title: "Castlefield canal basin at golden hour",
      blurb:
        "Sunset warms all that red brick, and on a still day the canal hands you a mirror under the viaducts. Line the water up towards town and Beetham Tower stacks in behind the older buildings. Plan the evening around this one.",
      locations: [
        {
          lat: 53.4758,
          lng: -2.2557,
          precision: "neighborhood",
          facing: "E",
          facingNote:
            "east along the water toward town, where Beetham Tower stacks in behind the older brick",
        },
      ],
    },
    {
      title: "New Islington Marina and the Ancoats canals",
      blurb:
        "Calm mornings turn the marina to glass: the red bridge, the mill conversions, Halle St Peter's over at Cutting Room Square. If mist sits behind Islington Wharf you get moody frames for free. Shoot it before the coffee wears off, then walk back into Ancoats for breakfast.",
      locations: [
        {
          lat: 53.4828,
          lng: -2.2235,
          precision: "exact",
          facingNote:
            "across the glassy marina at the red bridge and the mill conversions, with Halle St Peter's over at Cutting Room Square",
        },
      ],
    },
    {
      title: "Northern Quarter backstreets",
      blurb:
        "Murals left over from the Cities of Hope festival plus plain red-brick grit around Stevenson Square and Tib Street. Skip the main drags and work the alleys instead. Overcast light works fine here, which in this city is a considerable relief.",
      locations: [
        {
          lat: 53.4835,
          lng: -2.2351,
          precision: "neighborhood",
          facingNote:
            "into the alleys around Stevenson Square and Tib Street rather than the main drags; overcast light is fine here",
        },
      ],
    },
    {
      title: "St Peter's Square and Central Library",
      blurb:
        "The Pantheon-shaped rotunda with tram lines running past for leading depth. Shoot low to the ground so the rails pull the eye in. Come back after dark, keep the camera on the pavement, and wait for two trams to cross for the light-trail version.",
      locations: [
        {
          lat: 53.4781,
          lng: -2.2432,
          precision: "exact",
          facingNote:
            "low to the ground so the tram rails pull the eye toward the rotunda, then after dark wait for two trams to cross",
        },
      ],
    },
    {
      title: "Salford Quays and MediaCityUK",
      blurb:
        "Blue hour lights the towers and the docks hand them straight back to you. The footbridges are built for symmetry, so use them. The Lowry's angular steel is worth a frame or two on the way past.",
      locations: [
        {
          lat: 53.4727,
          lng: -2.2927,
          precision: "neighborhood",
          facingNote:
            "off the footbridges, which are built for symmetry, at blue hour when the docks hand the tower lights back",
        },
      ],
    },
  ],
};

const nottingham: City = {
  slug: "nottingham",
  name: "Nottingham",
  countrySlug: "united-kingdom",
  countryName: "United Kingdom",
  contentStatus: "published",
  tagline: "Caves below, folklore above.",
  intro:
    "Nottingham keeps its best rooms underground: 800-odd sandstone caves, pub cellars carved into a cliff, and a Michelin-listed counter you can only reach if somebody tells you which arch to walk through. Do Robin Hood sideways and spend the time you save eating.",
  stay: {
    title: "Lace Market Hotel, High Pavement",
    blurb:
      "A Georgian townhouse conversion on High Pavement itself, in the Lace Market conservation area steps from St Mary's, which is the exact street the alleys spot above tells you to shoot. The Contemporary and the Hockley streets are a few minutes on foot, and when the rain starts doubling the cobbles you're already there.",
    url: "https://www.expedia.com/Nottingham-Hotels-Lace-Market-Hotel.h462414.Hotel-Information",
  },
  cultureTips: [
    "If a stranger calls you duck, that's East Midlands friendliness rather than flirtation; they say it to everyone.",
    "On the NET trams, buy or validate before you board; nothing is sold on board and inspectors issue penalty fares.",
    "The famous old pubs are working locals, not museums, so order at the bar, keep your rounds, stay out of the cave rooms unless invited, and ask before photographing staff mid-shift.",
    "At Trent Bridge, stay seated until the end of the over and keep still behind the bowler's arm; the stewards holding you at the stairs are protecting the batter's sightline.",
    "Standard UK grammar applies here too: queues, bar ordering, and check-the-bill tipping, with the same law sending every service charge to staff.",
  ],
  eats: [
    {
      title: "Kushi-ya, off Long Row",
      blurb:
        "The city's proudest secret: a Bib Gourmand counter grilling Japanese kushiyaki skewers over charcoal, hidden up an alley through the arch of Enfield Chambers. Finding the door is half the local initiation, and Notts foodies treat it as a badge. Book ahead, take a counter seat, and go skewers, then the chicken katsu sando, then the miso tiramisu.",
    },
    {
      title: "Bar Iberico, Hockley",
      blurb:
        "Tapas off a Josper grill from the restaurant family that basically trained Nottingham's modern food scene; Kushi-ya traces back to it too. Charcuterie, charred flatbreads, and whatever came off the grill blackened that day. If you're still going, the sibling room over in the Lace Market does the padron peppers.",
    },
    {
      title: "The Cod's Scallops, Sherwood",
      blurb:
        "A chippy that takes itself seriously in the right way: MSC-certified fish and a proper fishmonger's counter attached to the fryers. Cod and chips is the correct order, but going strange pays off too: Brixham monkfish goujons, tempura soft-shell crab. The suburban locations mean the queue is locals doing Friday tea rather than anyone with a camera.",
    },
    {
      title: "Sexy Mamma Love Spaghetti, Hockley",
      blurb:
        "Yes, that's the name. A tiny, eccentric Italian with hand-written menus and home-style plates, the sort of one-off room that runs on charm and consistency rather than polish. Get the rich beef ragù and the homemade tiramisu, and check it's open before you build an evening around it, because small indies here come and go.",
    },
    {
      title: "The Specialty, Friar Lane",
      blurb:
        "Voted the city's favourite independent business, and a multi-roaster filter shop with beans rotating in from roasters worldwide. Don't overthink it: ask the counter to pick your filter and let them talk you through it, because they want to. Nottingham's coffee bench is deep for its size: 200 Degrees was born here, Outpost roasts on site, Cartwheel roasts out in Beeston, and Tough Mary's Bakehouse on Derby Road sells out of filled doughnuts, so go in the morning.",
    },
  ],
  experiences: [
    {
      title: "Go underground at City of Caves",
      blurb:
        "Nottingham sits on the UK's largest man-made cave network: 800-plus chambers cut into soft sandstone and used over the centuries as a medieval tannery, pub cellars and WWII air-raid shelters. Pre-booking is essential. The guided performance tours with the costumed archaeologist characters are considerably more fun than the self-guided audio, and locals who grew up on the school trip still bring visitors back.",
    },
    {
      title: "Hockley and Cobden Chambers independent crawl",
      blurb:
        "The creative quarter, and the densest few walkable streets of vintage, vinyl and indie retail in the city: COW Thrift and White Rose for clothes, Rough Trade for records and in-store gigs, micro-shops around the Cobden Chambers courtyard. This is where the city's students, musicians and designers actually spend a Saturday. Finish with tapas, or with jazz at Peggy's Skylight, which has live gigs every weekend.",
    },
    {
      title: "Sneinton Market Avenues",
      blurb:
        "A 1938 fruit market reborn in 2015 as pastel-fronted workshops for independents: a microbrewery taproom, a bean-to-bar chocolate maker, an award-winning baker using locally milled flour, a vegan deli. Saturday is the day to wander it. If your trip lands on one of the themed pagan markets (Beltane, Samhain, Yuletide) or the June festival, reshuffle the whole itinerary to be there.",
    },
    {
      title: "Nottingham Contemporary",
      blurb:
        "One of the UK's largest contemporary art galleries, free to walk into, built into the Lace Market's cliff edge with lace patterns cast right into the concrete facade. Locals treat it as the default rainy-afternoon plan and first-date venue, which in this country counts as a strong endorsement. There's a cafe-bar below for the debrief.",
    },
    {
      title: "Goose Fair, Forest Recreation Ground",
      blurb:
        "Ten days each autumn, medieval roots, 400-plus rides, and half a million people who are overwhelmingly from round here: this is Nottingham's homecoming week rather than a tourist event. In 2026 it runs 25 September to 4 October; take the tram to The Forest and go after dark for the lights. Food canon: mushy peas with mint sauce first, hot doughnuts last, cocks-on-sticks somewhere in the middle.",
    },
  ],
  photoSpots: [
    {
      title: "Wollaton Hall and Deer Park",
      blurb:
        "An Elizabethan hall on a grassy hill, free to walk the park, fifteen minutes from town, and doubling as Wayne Manor in The Dark Knight Rises if that's your sort of thing. Shoot up the tree-lined slope at golden hour; autumn is peak, with rutting-season mist and colour and free-roaming red and fallow deer in frame. Keep your distance from the deer; that rule is enforced in autumn, and rightly.",
      locations: [
        {
          lat: 52.948,
          lng: -1.2098,
          precision: "exact",
          facingNote:
            "up the tree lined slope at golden hour with the deer in frame, and keep your distance from them in autumn",
        },
      ],
    },
    {
      title: "Castle Rock and Ye Olde Trip to Jerusalem",
      blurb:
        "The white pub with its name painted across the side, wedged against the sandstone cliff below the castle. Late-afternoon side light warms the rock; shoot from the Brewhouse Yard and Castle Boulevard angle. The wall says oldest inn in England, a claim locals repeat with a wink, and the rear rooms are literally caves cut into the cliff, so go in for a Castle Rock beer in the cave snug afterwards.",
      locations: [
        {
          lat: 52.9493,
          lng: -1.1526,
          precision: "exact",
          facingNote:
            "from the Brewhouse Yard and Castle Boulevard angle, with late side light warming the sandstone behind the pub",
        },
      ],
    },
    {
      title: "Old Market Square and the Council House lions",
      blurb:
        "Blue hour lights the dome, and the stone lions sit below it doing the city's most important job: \"meet you at the Left Lion\" is the local rendezvous, the left-hand one specifically. The square gets redressed through the year with the Christmas market, a big wheel, a summer beach, so the frame is never quite the same twice.",
      locations: [
        {
          lat: 52.9534,
          lng: -1.1499,
          precision: "exact",
          facingNote:
            "the dome at blue hour with the stone lions below it; the left one is where the city arranges to meet",
        },
      ],
    },
    {
      title: "Lace Market alleys",
      blurb:
        "Red-brick Victorian warehouses, narrow alleys and iron railings around High Pavement and St Mary's Church. Low golden light works, but rain works better: wet cobbles hand everything back to you doubled. Pair it with the lace-cast concrete of the Contemporary a minute away.",
      locations: [
        {
          lat: 52.9523,
          lng: -1.1431,
          precision: "neighborhood",
          facingNote:
            "the alleys and iron railings around High Pavement and St Mary's; rain beats golden light here",
        },
      ],
    },
    {
      title: "Sky Mirror at Nottingham Playhouse",
      blurb:
        "Anish Kapoor's six-metre polished-steel dish out on Wellington Circus. The trick is shooting what's in the mirror rather than the mirror itself: the inverted city, the sky, the Playhouse neon at dusk. Overcast skies give you the most abstract frames, which is a genuinely useful thing to know in the Midlands.",
      locations: [
        {
          lat: 52.954,
          lng: -1.1562,
          precision: "exact",
          facingNote:
            "at what is in the mirror rather than the mirror itself: the inverted city, the sky, the Playhouse neon at dusk",
        },
      ],
    },
  ],
};

const tokyo: City = {
  slug: "tokyo",
  name: "Tokyo",
  countrySlug: "japan",
  countryName: "Japan",
  contentStatus: "published",
  tagline: "Counters, basements, under the tracks.",
  intro:
    "Tokyo's best eating happens standing at a counter, down a basement staircase, or under a railway arch, and a shocking amount of it is cheap. Just check the last train before the third round, because the line on our Japan page wasn't a joke.",
  stay: {
    title: "Onsen Ryokan Yuen Shinjuku, east Shinjuku",
    blurb:
      "A modern urban ryokan whose rooftop open-air bath runs on real hot-spring water brought in from Hakone, so the onsen etiquette this page keeps drilling pays off without leaving the building. Nakajima's basement, the depachika counters and the free observatory are all on foot.",
    url: "https://www.expedia.com/Tokyo-Hotels-ONSEN-RYOKAN-YUEN-SHINJUKU.h34146464.Hotel-Information",
  },
  cultureTips: [
    "Stand on the left on escalators, though operators now ask everyone to just stand full stop; walking the right side is fading etiquette, not a rule.",
    "Trains are treated as quiet space, so phone on silent, no voice calls, and conversations kept low; the operators post it and everyone honors it.",
    "Don't tip anywhere, because staff will genuinely chase you down to return the money; cash goes on the little tray, not hand to hand.",
    "Eat standing near wherever you bought the food instead of walking with it, and carry your trash home, since public bins are genuinely scarce.",
    "Onsen has an order of operations: wash first, bathe naked, keep the small towel out of the water, and check tattoo policies ahead because plenty of places still restrict them.",
  ],
  eats: [
    {
      title: "Tonki (Meguro)",
      blurb:
        "Frying tonkatsu since 1939 and barely touched since the seventies renovation, which is the whole appeal. Order the rosu teishoku, take the cabbage and rice refills, and watch the all-white-clad team work the open kitchen. You queue along the counter wall and the man carving katsu somehow tracks twenty heads in order without writing anything down, so trust the system and don't flag anyone down.",
    },
    {
      title: "Shinjuku Kappo Nakajima",
      blurb:
        "A one-Michelin-star kappo kitchen in a nondescript Shinjuku basement that serves an iwashi teishoku at lunch, routinely cited as one of the cheapest starred meals anywhere on Earth. Sardines fried or simmered, zero ceremony, walk-ins only. The line is all suits, so get there before the office crowd if you want the first seating.",
    },
    {
      title: "Harukiya Honten (Ogikubo)",
      blurb:
        "Founded in 1949, this is one of the shops that turned Ogikubo into a ramen pilgrimage and codified Tokyo shoyu: a clear chicken and pork broth with niboshi doing the quiet heavy lifting. Order the chuka soba, add wontonmen if you skipped lunch. Worth knowing the shop was handed to a larger restaurant group when there was no successor to take it on, framed as preserving the recipe, so go curious rather than reverent.",
    },
    {
      title: "Uogashi Nihon-Ichi (standing sushi)",
      blurb:
        "Tachigui, meaning you stand, you order, you leave. Market-grade nigiri ordered two pieces at a time straight from the chef: aji, seared engawa or otoro if it's chalked up, tamago to finish, beer in your other hand. Branches behind Yodobashi at Shinjuku's west exit and under the tracks at Yurakucho, and the standing format keeps the lingerers out.",
    },
    {
      title: "Café de l'Ambre (Ginza)",
      blurb:
        "Coffee only since 1948, and the sign literally says so. Thirty-plus single origins from green beans aged for years, hand-roasted and nel-dripped, plus the Blanc et Noir, which arrives cold and dense and layered like a cocktail. The founder ran the place until he died at over 100 and his team still works his exact method. Kissaten rule: one drink buys you the seat for as long as you want it, and asking for food marks you instantly.",
    },
  ],
  experiences: [
    {
      title: "An evening soak at Koganeyu (Sumida)",
      blurb:
        "A 1932 neighborhood bathhouse rebuilt in 2020 by architect Jo Nagasaka with a craft beer tap at the front counter and a DJ booth, which is how a dying institution stays alive. Tokyo loses dozens of sento a year; this one works so well it opened a second branch. Wash sitting down before you get in the tub, keep the small towel out of the water, fold it on your head like the old guys, and check the current tattoo policy first if that applies to you.",
    },
    {
      title: "Yanesen at dusk",
      blurb:
        "The Yanaka, Nezu and Sendagi triangle survived the war, so it still reads like mid-century Tokyo: a short shotengai of around sixty family shops, cemetery lanes, tiny temples. Arrive about an hour before sunset, graze your way down the arcade with a menchi-katsu croquette in hand, and finish at the Yuyake Dandan sunset stairs. Weekday evenings, since weekends belong to day-trippers.",
    },
    {
      title: "A Yakult Swallows game at Meiji Jingu Stadium",
      blurb:
        "The 1926 ballpark where Babe Ruth played, and it's on the clock. Redevelopment started in 2025 and the Swallows are expected to hold this ground only until roughly 2031 before demolition, which makes this a genuine now-or-never. Sit in the cheap outfield seats, buy a beer off a uriko vendor with a keg on her back, and get yourself a tiny team umbrella outside the gate, because when the Swallows score everyone opens one and sings.",
    },
    {
      title: "A Chuo line night in Koenji",
      blurb:
        "Koenji is Tokyo's scruffy counterculture suburb: vintage racks, punk live houses, and cheap izakaya crammed around the elevated rail arches. Start on the Junjo Shotengai side, drink where the counter is full of locals, then follow noise. One train line strings this together with Harukiya's ramen in Ogikubo and Asagaya's arcades in between, which makes it the best no-plan evening in the city, at roughly half of what Golden Gai charges.",
    },
    {
      title: "A depachika run for dinner",
      blurb:
        "The basement food floors at Isetan Shinjuku or Mitsukoshi are obsessive, beautiful food retail, and buying dinner down there is a real commuter ritual rather than a tourist hack. Go in the evening when the prepared-food counters start putting discount stickers on things and follow the office workers. Build a picnic out of a tonkatsu sando, a couple of salads and one absurdly perfect piece of fruit, then eat it by the river or back at the hotel, since most parks shut at dusk.",
    },
  ],
  photoSpots: [
    {
      title: "Tokyo Metropolitan Government observatory",
      blurb:
        "A 202m panorama in Shinjuku, free, no reservation, which still feels like a clerical error. On clear winter evenings you get Fuji silhouetted behind the skyline. Arrive around forty minutes before sunset and shoot straight through golden hour into blue hour, and check which deck is actually open before you go, because the two decks keep different closure days.",
      locations: [
        {
          lat: 35.6895,
          lng: 139.6917,
          precision: "exact",
          facing: "SW",
          facingNote:
            "southwest on a clear winter evening, when Fuji comes up silhouetted behind the skyline; check which deck is open first",
        },
      ],
    },
    {
      title: "Senso-ji at dawn",
      blurb:
        "The only way this checklist item earns a slot. Go at first light, when Nakamise's shutters are down with their murals painted across them, the grounds are empty but open, and the light is flat-out better than anything you'll get later. By mid-morning it's a moving crowd photo.",
      locations: [
        {
          lat: 35.7134,
          lng: 139.7955,
          precision: "exact",
          facingNote:
            "down Nakamise at first light, when the shutters are still down with their murals painted across them",
        },
      ],
    },
    {
      title: "The Meguro River canal, Nakameguro",
      blurb:
        "The tree-lined canal down to Ikejiri-Ohashi, with shopfront lights doubling in the water. Shoot from the small bridges down the canal axis at blue hour. Everyone knows it as the cherry blossom tunnel and in that short window it's a scrum, but the rest of the year the frame is basically yours.",
      locations: [
        {
          lat: 35.6443,
          lng: 139.6992,
          precision: "approximate",
          facing: "NW",
          facingNote:
            "northwest from the small bridges, straight down the canal axis, with the shopfront lights doubling in the water",
        },
      ],
    },
    {
      title: "Omoide Yokocho at blue hour",
      blurb:
        "Steam, red lanterns and yakitori smoke in the narrow alleys by Shinjuku's west exit, about twenty minutes after sunset when the sky still has color in it. Shoot wide from the alley mouths, be quick, be polite, the staff are over it. Photograph it, then go eat somewhere else, because the pricing in there stopped being local a while ago.",
      locations: [
        {
          lat: 35.693,
          lng: 139.6997,
          precision: "exact",
          facingNote:
            "wide from the alley mouths about twenty minutes after sunset, while the sky still has colour; be quick and be polite",
        },
      ],
    },
    {
      title: "Zojoji Temple with Tokyo Tower behind",
      blurb:
        "The 1622 Sangedatsumon gate and the main hall with Tokyo Tower rising directly behind them, which is the cleanest old-versus-new stack the city offers. Come about half an hour before sunset for warm light on the temple and stay through dusk for the tower lighting. Shiba Park and the Akabanebashi crossing nearby give you street-level tower frames on the walk out.",
      locations: [
        {
          lat: 35.6573,
          lng: 139.7483,
          precision: "exact",
          facing: "NW",
          facingNote:
            "northwest so Tokyo Tower stacks up directly behind the Sangedatsumon gate, then stay for the tower lighting",
        },
      ],
    },
  ],
};

const osaka: City = {
  slug: "osaka",
  name: "Osaka",
  countrySlug: "japan",
  countryName: "Japan",
  contentStatus: "published",
  tagline: "Photograph Dotonbori, eat behind it.",
  intro:
    "Osaka's stated philosophy is kuidaore, eat yourself broke, and locals do it in arcades and alleys one block off the neon rather than on the main drag. Also, they stand on the right side of the escalator here, which is the fastest way to out yourself as a Tokyo transplant.",
  stay: {
    title: "Cross Hotel Osaka, Shinsaibashi",
    blurb:
      "On the Shinsaibashi arcade a minute from Ebisubashi, which means the empty-bridge Glico shot happens in slippers before the city wakes up and the Hozenji lanterns are a short stroll after dinner. A Japanese-run design hotel parked exactly between the photograph-it and eat-behind-it halves of this page.",
    url: "https://www.expedia.com/Osaka-Hotels-Cross-Hotel-Osaka.h6311.Hotel-Information",
  },
  cultureTips: [
    "Stand on the right on escalators, the exact reverse of Tokyo, a habit dating to a 1967 Umeda Station announcement; official guidance now says don't walk on them at all.",
    "Street smoking has been banned across the whole city since January 2025, vaping included, with a 1,000 yen on-the-spot fine.",
    "Kushikatsu gets one dip in the shared sauce, no double-dipping; the free cabbage is there to spoon more over your skewer.",
    "Street food is more tolerated here than anywhere else in Japan, but finish it standing by the stall and hand the skewers back, because bins are as scarce as ever.",
    "The small appetizer you didn't order at an izakaya is otoshi, a seating charge rather than a scam, so don't fight it.",
  ],
  eats: [
    {
      title: "Yaekatsu (Janjan Yokocho, Shinsekai)",
      blurb:
        "Seventy-odd years of frying skewers in an alley about two and a half meters wide, and still the locals' pick over the big chain. Order in small rounds, three beef kushikatsu to start, add doteyaki and whatever vegetable is in season as you go, and let the fryer set the pace. The one law: one dip in the communal sauce, never two. Use the free cabbage to spoon more onto a bitten skewer.",
    },
    {
      title: "Hanadako (Umeda)",
      blurb:
        "The takoyaki Umeda queues for daily, in a Showa-era food alley tucked under the station. It uses raw octopus instead of pre-boiled, which changes the texture completely. Negi-mayo first with its mountain of green onion, classic sauce second for comparison, and wait the ninety seconds before you bite, because the inside is molten and everyone who rushes it regrets it.",
    },
    {
      title: "Usami-tei Matsubaya (Minamisenba)",
      blurb:
        "Kitsune udon was invented right here in 1893, and the origin story writes itself: customers kept sliding their side of sweet fried tofu into the broth until the shop gave up and made it the dish. It's a designated cultural property that behaves like an ordinary office-workers' lunch counter, which is the best thing about it. Get the kitsune udon, then the ojiya udon as the deep cut.",
    },
    {
      title: "Fukutaro Honten (Ura-Namba)",
      blurb:
        "The honest answer to where Osakans actually eat okonomiyaki, and the move here is negiyaki, loaded with green onion and brushed with soy rather than sauce. Pork for the standard, suji-negiyaki with beef tendon for the classic. Eat it straight off the teppan with the little spatula, and expect a line of mostly Japanese diners even on a weeknight.",
    },
    {
      title: "Sennariya Coffee (Janjan Yokocho)",
      blurb:
        "Open since 1948 and credited with inventing mixed juice, Osaka's madeleine: banana, mikan, apple and pineapple blended with milk and ice, originally a fruit shop's trick for using up overripe stock. Every kissaten in the city does one now; this is the one that claims the original. Mix juice, thick toast, a hand drip, mid-morning between kushikatsu stops.",
    },
  ],
  experiences: [
    {
      title: "A tachinomi crawl in Tenma",
      blurb:
        "Japan's densest standing-bar territory sits behind the Tenjinbashisuji arcade, and the math is simple: standing is cheap, so three bars beats one restaurant every time. Start in the alleys near JR Temma on a weekday evening, walk into the places where the counter is already full of locals, order the day's sashimi or something stewed plus a highball, pay before you leave, move on after half an hour. There are almost no English menus and you won't need one.",
    },
    {
      title: "Walk Tenjinbashisuji end to end",
      blurb:
        "Japan's longest covered arcade, 2.6 km of sembei shops, fishmongers, kimono resale and old lunch counters, refreshingly unbothered by tourism. Enter at 1-chome, come out at 7-chome, or bail into Tenma's bars at halfway, which is what we'd do. Late afternoon for the shopping bustle, with Osaka Tenmangu shrine at the south end. Best free anthropology in the city.",
    },
    {
      title: "Hanshin Tigers at Koshien",
      blurb:
        "Tigers fandom is Osaka identity in concentrate: loud, communal, cheerfully self-deprecating. Koshien opened in 1924, wears ivy on its outfield walls, and sits about fifteen minutes out on the Hanshin line. Sit in the outfield with the ultras, learn a couple of the player chants, and stay for the seventh-inning balloon launch. If the Tigers are on the road, the Orix Buffaloes at Kyocera Dome are the in-city fallback.",
    },
    {
      title: "Nakazakicho, the neighborhood the bombs missed",
      blurb:
        "A pocket of pre-war wooden rowhouses about ten minutes' walk from Umeda's skyscrapers, now full of one-room cafes, tiny vintage shops and indie galleries run by young owners. Gentrification at Osaka scale, which is to say it stayed cheap and slightly shambolic. No list needed, the alleys are the point, and the coffee density is the highest in the city. Weekday afternoons before the weekend day-trippers arrive.",
    },
    {
      title: "A retro night in Shinsekai",
      blurb:
        "After dark Shinsekai is Showa-era Osaka preserved in neon, and it deserves an evening rather than a meal stop. Kushikatsu first, then an hour in the old game parlors playing smart ball, a pre-pachinko marble game that has no business still existing, then blue-hour photos of Tsutenkaku. The area is gritty by Japanese standards and completely safe by any other, so just carry your stuff normally.",
    },
  ],
  photoSpots: [
    {
      title: "Umeda Sky Building's Floating Garden",
      blurb:
        "An open-air roof ring 173m up with a 360-degree view over the Yodo River and the city grid, and Osaka's definitive skyline frame. Get a slot for about an hour before sunset, shoot the sun going down over the river, then stay half an hour into blue hour. The escalator tube between the two towers is a shot in itself on the way up.",
      locations: [
        {
          lat: 34.7053,
          lng: 135.4905,
          precision: "exact",
          facing: "W",
          facingNote:
            "west over the Yodo River for the sun going down, then stay half an hour into blue hour for the grid",
        },
      ],
    },
    {
      title: "Tsutenkaku from the Shinsekai streets",
      blurb:
        "The tower framed at the end of a neon canyon, or shot from inside Janjan Yokocho with the lantern signage crowding the edges. Scout your angles in late afternoon and shoot twenty to thirty minutes after sunset, when the neon and the sky finally balance. The tower's colors change, and locals will tell you they're forecasting tomorrow's weather.",
      locations: [
        {
          lat: 34.6525,
          lng: 135.5063,
          precision: "approximate",
          label: "Tsutenkaku, shot from the streets below",
          facingNote:
            "from the neon canyon of the Shinsekai streets or inside Janjan Yokocho, twenty to thirty minutes after sunset",
        },
      ],
    },
    {
      title: "The Glico sign from Ebisubashi",
      blurb:
        "The most photographed spot in Kansai, so timing is the entire technique. Blue hour gets you the neon doubled in the canal along with everyone else's elbows; early morning gets you an empty bridge and soft light on the water. For reflections without the bridge scrum, drop down to the Tombori riverwalk or shoot from a river cruise seat.",
      locations: [
        {
          lat: 34.6691,
          lng: 135.5013,
          precision: "exact",
          facingNote:
            "the neon doubled in the canal at blue hour, or an empty bridge and soft water early; drop to the Tombori riverwalk to skip the scrum",
        },
      ],
    },
    {
      title: "Hozenji Yokocho",
      blurb:
        "A stone-paved lantern alley one block from Dotonbori's chaos, plus Mizukake Fudo, a Buddhist statue so thoroughly shagged in moss from decades of worshippers throwing water at it that you can barely find the stone. Come at dusk when the lanterns come on and the dinner crowds haven't. Throw water on the statue, that's the ritual and it's encouraged, then shoot the moss close-up while it's still glistening.",
      locations: [
        {
          lat: 34.6682,
          lng: 135.5027,
          precision: "exact",
          facingNote:
            "down the stone paved lantern alley at dusk, before the dinner crowds; throw water on the mossy Mizukake Fudo first, that is the ritual",
        },
      ],
    },
    {
      title: "Osaka Castle from Nishinomaru Garden",
      blurb:
        "The keep over its stone ramparts and moat, with Nishinomaru's lawn giving you the wide classic frame and Gokurakubashi bridge the tight reflection. Morning golden hour beats sunset here, since the light lands on the keep's face and the tour buses haven't unloaded yet. The grounds open early enough for that light; the garden itself is ticketed.",
      locations: [
        {
          lat: 34.6871,
          lng: 135.5231,
          precision: "exact",
          facing: "E",
          facingNote:
            "east to the keep over its ramparts and moat, the lawn for the wide frame and Gokurakubashi for the tight reflection",
        },
      ],
    },
  ],
};

const kyoto: City = {
  slug: "kyoto",
  name: "Kyoto",
  countrySlug: "japan",
  countryName: "Japan",
  contentStatus: "published",
  tagline: "Before eight, or after five.",
  intro:
    "Everything famous in Kyoto belongs to the crowds in the middle of the day, so the whole trick is to get up early and eat late. Do that and the city hands you empty torii gates, jet-black ramen for breakfast, and a bathhouse still open at an hour when nothing else is.",
  stay: {
    title: "Solaria Nishitetsu Hotel Kyoto Premier, Kiyamachi at Sanjo",
    blurb:
      "A Japanese-run low-rise beside the Kamo river where Kiyamachi hits Sanjo, with Pontocho's north mouth, the dinner picks above and a flat riverside walk to the delta stepping stones all from the door. The whole before-eight-or-after-five trick only works if you sleep at the hinge of it, and this is the hinge.",
    url: "https://www.expedia.com/Kyoto-Hotels-SOLARIA-Nishitetsu-Hotel-Kyoto-Premier.h17040479.Hotel-Information",
  },
  cultureTips: [
    "Gion's private lanes are closed to visitors outright, with a posted 10,000 yen penalty for photos and entry itself barred since 2024; stick to public streets like Hanamikoji and Shirakawa, and remember the geiko and maiko are workers commuting.",
    "At Nishiki Market, eat standing in front of the stall you bought from, never while walking; it's the merchant association's number-one posted rule.",
    "Street smoking is banned citywide outside designated areas, with a 1,000 yen fine in the enforcement zones.",
    "Shrines and temples run on different scripts: bow at the torii, rinse at the temizuya, and clap only at shrines, while temples want shoes off and no photos wherever the signs say so.",
    "City buses board at the rear and take a flat fare on your way out the front, and think twice about hauling a big suitcase aboard; the city has spent years asking visitors to use luggage delivery instead.",
  ],
  eats: [
    {
      title: "Oryori Menami (Kiyamachi-Sanjo)",
      blurb:
        "The obanzai standard-bearer since 1939, started by the current owner's grandmother. Obanzai is Kyoto home cooking, seasonal and restrained, and the counter format is how Kyotoites actually eat it, since kaiseki is for occasions. Sit at the counter, look at the big bowls of the day's dishes lined up in front of you, point, and let the staff pace the meal. Ring ahead for dinner.",
    },
    {
      title: "Shinpuku Saikan Honten (near Kyoto Station)",
      blurb:
        "Here's the plot twist: the city of tofu and restraint drinks nearly black soy broth, and this is likely the shop that started it, a stall from 1938 that became a restaurant in 1945. It looks terrifying and tastes gentle, heaped with Kujo green onions. Chuka soba with extra negi, plus the yakimeshi stained dark with the same sauce, which is what the regulars order. Taxi drivers have been eating it here for breakfast for eighty years.",
    },
    {
      title: "Yamamoto Menzou (Okazaki)",
      blurb:
        "Hand-cut udon with a chew that gets argued about nationally, and a gobo tempura that outsells everything else on the menu. Get the tsukimi with the burdock. The system is the local part: call or turn up when they start taking same-day slots in the morning, then go spend a couple of hours in Okazaki's museums until your turn. Skip that and you're standing outside for two hours, and when the noodles run out the shop closes.",
    },
    {
      title: "Demachi Futaba (Demachiyanagi)",
      blurb:
        "A mochi shop from 1899 whose mame mochi, red bean mochi studded with salty black beans, has a permanent queue of neighborhood grandmothers. They expire the same day you buy them, which is the entire point. Buy two, walk three minutes to the Kamo river delta, and eat them sitting on the stepping stones. Come in the morning, since the good pieces are gone by late afternoon and weekends blow the line out past an hour.",
    },
    {
      title: "Smart Coffee (Teramachi arcade)",
      blurb:
        "A kissaten since 1932, house-roasted coffee, and copper-griddle hotcakes that pretty much define the Kyoto retro-breakfast genre. Hotcakes and the house blend downstairs, with the tamagoyaki sandwich and the French toast as the sleepers. Get there early on a weekday and it's classical music and no queue; leave it a couple of hours and it's a line down the arcade. The second-floor lunch room is the locals' move when downstairs is full.",
    },
  ],
  experiences: [
    {
      title: "A Kamo river delta morning",
      blurb:
        "Where the Kamo and Takano rivers meet is Kyoto's living room: turtle-shaped stepping stones, joggers, students, herons standing around like they pay rent. The Demachi Masugata arcade next to it is the anti-Nishiki, a real neighborhood market where people buy dinner rather than lunch on a stick. Grab mochi and market snacks, eat them on the delta, and go on a weekday morning before the city properly wakes up.",
    },
    {
      title: "Funaoka Onsen (Kita-ku)",
      blurb:
        "A bathhouse so ornate, all carved wooden transoms and majolica tiles, that it's a Registered Tangible Cultural Property you can still soak in for pocket change. It also has one of the country's oldest denki-buro, an electric bath, which is supposed to feel like that. Go in the evening after an afternoon around Kuramaguchi and Daitokuji, rotate through the outdoor tub, and remember it's a working neighborhood bath, so wash seated first and keep the towel out of the water. The grandmothers will correct you kindly.",
    },
    {
      title: "Kobo-san flea market at To-ji, on the 21st",
      blurb:
        "On the 21st of every month the World Heritage temple grounds fill with hundreds of stalls: antiques, tools, plants, street food, and old kimono and obi sold by the pile. It's Kyoto's citywide attic sale and it's been running for centuries. Go early if you want the antiques, haggle gently, and note the buyers around you are mostly dealers and regulars. If your dates overlap the 21st, build the whole day around it.",
    },
    {
      title: "Daimonji-yama at golden hour",
      blurb:
        "The mountain behind Ginkaku-ji, the one carrying the giant 大 character that gets burned into the hillside every summer. It's forty to sixty minutes up from the trailhead and gives you the single best free view over the entire city grid. Time the viewing platform for the hour before sunset and bring a light for the way down, because there's no infrastructure up there and no fee either. Mostly students and local hikers.",
    },
    {
      title: "An Ichijoji evening",
      blurb:
        "A student neighborhood out on the tiny Eizan line that pairs one of the most beautiful bookstores anywhere, Keibunsha Ichijoji, with Kyoto's densest ramen strip along Higashioji-dori. Browse the shop in the late afternoon, then join a queue outside whichever counter has the longest one, because the neighborhood is the point rather than any single shop. English is scarce out here and entirely unnecessary.",
    },
  ],
  photoSpots: [
    {
      title: "Fushimi Inari at dawn",
      blurb:
        "Dawn or don't. The grounds are free and never close, so at first light you can have whole stretches of the vermilion torii tunnels to yourself with soft light filtering between the gates, and by mid-morning the lower mountain belongs to the crowds. Shoot the Senbon Torii double tunnel first, then keep climbing, because the gates thin out dramatically past the first viewpoint and stay empty longest up high.",
      locations: [
        {
          lat: 34.9675,
          lng: 135.7797,
          precision: "approximate",
          facingNote:
            "up through the Senbon Torii double tunnel at first light, then keep climbing, because the gates thin out past the first viewpoint",
        },
      ],
    },
    {
      title: "Yasaka Pagoda from Yasaka-dori",
      blurb:
        "The five-story pagoda rising over a sloped stone lane of machiya roofs, which is Kyoto's most recognizable street composition and, after breakfast, a photo of other people's backs. Shoot uphill from the lower bend of the lane with the lanterns leading your eye in. Pair it with a walk through Ninenzaka and Sannenzaka while the shutters are still down.",
      locations: [
        {
          lat: 34.9985,
          lng: 135.7793,
          precision: "approximate",
          facing: "E",
          facingNote:
            "east and uphill from the lower bend of the lane, with the lanterns leading your eye up to the pagoda",
        },
      ],
    },
    {
      title: "The Kamo delta stepping stones",
      blurb:
        "Turtle and bird-shaped stones across the water, someone mid-leap between them, mountains stacked up behind. Late-afternoon light comes straight down the river valley, so shoot low from the west bank on a weekday. Herons and university rowing crews turn up as reliable extras.",
      locations: [
        {
          lat: 35.0301,
          lng: 135.7717,
          precision: "exact",
          facing: "E",
          facingNote:
            "east from the west bank, shot low, with someone mid leap between the turtle stones and the mountains stacked behind",
        },
      ],
    },
    {
      title: "Gion Shirakawa and Tatsumi Bridge",
      blurb:
        "Willow-hung canal, machiya teahouses, a tiny stone bridge: the Gion postcard without the Gion scrum, and it only works early, when the light is low and the lanes are empty. Photography is restricted on the district's private streets and the rules have tightened more than once, so read the posted signs and shoot where they say you can. Never photograph geiko or maiko without asking first. This is the one thing we'd ask you not to get wrong.",
      locations: [
        {
          lat: 35.0056,
          lng: 135.7745,
          precision: "exact",
          facingNote:
            "the willow hung canal and the little stone bridge early, when the lanes are empty; read the posted signs, and never photograph geiko or maiko without asking",
        },
      ],
    },
    {
      title: "Pontocho alley at blue hour",
      blurb:
        "A 500m lantern-lit alley running between Sanjo and Shijo, shot straight down its axis as the lanterns come on against a deep blue sky. Twenty to thirty minutes after sunset, before the dinner surge fills it. Then walk out to the Kamo riverbank for a second frame, where in the warm months the kawayuka dining platforms glow out over the water.",
      locations: [
        {
          lat: 35.0042,
          lng: 135.7712,
          precision: "neighborhood",
          facingNote:
            "straight down the alley axis, twenty to thirty minutes after sunset as the lanterns come on",
        },
      ],
    },
  ],
};

const paris: City = {
  slug: "paris",
  name: "Paris",
  countrySlug: "france",
  countryName: "France",
  contentStatus: "published",
  tagline: "Eat east, shoot central.",
  intro:
    "Paris runs on two maps that barely overlap: the food is east, out through the 10th, 11th, 12th and 20th, and the photographs are central. Plan the day around the bakery and let the monuments happen on the walk between.",
  stay: {
    title: "Hôtel Fabric, the 11th",
    blurb:
      "A former 19th-century textile factory on rue de la Folie-Méricourt in Oberkampf, factory windows and brick kept through the conversion. This page's whole thesis is eat east, shoot central, so sleep east: Boulangerie Utopie a few minutes on foot, the apéritif crawl on the doorstep, the canal just north for Sundays.",
    url: "https://www.expedia.com/Paris-Hotels-Hotel-Fabric.h6224549.Hotel-Information",
  },
  cultureTips: [
    "Say bonjour before anything else, in shops, at the counter, asking directions; skipping the greeting reads as treating a person like a vending machine.",
    "Restaurants and the Metro run a notch quieter than you're used to, so drop your volume to match.",
    "The bill won't come until you ask for it; the table is yours for the evening, and bringing it unprompted is considered rude by the restaurant.",
    "Service is already in the menu prices by law, so tip by rounding up or leaving a few euros; an American-scale tip just reads as not understanding the system.",
    "At the markets the vendor serves you, so point at the good tomatoes and let them do the picking instead of handling the produce yourself.",
  ],
  eats: [
    {
      title: "Boulangerie Utopie (11th)",
      blurb:
        "The black sesame baguette is the one everyone photographs, charcoal-dark and studded through, and the sesame runs across the whole range down to the eclairs. Weekend specials change constantly, so ask what came out this morning instead of arriving with a list. It is a working neighbourhood bakery on a scruffy stretch of rue Jean-Pierre Timbaud rather than a boutique, and the queue moves faster than the fame suggests.",
    },
    {
      title: "Le Baratin (20th)",
      blurb:
        "This is where Paris chefs eat on their night off. Raquel Carena has run the kitchen on the Belleville hillside since 1987, self-taught, doing bistronomie before anyone had a name for it, and the chalkboard turns over constantly: offal, whole fish, sweet-sour and tart notes that keep landing slightly off where you expect. Turn up without a fixed order. Philippe Pinoteau's wine list is the other half of the meal, and the brusque service comes with it.",
    },
    {
      title: "Chez Aline (11th)",
      blurb:
        "A former horse butcher's on rue de la Roquette, vintage signage and tiling still in place, now arguing that jambon-beurre is a serious dish and not a default. Sandwiches are built to order on baguette: Prince de Paris ham is the classic, with raw-milk cheeses and chorizo if you want to fight the classic. Tiny, weekday lunch trade, and the queue is mostly people due back at a desk.",
    },
    {
      title: "Substance Cafe (2nd)",
      blurb:
        "Five seats, a roastery at the back, and a list of things you cannot have: no takeaway cups, no sugar, no pastries, no music. The rules are the product. You sit at the counter, you taste, you talk to whoever poured it, which is why the city's coffee professionals send other coffee professionals here. Not the place for a caffeine top-up between sights, and it will not pretend otherwise.",
    },
    {
      title: "Pho Tai (13th)",
      blurb:
        "The 13th's Chinatown grew out of post-1975 Vietnamese resettlement, and this family canteen is the benchmark the city's food crowd measures every other bowl against. M. and Mme Te run it, the room is very small, so go early or take the queue as read. Order the pho, then do what the regulars do and add banh cuon and the crispy chicken with fresh ginger.",
    },
  ],
  experiences: [
    {
      title: "Marché d'Aligre, finished with oysters at Le Baron Rouge (12th)",
      blurb:
        "Work the open-air stalls on rue d'Aligre first, then the covered Beauvau hall for cheese, fish, charcuterie and North African spice and harissa; the tell is simple, the stall with the longest queue of older women is the best value in the building. There is a flea market on the same square if you want to browse other people's cutlery. Then it is 200m to Le Baron Rouge for barrel wine by the glass or a bottle refilled, and roughly mid-September to April a vendor drives up from the Atlantic and shucks oysters on the pavement at weekend mornings, which is how you end up at an upturned barrel with your shopping around your ankles. Bring cash.",
    },
    {
      title: "The rue des Martyrs food crawl (9th)",
      blurb:
        "Over two hundred shops on one street running uphill toward Montmartre: butchers, produce, fromageries, a jam and honey shop, caramels, choux, Neapolitan pizza by the time you reach the top. Build the picnic as you climb. The street is partly pedestrianised at weekends, which is when to do it and also why every cheese counter has a queue, so get there before the counters get deep. Sundays add a flea market to the haul.",
    },
    {
      title: "Marché de Belleville (20th)",
      blurb:
        "The cheapest and most multilingual market in Paris, and the least charming, which is the point: fruit and veg in bulk well under other Paris markets, plus olives, dates, chapatis, spices and bolts of fabric. Arabic, Chinese and French inside the same twenty metres of boulevard. People shop here because it is cheap, not because it photographs well. It only runs a couple of mornings a week, so check the day before you trek over, then buy lunch and carry it up into Parc de Belleville.",
    },
    {
      title: "A car-free Sunday on the Canal Saint-Martin (10th)",
      blurb:
        "The quarter closes to cars every Sunday and public holiday under the Paris Respire scheme, and the whole 10th exhales. Assemble the picnic before you commit to a spot: pain des amis from Du Pain et des Idées on rue Yves Toudic if the shutters are up, a flat thick-crusted loaf with a real smoky note, and any good boulangerie on the walk over if they are not; coffee from Ten Belles; cheese and a bottle from a caviste. Then take the quais, feet pointed at the water, and let the afternoon go.",
    },
    {
      title: "An Oberkampf natural-wine apéritif crawl (11th)",
      blurb:
        "The classic visitor error is arriving at nine expecting dinner. Apéritif in the 11th is a standing, sociable, pre-dinner thing, so start early, around half six, and let it drift: La Buvette is tiny and Camille Fourmont runs it, Septime La Cave is a bottle shop by day and standing room by night, Aux Deux Amis on Oberkampf is the loud crowded small-plates version, Cave du Paul Bert has the vintage copper bar and the small-producer bottles. Order the small plates, they are not an afterthought. Treat the whole thing as a neighbourhood ritual rather than a fixed route, because these rooms change their evenings without telling anybody.",
    },
  ],
  photoSpots: [
    {
      title: "Rue Montorgueil (2nd)",
      blurb:
        "Stand mid-street at the rue Marie Stuart junction and shoot north up the pedestrianised stretch: awnings, produce crates, terraces stacking on both sides. Then take the facade of Stohrer, the oldest surviving patisserie in Paris, straight on and slightly low so the gold and glass fills the frame. Early on a weekday for delivery crates and low raking light, Saturday late morning if you want the crowd instead; after eleven the terraces close the sightline and it is done. The restaurants here coast on footfall, so photograph the shops, buy pastry, eat elsewhere.",
      locations: [
        {
          lat: 48.8653,
          lng: 2.3469,
          precision: "approximate",
          facing: "N",
          facingNote:
            "north up the pedestrianised stretch from the rue Marie Stuart junction, awnings and produce crates stacking on both sides",
        },
      ],
    },
    {
      title: "Place d'Aligre and the Marché Beauvau arch (12th)",
      blurb:
        "Two frames from one spot. Stand where the open-air stalls meet the entrance arch of the covered hall and shoot in, letting the exposure fall from bright street to shaded interior, then turn and shoot back out so the shoppers silhouette against the arch. Weekend mid-morning, Sunday fullest, and in oyster season the Baron Rouge pavement scene is worth the last frames on the card. This is the one place in Paris where photographing people is unremarkable, but ask before a close-up of a stallholder, and do not dawdle, because the market winds down early.",
      locations: [
        {
          lat: 48.8489,
          lng: 2.3783,
          precision: "approximate",
          facingNote:
            "into the covered hall for the drop from bright street to shade, then back out so the shoppers silhouette against the arch",
        },
      ],
    },
    {
      title: "Rue des Martyrs (9th)",
      blurb:
        "The gradient is the whole trick. Stand on the lower to middle stretch, shoot due north straight up the street, and the white dome of Sacré-Coeur sits at the top of the frame with butcher awnings and shop signage compressing underneath it. A longer lens makes the basilica read much bigger; wide-angle kills the shot outright. Weekend morning, and overcast beats hard sun here, because bright light blows the dome to white.",
      locations: [
        {
          lat: 48.8778,
          lng: 2.3395,
          precision: "approximate",
          facing: "N",
          facingNote:
            "due north straight up the street, where the gradient sets the dome of Sacré-Coeur at the top of the frame",
        },
      ],
    },
    {
      title: "Belvédère Willy Ronis, Parc de Belleville (20th)",
      blurb:
        "The upper terrace at the top of the park, looking west and south-west, puts the Eiffel Tower and Sacré-Coeur in one frame, which no other free viewpoint in Paris manages. An hour before sunset for the gold, early morning if you want the terrace empty, never midday. Bring the picnic up from the market below, that is what the terrace is for, and note the park does close at night with gate hours that shift by season.",
      locations: [
        {
          lat: 48.8716,
          lng: 2.3853,
          precision: "exact",
          facing: "W",
          facingNote:
            "west across the city, the one free viewpoint that gets the Eiffel Tower and Sacré-Coeur into a single frame",
        },
      ],
    },
    {
      title: "Square Rapp (7th)",
      blurb:
        "A short dead-end street off Avenue Rapp: stand at the closed end, look back out, and the Art Nouveau buildings frame the Eiffel Tower straight down the corridor. Low, centred on the street axis, portrait orientation, and midday overhead light actually works here because it lifts the detail in the stonework. People live on this street, so keep it quick and quiet. It is the answer to the Trocadéro scrum, and on the same principle, skip Rue Crémieux altogether: residents there have been campaigning for gates since 2019 and photographing the photographers back.",
      locations: [
        {
          lat: 48.8587,
          lng: 2.3008,
          precision: "exact",
          facing: "W",
          facingNote:
            "west down the street axis from the closed end, with the Art Nouveau stonework framing the tower",
        },
      ],
    },
  ],
};

const cabo: City = {
  slug: "cabo",
  name: "Cabo",
  countrySlug: "mexico",
  countryName: "Mexico",
  contentStatus: "published",
  tagline: "Desert meets two oceans.",
  intro:
    "Cabo's reputation is a twenty-mile hotel corridor, which is the least interesting thing about it. Go three blocks inland from the marina, or thirty minutes east to San José del Cabo, and the signs go Spanish and the taquerías fill with people who actually live here.",
  stay: {
    title: "Casa Natalia Boutique Hotel, San José del Cabo old town",
    blurb:
      "An adults-only boutique in the colonial centro, roughly fifty metres from Plaza Mijares, inside the gallery district the Thursday Art Walk takes over and a short walk from the Mercado Municipal. This whole page argues for skipping the corridor all-inclusives, and this is that argument with a room key, though families should note the adults-only part.",
    url: "https://www.expedia.com/Los-Cabos-Hotels-Casa-Natalia-Boutique-Hotel.h431652.Hotel-Information",
  },
  cultureTips: [
    "Open every interaction with a buenos días or buenas tardes, whether it is a lonchería, a taxi or a market stall; transactions here are conversations with people, and skipping the greeting reads as cold.",
    "Tip 15 percent as the floor and tip in pesos, but read the bill first, because tourist-zone restaurants often pre-add a propina line and doubling up is just not noticing.",
    "Carry small coins for the people the resort economy renders invisible: supermarket baggers, gas-station attendants and cart helpers, many of whom work mostly for tips.",
    "Every beach in Mexico is public, so the local families on the sand in front of your resort have exactly as much right to it as you do; don't let a wristband turn you territorial.",
    "Roughly summer through early winter, staked-off patches on the corridor beaches are protected sea-turtle nests; keep your distance, kill the flash, and flag security or conservation staff instead of playing hero.",
  ],
  eats: [
    {
      title: "The Leona Vicario taco block, Cabo San Lucas",
      blurb:
        "Not a restaurant, a block, because that is how it functions. This is where the mainland kitchens landed when workers came for the resort boom: Los Michoacanos does build-your-own carnitas and will sell you a kilo to take away with the fixings packed separately, Los Paisas is the quesabirria and reopened after Hurricane Odile, which tells you it is a neighbourhood fixture rather than a concept, and Birriería Apatzingán is the smaller hole in the wall with a woman making tortillas by hand. No English signage, no marina foot traffic, and that migration story is the real Cabo food story even though almost nobody writes it that way.",
    },
    {
      title: "Tacos Los Claros",
      blurb:
        "The correct Cabo taco is seafood, not al pastor. Fried fish and shrimp, ceviche tostadas, the marlin cooked separately and laid onto a soft tortilla, and the callo that regulars quietly order instead of anything else. The refrigerated condiment bar is free and it is the whole tell: tourists photograph the taco as it arrives, locals go build it properly first. Go to the Zaragoza location in Cabo San Lucas or the San José original, not the marina branch.",
    },
    {
      title: "Mercado Municipal, San José del Cabo",
      blurb:
        "A working produce market, not a food hall: dozens of stalls, decades of the same families, produce coming in from the growing towns inland. The loncherías at the back are the reason to walk in, where the town takes its caldo de res, pozole, birria and tacos de guisado. Go in the morning, because both the produce and the kitchens peak early and then quietly fade.",
    },
    {
      title: "El Toro Güero, San José del Cabo",
      blurb:
        "Ask a driver in San José where to eat and this is the name that comes back, which is a better rating system than any app. Shrimp ceviche, garlic shrimp, a whole red snapper grilled with garlic, soccer on the TV, zero gimmicks. Two locations, neither on a tourist drag, and the La Loma original is the more residential of the pair.",
    },
    {
      title: "Los Tamarindos Coffee Roasters, San José del Cabo",
      blurb:
        "The only shop around that both roasts and serves specialty coffee, run by a certified barista who has competed at a national level and sources his arabica out of Veracruz. Order the pour-over: soft, earthy and nutty with a gentle acidity, no showboating. He runs coffee tours where you handle and smell the beans, and the room is homey rather than built for a camera.",
    },
  ],
  experiences: [
    {
      title: "Thursday Art Walk, San José del Cabo gallery district",
      blurb:
        "Thursday evenings in season, roughly November through June, and free. The streets behind the church close to traffic, a dozen-plus galleries open up, artists are actually present, and there is live music. Now the honest part: roughly July through October it does not happen at all and the galleries just keep normal daily hours, so do not build a summer trip around it.",
    },
    {
      title: "Viva la Plaza, Plaza Amelia Wilkes, Cabo San Lucas",
      blurb:
        "Friday evenings in the downtown plaza: Mexican artisans, vintage crafts, food and cultural programming, and the answer to whether anything happens in Cabo San Lucas that is not the marina. We could not confirm it still runs every week, so treat it as a bonus rather than a plan. The plaza earns the walk regardless, named for the local woman who brought electricity and water to this town, with the parish church sitting right on it.",
    },
    {
      title: "Cañón de la Zorra, near Santiago",
      blurb:
        "A waterfall dropping into swimmable natural pools inside a biosphere reserve, about an hour and a half from the strip, and the cleanest possible refutation of the idea that Cabo is a desert with hotels on it. Access runs through the ranch that owns the land, so bring cash for the wristband and bring more than you think, then take the steep ten-minute hike down. Santiago is a working ranch town, so give it the afternoon instead of treating the falls as a drive-by.",
    },
    {
      title: "A two-oceans beach day: Playa Chileno and Playa Palmilla",
      blurb:
        "Two free public beaches on the corridor with free parking that is gone before nine, which happens to be when the water is clearest anyway. Chileno is lifeguard-patrolled with showers and restrooms and coral beds you can snorkel to straight off the sand for the price of the gear, the same reef the boats will sell you; Palmilla is the local family beach, palapas and picnic areas and an easy park. These are the beaches that get lifeguards and flags, so read the flag on the day, every day: green go, yellow caution, red stay out of the water, black closed.",
    },
    {
      title: "Fiestas Tradicionales, San José del Cabo",
      blurb:
        "The municipality's biggest popular and cultural event, around the nineteenth of March, and the one thing in Los Cabos visitors almost never hear about. It opens at dawn with the community gathered at the parish church singing las mañanitas, and the whole feel of it is a town celebrating itself rather than performing for anybody. Dates and venues get re-announced every year, so hold it loosely as mid-to-late March and confirm once you are there.",
    },
  ],
  photoSpots: [
    {
      title: "Plaza Mijares and the mission church, San José del Cabo",
      blurb:
        "Blue hour, and the angle is the advice: stand at the gazebo end of the plaza and shoot back toward the church so the twin bell towers rise above the gazebo with the plaza as your foreground. Flat on from the street is the shot everyone takes and nobody keeps. Come as the lights are switching on and you get a lit church plus residual sky in the same frame. Look up at the tile mosaic over the door, which depicts the Pericú uprising and the death of the Jesuit who founded the mission, a church advertising its own martyrdom and the most under-explained image in Los Cabos. No flash inside, and stay out of the way of services.",
      locations: [
        {
          lat: 23.0621,
          lng: -109.6948,
          precision: "approximate",
          facing: "W",
          facingNote:
            "west from the gazebo end toward the church, so the twin bell towers rise above the gazebo",
        },
      ],
    },
    {
      title: "Estero de San José del Cabo",
      blurb:
        "Sunrise. Walk the palm-lined paved path that runs from town toward the water and shoot across the lagoon: date palms, freshwater, desert scrub behind, Sea of Cortez beyond, which is the entire tagline in one frame. Early morning or late afternoon is when the birds are active and the light is low enough to separate palms from water, and this is an Important Bird Area, so frigatebirds, herons and ospreys. Walk or bike in, no vehicles or horses, and go in expecting change, because development is taking a toll here.",
      locations: [
        {
          lat: 23.0544,
          lng: -109.6887,
          precision: "neighborhood",
          facingNote:
            "across the lagoon from the paved path, palms and freshwater with the desert scrub behind them",
        },
      ],
    },
    {
      title: "Playa Acapulquito and Costa Azul",
      blurb:
        "First light. Stand on the sand at the Acapulquito end and shoot north up the beach toward the point so the wave peels across your frame instead of at you; the highway pull-off above gives you the elevated version straight down the line of the break. This coast faces roughly southeast, so the sun comes up over the water and backlights the spray for you. Season decides everything here: this side runs on summer south swell, so late spring into early autumn is when it actually breaks and winter goes calm. Acapulquito is the friendly long wrapping right-hander the longboards want; Zippers is an advanced reef break and not the place to paddle out for a photo.",
      locations: [
        {
          lat: 23.024,
          lng: -109.7161,
          precision: "exact",
          facing: "N",
          facingNote:
            "north up the beach toward the point, so the wave peels across the frame instead of at you",
        },
      ],
    },
    {
      title: "Playa Solmar, Cabo San Lucas",
      blurb:
        "Every listicle sends you to El Faro Viejo for the sunset dune shot, and you cannot get it: the access road is chained off, ATVs are banned, and the old lighthouse now sits inside a golf development you need a prior reservation to enter. Solmar is the Pacific sunset you can actually walk to, so walk east along the sand toward the headland and let the granite of Land's End close your frame, heavy shorebreak in front, the Arch formations in the distance, the sun dropping straight into the water. Early morning is the same coast soft and nearly empty. Look, do not swim. Powerful waves, steep underwater drop-offs and dangerous rip currents make entering the water here life-threatening, and do not stand in the wash to get the shot.",
    },
    {
      title: "El Arco and Playa del Amor, Cabo San Lucas",
      blurb:
        "The unavoidable one, done right. Shoot from a panga on the Sea of Cortez side with morning sun on the rock, when the water is calmest, and if you get dropped at Playa del Amor walk the fifty metres across to the Pacific side and shoot back through the gap, which is the frame nobody on a booked catamaran gets. That walk is the geography lesson: Lovers Beach on the calm Cortés side and Divorce Beach facing the open Pacific are the same sandbar with opposite verdicts, and the Pacific side is the one that drowns people, so stay on the sand. On not getting fleeced, roughly twenty dollars a head round trip is about the going rate off the marina docks or the sand at Médano while vendors will open at two or three times that, so pay in pesos, and for a drop-off pay part up front, photograph the boat and take the captain's WhatsApp. The glass bottom is usually a scratched strip of plexiglass, and when the harbourmaster closes the port for high surf, which is often, nobody is dropping you anywhere.",
      locations: [
        {
          lat: 22.876,
          lng: -109.8946,
          precision: "approximate",
          label: "El Arco",
          facingNote:
            "from the water on the Cortés side, or back through the gap from the Pacific side if you get dropped at the beach",
        },
      ],
    },
  ],
};

const vancouver: City = {
  slug: "vancouver",
  name: "Vancouver",
  countrySlug: "canada",
  countryName: "Canada",
  contentStatus: "published",
  tagline: "The free version, in the rain.",
  intro:
    "Almost everything this city sells a ticket for has a free version a few kilometres away: the suspension bridge, the lookout, the waterfront. Rain here isn't weather, it's a season, so everything below is chosen to work in it.",
  stay: {
    title: "The Westin Bayshore, Coal Harbour",
    blurb:
      "A waterfront tower on Coal Harbour at the edge of Stanley Park, which means the Seawall ritual this page keeps going on about starts at the front door.",
    url: "https://www.expedia.com/Vancouver-Hotels-The-Westin-Bayshore.h14477.Hotel-Information",
  },
  cultureTips: [
    "Tip 15 to 20 percent on the pre-tax bill; the terminals default to around 18, and nobody flinches.",
    "You're on the unceded territories of the Musqueam, Squamish and Tsleil-Waututh Nations, and the city opens its own business by saying so; the visitor-sized version of respect is learning the names and choosing Indigenous-led experiences.",
    "On the Seawall, stay in your lane, pedestrians on the water side and bikes on the inner path; cycling around Stanley Park runs one-way counter-clockwise, posted and non-negotiable.",
    "Cannabis is legal but banned in every park and on every beach, Stanley Park and Kits included; sidewalks are broadly fine, away from doorways and never near playgrounds.",
    "The Downtown Eastside is a neighbourhood, not an exhibit, so no photographs of residents, ever; people live whole lives on those blocks.",
  ],
  eats: [
    {
      title: "HK BBQ Master, Richmond",
      blurb:
        "A Cantonese BBQ counter under a supermarket parking deck, which is not a sentence that sells itself and is exactly the point. Char siu and roast pork belly are the anchors, the duck sells out first, and the local order is take-out by weight eaten in the car with the windows fogging up. Treat it as a neighbourhood butcher counter rather than a restaurant, and give the covered parking deck its due from October to April.",
    },
    {
      title: "Kim Chau Deli, Kingsway",
      blurb:
        "The Kingsway banh mi corridor is the cheapest genuinely great food in the city, with Tung Hing as the twin further west. Order the cold cut or the BBQ pork at the counter and take it outside, because this is not a sit-down room. Buy two, you'll regret buying one, and the tell that they're serious is that other restaurants reportedly buy bread off them. Citywide rule while you're down here: the best value has an inverse relationship with card readers, so carry some cash and go early, since both sell out.",
    },
    {
      title: "Via Tevere Pizzeria, Victoria Drive",
      blurb:
        "Neapolitan pizza out of a converted house in East Van, and it has never taken a reservation and never needed to. Margherita or marinara first, because that's how you judge an oven. The no-reservations thing is the business model rather than an oversight, so put your name down and go walk a block of Victoria Drive until they call. There's a newer Main Street location; the original is the one with the story.",
    },
    {
      title: "Livia, Commercial Drive",
      blurb:
        "Sourdough bakery, espresso bar, lunch pasta and evening aperitivo, all in one room, which should not work and does. A country loaf to take home and a cornetto with the coffee is the order. Every review mentions the queue, which is both the proof and the warning, so go off-peak. If you'd rather have an espresso in ninety seconds, the old Italian bars further up the Drive are the counterpoint, and they were here first.",
    },
    {
      title: "Dynasty Seafood",
      blurb:
        "Dim sum on an upper floor of a Broadway office building, where no visitor finds it by accident. Order off the sheet and forget any instinct about carts. This is the room the city's Chinese food community treats as the benchmark, and the one families book for birthdays, so book ahead at weekends.",
    },
  ],
  experiences: [
    {
      title: "The western Seaside Greenway, Kits Point to Spanish Banks",
      blurb:
        "The Coal Harbour stretch is the postcard; this half is the Tuesday. Check a tide table first, because at a low the flats at Spanish Banks run out close to a kilometre and you can walk on them, and at a high it's just a beach. The path is split, walkers on the water side and wheels inside. It works fine in the rain, since it's paved and it empties out, which is half the appeal.",
    },
    {
      title: "North Shore mountain access on a weeknight",
      blurb:
        "Lynn Canyon after work is the local answer to Capilano: free suspension bridge, real rainforest, no ticket. In winter the hills run lit terrain in the evenings, though not every night and not the same nights at each mountain, so check which before you commit to the drive. The Grouse Grind is the other ritual, a fitness benchmark locals chase personal bests on, and you can't walk down it, you download on the Skyride, which is the one part you pay for.",
    },
    {
      title: "Richmond's Golden Village, Alexandra Road to Aberdeen Centre",
      blurb:
        "Alexandra Road is three blocks locals call Wai Sek Kai, snack street, with seventy-plus restaurants packed in, and the Aberdeen Centre food court is the other half of the evening. It's reachable end to end on the Canada Line, so it's a no-car night. This is the single best bad-weather day in the region: mall, food court, covered parking, transit, four hours of eating without getting wet. Off-peak is the move, weekend lunch is brutal, and don't confuse any of it with the Night Market, which is a different and far more touristed thing.",
    },
    {
      title: "Trout Lake Farmers Market, Saturday morning",
      blurb:
        "The longest-running of the city's markets, sixty-plus farms and producers, in a park East Van treats as a living room. It runs seasonally rather than year-round, so check before you build a morning around it. Do a lap of the lake afterwards, because the dog beach is a spectacle. One tell: nobody who lives there calls it John Hendry Park, and using the official name is the fastest way to prove you don't.",
    },
    {
      title: "The Yeast Van brewery walk, Grandview-Woodland",
      blurb:
        "A walkable cluster of craft breweries in East Van, invented and named by locals rather than by anyone official, roughly thirty minutes end to end between the outer rooms. Growler fills are the local behaviour, not flights. The borders genuinely move as places open and close, so treat any roster you find as out of date, including whatever you're told at the first stop. The whole point is short hops between warm rooms, which makes it a rain strategy more than a beer crawl.",
    },
  ],
  photoSpots: [
    {
      title: "Spanish Banks West, the tidal flats",
      blurb:
        "Not the grass and not the concession: check a tide table, wait for a low, then walk out onto the flats and stand where a thin film of water is still sitting on the sand. Shoot east or northeast and the skyline sits low on the horizon with the North Shore mountains stacked behind it, all of it doubled in the wet sand; turn west for the sunset over the Strait. A low tide in the last hour before sunset is the combination, and September and October give you a civilised hour and better cloud than June, while winter lows in flat grey light give a near-monochrome mirror that's arguably the better picture. Even in summer the flats absorb the crowd. Wear something you don't mind soaking.",
      locations: [
        {
          lat: 49.2771,
          lng: -123.2189,
          precision: "approximate",
          facing: "E",
          facingNote:
            "east across the flats at a low tide, skyline low on the horizon with the North Shore stacked behind it and the whole thing doubled in wet sand",
        },
      ],
    },
    {
      title: "Highview Lookout, Cypress Bowl Road",
      blurb:
        "A signed pullout with railings and benches on the switchbacks above West Vancouver. Stand at the railing rather than in the parking area, then shoot south and southeast: Burrard Inlet, the Lions Gate Bridge, the downtown peninsula and Stanley Park, and the whole Fraser delta running to the horizon. This is a night location first, so go thirty to sixty minutes after sunset, when the grid lights up and the sky still holds colour. Winter is the best season for it, clearer and drier air with an early blue hour, but this is also a ski hill access road in winter, so winter tyre and chain rules apply and it can close in storms. Car only, no transit.",
      locations: [
        {
          lat: 49.3486,
          lng: -123.206,
          precision: "neighborhood",
          facing: "SE",
          label: "Cypress Bowl Road, the lookout is a pullout on the switchbacks",
          facingNote:
            "southeast off the railing, over Burrard Inlet and the Lions Gate to the whole delta, best half an hour after sunset",
        },
      ],
    },
    {
      title: "CRAB Park at Portside",
      blurb:
        "Two frames in one small park, the pier and the grassy knoll behind it. From the knoll, shoot west or southwest for the least-photographed angle on the skyline, downtown seen from the east; from the pier, shoot north into the working port, container stacks, cranes, the SeaBus crossing and the Lions sitting behind all of it. Late afternoon into sunset drops the sun behind the city, so you're working backlight and the towers flatten to silhouette, while the cranes read better under flat overcast, which this city supplies free most of the year. It's walkable from Waterfront Station and almost nobody bothers crossing the rail overpass, so it stays quiet.",
      locations: [
        {
          lat: 49.2854,
          lng: -123.1003,
          precision: "exact",
          facing: "W",
          facingNote:
            "west from the knoll for downtown seen from the east, then turn north off the pier for the cranes and the container stacks",
        },
      ],
    },
    {
      title: "The Iona Beach jetty",
      blurb:
        "Not the beach: walk out onto the four-kilometre jetty into the Salish Sea, and take the upper concrete route instead of the lower gravel one, because you're raised and the sightlines are better. Go far enough out that there's water on both sides. West is the sunset, an unobstructed horizon with the Gulf Islands as a low silhouette, and east is the airport flight path, aircraft passing low and often, which is the thing no other sunset beach here can offer. Long lens for the planes, wide for the jetty as a leading line, and budget the time, because it's exposed, windy, shadeless, and four kilometres each way.",
      locations: [
        {
          lat: 49.2142,
          lng: -123.1873,
          precision: "approximate",
          facingNote:
            "west for the sunset over open water, east for the aircraft coming in low, which is why you walk out far enough to have water on both sides",
        },
      ],
    },
    {
      title: "Lynn Canyon Park, the rain frame",
      blurb:
        "Shoot the suspension bridge from the canyon rim on either approach rather than from the middle of it, then work the pools and drops downstream. There's no single bearing, you're aiming down into the canyon: second-growth rainforest, moss on everything, the creek running green-black over rock, the bridge a thin line for scale. Put a person in a coloured jacket on it and that's the picture. Rain is the requirement here, not the risk, because overcast kills the blown highlights the canopy hands you on a sunny day, and grey light is good light in this city anyway; stop waiting for a blue-sky day or you'll be waiting until July. It's free, which is the whole argument against the ticketed bridge across the valley, it's mobbed on sunny summer weekends, and the creek has a serious drowning history, so read the swimming holes as the hazard they are rather than the one they look like.",
      locations: [
        {
          lat: 49.3437,
          lng: -123.0198,
          precision: "approximate",
          facingNote:
            "down into the canyon rather than along any compass line, from the rim on either approach to the bridge",
        },
      ],
    },
  ],
};

const toronto: City = {
  slug: "toronto",
  name: "Toronto",
  countrySlug: "canada",
  countryName: "Canada",
  contentStatus: "published",
  tagline: "The communities left, the bakeries stayed.",
  intro:
    "Toronto's immigrant food doesn't gather into walkable districts, it stretches out along east-west arterials you have to commit to a bus for. Most of those strips have outlived their own residents, because the families moved on to Mississauga, Brampton, Markham and outer Scarborough while the restaurants stayed put, so you end up eating in the memory of a catchment.",
  stay: {
    title: "The Drake Hotel, Queen West",
    blurb:
      "A hotel site since 1890, relaunched in 2004 as the arts hub credited with kickstarting West Queen West, live-music venue in the basement included. This page's whole argument is arterials over downtown, so sleep on one: Queen West at the door, the Ossington strip a few blocks along.",
    url: "https://www.expedia.com/Toronto-Hotels-The-Drake-Hotel.h27718565.Hotel-Information",
  },
  cultureTips: [
    "Tip 15 to 20 percent on the pre-tax bill, with 18 as the common terminal default.",
    "Streetcars stop in the middle of the lane, so press the button to open the doors yourself and look before stepping out; drivers are required to stop behind open doors, but not everyone does.",
    "Stand right, walk left is the practiced norm on TTC escalators, though the TTC officially wishes you wouldn't walk at all; do with that what you will.",
    "Kensington and the Chinatowns are working neighbourhoods, so buy something, eat something, and don't just photograph shopfronts and doorways.",
    "Cannabis can legally go roughly wherever tobacco can, with buffers around entrances, playgrounds and schools; the culture here is discreet rather than showy, so match it.",
  ],
  eats: [
    {
      title: "Hopper Hut, Ellesmere Road",
      blurb:
        "Toronto eats hoppers at a density almost no other city in North America manages, and this is the specialist rather than a curry house that also happens to make them. Order more egg hoppers than sounds reasonable, they're a vehicle and not a meal, then string hoppers with gravy, mutton kothu roti, coconut sambol on everything. Kennedy and Ellesmere holds the thickest run of Sri Lankan Tamil kitchens in the city, and kothu is a sound before it's a dish: you can hear the blades going on the griddle from the sidewalk. Strip-plaza room, and nobody arrives here by accident.",
    },
    {
      title: "Federick Restaurant, Ellesmere Road",
      blurb:
        "Hakka families migrated from China to Kolkata over roughly two centuries and built a Chinese-Indian hybrid cuisine there; from the eighties many of those families resettled in Scarborough, which is how the most only-in-Toronto food in the city ended up being one most visitors have never heard of. Order the chilli chicken with gravy, the Kolkata to Toronto house style and what every table around you is eating, because dry is the outsider's default. Shrimp pakoras, Hakka noodles, something Manchurian: family-run, fast, high turnover, built for a weeknight.",
    },
    {
      title: "Randy's Patties, Eglinton West",
      blurb:
        "The Eglinton Crosstown finally opened in early 2026 after about fifteen years of construction, and over 300 businesses on this strip closed while the train was being built. Randy's was one of them, shutting in 2022 with the owners pointing at the construction and the pandemic, and the line down the block for a last patty said everything. A group of Jamaican entrepreneurs bought it and brought it back saying the recipes were unchanged, though people who knew the old patty say it tastes slightly different, so go knowing the institution got saved, the recipe is contested, and showing up is partly showing up for the strip. Beef patty, standing, weekday and early, because the reopening brought pilgrimage queues.",
    },
    {
      title: "Lahore Tikka House, Gerrard East",
      blurb:
        "The Gerrard India Bazaar exists because one man rented a cinema here in the early seventies and started screening Bollywood and Pakistani films; the shops followed the audience until the strip ran to around a hundred businesses. It's visibly thinning now that the community's centre of gravity has shifted to Mississauga, Brampton and Scarborough, and this is one of the last big anchors, so it earns the slot on longevity rather than on being anybody's undiscovered find. Charcoal side of the menu, the sizzling platters, a karahi to share, and bring six people, because it's a table-of-six restaurant. The connoisseur move on Gerrard is chaat and sweets from the smaller counters and a slow walk through the grocers.",
    },
    {
      title: "Nova Era Bakery, Dundas West",
      blurb:
        "Little Portugal was built by a labour migration agreement between Canada and Portugal in the fifties and Dundas West became the spine; the community has largely moved west and out, the strip is now one of the most gentrified in the city, and the pastelarias stayed. The tell on a good pastel de nata is a blistered, scorched top and a crust that shatters, eaten warm at the counter in under ninety seconds with an espresso taken standing. Sitting down with a laptop in here marks you instantly. Caldense is the local counter-nomination if you want to start an argument about it.",
    },
  ],
  experiences: [
    {
      title: "Pan Alive at Lamport Stadium",
      blurb:
        "Everyone writes about the Grand Parade. The steelpan competition on the Friday night of the Carnival long weekend is what the Caribbean community actually organises its year around: full orchestras, judged, in a stadium full of people who know the arrangements well enough to react to them. It's ticketed and seated, which filters hard for people who came for the music, and pan yards across Scarborough and Etobicoke have been rehearsing for weeks by then. Get there for the mid-card bands, not just the headline.",
    },
    {
      title: "Pedestrian Sunday in Kensington Market",
      blurb:
        "Augusta closes to cars and the market spills outward into it, a few Sundays through the summer and autumn. It didn't run at all in 2025: organisers paused it over a funding shortfall and a feeling that outside vendors had diluted the thing, then brought it back with an explicitly community-rooted reset, and that comeback is the story worth showing up for. Kensington is a migration artefact in layers, Jewish then Portuguese then Caribbean, Chinese and Latin American on the same block, two synagogues still standing. Honest note: if you want the market as a market rather than a street party, come on a plain weekday morning while the deliveries are going in.",
    },
    {
      title: "Free Sunday baseball on the hill at Christie Pits",
      blurb:
        "A ball team has played this diamond since the sixties, admission is free and unticketed, and you watch from the grass slope above it with a blanket. Sit on the hill, not in the stands. It's also the site of the 1933 riot, a Jewish and Anglo street battle that broke out at a ballgame and remains one of the defining episodes in the city's immigrant history, so nine innings on that slope with Koreatown a block north is about as neatly Toronto as an afternoon gets.",
    },
    {
      title: "The Spit, at the foot of Leslie",
      blurb:
        "Five kilometres of headland built out of construction rubble and dredged fill that accidentally became one of the best birding sites in the country, over 300 species recorded. Locals call it the Spit and nobody says the official name. On weekdays it only opens in the late afternoon because it's still an active lakefill site, which is the entire character of the place, and there are no motor vehicles, no e-bikes and no drones, which is exactly why the ride out is so good. Summer weekend sunrise is the local slot, and the trails aren't maintained in winter.",
    },
    {
      title: "An Ethiopian coffee ceremony on Danforth East",
      blurb:
        "Little Ethiopia is a pocket the city itself overlooks, fifteen minutes east of the stretch of the Danforth where Greektown takes all the attention, and it's four or five doors rather than a district. The ceremony isn't a coffee run: green beans roasted in a pan and carried around the table, incense going, popcorn alongside, a full jebena poured out in rounds, and it takes real time, so treat it as an after-dinner commitment. Order it explicitly, eat a shared veggie combo and doro wat on injera first, and confirm the place still does the ceremony before you go, since it's often by request.",
    },
  ],
  photoSpots: [
    {
      title: "Chester Hill Lookout, Playter Estates",
      blurb:
        "Not a landmark, a residential dead end running west off Broadview that stops at the lip of the Don Valley, so you're standing at a guardrail in front of somebody's house. Shoot southwest for three layers of city in one frame: the Prince Edward Viaduct mid-ground, the valley and the parkway underneath, downtown and the CN Tower stacked behind, which is why it works and why the tower alone doesn't. Golden into blue hour, because you're facing the sunset and the skyline lights come up while there's still sky; mid to late October fills the foreground with turning canopy, and winter's bare branches under a low afternoon sun give a cleaner viaduct silhouette. Long lens compresses it, and the residents are the constraint, so go small, go quiet, no tripod circus at night.",
      locations: [
        {
          lat: 43.6813,
          lng: -79.3602,
          precision: "approximate",
          facing: "SW",
          facingNote:
            "southwest off the guardrail: viaduct mid-ground, valley and parkway underneath, downtown stacked behind, three layers in one frame",
        },
      ],
    },
    {
      title: "Reggae Lane, off Oakwood",
      blurb:
        "You stand in the laneway behind Eglinton West and the subject is Adrian Hayles' mural, roughly twelve hundred square feet of Little Jamaica's own musicians alongside Haile Selassie, Bob Marley and the Skatalites, and the lane carries the name officially. Shoot flat on for the whole wall, or oblique down the lane if you want it to read as a working alley rather than a mural photograph, and wait for somebody to walk through, because a person is what makes it. Overcast is your friend here: even light, no blown highlights on painted colour, no hard shadow bisecting the wall. It's the only frame in this set that carries the migration story inside the picture.",
      locations: [
        {
          lat: 43.6971,
          lng: -79.4417,
          precision: "exact",
          facingNote:
            "flat on for the whole wall or oblique down the lane; the wall's orientation is worth checking on arrival before you plan light",
        },
      ],
    },
    {
      title: "R.C. Harris Water Treatment Plant, east end of the Beach",
      blurb:
        "The buildings are closed to the public, the grounds are open, and photography is fine. Two positions: up on the lawn between the filtration building and the pumping station for the symmetrical facade, or down on the boardwalk shooting back up so the whole complex sits above the lake. It's the largest ensemble of art deco in the city, nicknamed the Palace of Purification, all brass and limestone and symmetry, and it gets used as a film location constantly, so it reads cinematic before you've done anything. Sunrise with an empty boardwalk, and winter beats summer: snow on the terraces, no beach crowd, and the geometry reads cleaner without foliage in the way.",
      locations: [
        {
          lat: 43.6728,
          lng: -79.2791,
          precision: "approximate",
          facingNote:
            "two positions rather than one bearing: the lawn between the buildings for the facade, or the boardwalk below shooting back up",
        },
      ],
    },
    {
      title: "Guild Park and Gardens, on the Scarborough Bluffs",
      blurb:
        "Over seventy salvaged facades, columns, statues and arches from demolished buildings, gathered across eighty-eight acres and standing free in mown lawn and forest, including a Greek theatre assembled out of a bank's marble arches. It looks nothing like the rest of Canada. Shoot the colonnade with a person in it for scale, then fragments tight against the tree line; low side light carves the stone and flat midday kills it. Late October puts colour behind the marble, but after a snowfall is the special version, white ground and bare trees and classical columns with the place to yourself, and summer weekends belong to weddings and portrait shoots, so go on a weekday or in the cold.",
      locations: [
        {
          lat: 43.7455,
          lng: -79.1927,
          precision: "neighborhood",
          facingNote:
            "the fragments are scattered across the grounds, so this is a wander rather than a bearing; low side light is what carves the stone",
        },
      ],
    },
    {
      title: "Humber Bay Arch Bridge, at the river mouth",
      blurb:
        "Two photographs off one crossing: from the deck shooting east so the arch and its cables frame the skyline down the shoreline, or from the shore west of it so the arch sits in the foreground with downtown across the water behind. Sunrise is the slot, since you're looking east over the lake and the sun comes up behind the skyline while the trail is still empty; blue hour after sunset is the other one, lights on and the bridge lit. It's a shared cycling and pedestrian route and it gets genuinely busy, so keep the setup off the centre line, and be honest that this is one of the most-shot locations in the city; the version almost nobody has is winter, shore ice and steam off the lake on a cold morning. Which is the rule for this whole city, really: don't shoot the CN Tower, shoot through something, because Chester Hill puts a valley, a viaduct and a highway in front of it and this bridge wraps an arch around it.",
      locations: [
        {
          lat: 43.6319,
          lng: -79.4713,
          precision: "exact",
          facing: "E",
          facingNote:
            "east off the deck so the arch and its cables frame the skyline down the shoreline, at sunrise with the trail still empty",
        },
      ],
    },
  ],
};

const calgary: City = {
  slug: "calgary",
  name: "Calgary",
  countrySlug: "canada",
  countryName: "Canada",
  contentStatus: "published",
  tagline: "The other 355 days.",
  intro:
    "Ten days in July get written about everywhere, and the other 355 get skipped. This is a prairie city with a river valley cut through the middle of it, so treat the Rockies as a horizon line and a weekend rather than the setting.",
  stay: {
    title: "Alt Hotel Calgary, East Village",
    blurb:
      "Directly beside the Bow pathway system this page keeps calling civic infrastructure, with the National Music Centre and the Music Mile around the corner, Inglewood a walk down 9th Ave and Bridgeland across the river. Run by a family-owned Canadian group rather than a chain tower, which is very much the spirit of the list above.",
    url: "https://www.expedia.com/Calgary-Hotels-Alt-Hotel-Calgary-East-Village.h31069558.Hotel-Information",
  },
  cultureTips: [
    "Public cannabis consumption is banned outright citywide, the strict outlier among Canadian cities, so it's private property or nothing.",
    "On the Bow River pathways keep right and pass left; cyclists ring a bell and yield to walkers, and walkers return the favour by not drifting across both lanes.",
    "If someone white-hats you, take it seriously; it's been the city's gesture of welcome since the late 1940s, and treating it as kitsch lands badly.",
    "During Stampede, dressing western is participation rather than costume irony, and at the First Nations-run camp on the grounds, ask before photographing dancers or regalia.",
    "Calgary sits on Treaty 7 territory, home of the Blackfoot Confederacy, the Tsuut'ina and the Stoney Nakoda Nations; acknowledgements open most public events, and your part is paying quiet attention.",
  ],
  eats: [
    {
      title: "Pho Dau Bo, International Avenue",
      blurb:
        "Everyone writes about 17 Ave SW, the bar strip; 17 Ave SE is the one that actually feeds the city, Vietnamese and Ethiopian and Filipino and Latin American, small family rooms, cheap. This family has anchored the block since the late 2000s and the pho is why people drive across town. Treat it as the first stop on a longer International Avenue crawl rather than a destination on its own, and know the same family later opened a more ambitious room that made a national best-new list, which is the best story in Calgary food right now.",
    },
    {
      title: "Spolumbo's Fine Foods, Inglewood",
      blurb:
        "Three former Calgary Stampeders went back to their families' Italian sausage recipes in the early nineties, and the deli counter they built is where Inglewood eats lunch. Cold cut subs, hot panini, and the sausage itself made on site in a range that runs to bison and elk, so buy some to take away while you're there. It closes before dinner, which is the exact opposite of how a tourist trap makes its money; go at noon on a weekday and the room is tradespeople and regulars.",
    },
    {
      title: "Caesar's Steakhouse, downtown",
      blurb:
        "If you're going to eat Alberta beef, eat it in the room that has been serving it to the oil business since 1972: dark wood, red leather, Roman columns, the same founding families still involved. Steak straight, aged and cut to order, and sit in the lounge if you want the room without the occasion. The local line, and it comes from Calgary press rather than from me, is that you can read the economy off the lunch crowd here, which is the city's whole boom-and-bust psychology compressed into a booking sheet.",
    },
    {
      title: "Sidewalk Citizen and Phil and Sebastian, the Simmons Building",
      blurb:
        "A 1912 mattress factory on the Bow now holding a bakery and a roastery cafe that open straight onto the RiverWalk. Bread and pastry leaning Israeli and French, out of an operation that started with one person delivering loaves by bicycle, then coffee from roasters who were doing this before the city had a scene. Use it as a pathway waypoint rather than a destination brunch: walk or ride the RiverWalk, stop, carry on.",
    },
    {
      title: "Lukes Drug Mart, Bridgeland",
      blurb:
        "A 1951 family pharmacy that the founder's grandson turned into a coffee bar, record shop, specialty grocer and post office without it ever ceasing to be a pharmacy, and there is no other room like it here. Coffee at the counter, flip the vinyl bins, then walk Bridgeland's strip, historically the Italian quarter, up on the bluff across the Bow from downtown. People come every day, which is the highest local-credibility signal there is.",
    },
  ],
  experiences: [
    {
      title: "The Bow River valley: pathways all year, float it in high summer",
      blurb:
        "The pathway network here is civic infrastructure rather than a tourist amenity, hung off the Bow and the Elbow and running all the way to the reservoir; ride or walk the RiverWalk as the downtown spine and keep going west. Floating the Bow in summer is a genuine mass ritual and it is policed: life jackets are mandatory and ticketable, alcohol on the water is illegal with patrol boats enforcing it, and you never tie rafts together. Keep river left approaching the 10 Street wave, which is dangerous for rafts and usually has surfers on it.",
    },
    {
      title: "Calgary Folk Music Festival, Prince's Island Park, late July",
      blurb:
        "The honest answer to what Calgarians do in July instead of the Stampede: same month, opposite city, four days on an island in the middle of the Bow with sixty-plus artists across main and side stages. Learn the tarp system before you go, because people queue early to claim ground in front of the main stage and turning up in the evening with nothing is the rookie move. Regulars come for the side stages and the collaborative workshop sets; the headliners are secondary.",
    },
    {
      title: "The Music Mile, Inglewood to East Village",
      blurb:
        "Twenty-plus venues on one walkable strip, and the most consistently underrated thing about this city: a blues room in an unmistakable blue building at the east end running live music seven nights a week, a folk and country stage doing hundreds of shows a year, and a hundred-year-old blues bar restored by the National Music Centre. If you're here in June, a five-day festival takes the whole thing over across thirty venues, and the right move then is walking into rooms with no plan at all.",
    },
    {
      title: "Bowness Park lagoon in winter",
      blurb:
        "Calgary's most distinctive experiences are all winter ones and there's no point apologising for that. Thirty hectares out where the Bow comes into the city, and the cold version is the one locals guard: free skating on the lagoon, an ice trail through the trees, fire pits, shinny, cross-country routes, rental and sharpening on site, and crokicurl, which is crokinole crossed with curling on ice and a genuinely great thing to explain to a visitor. All of it is chinook-dependent, since a warm westerly can pull the ice out from under the season in forty-eight hours, so check conditions the morning of; locals do that reflexively and visitors never think to.",
    },
    {
      title: "Public skate at the Olympic Oval",
      blurb:
        "Buy a drop-in ticket and skate on the ice where hundreds of world speed-skating records have been set since the late eighties. The 1988 legacy in this city isn't a monument, it's a facility people still use on a Tuesday, and there's public running on the indoor track too, which is how a lot of Calgarians survive February. No rings-and-torch nostalgia, just an elite training centre that lets the public on.",
    },
  ],
  photoSpots: [
    {
      title: "Scotsman's Hill, Ramsay",
      blurb:
        "Skip the parking area, walk out to the path along the bluff edge above the Elbow, and let the drop-off do the foreground work: the Saddledome roof mid-ground, the Stampede grounds below it, downtown towers behind, and on a clear day the Rockies as a serrated line on the horizon. Sunrise puts the sun at your back and front-lights the glass warm, blue hour twenty to thirty minutes after sunset gives lit towers against a still-blue sky, and winter beats summer here because haze and wildfire smoke can erase the mountains entirely. It's residential street parking so be considerate, and the name comes from spectators who watched the rodeo from up here without buying a ticket, which is still roughly what the hill does on fireworks nights.",
      locations: [
        {
          lat: 51.0365,
          lng: -114.0476,
          precision: "exact",
          facing: "NW",
          facingNote:
            "northwest off the bluff edge: Saddledome roof mid-ground, downtown behind it, and the Rockies as a serrated line when the air is clear",
        },
      ],
    },
    {
      title: "Crescent Road NW, on the Crescent Heights bluff",
      blurb:
        "The railing and benches along the south side of the escarpment, shooting south and southwest: the Bow in the foreground, Prince's Island's canopy in the middle, the downtown wall behind, Rockies on the right-hand horizon when it's clear. South-facing, so morning and evening hand you cross-light instead of direct sun, and winter sun stays low all day and rakes across the towers, which is unusually forgiving light at noon. Night and blue hour are the best of it, October for the island's cottonwoods turning gold, and this is Scotsman's Hill's complement rather than its duplicate: opposite bank, opposite side of the city.",
      locations: [
        {
          lat: 51.062,
          lng: -114.0775,
          precision: "approximate",
          facing: "S",
          facingNote:
            "south off the railing, river then island canopy then the downtown wall, and it reads best at night when the whole thing is light",
        },
      ],
    },
    {
      title: "Nose Hill Park, out on the plateau",
      blurb:
        "Walk ten or fifteen minutes out from any lot until the built edge drops away, because the point is grassland in the foreground and nothing man-made in the middle distance. Two shots in opposite directions: west and southwest for the chinook arch, that long band of cloud running parallel to the Rockies with clear sky glowing underneath it in the hour before sunset, and southeast for downtown rising straight out of open prairie, which is the single best image of what this city actually is. September and October turn the fescue copper, the slopes hold Foothills fescue grassland and it's one of the most threatened ecosystems in the world so stay on the trails, and the whole plateau is exposed and brutally windy during a chinook, which is exactly when you want to be up there.",
      locations: [
        {
          lat: 51.1112,
          lng: -114.1106,
          precision: "neighborhood",
          facingNote:
            "two shots in opposite directions: west for the chinook arch in the hour before sunset, southeast for downtown rising out of prairie",
        },
      ],
    },
    {
      title: "Peace Bridge, on the Bow",
      blurb:
        "Three vantages: inside the tube, low and centred, for the red helix converging to a vanishing point; the north bank pathway shooting southeast along the bridge with downtown behind it, which is the better composition; and the south bank for the reverse. Blue hour is when the bridge is lit and the red saturates against the sky, and in winter an early morning after a cold clear night gives you hoarfrost on the riverbank trees, the most underrated photograph in Calgary and one that lasts about two hours. It's a working commuter bridge, busy at both ends of the weekday and full of cyclists moving fast through the tube, so go early on a weekend and don't set up in the middle.",
      locations: [
        {
          lat: 51.0539,
          lng: -114.0789,
          precision: "exact",
          facing: "SE",
          facingNote:
            "southeast along the bridge from the north bank, which is the better of the three vantages, at blue hour when the red saturates",
        },
      ],
    },
    {
      title: "Calgary Central Library, East Village",
      blurb:
        "The correct answer to it being minus twenty-eight and still wanting a photograph. Stand on the ground floor of the atrium and shoot straight up through the oval skylight for the signature frame, then the wooden staircase cascading through the atrium from a mid-level balcony, then the cave-like arched wood entrance, which vignettes a portrait against daylight for you. Midday for the skylight to actually push light down the atrium, weekday mornings for the fewest people, and remember it's a working library full of people studying rather than a set: be quiet, don't block the stairs, and check the current photography policy before you bring a tripod.",
      locations: [
        {
          lat: 51.0455,
          lng: -114.0551,
          precision: "exact",
          facingNote:
            "straight up through the oval skylight from the atrium floor, which is the one frame here that has no compass bearing at all",
        },
      ],
    },
  ],
};

const banff: City = {
  slug: "banff",
  name: "Banff",
  countrySlug: "canada",
  countryName: "Canada",
  contentStatus: "published",
  tagline: "The logistics are the view.",
  intro:
    "Banff is two towns wearing one name: a strip of fudge shops and ski outlets built for people with four hours off a coach, and a working town behind it whose few thousand residents and seasonal staff eat somewhere else, at different hours, for half the price. The famous lakes are still worth it, but here the planning is the guide, so most of what follows is booking windows, free parking lots, and the ten bus lengths you owe a bear.",
  stay: {
    title: "Mount Royal Hotel, Banff Avenue at Caribou Street",
    blurb:
      "On this corner since 1908, bought by the Brewsters who built commercial Banff, burned in 2016 and rebuilt, and pointedly not the castle above town: this is the working town's hotel, with the breakfast pick on Caribou and Wild Flour one block over on Bear. When the logistics are the view, a townsite bed is what makes those pre-dawn shuttle alarms survivable.",
    url: "https://www.expedia.com/Banff-Hotels-Mount-Royal-Hotel.h688930.Hotel-Information",
  },
  cultureTips: [
    "Stay on the designated trail even when the better photo is two steps off it; alpine vegetation takes decades to recover from one social trail.",
    "Area closures are law, not suggestions; the seasonal and bear closures are legally enforceable, and they exist because disturbed bears have charged people.",
    "Pack out everything, including the apple core; natural food waste pulls wildlife toward people, and a food-conditioned bear is usually a dead bear.",
    "This is Treaty 7 territory, and to the Stoney Nakoda the town is Minihrpa, the waterfalls; the town's own acknowledgement names the Bearspaw, Chiniki and Goodstoney Nations, and learning that costs you nothing.",
    "Say hello to people on the trail; the greeting doubles as bear-aware noise, which locals appreciate far more than a Bluetooth speaker.",
  ],
  eats: [
    {
      title: "Wild Flour Bakery, Bear Street",
      blurb:
        "The one food business locals, seasonal staff and visitors all agree on without argument, and the only reason to be on Bear Street early. It is a bakery first and a cafe second, and the tell is that people walk out carrying bread rather than just coffee: sourdough, rye and whole wheat as the backbone, plus whatever came out of the stone hearth that morning. It is also the practical trailhead breakfast, since a loaf and a pastry early puts you on the parkway before the coaches leave Calgary, and the mid-morning queue in July is real. The risk here is the line, not the value.",
    },
    {
      title: "Ramen Arashi, in a mall arcade off Banff Avenue",
      blurb:
        "No view, no patio, no gimmick, nothing engineered for a photograph. Banff's seasonal workforce carries a large Japanese and Australasian contingent, and a genuinely good ramen counter is what that population keeps alive through the shoulder months once the tourists have gone. Follow the people who are still here in the quiet weeks.",
    },
    {
      title: "Carlito's Pizzeria, inside a hotel at the far end of Banff Avenue",
      blurb:
        "It sits inside a hotel off the end of the strip, which is precisely why it is not a tourist restaurant: nobody walking the avenue finds it by accident. It is delivery first, and the pizza that turns up at staff housing late at night is a better recommendation than anything on a sandwich board. Order it to wherever you are sleeping and stop pretending you are going to walk to dinner.",
    },
    {
      title: "Bare Bistro, in the light-industrial compound off Banff Avenue",
      blurb:
        "A cafe a few kilometres out, feeding trades, hotel back of house and people on shift: daily lunch specials, breakfast sandwiches, sticky buns. It reportedly supplies baked goods to hotels in town, which is the strongest local credential going, the tourist restaurants buying from it. It is not for you, which is the entire point: seating is limited, it keeps working hours and shuts long before dinner, and we could not confirm it is currently trading, so check before you drive out.",
    },
    {
      title: "Coyotes Southwestern Grill, Caribou Street",
      blurb:
        "One block off the main drag and locally owned for thirty-odd years, which in a town where restaurants churn constantly is the argument, not the listicles it also appears on. Breakfast is the consensus: huevos rancheros or the stuffed French toast, and morning reservations have to go by phone, which tells you how busy it gets. Calibration on those listicles, by the way: half of them still send you to a souvlaki place on Bear Street that closed some time ago, so a lot of that writing was copied rather than eaten.",
    },
  ],
  experiences: [
    {
      title: "Ride the car-free eastern Bow Valley Parkway",
      blurb:
        "Parks Canada closes the eastern stretch to motor vehicles for two windows a year, in spring and again in early autumn, and hands it to cyclists. Ride from the Fireside day-use area to Johnston Canyon, and take the autumn window if you can choose: larches turning, no bugs, warm light, two lanes of highway with nothing on it, and you arrive at the canyon by the bike racks instead of circling for a parking space. Plan around the overlap, though, because a separate mandatory travel restriction runs from early spring into late June, under which all travel including cycling and hiking is prohibited overnight, roughly eight at night to eight in the morning, to keep the corridor open for wolves, cougars and bears. No sunrise riding in spring, and better to know that now than at a barrier.",
    },
    {
      title: "Banff Centre Mountain Film and Book Festival, early November",
      blurb:
        "Nine days when Banff belongs to Banff: peak season is over, the snow is not reliable yet, rates drop, and the town fills with climbers, filmmakers and residents instead of coach tours. Eighty-plus films including premieres, plus talks, exhibitions and a marketplace, all of it on the campus above the townsite that most visitors never go up to at all. This is the town's actual cultural anchor, and locals plan their year around it.",
    },
    {
      title: "Johnson Lake or Cascade Ponds on a summer weeknight",
      blurb:
        "What residents genuinely do in July, and no visitor guide leads with it because there is no ticket to sell. Johnson Lake is one of the warmest swimmable lakes near the townsite, with a loop walk and room to lay out a towel; Cascade Ponds, minutes away on the same Minnewanka loop, has picnic tables and fire pits under the mountain, which is the grill-and-marshmallow option. Go after six, when the day-trippers have gone back to Calgary or into a restaurant, the light is long and the parking problem evaporates, and check whether a fire ban is in effect before you build an evening around those pits, because in high summer they are common.",
    },
    {
      title: "Skip Larch Valley, go larch spotting somewhere else",
      blurb:
        "Late September has a second and sharper crowd peak than midsummer, and it is concentrated almost entirely on one trail above Moraine Lake that now also requires a shuttle seat. The alternatives locals name are Healy Pass, whose trailhead lot is large enough to solve the parking problem outright, plus Arnica Lake, Taylor Lake and Saddleback Pass. The genuinely local move is twofold: pick a weekday, and pick a trailhead that is not sitting behind a reservation.",
    },
    {
      title: "Cave and Basin, off season, and the wildlife rules that come with all of the above",
      blurb:
        "This is the actual reason the national park exists, a thermal spring on the mountainside that became Canada's first national park, and in winter almost nobody goes: boardwalks, the cave, the thermal wetland, to yourself. The winter schedule is reduced and it is not open every day, which catches people out, so check before you drive over. Do this one first and the Vermilion Lakes stop stops being just a pretty pullout, because the thermal outflow is why the wetland downstream stays partly ice-free and why wildlife concentrates there. Which makes this the place to say the part that matters more here than anywhere else on this site. Parks Canada asks for 100 metres from bears, wolves, cougars and coyotes, ten bus lengths, and 30 metres from deer, elk, sheep and moose, three bus lengths. The short version, and the one worth carrying: if you make an animal move, you are too close. Feeding or enticing wildlife is illegal in a national park, full stop. In autumn the elk rut runs into mid-October and bull elk will charge, and it happens on residential streets and golf paths in town, not only out in the backcountry, so never turn your back and never run. Carry bear spray and know how to use it before you are in a position to need it.",
    },
  ],
  photoSpots: [
    {
      title: "Moraine Lake, from the top of the Rockpile",
      blurb:
        "Not the shoreline: climb the rubble moraine beside the lodge to the viewing platform on top, which is the frame that was on the back of the twenty. Shoot southwest down the length of the lake into the Valley of the Ten Peaks, water in the lower third, summits filling the back. Sunrise or accept a crowd, because the peaks catch first light while the valley floor is still blue, and midday is flat and packed. Access is the whole problem. The road is closed to personal vehicles year round, so you take the Parks Canada shuttle from the Park and Ride, and the regular first shuttle does not get you there for sunrise in summer. For actual dawn light you need the separate early-start shuttle that runs in the small hours, and it leaves from the Lake Louise lakeshore lot rather than the Park and Ride, so you are paying for lakeshore parking at four in the morning, which nobody tells you. Reservations only, no walk-ups. Here is the single most useful thing in this whole guide: a large majority of shuttle seats are held back and released at eight in the morning mountain time, two days before departure, so set an alarm for just before eight, two days out. Everyone who tells you the shuttle is impossible tried to book it the night before. All of this gets re-set every season, so confirm the current version with Parks Canada rather than with us.",
      locations: [
        {
          lat: 51.3216,
          lng: -116.186,
          precision: "approximate",
          facing: "SW",
          label: "Moraine Lake, the vantage is the top of the Rockpile",
          facingNote:
            "southwest down the length of the lake into the Valley of the Ten Peaks, water in the lower third and the summits filling the back",
        },
      ],
    },
    {
      title: "Vermilion Lakes at sunrise",
      blurb:
        "Stand on one of the docks along the lakeshore road and shoot east and southeast at the long tilted face across the water, reeds and the dock edge as foreground, mirrored if the water is still. Sunrise, and it is not close: that face takes the first light and runs orange to pink while the wetland is dead calm, and wind later kills the reflection. This is the easiest premium frame in the park, a short scenic road minutes from town, no permit, no shuttle, no closure, and you can ride out to it. Parking is genuinely limited, so a dawn arrival is practical as well as photographic, and winter is a real second season here, with the far lake staying partly ice-free.",
      locations: [
        {
          lat: 51.1843,
          lng: -115.5906,
          precision: "approximate",
          facing: "SE",
          facingNote:
            "southeast from one of the docks at the long tilted face across the water, reeds and dock edge as foreground, mirrored if it is still",
        },
      ],
    },
    {
      title: "Morant's Curve, on the western Bow Valley Parkway",
      blurb:
        "A signed pullout with a viewing deck and a lot that holds maybe a dozen cars. Shoot down and across the river at the S-curve of the rail line with the mountains behind: the frame is beautiful empty and transcendent with a freight train in it, and trains are unscheduled, so this is patience rather than planning. It is named for the railway's staff photographer who made the bend famous, autumn is the best palette, and in winter a red and black consist against snow is the classic. During the spring travel restriction and the cycling windows, approach from the Lake Louise end rather than from Banff.",
      locations: [
        {
          lat: 51.3995,
          lng: -116.128,
          precision: "exact",
          facingNote:
            "down and across the river at the S-curve of the rail line; this is a waiting shot, because the trains are unscheduled",
        },
      ],
    },
    {
      title: "Herbert Lake, on the Icefields Parkway",
      blurb:
        "A roadside day-use pullout where the walk from car to water is about thirty seconds. Shoot south and southwest across the lake at the range: small lake, big mountains, full mirror on a still morning, and sunrise is the whole point, because that is when you get the glass. This is the entry that most earns the brief, since while several hundred people are queuing for parking ten minutes down the road, this hands you a calm reflective foreground and an empty shoreline for nothing. Free roadside parking, no shuttle, no reservation, and it is a mountain highway, so check road conditions outside summer.",
      locations: [
        {
          lat: 51.4602,
          lng: -116.2226,
          precision: "approximate",
          facingNote:
            "across the lake at the range for the mirror, thirty seconds from the car; worth scouting the exact line on arrival",
        },
      ],
    },
    {
      title: "Surprise Corner, Buffalo Street at Tunnel Mountain Road",
      blurb:
        "The railed platform at the pullout, shooting southwest at the big hotel with the river and the valley below and the mountains framing it, which is the postcard of the hotel rather than the one taken from it. Morning light is better here, with sun on the mountain behind the hotel, and by afternoon you are shooting into it; autumn adds gold along the river, and snow on the roofs is arguably the strongest version of the shot. Walk out along Buffalo Street from Banff Avenue, about fifteen minutes, which beats driving because the lot is tiny, and at seven in the morning the platform is empty.",
      locations: [
        {
          lat: 51.1676,
          lng: -115.5598,
          precision: "exact",
          facing: "SW",
          facingNote:
            "southwest off the railed platform at the hotel, river and valley below, which is the postcard of it rather than from it",
        },
      ],
    },
  ],
};

const mtFuji: City = {
  slug: "mt-fuji",
  name: "Mt. Fuji",
  countrySlug: "japan",
  countryName: "Japan",
  contentStatus: "published",
  tagline: "Don't climb it, circle it.",
  intro:
    "The mountain is best from around it, not on it: a ring of lakes, an udon town, and spring ponds where Fuji looms over completely ordinary life. One honesty up front, it hides in haze far more than the postcards admit, so build your days around mornings, winter ones if you can, and treat a clear summer afternoon as a lottery win.",
  video: {
    youtubeId: "B3zh5GEifTY",
    title: "Biking around Lake Kawaguchiko",
    caption:
      "The Kawaguchiko loop, ridden counterclockwise so the mountain stays over the left shoulder. This is the ride the experiences list keeps talking about.",
  },
  stay: {
    title: "Kozantei Ubuya, Lake Kawaguchiko north shore",
    blurb:
      "A family-run lakefront onsen ryokan on the Ubuyagasaki stretch of the north shore, the same water where the upside-down Fuji shows up on still mornings, and every room faces the mountain. Build the day around mornings, this page says; here that starts before breakfast, and the bike loop's payoff section runs right past the door.",
    url: "https://www.expedia.com/Kofu-Hotels-Kozantei-Ubuya.h9274038.Hotel-Information",
  },
  cultureTips: [
    "Never step into the road for the shot; Fujiyoshida has posted warnings and an actual traffic officer because people kept standing in a live roadway, and the sidewalk angle is the same angle.",
    "The famous frames are people's front yards, so no driveways, gardens or shop forecourts for a better angle; residents here have had strangers knocking on their doors.",
    "Dawn shoots run on silent mode: the best light hits residential streets at five or six in the morning, so no calling across the street, no speaker audio, and close the car doors gently.",
    "Carry your trash out; public bins barely exist, the litter piles are a real local grievance, and a konbini bin is for konbini purchases.",
    "Leave the drone at home; the mountain is a no-fly zone out of respect for its sacred status, and the paperwork for flying anywhere near here is real.",
  ],
  eats: [
    {
      title: "Menkyokaiden, Fujiyoshida",
      blurb:
        "Yoshida udon is deliberately, almost confrontationally chewy, and this is the locals' pick in a ranking chosen by locals: office workers, families and elderly regulars, near the government complex instead of the tourist core. Order the everything-bowl with cabbage, yuba and stewed beef, then stir in the house suridane chili paste. Handmade, lunch-only, and the chew is the point, so don't fight it.",
    },
    {
      title: "Kosaku, Kawaguchiko",
      blurb:
        "The evidence-based answer to where you actually eat hoto: a Yamanashi institution of forty-plus years with lines of Japanese customers before the doors open. Get the kabocha hoto in the iron pot, then wait, because it arrives volcanic and locals let it sit; burning your mouth in the first minute is the visible tourist tell. Hoto Fudo is the name you'll see everywhere and it's fine, but Kosaku is where Yamanashi actually queues.",
    },
    {
      title: "Watanabe Udon, Oshino",
      blurb:
        "Eight tatami tables in a room that is basically a house, and the order is the nikutama udon: horse meat, cabbage, egg. Slot it around an early Oshino Hakkai visit, eat where the village eats, leave before the buses. Lunch-only and small enough that sold out means closed, so check it's open before building the day around it.",
    },
    {
      title: "CISCO Coffee, Kawaguchiko's southeast shore",
      blurb:
        "Single-origin beans roasted in San Francisco, hand-dripped on a lakeside wood deck on the early stretch of the bike loop. It's a linger cafe, not a fuel stop, so budget for the linger.",
    },
    {
      title: "Lake Bake, Oishi",
      blurb:
        "A natural-yeast bakery next to Oishi Park that even locals name-drop, and the fig and walnut boule keeps coming up for a reason. This is the natural mid-loop stop: coffee, bread, Fuji across the water, back on the bike.",
    },
  ],
  experiences: [
    {
      title: "Cycle the Kawaguchiko loop",
      blurb:
        "The best way to understand the lake, and the ride the video on this page comes from. Ten minutes gets you through the souvenir strip, and then it's boat ramps, allotments and fishing spots, the town just living its life. Ride counterclockwise so the mountain hangs over your left shoulder the whole north shore, and take an e-bike from the rental cluster near the station, because the bridge approach and the north side have real climbs. Call it a couple of hours of riding, more like half a day with stops; just under twenty kilometres by most counts, depending on who's counting. The north shore is the payoff: Oishi Park, then the Ubuyagasaki stretch where the upside-down Fuji reflection shows up on still mornings.",
    },
    {
      title: "Ride the Fujikyu Railway for its own sake",
      blurb:
        "A private mountain railway that climbs toward Fuji the entire way, so treat the approach as part of the trip: a direct limited express from Shinjuku, or the slow way via Otsuki. Get off at Mt. Fuji Station in Fujiyoshida, one stop before the tourist terminus, which is the correct stop for udon and Honcho.",
    },
    {
      title: "Fujiyoshida's retro streets",
      blurb:
        "The Showa-era Honcho arcade and the tiny Nishiura bar district of renovated rooms, in a town that wove textiles in Fuji's shadow for a century. This is the anti-Instagram counterweight to the viral photo frame on the very same street, and honestly the better hour.",
    },
    {
      title: "A day-use onsen with Fuji in the bath",
      blurb:
        "What locals actually do after a cold morning, with a couple of well-known options out toward Narusawa and Yamanakako, and there's even a bath named after the winter-dawn red-Fuji phenomenon. Wash first, towels out of the water, and check tattoo policies ahead rather than at the door.",
    },
    {
      title: "Go where the buses thin out",
      blurb:
        "Saiko for forest, Shojiko for fishermen at dawn, Motosuko for the banknote view; the western lakes are the slow-travel proof, and buses out there are sparse enough that planning around them is part of the trip. If you're here in late August, the Yoshida Fire Festival sends giant torches burning down the main street, the town thanking the mountain from below, which is this whole page in one night.",
    },
  ],
  photoSpots: [
    {
      title: "Chureito Pagoda, Arakurayama Sengen Park",
      blurb:
        "Climb the four hundred or so steps to the deck behind the pagoda and shoot over its roof toward Fuji across the valley. Sunrise for the glow; cherry blossoms in early-to-mid April and late-autumn foliage are the two peak frames and the two peak crowd disasters, with tripods lined up before dawn and entry restrictions on the worst weekends. You're climbing through an active shrine's grounds to a war memorial, so bow lightly at the torii, keep your voice down, and don't park a tripod in the worship path.",
      locations: [
        {
          lat: 35.5013,
          lng: 138.8014,
          precision: "exact",
          facing: "SW",
          facingNote:
            "southwest over the pagoda's roof toward Fuji, from the deck above it",
        },
      ],
    },
    {
      title: "Oishi Park, Kawaguchiko's north shore",
      blurb:
        "The lakeside flower promenade, shooting across the water with the seasonal beds as foreground: lavender in early summer, kochia in autumn, and the cleanest mountain of all on winter mornings. Before eight it belongs to dog walkers and cyclists on the loop; from mid-morning it belongs to the buses. Pick a side.",
      locations: [
        {
          lat: 35.5233,
          lng: 138.7465,
          precision: "exact",
          facing: "S",
          facingNote:
            "south across the lake with the flower beds as foreground, cleanest on a winter morning before eight",
        },
      ],
    },
    {
      title: "Honcho Street, Fujiyoshida",
      blurb:
        "The famous frame is from the sidewalk, looking straight down the street at Fuji with the retro signs and power lines converging on the mountain. Morning for light and visibility, weekday for honesty, when the shops are half-shuttered and locals are running errands; the city has posted warnings and stationed a traffic officer because people kept standing in the live roadway, so shoot from the sidewalk and cross on the signal. And while we're on the subject: skip the Lawson by Kawaguchiko Station, the one that became Japan's shorthand for overtourism. The town put up a screen, tourists poked holes in it, the screen came down, a lower barrier went up, and the situation changes every few months. No convenience-store roof is worth a besieged neighbourhood, and the same mountain rises over the lake shore ten minutes away.",
      locations: [
        {
          lat: 35.493,
          lng: 138.8041,
          precision: "approximate",
          facing: "S",
          facingNote:
            "straight down the street from the sidewalk, retro signs and power lines converging on the mountain; never from the roadway",
        },
      ],
    },
    {
      title: "Lake Motosuko, the thousand-yen-note view",
      blurb:
        "The engraving on the banknote comes from a 1935 photograph taken above the northwest shore, and a steep trail of about thirty minutes climbs from the lakeshore road to the deck. Shoot across the water; on a still winter morning you get the doubled, reflected Fuji of the note itself. Effort-gated, which is exactly why it's the least crowded frame on this list.",
      locations: [
        {
          lat: 35.4757,
          lng: 138.573,
          precision: "exact",
          facing: "SE",
          label: "Nakanokura Pass viewpoint",
          facingNote:
            "southeast across the water from the deck above the northwest shore, doubled in the lake on a still winter morning",
        },
      ],
    },
    {
      title: "Oshino Hakkai at dawn",
      blurb:
        "Stand between the central ponds and shoot over the thatched roofs and water toward the mountain; winter mornings add steam coming off the springs. By late morning the buses arrive and you can't hear yourself think. One rule with no exceptions: nothing goes in the water, because the ponds have a genuine coin-tossing problem, thousands fished out and corroding in springs famous for clarity that took twenty years of filtering. It is not a wishing well and it never was a Japanese custom.",
      locations: [
        {
          lat: 35.4602,
          lng: 138.8327,
          precision: "approximate",
          facing: "SW",
          facingNote:
            "over the thatched roofs and pond water toward the mountain, at dawn before the buses",
        },
      ],
    },
  ],
};

const sydney: City = {
  slug: "sydney",
  name: "Sydney",
  countrySlug: "australia",
  countryName: "Australia",
  contentStatus: "published",
  tagline: "The commute is the cruise.",
  intro:
    "The postcard harbour is real; locals just treat it as public transport. This is the Sydney that swims laps before work, commutes by ferry, and eats an hour down the train line.",
  stay: {
    title: "Manly Pacific, Manly",
    blurb:
      "This page keeps saying the commute is the cruise, and staying here makes it literal: the wharf is a short walk away, so the ferry past the Opera House and the Heads becomes your actual ride into town, coffee at the stern rail as prescribed. The rest of the time you're fronting Manly Beach on the North Steyne sand.",
    url: "https://www.expedia.com/Sydney-Hotels-Manly-Pacific-Sydney-MGallery-Collection.h6890.Hotel-Information",
    mapEmbedUrl: "https://www.stay22.com/embed/6a8742cbf438da660d2359b8",
  },
  cultureTips: [
    "Swim between the red and yellow flags, no exceptions: they mark the patrolled stretch positioned away from rips, rips are invisible from the sand, and if no flags are up the lifesavers have gone home, so no swim.",
    "If a rip does take you, don't fight it; float, raise an arm for the lifesavers, and swim parallel to the beach until you're out of the current.",
    "Sydney sits on Gadigal land of the Eora Nation; events open with a Welcome to Country delivered by Traditional Owners, or an Acknowledgement anyone may give, and the visitor's part is quiet attention rather than a performance.",
    "Tipping isn't expected anywhere; wages cover service, rounding up for great table service is a nice gesture, and pressing no tip on the terminal is completely normal.",
    "Sun safety is a cultural norm here, not fussiness; locals reapply SPF50 and chase shade because the UV is extreme even on cool, cloudy days.",
  ],
  eats: [
    {
      title: "Marrickville Pork Roll, Illawarra Road",
      blurb:
        "The consensus best banh mi in Sydney, sold from a modest shopfront window with a perpetual queue of inner west locals on their lunch break. Get the classic pork roll: crunchy baguette, pate, barbecue pork, pickles, chilli. Know your order before you reach the window, because the queue moves faster than you'd think.",
    },
    {
      title: "Tan Viet Noodle House, Cabramatta",
      blurb:
        "Cabramatta is Sydney's Vietnamese heart, an hour southwest and almost entirely free of incidental tourists, and this is the institution people pilgrimage out for. Whatever else happens, order the crispy-skin chicken with the dry egg noodles. That plate is the whole reason to ride the train line.",
    },
    {
      title: "Pho Tau Bay, Cabramatta",
      blurb:
        "Twenty-five-plus years of pho, and when the local council polled the businesses around it, nearly all of them named this place. Order the pho dac biet, with the lot: brisket, raw sirloin, beef balls, tendon, tripe. It's a morning-to-lunch spot, so go early rather than late.",
    },
    {
      title: "Emperor's Garden cream puffs and the Haymarket night crawl",
      blurb:
        "Haymarket is where Sydney's hospitality workers eat after close, which makes it the most honest late-night food precinct in the city. The hot cream puffs from the window on Hay Street are the walking-home ritual: eaten out of the bag, no seating, that is the point. Pair them with Thai Town's mainstays or a wafer-thin roti worth its queue.",
    },
    {
      title: "Coffee Alchemy, Marrickville",
      blurb:
        "The inner west is Sydney's coffee heartland and Marrickville is a legitimate coffee destination in its own right; this is one of the city's most decorated roasters. Order an espresso or a filter of whatever single origin is on. It's a coffee-first stop, not a brunch linger.",
    },
  ],
  experiences: [
    {
      title: "Morning laps at an ocean pool",
      blurb:
        "Sydney's most distinctive civic ritual: dozens of tidal pools cut straight into the coastline, and residents who structure their mornings around them. Mahon Pool at Maroubra is the locals' answer to the famous Icebergs, free, carved into the cliffs, waves washing over the edge at high tide; Wylie's Baths at Coogee is the paid classic with the raised timber deck. Go at opening light, which is when the regulars do.",
    },
    {
      title: "Malabar Headland, the honest coastal walk",
      blurb:
        "Bondi to Coogee is genuinely beautiful and genuinely a conveyor belt on weekends. Maroubra to Malabar gives you the same sandstone-cliff drama minus the procession: a roughly six-and-a-half-kilometre circuit through a national park, wartime history on the headland, and whales offshore in winter and early spring. Part of the headland shares space with a rifle range and closes some days, so check before you go.",
    },
    {
      title: "The Manly ferry, as transit rather than a tour",
      blurb:
        "The famous thing that survives the local test: it's regular public transport that residents commute on, it costs a standard ferry fare, and it crosses the full harbour past the Opera House, the Bridge and the Heads in about half an hour. Board at Circular Quay and go straight to the stern rail; the Opera House shot happens in the first five minutes, then everyone goes inside and you get the Heads to yourself. Ride it at commuter hours with a coffee, which is the local version.",
    },
    {
      title: "Carriageworks Farmers Market, Eveleigh",
      blurb:
        "Seventy-plus farmers and producers filling the former rail workshops on a Saturday morning, under a strict producers-only charter; inner-city residents know their growers by name here and treat it as a grocery run, not an attraction. The good bread and the flowers go early, so arriving at opening is the local move and arriving mid-morning is the visitor one.",
    },
    {
      title: "Lakemba Nights during Ramadan",
      blurb:
        "Australia's biggest Ramadan street-food event: dozens of stalls down Haldon Street running late into the night for the whole month, knafeh straight off the pan, the famous camel burger, Bangladeshi and Indonesian and Turkish iftar food side by side. It's a family event, deeply local and multicultural, and tourists largely miss it; the dates move with the lunar calendar each year, so check when Ramadan falls. Take the train to Lakemba.",
    },
  ],
  photoSpots: [
    {
      title: "Mrs Macquaries Point",
      blurb:
        "The only classic angle that gets the Opera House and the Harbour Bridge in one frame: stand on the headland's western edge and shoot west-northwest across Farm Cove. Sunrise gives you soft light on the sails and near-empty paths; sunset draws a tripod row, so arrive well early or just take the dawn.",
      locations: [
        {
          lat: -33.8597,
          lng: 151.2226,
          precision: "exact",
          facing: "NW",
          facingNote:
            "west-northwest across Farm Cove, the one angle with the Opera House and the Bridge in a single frame",
        },
      ],
    },
    {
      title: "Blues Point Reserve, McMahons Point",
      blurb:
        "The grass foreshore at the point, shooting southeast at the Bridge's western face with the city stacked behind it. Golden hour into blue hour is the window, when the westerly light paints the steel and the skyline lights come up. It's a short walk from the ferry wharf, and taking the ferry there is itself the local move.",
      locations: [
        {
          lat: -33.8496,
          lng: 151.2034,
          precision: "approximate",
          facing: "SE",
          facingNote:
            "southeast from the water's edge at the Bridge's western face, in the last of the westerly light",
        },
      ],
    },
    {
      title: "Milk Beach, Vaucluse",
      blurb:
        "A small harbour beach reached on foot via the Hermitage Foreshore track: shoot west from the sand or the rocks at the northern end, full skyline across the water, Shark Island mid-frame. Sunset is the hour, when the sun drops behind the towers. On summer evenings locals swim here after work, and the whole place is small enough that it never feels industrial-scale.",
      locations: [
        {
          lat: -33.8565,
          lng: 151.2673,
          precision: "exact",
          facing: "W",
          facingNote:
            "west across the harbour at the full skyline, Shark Island mid-frame, as the sun drops behind the towers",
        },
      ],
    },
    {
      title: "Bradleys Head, Mosman",
      blurb:
        "Walk in from Taronga Zoo Wharf, and the ferry over doubles as the scouting trip. From the stone amphitheatre and mast at the tip, shoot southwest with the Opera House dead ahead across the water and the city stacked behind; a longer lens compresses it beautifully. Sunrise, when the landmarks catch first light and the national park is near empty.",
      locations: [
        {
          lat: -33.8515,
          lng: 151.246,
          precision: "exact",
          facing: "SW",
          facingNote:
            "southwest from the amphitheatre at the tip, Opera House dead ahead with the city behind; a longer lens compresses it",
        },
      ],
    },
    {
      title: "Mahon Pool, Maroubra",
      blurb:
        "From the cliff path above the pool's southern side, shoot east-southeast into the sunrise with the lane line running out to the ocean. Mid-to-high tide sends whitewater over the edge, and winter gives you moodier swell with steam coming off the water. Swimmers own the lanes and photographers stay on the path, so don't stand on the pool edge blocking the turn wall.",
      locations: [
        {
          lat: -33.943,
          lng: 151.2639,
          precision: "exact",
          facing: "SE",
          facingNote:
            "east-southeast into the sunrise from the cliff path, the lane line running out to the ocean; stay off the pool edge",
        },
      ],
    },
  ],
};

const melbourne: City = {
  slug: "melbourne",
  name: "Melbourne",
  countrySlug: "australia",
  countryName: "Australia",
  contentStatus: "published",
  tagline: "Three tram stops past the postcard.",
  intro:
    "The laneway postcard is true, and it is maybe a third of the story. The rest lives out along the tram lines: injera in Footscray, pho on Victoria Street, footy as civic religion, and coffee treated as a craft with its own grammar.",
  stay: {
    title: "Zagame's House, Carlton",
    blurb:
      "The argument above is inner suburbs over the tower district, and this is the rare good hotel actually inside one: on Lygon Street in Carlton, the same strip as Tiamo, with the Royal Exhibition Building close by. Family-owned too, built by two brothers from a long-running Victorian hospitality family, which suits a page that keeps siding with the locals.",
    url: "https://www.expedia.com/Melbourne-Hotels-Zagames-House.h35218543.Hotel-Information",
  },
  cultureTips: [
    "Melbourne, Naarm, sits on the lands of the Kulin Nation, and the city formally acknowledges the Wurundjeri Woi-wurrung and Bunurong peoples as Traditional Owners; an Acknowledgement of Country opens events as standard practice, a Welcome to Country is a ceremony only Traditional Owners perform, and your part is quiet attention.",
    "Coffee ordering is real etiquette: know your order before you reach the counter, a flat white is the default grammar, \"magic\" is the insider word you'll hear at the good bars, and asking a specialty barista for heavy syrup customisation misreads the room.",
    "Tram basics: touch on with your fare card, know the CBD has a free tram zone, let passengers off before you board, move down the aisle, and offer the seats that need offering.",
    "The hook turn is real: in the CBD, right turns at signed intersections happen from the left lane so the tram tracks stay clear, so expect it if you drive and don't be alarmed watching it as a pedestrian.",
    "Tipping is not expected; wages cover service, the whole city runs tap-and-go, and rounding up for something exceptional is a bonus rather than an obligation.",
  ],
  eats: [
    {
      title: "Cafe Lalibela, Footscray",
      blurb:
        "Ethiopian cooking made for the community rather than for visitors, on the Barkly Street strip that makes Footscray the most interesting food suburb in the city. Order a shared platter, tear the injera with your right hand, and scoop. Then walk a block to Nhu Lan for a banh mi, because two migrations sharing one block is Footscray's whole argument.",
    },
    {
      title: "Pho Hung Vuong Saigon, Victoria Street, Richmond",
      blurb:
        "Victoria Street is the strip locals call Little Saigon, and this is the consensus benchmark pho; order the special with the works and don't overthink it. Walk toward the far end of the street and the tourist count drops while the tables fill with regulars, which is exactly the trade you want.",
    },
    {
      title: "A1 Bakery, Sydney Road, Brunswick",
      blurb:
        "A Lebanese bakery and grocer that has anchored Sydney Road since the early nineties: falafel wrap with pickled turnip and tahini, or a cheese and za'atar pie, then a lap of the grocer aisles. The Saturday queue out the door is the endorsement, not the deterrent.",
    },
    {
      title: "Tiamo, Lygon Street, Carlton",
      blurb:
        "Lygon Street is half tourist trap now, and Tiamo is the surviving real thing: forty-plus years of red-sauce pasta and espresso for students, workers and northside locals. Skip the spruikers mid-strip and stay at the north end, where the honest rooms are.",
    },
    {
      title: "Patricia Coffee Brewers, rear of Little Bourke Street",
      blurb:
        "A standing-room espresso bar hidden behind an unmarked corner, and about as pure as Melbourne coffee culture gets: the menu is essentially black, white or filter, the weekday crowd is lawyers, and you'll hear someone order a \"magic\" like it's the most normal word in the language. Drink it standing and you're done in nine minutes. If you need a chair, Market Lane in Carlton and Proud Mary in Collingwood carry the same local weight sitting down.",
    },
  ],
  experiences: [
    {
      title: "Footy at the MCG, done as a neutral",
      blurb:
        "The civic religion, April to September: pick a home-and-away game, sit high for the sightlines, take the train, eat a meat pie at half time, then ride home with forty thousand people dissecting the umpiring. Both sets of fans sit together here, no segregated ends; barrack loudly, cop the banter, and know the line at personal abuse is real and enforced.",
    },
    {
      title: "Market Saturday, the suburb version",
      blurb:
        "Queen Vic is fine, and it is the visitor market; the weekly shop happens further out. South Melbourne for the oversized dim sims from the same family stall since the forties, eaten at the counter with soy; Preston for the louder, cheaper everyday version with vendors calling prices; Footscray for Vietnamese produce and rice rolls steamed to order.",
    },
    {
      title: "The St Kilda penguins, done right",
      blurb:
        "A colony of little penguins lives in the St Kilda breakwater, and a purpose-built viewing boardwalk now runs free sessions around sunset, supervised every night by the volunteers who have guarded the colony for decades. No white light, no flash, keep your distance, and drop a donation in the tin; conservation-first, and the exact opposite of a paid penguin parade.",
    },
    {
      title: "A band room night",
      blurb:
        "The Tote in Collingwood, the Corner in Richmond, or the Northcote Social Club: check the gig guide, pay the door price, stand on carpet that has seen things, hold a beer. Melbourne calls itself Australia's live-music capital, and the state literally bailed out over a hundred venues to keep it that way. Pho on Victoria Street before a Corner show is the classic pairing.",
    },
    {
      title: "The bay morning",
      blurb:
        "Port Phillip Bay is flat, and the local ritual is a swim at Williamstown or Elwood, coffee after, then a walk out to a lookout like Point Ormond with the skyline across the water. Routine rather than resort, and there are people who do it all winter. At a patrolled beach, swim between the flags like everyone else.",
    },
  ],
  photoSpots: [
    {
      title: "Ruckers Hill, Northcote",
      blurb:
        "Stand on High Street near the crest and shoot southwest straight down the strip: tram wires, shopfronts and the full CBD skyline stacked at the end of the street. Sunset into blue hour, winter for clarity, with a tram rattling through the frame. The anti-observation-deck: free, local, and almost nobody else is shooting.",
      locations: [
        {
          lat: -37.7758,
          lng: 144.9979,
          precision: "approximate",
          facing: "SW",
          facingNote:
            "southwest down High Street from the crest, tram wires and shopfronts with the skyline stacked at the end",
        },
      ],
    },
    {
      title: "Gem Pier, Williamstown",
      blurb:
        "Walk to the end of the pier and shoot northeast across the bay, past the yacht masts, at the skyline. Sunset and blue hour are the window, when the west-facing city catches the last light and then switches itself on. Ferry or train out, strolling families for company.",
      locations: [
        {
          lat: -37.8614,
          lng: 144.9056,
          precision: "exact",
          facing: "NE",
          facingNote:
            "northeast from the end of the pier, past the yacht masts, at the skyline as it catches the last light",
        },
      ],
    },
    {
      title: "The Shrine of Remembrance balcony",
      blurb:
        "The upper balcony's north side looks straight down the ceremonial axis into the CBD, the city's one true axial view. Daytime only, within memorial hours, and it is a war memorial first: behave like it, no posing gimmicks.",
      locations: [
        {
          lat: -37.8305,
          lng: 144.9734,
          precision: "exact",
          facing: "N",
          facingNote:
            "north from the upper balcony, straight down the ceremonial axis into the city",
        },
      ],
    },
    {
      title: "AC/DC Lane and Duckboard Place",
      blurb:
        "Enter off Flinders Lane and shoot down through the murals and rock-poster grime, then follow the bend into Duckboard Place and hunt for what's left of the famous stencils. Early morning for an empty lane, overcast to flatter the paint. And the honest word on Hosier Lane: the tour groups have it and it's mostly tags now, so give it five minutes for the one essential portrait mural, then come here, where the paint is fresher and the crowd is gone.",
      locations: [
        {
          lat: -37.8156,
          lng: 144.9709,
          precision: "exact",
          facingNote:
            "down the lane from the Flinders Lane end and around the bend into Duckboard Place; no single bearing, follow the paint",
        },
      ],
    },
    {
      title: "Dendy Street Beach, Brighton",
      blurb:
        "The bathing boxes earn their fame, with one caveat: sunrise or don't bother. Stand at the south end of the row, low to the sand, so the boxes recede with the skyline faint behind them; by midday it's wall-to-wall photoshoots. Train to Brighton Beach on the Sandringham line, soft light, empty beach.",
      locations: [
        {
          lat: -37.9207,
          lng: 144.9875,
          precision: "approximate",
          facing: "NW",
          facingNote:
            "northwest along the row of boxes from the south end, low to the sand so they recede with the skyline faint behind",
        },
      ],
    },
  ],
};

const montreal: City = {
  slug: "montreal",
  name: "Montreal",
  countrySlug: "canada",
  countryName: "Canada",
  contentStatus: "published",
  tagline: "Neighbourhoods that eat in French.",
  intro:
    "Downtown is where Montreal keeps its offices; the city itself lives in Mile End, the Plateau and Little Italy, and it eats in French. Come ready to pick a bagel shop, because neutrality is not on the menu.",
  stay: {
    title: "Hôtel de l'ITHQ, foot of the Plateau",
    blurb:
      "The teaching hotel of Quebec's state hospitality institute, run partly by students still learning the trade, which is about as on-brand as this blog's name gets. It faces Square Saint-Louis at the Plateau's southern edge, with Mile End and the mountain starting up the street and the metro directly underneath running straight to Jean-Talon.",
    url: "https://www.expedia.com/Montreal-Hotels-Hotel-De-LITHQ.h4219569.Hotel-Information",
  },
  cultureTips: [
    "Open with bonjour everywhere, even if you switch to English a beat later, and if you get the famous Bonjour-Hi, answer in whichever language you were greeted in; the greeting is live politics here, and nobody is waiting on a visitor's take.",
    "Tip 15 to 20 percent, and since 2025 Quebec law makes the machine calculate its suggested tips on the pre-tax amount, so for once the screen is on your side.",
    "Beer and wine come from the dépanneur, the corner store, a genuine Quebec distinction; drinking them in a park is only legal with a meal at a designated picnic table, borough rules vary, and yes, the picnic-table technicality is real.",
    "Terrasse culture is real: the first warm week of the year the entire city moves outdoors, cinq à sept is the local happy hour, and lingering is normal, not rude.",
    "Montreal is widely called Tiohtià:ke in Kanien'kéha; institutions here acknowledge the Kanien'kehá:ka Nation as custodians of unceded territory and name the island a longstanding meeting place of many nations, and the visitor's part is to relay that practice with quiet attention rather than adjudicate it.",
  ],
  eats: [
    {
      title: "St-Viateur versus Fairmount, the bagel question",
      blurb:
        "Montreal's one genuine civic argument, fought across two blocks of Mile End: Fairmount is the original, St-Viateur opened around the corner in the fifties, and both are working bakeries locals hit at odd hours, not attractions. The assignment is one hot sesame from each, eaten walking; whichever you finish first is your answer. For the record, St-Viateur runs denser and chewier with that honey-sesame crust, Fairmount sweeter and softer, and there is no wrong vote, just a lifelong one.",
    },
    {
      title: "Lester's Deli, Outremont",
      blurb:
        "Schwartz's earns its fame, just not necessarily your hour in line. Lester's has been on Avenue Bernard since the early fifties and it's where longtime Montrealers actually go: medium-fat smoked meat sandwich, fries, done. Schwartz's is an experience; Lester's is lunch.",
    },
    {
      title: "Café Olimpico, Mile End",
      blurb:
        "Montreal café culture grew out of the Italian espresso bar, not third wave, and this is the root: opened in 1970 by an Italian immigrant as a soccer-watching espresso joint, blend unchanged since. Drink it at the counter with the old guys, and if Italy is playing, stay. The deeper cut is Caffè Italia on Saint-Laurent in Little Italy, same tradition, less discovered.",
    },
    {
      title: "Wilensky's Light Lunch, Mile End",
      blurb:
        "Open since 1932, still family-run, and gloriously unbending: the Wilensky Special, grilled salami and bologna on a pressed roll, comes with mustard, no exceptions, and is never cut in half. Don't ask; the refusal has been the rule since day one, and the refusal is the point. Mordecai Richler's Mile End, preserved in amber.",
    },
    {
      title: "L'Express, rue Saint-Denis",
      blurb:
        "Opened in 1980 as a deliberate Paris bistro, now genuinely the institution it set out to imitate, with a good claim to igniting the city's restaurant renaissance. Beef tartare, bone marrow, celery remoulade, wine markups that are famously fair; it seats late, and late is when the Plateau comes here to celebrate things, in French. Book ahead.",
    },
  ],
  experiences: [
    {
      title: "Tam-tams on the mountain",
      blurb:
        "On Sundays roughly May to September, weather permitting, an informal drum circle takes over the slope at the Cartier monument on the Avenue du Parc side: drummers, dancers, vendors, and half the Plateau on blankets. It's a picnic, not a performance, and the drummers are locals, not buskers. Free and unofficial, which is the whole charm.",
    },
    {
      title: "The Jean-Talon market run, Little Italy",
      blurb:
        "One of North America's largest open-air markets in summer, but here's the secret version: the walls go up in October and the butchers, cheesemongers and maple stalls run all winter. Saturday morning is the social scene, a weekday morning the calm one, and either way it's Quebec producers selling direct. Pair it with an espresso at Caffè Italia and a walk down the Main.",
    },
    {
      title: "The Plateau on foot",
      blurb:
        "Walk Avenue Laval north from Square Saint-Louis toward Mont-Royal, detouring down Drolet and Henri-Julien: the densest stretch of wrought-iron spiral staircases and painted triplexes in the city, built that way because early-1900s bylaws pushed the stairs outside. Slip into the green alleys between the blocks. It's free and unticketed, and people live here, so keep it discreet.",
    },
    {
      title: "Winter, treated as identity",
      blurb:
        "Winter rituals are the point of the season here, not consolation prizes. Skate free at Esplanade Tranquille downtown, skate loan included, or on the refrigerated rink at Beaver Lake up the mountain. Then sugar-shack season runs roughly late February into April; the March weekends book out weeks ahead, and Verdun throws an urban street-festival version if the countryside isn't happening.",
    },
    {
      title: "The river in summer",
      blurb:
        "Swim in the St. Lawrence at Verdun Beach, a supervised, buoy-marked zone behind a rock jetty (check it's open for the season), then watch the surfers queue for the standing wave behind Habitat 67, a permanent river wave locals have ridden for decades. A river city that only recently re-learned to swim in its own river. (Old Montreal, honestly: a costumed scrum by midday, so do it as a dawn walk and be gone before the terrasses fill.)",
    },
  ],
  photoSpots: [
    {
      title: "Belvédère Kondiaronk, Mount Royal",
      blurb:
        "Stand at the stone balustrade in front of the chalet and shoot southeast over the downtown towers to the river. Blue hour is the one, when the skyline lights come up; winter adds snow-loaded trees and a warm chalet to thaw in, and a weekday dawn is empty. Earn it via the stair climb from the Peel Street entrance, which doubles as half the city's weekly workout.",
      locations: [
        {
          lat: 45.5035,
          lng: -73.5871,
          precision: "exact",
          facing: "SE",
          facingNote:
            "southeast from the balustrade over the downtown towers to the river, at blue hour as the lights come up",
        },
      ],
    },
    {
      title: "Habitat 67, from Avenue Pierre-Dupuy and Parc de Dieppe",
      blurb:
        "The riverside sidewalk along Pierre-Dupuy gives the classic stacked-cubes close-up; carry on to Parc de Dieppe at the point and turn around for the reverse, Old Port and skyline across the water, surfers on the standing wave behind you. Golden hour, reached by bike path or a flat walk from the Old Port. The building is private homes, so shoot from the public sidewalk and the park.",
      locations: [
        {
          lat: 45.4999,
          lng: -73.5438,
          precision: "approximate",
          label: "Shoot from the Pierre-Dupuy sidewalk; Parc de Dieppe for the reverse",
          facingNote:
            "the stacked cubes from the public sidewalk, then the skyline back across the water from the point; two directions, one walk",
        },
      ],
    },
    {
      title: "Square Saint-Louis and Avenue Laval",
      blurb:
        "Inside the square, shoot the Victorian greystone row with its painted turrets on the north side, then work Laval, Drolet and Henri-Julien northward for the spiral staircases. Early morning gives empty frames and side light, and fresh snow or autumn colour transforms the whole thing. On summer evenings the square fills with residents, which is a feature, so shoot wide.",
      locations: [
        {
          lat: 45.5171,
          lng: -73.5698,
          precision: "exact",
          facing: "N",
          facingNote:
            "north at the greystone row and its painted turrets from inside the square, then up the staircase streets beyond",
        },
      ],
    },
    {
      title: "Marché Jean-Talon, mid-market",
      blurb:
        "Under the central awnings, shooting down the produce rows; in winter, inside the enclosed halls with the butchers and the maple stalls. Saturday morning for maximum life, a weekday for clean frames, late summer for peak Quebec colour. Ask vendors before close-ups.",
      locations: [
        {
          lat: 45.5359,
          lng: -73.6151,
          precision: "exact",
          facingNote:
            "down the produce rows under the central awnings, or inside the winter halls; no single bearing, follow the colour",
        },
      ],
    },
    {
      title: "Saint Joseph's Oratory",
      blurb:
        "From the foot of the pilgrim stairs, go wide angle up at Canada's largest dome, then take the terrace panorama over the other side of the city, the opposite view from Kondiaronk. Early morning is serene; midday is pilgrims and tour groups. It's a working shrine, so quiet inside and no flash during services.",
      locations: [
        {
          lat: 45.4921,
          lng: -73.6167,
          precision: "exact",
          facingNote:
            "wide angle up at the dome from the foot of the pilgrim stairs, then the terrace panorama; a working shrine, so keep it quiet",
        },
      ],
    },
  ],
};


const bali: City = {
  slug: "bali",
  name: "Bali",
  countrySlug: "indonesia",
  countryName: "Indonesia",
  contentStatus: "published",
  tagline: "The island clocks in at five.",
  intro:
    "The beach clubs hold one narrow corner of the southwest; the rest of the island runs on markets that open at five, warungs that cook one dish, and temples that are working buildings rather than backdrops. Two honesties up front: distances are slow, so hire a driver for the long hops and keep the scooter for getting around one area, and the November-to-March rains mean brown waterfalls and a volcano you may never see, traded for the greenest paddies of the year.",
  stay: {
    title: "Cepik Villa, Sidemen valley",
    blurb:
      "A small family-run inn in the valley this page keeps calling old Bali: traditional-style bungalows, a pool looking over the rice fields, a warung on site, and village treks and cooking classes run by the family themselves. Nothing on this page is a beach club within an hour of here, which is exactly the argument.",
    url: "https://www.expedia.com/Sidemen-Hotels-Cepik-Villa.h5441009.Hotel-Information",
  },
  cultureTips: [
    "Never step on or over canang sari, the little palm-leaf offerings on sidewalks and doorsteps; they're placed fresh every morning and treading on one is genuinely offensive, so watch your feet.",
    "Sarong and sash at every temple, all genders, shoulders covered; the major temples rent or provide them at the gate.",
    "Check when Nyepi falls before booking anything: the Day of Silence shuts the entire island for twenty-four hours, airport included, enforced by village wardens. The ogoh-ogoh parades the evening before are spectacular, and staying in for the silent night is arguably the most local experience there is.",
    "Right hand, or both hands, to give, receive, eat and pay; the left is considered unclean.",
    "Ceremonies have right of way: roads close for processions without notice, so wait or reroute, and never honk your way through one.",
  ],
  eats: [
    {
      title: "Nasi Ayam Kedewatan Ibu Mangku, Kedewatan",
      blurb:
        "A family compound on the Ubud outskirts that has cooked essentially one thing since 1970: the nasi ayam special, shredded spiced chicken, sate lilit, egg, and a sambal matah that resets your expectations of the dish. The crowd is heavily Indonesian, which around Ubud is the whole endorsement; if the queue is long, do what the locals do and cross the street to Ibu Agung, the family's own rival.",
    },
    {
      title: "Warung Nasi Men Weti, Sanur",
      blurb:
        "A pioneer nasi campur stall opposite Sanur beach since the 1970s, the recipe kept by the founder's son. Go before nine, join a queue that's mostly Balinese, and understand this is grab-a-plate, not hospitality. The sambal is not a garnish; it's the thesis.",
    },
    {
      title: "Warung Mak Beng, north Sanur",
      blurb:
        "Eighty-plus years old and the menu is one line: fried fish and fish-head soup, and that is the entire restaurant. There are branches now; go to the original in north Sanur, where the whole idea started.",
    },
    {
      title: "Warung Babi Guling Pande Egi, Gianyar",
      blurb:
        "Gianyar is the regency Balinese people will point you to for babi guling, and this family-run spot in Beng village is the case for the drive: open-air tables facing rice paddies, and the nasi babi guling jumbo as the order. The location does the filtering; the Instagram circuit doesn't come out here.",
    },
    {
      title: "Gianyar Night Market, Gianyar town",
      blurb:
        "Bali's biggest and oldest night market, about thirty minutes northeast of Ubud, and it's where the surrounding villages eat dinner. Graze rather than commit: babi guling, sate lilit, serombotan, Klungkung's vegetable salad under spicy grated coconut, and the jaje Bali sweets, laklak and klepon. Arrive between six and seven in the evening.",
    },
  ],
  experiences: [
    {
      title: "Dawn on the flower floor, Pasar Badung, Denpasar",
      blurb:
        "Bali's largest and oldest market, trading on the Badung river since 1906 and open around the clock, but the hour that matters is five to seven, when the ground floor becomes a flower exchange for the day's canang sari offerings. This is the island's morning engine room, so greet the vendors, buy something small, and keep the camera second.",
    },
    {
      title: "Melukat at Tirta Empul, done properly",
      blurb:
        "The holy spring at Tampaksiring is a functioning temple, not a backdrop, and since a rule that arrived in 2025 you need a licensed guide to enter the purification pools, which has nudged the whole experience back toward reverence. Sarong and sash everywhere, a dedicated green sarong for the pools, and move through the spouts in sequence; the guide is there to make sure the ritual stays a ritual.",
    },
    {
      title: "Walk Jatiluwih, the anti-Tegallalang",
      blurb:
        "Six hundred-plus hectares of UNESCO-listed subak landscape in the Tabanan highlands, with marked walking loops instead of a photo queue. Go before nine, pick a longer loop, and let the irrigation system that's run this island for centuries explain itself; March and April are the greenest.",
    },
    {
      title: "Sidemen valley on foot, Karangasem",
      blurb:
        "Ninety minutes east of Ubud is the valley people call old Bali: paddy paths under Mount Agung and a living center of endek and songket weaving. Walk it slowly and ask locally about the looms rather than following a pin; the valley rewards the unplanned version.",
    },
    {
      title: "The jukung fleet at dawn, Jemeluk Bay, Amed",
      blurb:
        "Amed is still a working fishing coast: the outrigger jukungs go out before light and come back through sunrise with Agung glowing behind them. Be on the beach between five thirty and six thirty, and if you want to be on the water instead, the local fishermen run sunrise trips through the small hotels.",
    },
  ],
  photoSpots: [
    {
      title: "Jemeluk Bay viewpoint, Amed",
      blurb:
        "The curve of the bay, jukungs on the sand, Mount Agung behind: the east coast's whole argument in one frame. Sunrise catches the fleet coming home; sunset works too if the morning gets away from you.",
      locations: [
        {
          lat: -8.3388,
          lng: 115.6465,
          precision: "exact",
          facing: "W",
          facingNote:
            "west across the bay, with the jukungs on the sand below and Mount Agung on the horizon",
          label: "Viewpoint on the Amed coast road",
        },
      ],
    },
    {
      title: "Bukit Cinta, Karangasem",
      blurb:
        "Agung over mist and palm groves at first light, from a roadside pull-off with a small fee box. Be there at six, because the mist burns off fast; March to October gives the clearest mountain.",
      locations: [
        {
          lat: -8.4262,
          lng: 115.6087,
          precision: "exact",
          facing: "NW",
          facingNote: "northwest toward Mount Agung, over the mist and palm groves",
          label: "Roadside viewpoint with the fee box",
        },
      ],
    },
    {
      title: "Jatiluwih terraces, Tabanan",
      blurb:
        "The terraced amphitheater with Mount Batukaru behind it, and walkers out on the bunds for scale. Before nine, same as the walk, when the light is low and the loops are quiet.",
      locations: [
        {
          lat: -8.3702,
          lng: 115.1312,
          precision: "approximate",
          facing: "NW",
          facingNote:
            "northwest across the terraces toward Mount Batukaru; the site is enormous, this pin is the entrance",
          label: "Jatiluwih site entrance",
        },
      ],
    },
    {
      title: "Campuhan Ridge Walk, Ubud",
      blurb:
        "The grass spine above Ubud in low golden light. Be on the ridge by six, when it's genuinely a locals' jogging path; by nine it's hot, hard light and steady traffic.",
      locations: [
        {
          lat: -8.5038,
          lng: 115.2546,
          precision: "exact",
          facing: "N",
          facingNote: "north up the grass spine of the ridge from the trailhead",
          label: "Trailhead beside Pura Gunung Lebah",
        },
      ],
    },
    {
      title: "Banyumala Twin Waterfalls, Wanagiri highlands",
      blurb:
        "Two parallel cascades into a green pool, shaded grotto light, and a case for the long exposure. The descent is a steep ten to fifteen minutes and dry season keeps the water clear; the road up passes the Wanagiri selfie platforms, giant nests and hands built for a feed, and driving past them is the point of this page.",
      locations: [
        {
          lat: -8.2173,
          lng: 115.1017,
          precision: "exact",
          label: "The falls; the trail down starts a steep ten minutes above",
        },
      ],
    },
  ],
};

export const countries: Country[] = [
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    blurb: "Sunrise monuments, street chai, and a monkey after your lunch.",
    cities: [
      delhi,
      agra,
      city("india", "India", "chandigarh", "Chandigarh", "A city drawn with a ruler."),
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Western Europe",
    blurb: "Bike the canals, then let the free ferry finish the tour.",
    cities: [amsterdam],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Western Europe",
    blurb: "Villages, mills and caves, all under the same drizzle.",
    cities: [
      london,
      manchester,
      nottingham,
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    flag: "🇮🇹",
    region: "Southern Europe",
    blurb: "Espresso standing up, aperitivo sitting down, monuments at odd hours.",
    cities: [rome, florence],
  },
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    region: "Western Europe",
    blurb: "Two maps: one for the bakeries, one for the monuments.",
    cities: [paris],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    blurb: "The ferry is the commute and the ocean pool is the gym.",
    cities: [
      sydney,
      melbourne,
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    region: "East Asia",
    blurb: "Eat behind the famous thing. Check the last train.",
    cities: [
      tokyo,
      kyoto,
      osaka,
      mtFuji,
    ],
  },
  {
    slug: "china",
    name: "China",
    flag: "🇨🇳",
    region: "East Asia",
    blurb: "The buns sell out at dawn; the teahouse waits all afternoon.",
    cities: [
      shanghai,
      beijing,
      chengdu,
      city("china", "China", "chongqing", "Chongqing", "A city stacked on a mountain."),
    ],
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "Southeast Asia",
    blurb: "One-dish warungs, five a.m. markets, a driver for the long hops.",
    cities: [bali],
  },
  {
    slug: "mexico",
    name: "Mexico",
    flag: "🇲🇽",
    region: "North America",
    blurb: "Salt rim, sunset, then three blocks inland to eat.",
    cities: [
      city("mexico", "Mexico", "puerto-vallarta", "Puerto Vallarta", "Cobblestones to the sea."),
      cabo,
    ],
  },
  {
    slug: "dominican-republic",
    name: "Dominican Republic",
    flag: "🇩🇴",
    region: "Caribbean",
    blurb: "Santo Domingo up first, notes still in the darkroom.",
    cities: [
      city("dominican-republic", "Dominican Republic", "santo-domingo", "Santo Domingo", "First city of the New World."),
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    region: "North America",
    blurb: "Home turf, which mostly means knowing where the free version is.",
    cities: [vancouver, toronto, calgary, banff, montreal],
  },
  {
    slug: "usa",
    name: "USA",
    flag: "🇺🇸",
    region: "North America",
    blurb: "The views are free, so the budget goes to tacos and dumplings.",
    cities: [
      losAngeles,
      newYorkCity,
      city("usa", "USA", "miami", "Miami", "Pastel deco, Cuban coffee."),
      seattle,
      sanFrancisco,
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
  ["netherlands", "amsterdam"],
  ["india", "delhi"],
  ["usa", "san-francisco"],
  ["india", "agra"],
];

export const featuredCities: City[] = featuredCitySlugs
  .map(([countrySlug, citySlug]) => getCity(countrySlug, citySlug))
  .filter((c): c is City => Boolean(c));

export type FeaturedCityCard = Pick<
  City,
  "slug" | "name" | "countrySlug" | "countryName" | "tagline"
>;

/* Just enough of a country to draw a flag pill on the homepage hero. */
export type CountryPill = Pick<Country, "slug" | "name" | "flag">;

export const featuredCityCards: FeaturedCityCard[] = featuredCities.map((city) => ({
  slug: city.slug,
  name: city.name,
  countrySlug: city.countrySlug,
  countryName: city.countryName,
  tagline: city.tagline,
}));

/* A pinned photo spot, carrying the list number its pin is labelled with. */
export type MappedSpot = {
  /* 1-based position in the city's photoSpots list, so pins match the list. */
  index: number;
  title: string;
  location: SpotLocation;
};

/*
 * Flattened so a spot carrying two pins yields two entries sharing one number;
 * cities with no located spots yield none, and the map section renders nothing.
 */
export function mappedSpots(city: City): MappedSpot[] {
  return city.photoSpots.flatMap((spot, i) =>
    (spot.locations ?? []).map((location) => ({
      index: i + 1,
      title: spot.title,
      location,
    }))
  );
}

/* A photo plus enough context to caption and link it outside its city page. */
export type GalleryPhoto = Photo & {
  citySlug: string;
  cityName: string;
  countrySlug: string;
  countryName: string;
};

/* Every photo attached to a city: list-item photos first, then gallery extras. */
export function cityPhotos(city: City): GalleryPhoto[] {
  const listPhotos = [...city.eats, ...city.experiences, ...city.photoSpots]
    .map((item) => item.photo)
    .filter((photo): photo is Photo => Boolean(photo));
  return [...listPhotos, ...(city.gallery ?? [])].map((photo) => ({
    ...photo,
    citySlug: city.slug,
    cityName: city.name,
    countrySlug: city.countrySlug,
    countryName: city.countryName,
  }));
}

const isPublishedCity = (city: City) => city.contentStatus === "published";

export const publishedCities: City[] = allCities.filter(isPublishedCity);

/* Every photo from every published city, in destination order — feeds /gallery. */
export const allGalleryPhotos: GalleryPhoto[] = publishedCities.flatMap(cityPhotos);

export const countriesWithPublishedCities: Country[] = countries
  .map((country) => ({
    ...country,
    cities: country.cities.filter(isPublishedCity),
  }))
  .filter((country) => country.cities.length > 0);

/* Flag pills for the hero's final frame; only countries with something to read. */
export const countryPills: CountryPill[] = countriesWithPublishedCities.map(
  ({ slug, name, flag }) => ({ slug, name, flag })
);

export function getPublishedCountry(slug: string): Country | undefined {
  return countriesWithPublishedCities.find((country) => country.slug === slug);
}

export function getPublishedCity(
  countrySlug: string,
  citySlug: string
): City | undefined {
  return getPublishedCountry(countrySlug)?.cities.find((city) => city.slug === citySlug);
}
