/**
 * ─────────────────────────────────────────────────────────────
 *  GV EXPRESS — CARTE
 * ─────────────────────────────────────────────────────────────
 *  ⚠️  IMPORTANT — À LIRE AVANT MODIFICATION
 *
 *  La carte réelle de GV Express n’a pas pu être récupérée
 *  automatiquement (le site actuel n’était pas accessible depuis
 *  l’environnement de build). Aucun plat et aucun prix n’a donc
 *  été inventé.
 *
 *  Ce fichier contient une STRUCTURE DE DÉMONSTRATION : la mise
 *  en page finale, avec des emplacements explicitement marqués.
 *
 *  POUR PASSER EN CARTE RÉELLE, EN 3 ÉTAPES :
 *   1. Remplacer les catégories de `menuCategories` par les
 *      vraies sections de la carte.
 *   2. Remplacer les entrées de `menuItems` par les vrais plats
 *      (name, description, price en francs CFA, image).
 *   3. Passer `MENU_IS_PLACEHOLDER` à `false` :
 *      l’encart « démonstration » disparaît automatiquement et
 *      les prix s’affichent normalement.
 *
 *  `price: null` ⇒ le site affiche « Prix à confirmer » plutôt
 *  qu’un montant inventé. Ne jamais renseigner un prix non
 *  communiqué par le restaurant.
 * ─────────────────────────────────────────────────────────────
 */

/** Passer à `false` une fois la vraie carte intégrée. */
export const MENU_IS_PLACEHOLDER = true;

export type MenuCategory = {
  id: string;
  label: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Doit correspondre à un `id` de `menuCategories`. */
  category: string;
  /** Prix en francs CFA (XOF), ou `null` si non communiqué. */
  price: number | null;
  /** Chemin de l’image dans /public. */
  image: string;
  /** Mettre en avant le plat (badge « Suggestion »). */
  featured?: boolean;
};

/** Sections de la carte. Le filtre « Tout » est ajouté par l’interface. */
export const menuCategories: MenuCategory[] = [
  { id: "entrees", label: "Entrées" },
  { id: "plats", label: "Plats" },
  { id: "grillades", label: "Grillades" },
  { id: "desserts", label: "Desserts" },
  { id: "boissons", label: "Boissons" },
];

/**
 * Emplacements de la carte.
 * Les intitulés commencent volontairement par « Votre … » : ce
 * sont des emplacements, pas des plats attribués à GV Express.
 */
export const menuItems: MenuItem[] = [
  {
    id: "entree-01",
    name: "Votre entrée signature",
    description:
      "Emplacement réservé — intitulé, description et prix repris de la carte de GV Express.",
    category: "entrees",
    price: null,
    image: "/images/menu/plat-01.webp",
    featured: true,
  },
  {
    id: "entree-02",
    name: "Votre entrée du jour",
    description:
      "Emplacement réservé — idéal pour une préparation qui change au fil de la semaine.",
    category: "entrees",
    price: null,
    image: "/images/menu/plat-02.webp",
  },
  {
    id: "plat-01",
    name: "Votre plat signature",
    description:
      "Emplacement réservé — le plat que vous souhaitez mettre en avant en premier.",
    category: "plats",
    price: null,
    image: "/images/menu/plat-03.webp",
    featured: true,
  },
  {
    id: "plat-02",
    name: "Votre plat du jour",
    description:
      "Emplacement réservé — modifiable chaque jour depuis un seul fichier.",
    category: "plats",
    price: null,
    image: "/images/menu/plat-04.webp",
  },
  {
    id: "plat-03",
    name: "Votre formule complète",
    description:
      "Emplacement réservé — pensée pour une commande rapide sur place ou à emporter.",
    category: "plats",
    price: null,
    image: "/images/menu/plat-05.webp",
  },
  {
    id: "grillade-01",
    name: "Votre grillade",
    description:
      "Emplacement réservé — préparation grillée, avec son accompagnement.",
    category: "grillades",
    price: null,
    image: "/images/menu/plat-06.webp",
    featured: true,
  },
  {
    id: "grillade-02",
    name: "Votre grillade à partager",
    description:
      "Emplacement réservé — format généreux, à deux ou en famille.",
    category: "grillades",
    price: null,
    image: "/images/menu/plat-07.webp",
  },
  {
    id: "dessert-01",
    name: "Votre dessert",
    description:
      "Emplacement réservé — la note sucrée qui termine le repas.",
    category: "desserts",
    price: null,
    image: "/images/menu/plat-08.webp",
  },
  {
    id: "boisson-01",
    name: "Vos boissons fraîches",
    description:
      "Emplacement réservé — jus, sodas et boissons servis frais.",
    category: "boissons",
    price: null,
    image: "/images/menu/plat-09.webp",
  },
  {
    id: "boisson-02",
    name: "Vos boissons chaudes",
    description: "Emplacement réservé — café, thé et infusions.",
    category: "boissons",
    price: null,
    image: "/images/menu/plat-10.webp",
  },
];
