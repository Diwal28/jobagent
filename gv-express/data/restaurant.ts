/**
 * ─────────────────────────────────────────────────────────────
 *  GV EXPRESS — SOURCE UNIQUE DE VÉRITÉ
 * ─────────────────────────────────────────────────────────────
 *  Toutes les informations affichées sur le site proviennent de
 *  ce fichier. Pour modifier le contenu du site, il suffit de
 *  modifier les valeurs ci-dessous : aucun composant à toucher.
 *
 *  ⚠️  RÈGLE : ne renseigner ici que des informations VÉRIFIÉES.
 *  Les champs marqués `null` sont volontairement vides tant que
 *  l’information n’a pas été confirmée par le restaurant.
 * ─────────────────────────────────────────────────────────────
 */

export type NavLink = {
  label: string;
  href: string;
};

/** Informations confirmées du restaurant. */
export const restaurant = {
  name: "GV Express",
  /** Baseline de la démo — remplaçable par le slogan officiel. */
  tagline: "Le goût qui vous accompagne.",

  // ── Contact ────────────────────────────────────────────────
  /** Format lisible, affiché à l’écran. */
  phone: "+221 78 542 05 05",
  /** Format technique pour les liens tel: (sans espaces). */
  phoneHref: "tel:+221785420505",
  /** Numéro WhatsApp au format international sans "+" ni espaces. */
  whatsappNumber: "221785420505",

  // ── Adresse ────────────────────────────────────────────────
  venue: "Centre Hospitalier National de Pikine",
  street: "Camp Thiaroye",
  city: "Dakar",
  country: "Sénégal",
  /** Plus Code Google Maps communiqué par le restaurant. */
  plusCode: "QJ3G+Q2V",

  // ── Horaires ───────────────────────────────────────────────
  hours: {
    label: "08:00 – 23:00",
    days: "Tous les jours",
    /** Format 24h, utilisé pour l’indicateur « ouvert / fermé ». */
    opensAt: 8,
    closesAt: 23,
    /** Le Sénégal est à UTC+0 toute l’année. */
    utcOffset: 0,
  },

  // ── Liens ──────────────────────────────────────────────────
  /** Site actuellement en ligne (source de référence). */
  existingWebsite: "https://pikine-hospital-restaurant.netlify.app/",

  // ── Réseaux sociaux ────────────────────────────────────────
  // Aucun compte confirmé à ce jour : laisser `null` tant que
  // les liens officiels n’ont pas été fournis par le restaurant.
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
  },
} as const;

/** Adresse postale complète, sur une seule ligne. */
export const fullAddress = `${restaurant.venue}, ${restaurant.street}, ${restaurant.city}, ${restaurant.country}`;

/** Adresse sur plusieurs lignes (affichage bloc). */
export const addressLines = [
  restaurant.venue,
  restaurant.street,
  `${restaurant.city}, ${restaurant.country}`,
];

/**
 * Lien Google Maps par recherche : volontairement construit à
 * partir du nom + de l’adresse plutôt que de coordonnées GPS
 * inventées.
 */
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=GV+Express+Centre+Hospitalier+National+de+Pikine+Dakar";

/** Ouvre WhatsApp avec un message pré-rempli optionnel. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${restaurant.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Message par défaut proposé au client qui ouvre WhatsApp. */
export const defaultWhatsappMessage = `Bonjour ${restaurant.name}, je souhaite passer une commande.`;

/** Navigation principale du site. */
export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Menu", href: "/menu" },
  { label: "Réservation", href: "/reservation" },
  { label: "Événements", href: "/evenements" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Phrases reprises telles quelles du site existant de GV Express.
 * Ne pas reformuler : ce sont les mots du restaurant.
 */
export const quotesFromExistingSite = {
  service: "Un service rapide et organisé pour nos clients",
  remoteOrder: "Commandez aussi à distance via nos coordonnées",
} as const;
