/**
 * ─────────────────────────────────────────────────────────────
 *  GALERIE
 * ─────────────────────────────────────────────────────────────
 *  Aucune photo réelle du restaurant n’était accessible lors de
 *  la création de cette démo. Les visuels ci-dessous sont des
 *  compositions d’ambiance temporaires, prévues pour être
 *  remplacées par les vraies photos de GV Express.
 *
 *  POUR REMPLACER : déposer les photos dans
 *  `public/images/gallery/` et mettre à jour `src`, `alt`,
 *  `width` et `height` ci-dessous. La composition asymétrique
 *  s’adapte automatiquement grâce au champ `span`.
 * ─────────────────────────────────────────────────────────────
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Emprise dans la grille éditoriale. */
  span: "tall" | "wide" | "square";
  /** Légende courte affichée au survol. */
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-01",
    src: "/images/gallery/ambiance-01.webp",
    alt: "Visuel d’ambiance chaleureuse — emplacement prévu pour une photo de la salle de GV Express",
    width: 1200,
    height: 1600,
    span: "tall",
    caption: "La salle",
  },
  {
    id: "gal-02",
    src: "/images/gallery/ambiance-02.webp",
    alt: "Visuel d’ambiance — emplacement prévu pour une photo de plat de GV Express",
    width: 1600,
    height: 1200,
    span: "wide",
    caption: "À table",
  },
  {
    id: "gal-03",
    src: "/images/gallery/ambiance-03.webp",
    alt: "Visuel d’ambiance — emplacement prévu pour une photo du service de GV Express",
    width: 1200,
    height: 1200,
    span: "square",
    caption: "Le service",
  },
  {
    id: "gal-04",
    src: "/images/gallery/ambiance-04.webp",
    alt: "Visuel d’ambiance — emplacement prévu pour une photo des préparations de GV Express",
    width: 1200,
    height: 1200,
    span: "square",
    caption: "En cuisine",
  },
  {
    id: "gal-05",
    src: "/images/gallery/ambiance-05.webp",
    alt: "Visuel d’ambiance — emplacement prévu pour une photo de commande à emporter de GV Express",
    width: 1200,
    height: 1600,
    span: "tall",
    caption: "À emporter",
  },
  {
    id: "gal-06",
    src: "/images/gallery/ambiance-06.webp",
    alt: "Visuel d’ambiance — emplacement prévu pour une photo de la devanture de GV Express",
    width: 1600,
    height: 1200,
    span: "wide",
    caption: "L’adresse",
  },
];
