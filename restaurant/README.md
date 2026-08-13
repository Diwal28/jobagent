# Maison Émeraude — site vitrine

Site vitrine d'un restaurant gastronomique fictif (Paris 8ᵉ). Statique,
sans build, sans dépendance JavaScript : trois fichiers et des polices.

> Projet indépendant de l'application JobAgent qui occupe le reste du dépôt.
> Il ne partage ni sa stack, ni son pipeline de déploiement.

## Lancer en local

```bash
cd restaurant
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

```
restaurant/
├── index.html                    # page unique, 12 sections
├── assets/
│   ├── css/style.css             # design system complet
│   ├── js/main.js                # interactions, sans dépendance
│   ├── fonts/*.woff2             # Cormorant Garamond + Jost (auto-hébergés)
│   └── img/favicon.svg
├── scripts/self_host_photos.py   # rapatrie les photos en local
├── vercel.json                   # en-têtes sécurité + cache
├── robots.txt
└── sitemap.xml
```

## Photographies

Les images sont servies par **Unsplash** (licence Unsplash : usage commercial
libre, sans attribution obligatoire), via son CDN avec redimensionnement à la
volée (`?auto=format&fit=crop&w=…&q=…`) et `srcset` par emplacement.

Deux points à connaître :

1. **Les URLs n'ont pas pu être vérifiées depuis l'environnement de
   développement** : la politique réseau y bloque tous les hébergeurs
   d'images. Chaque `<img>` est donc doublée d'un repli dessiné (dégradé
   émeraude, grain, monogramme) qui s'affiche à la place d'une image cassée.
   Vérifiez le rendu une fois le site ouvert dans un navigateur, et
   remplacez toute photo manquante par son identifiant Unsplash.

2. **Pour auto-héberger les photos** (recommandé en production) :

   ```bash
   python3 scripts/self_host_photos.py --dry-run   # aperçu
   python3 scripts/self_host_photos.py             # télécharge + réécrit index.html
   ```

   Le script télécharge chaque variante dans `assets/img/photos/`, réécrit
   les `src`/`srcset`, et laisse en distant toute image qui échoue.
   Pensez ensuite à retirer `https://images.unsplash.com` de la directive
   `img-src` dans `vercel.json`.

Pour changer une photo : remplacez l'identifiant `photo-…` dans `index.html`
(`src` **et** `srcset`) et mettez à jour le texte alternatif.

## Formulaire de réservation

Le formulaire valide côté client puis envoie un POST JSON vers l'URL
renseignée dans `data-endpoint` :

```html
<form id="reservation-form" data-endpoint="https://api.exemple.fr/reservations">
```

Tant que l'attribut est vide, le formulaire l'annonce explicitement au
visiteur plutôt que de simuler un envoi. Charge utile envoyée :

```json
{ "date": "", "heure": "", "personnes": "", "nom": "", "telephone": "", "email": "", "message": "" }
```

## Contenu à personnaliser

Nom, adresse, téléphone, emails, horaires et réseaux sociaux sont à remplacer
dans `index.html` — y compris dans le **JSON-LD `Restaurant`** en tête de
fichier, dans les balises Open Graph, le `sitemap.xml` et le `robots.txt`.
L'image Open Graph (`assets/img/og-maison-emeraude.png`, 1200×630) reste à
produire.

## SEO

- `<h1>` unique, hiérarchie `h2`/`h3` continue, un seul thème par section
- Meta title / description, canonical, Open Graph, Twitter Card
- Données structurées `Restaurant` + `BreadcrumbList` (adresse, géo,
  horaires, gamme de prix, réservation)
- Signaux locaux : `geo.region`, `geo.position`, adresse en `<address>`
- Texte alternatif descriptif sur chaque image

## Accessibilité & performance

- Navigation clavier complète (onglets de la carte, carrousel, galerie),
  piège de focus sur le menu plein écran, lien d'évitement
- `prefers-reduced-motion` : particules, parallaxe, inclinaisons et
  défilement automatique désactivés
- Sur écran tactile, les informations révélées au survol sont affichées
  en permanence
- Polices auto-hébergées (sous-ensembles latin/latin-ext, ~204 Ko),
  `loading="lazy"` sous la ligne de flottaison, dimensions déclarées
  pour éviter les décalages de mise en page
- Animations sur `transform`/`opacity` uniquement, `requestAnimationFrame`
  partout, particules suspendues hors champ et onglet inactif

## Déploiement

Site statique : `restaurant/` comme racine de projet suffit
(Vercel, Netlify, Cloudflare Pages, ou n'importe quel hébergeur de fichiers).
`vercel.json` fournit CSP, en-têtes de sécurité et cache long sur les polices.
