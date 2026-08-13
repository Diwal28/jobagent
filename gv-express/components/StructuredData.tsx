import { fullAddress, mapsUrl, restaurant } from "@/data/restaurant";

/**
 * Données structurées Schema.org.
 * Uniquement des informations confirmées : ni avis, ni note, ni
 * gamme de prix, ni spécialité tant qu’ils n’ont pas été validés
 * par le restaurant.
 */
export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gv-express.vercel.app";

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.png`,
    telephone: restaurant.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      name: restaurant.venue,
      streetAddress: `${restaurant.venue}, ${restaurant.street}`,
      addressLocality: restaurant.city,
      addressCountry: "SN",
    },
    description: `${restaurant.name}, adresse de restauration située au ${fullAddress}.`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "23:00",
      },
    ],
    hasMap: mapsUrl,
  };

  return (
    <script
      type="application/ld+json"
      // Contenu statique et maîtrisé : aucune donnée externe injectée.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
