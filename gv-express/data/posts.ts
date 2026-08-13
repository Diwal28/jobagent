/**
 * ─────────────────────────────────────────────────────────────
 *  BLOG
 * ─────────────────────────────────────────────────────────────
 *  ⚠️  Aucun article n'a été fourni par GV Express. Les entrées
 *  ci-dessous sont des EMPLACEMENTS destinés à montrer la mise
 *  en page : ni titre, ni date, ni texte inventés.
 *
 *  POUR PUBLIER DE VRAIS ARTICLES :
 *   1. Remplacer les entrées de `posts`.
 *   2. Passer `POSTS_ARE_PLACEHOLDER` à `false`.
 * ─────────────────────────────────────────────────────────────
 */

export const POSTS_ARE_PLACEHOLDER = true;

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  dateLabel: string;
  excerpt: string;
  image: string;
};

export const posts: BlogPost[] = [
  {
    id: "post-01",
    title: "Votre article à la une",
    category: "Catégorie",
    dateLabel: "Date à définir",
    excerpt:
      "Emplacement réservé — titre, image et texte seront rédigés à partir des informations de GV Express.",
    image: "/images/gallery/ambiance-01.webp",
  },
  {
    id: "post-02",
    title: "Votre actualité du moment",
    category: "Catégorie",
    dateLabel: "Date à définir",
    excerpt:
      "Emplacement réservé — parfait pour annoncer une nouveauté à la carte ou un changement d'horaires.",
    image: "/images/gallery/ambiance-04.webp",
  },
  {
    id: "post-03",
    title: "Vos coulisses en cuisine",
    category: "Catégorie",
    dateLabel: "Date à définir",
    excerpt:
      "Emplacement réservé — pour raconter le quotidien de l'équipe et le soin apporté au service.",
    image: "/images/gallery/ambiance-06.webp",
  },
  {
    id: "post-04",
    title: "Votre conseil aux clients",
    category: "Catégorie",
    dateLabel: "Date à définir",
    excerpt:
      "Emplacement réservé — par exemple les meilleurs moments pour commander sans attente.",
    image: "/images/menu/plat-05.webp",
  },
  {
    id: "post-05",
    title: "Votre plat à l'honneur",
    category: "Catégorie",
    dateLabel: "Date à définir",
    excerpt:
      "Emplacement réservé — un focus sur une préparation et son histoire.",
    image: "/images/menu/plat-07.webp",
  },
  {
    id: "post-06",
    title: "Votre annonce pratique",
    category: "Catégorie",
    dateLabel: "Date à définir",
    excerpt:
      "Emplacement réservé — informations utiles : accès, horaires, commande à distance.",
    image: "/images/menu/plat-09.webp",
  },
];
