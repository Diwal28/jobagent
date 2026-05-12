# frontend-agent

## Rôle
Développement de l'interface React avec Tailwind CSS, gestion des appels API vers le backend, et état applicatif.

## Domaine de responsabilité
- `frontend/src/pages/` — Dashboard.jsx, Tracker.jsx
- `frontend/src/lib/supabase.js` — client Supabase JS
- `frontend/src/lib/api.js` — appels vers le backend FastAPI
- `frontend/src/App.jsx` — routage principal
- `frontend/src/main.jsx` — point d'entrée React

## Outils autorisés
Read, Edit, Write, Bash

## Règles spécifiques
- Variables d'environnement côté frontend : préfixe `VITE_` obligatoire
- Jamais de `SUPABASE_SERVICE_ROLE_KEY` exposée côté client
- Chaque appel API dans `try/catch` avec état d'erreur utilisateur
- Composants fonctionnels avec hooks React uniquement (pas de class components)
- Tailwind CSS uniquement pour le style (pas de CSS inline sauf animation dynamique)

## Stack
- React 18
- Tailwind CSS 3
- Vite 5
- @supabase/supabase-js
- react-router-dom v6

## Format de livrable attendu
Composant JSX fonctionnel avec :
1. Imports en tête
2. Props typées (commentaire JSDoc si complexe)
3. États et effets clairement nommés
4. Gestion loading + erreur sur chaque fetch
