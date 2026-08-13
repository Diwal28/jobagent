# GV Express — démo de site

Démo commerciale d’un site pour **GV Express**, restaurant situé au Centre
Hospitalier National de Pikine, Camp Thiaroye (Dakar, Sénégal).

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.

> **Statut : démonstration.** Les informations de contact, l’adresse et les
> horaires sont réels. La carte et les photos sont des **emplacements**
> clairement identifiés dans le code : aucun plat, prix ou visuel n’a été
> inventé (voir « Modifier le menu » et « Remplacer les images »).

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
```

---

## Modifier les informations du restaurant

Tout est dans **`data/restaurant.ts`** : nom, téléphone, WhatsApp, adresse,
Plus Code, horaires, liens de navigation. Aucun composant à toucher.

- `phone` : version affichée à l’écran (avec espaces)
- `phoneHref` / `whatsappNumber` : versions techniques, **sans espaces**
- `hours.opensAt` / `hours.closesAt` : alimentent l’indicateur
  « Ouvert maintenant » du hero

---

## Modifier le menu

Tout est dans **`data/menu.ts`**.

1. Remplacer `menuCategories` par les vraies sections de la carte.
2. Remplacer `menuItems` par les vrais plats :
   `name`, `description`, `category`, `price` (en francs CFA), `image`.
3. Passer `MENU_IS_PLACEHOLDER` à `false`.

L’encart « Démonstration » disparaît alors automatiquement.
Un plat avec `price: null` affiche « Prix à confirmer » — jamais un montant
inventé.

---

## Remplacer le logo

Le logo actuel est un traitement typographique temporaire :

- marque dessinée : `components/ui/Logo.tsx` (composant `LogoMark`)
- favicon et icône mobile : `app/icon.png`, `app/apple-icon.png`

Pour intégrer le logo officiel : remplacer le SVG de `LogoMark` par le logo
fourni, puis remplacer les deux fichiers PNG (512 px et 180 px).

---

## Remplacer les images

Les visuels actuels sont des **emplacements générés** (fond chaud, tissage
fin, monogramme GV). Ils sont volontairement reconnaissables comme tels.

| Emplacement | Fichier |
|---|---|
| Hero | `public/images/hero.webp` |
| Section « À propos » | `public/images/salle.webp` |
| Section « Retrouvez-nous » | `public/images/lieu.webp` |
| Cartes du menu | `public/images/menu/plat-01…10.webp` |
| Galerie | `public/images/gallery/ambiance-01…06.webp` |

Pour la galerie, mettre aussi à jour `src`, `alt`, `width` et `height` dans
`data/gallery.ts` ; pour le menu, le champ `image` dans `data/menu.ts`.

Les emplacements peuvent être régénérés avec `npm run assets`
(script `scripts/generate-assets.mjs`).

---

## Charte graphique

Les couleurs et les polices sont centralisées dans le bloc `@theme` de
**`app/globals.css`** : modifier `--color-ember` change l’accent de tout le
site. Les polices (Fraunces + Inter, variables) sont auto-hébergées dans
`app/fonts/` — aucun appel réseau externe au chargement.

---

## Déploiement sur Vercel

Ce dossier est un projet Next.js autonome dans le dépôt.

1. Importer le dépôt sur Vercel.
2. **Root Directory : `gv-express`** (indispensable : la racine du dépôt
   contient un autre projet).
3. Framework détecté : Next.js — aucune configuration supplémentaire.
4. Variable d’environnement recommandée (facultative) :
   `NEXT_PUBLIC_SITE_URL` = l’URL finale du site, utilisée pour les
   metadata Open Graph et le sitemap. Voir `.env.example`.

Aucune clé secrète n’est nécessaire pour faire tourner ce site.
