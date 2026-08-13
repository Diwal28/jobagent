# GV Express — démo de site

Démo commerciale d’un site pour **GV Express**, restaurant situé au Centre
Hospitalier National de Pikine, Camp Thiaroye (Dakar, Sénégal).

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.

> **Statut : démonstration.** Les coordonnées, l’adresse et les horaires sont
> réels. La carte, les événements, les articles et les photos sont des
> **emplacements** clairement identifiés dans le code et signalés à l’écran :
> aucun plat, prix, date, avis ou visuel n’a été inventé.

---

## Installation

```bash
npm install
npm run dev      # http://localhost:3000
```

Autres commandes :

```bash
npm run build      # build de production (à lancer avant tout déploiement)
npm start          # sert le build de production
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run assets     # régénère les visuels d'emplacement
```

---

## Les pages

| Page | Route | Fichier |
|---|---|---|
| Accueil | `/` | `app/page.tsx` |
| À propos | `/a-propos` | `app/a-propos/page.tsx` |
| Menu | `/menu` | `app/menu/page.tsx` |
| Réservation | `/reservation` | `app/reservation/page.tsx` |
| Événements | `/evenements` | `app/evenements/page.tsx` |
| Blog | `/blog` | `app/blog/page.tsx` |
| Contact | `/contact` | `app/contact/page.tsx` |

La navigation, l’en-tête, le pied de page et la barre d’action mobile sont
communs à toutes les pages (`app/layout.tsx`).

---

## Modifier le contenu

Tout le contenu vit dans `data/` — aucun composant à toucher.

### `data/restaurant.ts`
Nom, téléphone, WhatsApp, adresse, Plus Code, horaires, liens de navigation.

- `phone` : version affichée (avec espaces)
- `phoneHref` / `whatsappNumber` : versions techniques, **sans espaces**
- `hours.opensAt` / `hours.closesAt` : alimentent l’indicateur
  « Ouvert maintenant » et les créneaux du formulaire de réservation

### `data/menu.ts`
1. Remplacer `menuCategories` par les vraies sections de la carte.
2. Remplacer `menuItems` par les vrais plats : `name`, `description`,
   `category`, `price` (francs CFA), `image`.
3. Passer `MENU_IS_PLACEHOLDER` à `false`.

Un plat avec `price: null` affiche « Prix à confirmer » — jamais un montant
inventé.

### `data/events.ts` et `data/posts.ts`
Même principe : remplacer les entrées, puis passer `EVENTS_ARE_PLACEHOLDER`
ou `POSTS_ARE_PLACEHOLDER` à `false` pour retirer le bandeau
« Démonstration ».

### `data/gallery.ts`
`src`, `alt`, `width`, `height` de chaque visuel de la galerie.

---

## Réservation et contact

Les deux formulaires **n’envoient rien à un serveur** : ils composent un
message et l’ouvrent dans WhatsApp, que le client n’a plus qu’à envoyer.
C’est volontaire — le site ne promet jamais une réservation validée
automatiquement, et aucune adresse e-mail n’est inventée.

Pour brancher un vrai back-end plus tard, tout se passe dans
`components/sections/ReservationForm.tsx` et
`components/sections/ContactForm.tsx`.

---

## Remplacer le logo

Traitement typographique temporaire :

- marque dessinée : `components/ui/Logo.tsx` (composant `LogoMark`)
- favicon et icône mobile : `app/icon.png`, `app/apple-icon.png`

Remplacer le SVG de `LogoMark` par le logo officiel, puis les deux PNG
(512 px et 180 px).

---

## Remplacer les images

Les visuels actuels sont des **emplacements générés** (fond chaud, tissage
fin, monogramme GV), volontairement reconnaissables comme tels.

| Emplacement | Fichier |
|---|---|
| Hero et en-têtes de page | `public/images/hero.webp` |
| Section « À propos » | `public/images/salle.webp` |
| Section « Retrouvez-nous » | `public/images/lieu.webp` |
| Cartes du menu | `public/images/menu/plat-01…10.webp` |
| Galerie, événements, blog | `public/images/gallery/ambiance-01…06.webp` |

Déposer les vraies photos aux mêmes chemins suffit. Pour la galerie, mettre
aussi à jour `data/gallery.ts` ; pour le menu, le champ `image` de
`data/menu.ts`.

---

## Charte graphique

Couleurs et polices sont centralisées dans le bloc `@theme` de
**`app/globals.css`** : le site alterne des sections crème et espresso, avec
un accent doré. Modifier `--color-gold` ou `--color-ember` change l’accent
partout.

Les polices (Fraunces + Inter, variables) sont auto-hébergées dans
`app/fonts/` — aucun appel réseau externe au chargement.

---

## Mentions légales

Aucune page « mentions légales » ou « politique de confidentialité » n’a été
créée : leur contenu doit être rédigé par le restaurant, et il aurait fallu
l’inventer. À ajouter avant une mise en ligne définitive.

---

## Déploiement sur Vercel

Ce dossier est un projet Next.js autonome dans le dépôt.

1. Importer le dépôt sur Vercel.
2. **Root Directory : `gv-express`** (indispensable : la racine du dépôt
   contient un autre projet).
3. Framework détecté : Next.js — aucune configuration supplémentaire.
4. Variable d’environnement recommandée (facultative) :
   `NEXT_PUBLIC_SITE_URL` = l’URL finale du site, utilisée pour les metadata
   Open Graph et le sitemap. Voir `.env.example`.

Aucune clé secrète n’est nécessaire pour faire tourner ce site.
