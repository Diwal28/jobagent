/**
 * ─────────────────────────────────────────────────────────────
 *  ÉVÉNEMENTS
 * ─────────────────────────────────────────────────────────────
 *  ⚠️  Aucun événement n'a été communiqué par GV Express.
 *  Les entrées ci-dessous sont des EMPLACEMENTS : la page montre
 *  la mise en page finale sans annoncer de date ni de contenu
 *  inventés.
 *
 *  POUR PUBLIER DE VRAIS ÉVÉNEMENTS :
 *   1. Remplacer les entrées de `events` (title, dateLabel,
 *      timeLabel, description, image).
 *   2. Passer `EVENTS_ARE_PLACEHOLDER` à `false` : le bandeau
 *      « démonstration » disparaît automatiquement.
 * ─────────────────────────────────────────────────────────────
 */

export const EVENTS_ARE_PLACEHOLDER = true;

export type RestaurantEvent = {
  id: string;
  title: string;
  /** Ex. « Samedi 12 avril ». Laisser « À définir » tant que non confirmé. */
  dateLabel: string;
  timeLabel: string;
  description: string;
  image: string;
};

export const events: RestaurantEvent[] = [
  {
    id: "event-01",
    title: "Votre événement à la une",
    dateLabel: "Date à définir",
    timeLabel: "Horaire à définir",
    description:
      "Emplacement réservé — titre, date, horaire et description seront communiqués par GV Express.",
    image: "/images/gallery/ambiance-02.webp",
  },
  {
    id: "event-02",
    title: "Votre soirée spéciale",
    dateLabel: "Date à définir",
    timeLabel: "Horaire à définir",
    description:
      "Emplacement réservé — idéal pour annoncer une soirée à thème ou une carte exceptionnelle.",
    image: "/images/gallery/ambiance-03.webp",
  },
  {
    id: "event-03",
    title: "Votre repas de groupe",
    dateLabel: "Date à définir",
    timeLabel: "Horaire à définir",
    description:
      "Emplacement réservé — pour présenter les formules de groupe et les conditions de réservation.",
    image: "/images/gallery/ambiance-05.webp",
  },
];

/** Services que le restaurant peut mettre en avant une fois confirmés. */
export const eventServices: { title: string; description: string }[] = [
  {
    title: "Réservation de table",
    description:
      "Prévenez de votre venue par téléphone ou WhatsApp, aux horaires d'ouverture.",
  },
  {
    title: "Commande à distance",
    description:
      "Commandez aussi à distance via nos coordonnées, sans vous déplacer.",
  },
  {
    title: "Sur place ou à emporter",
    description:
      "Le restaurant vous accueille au Centre Hospitalier National de Pikine.",
  },
];
