# JobAgent

Automatisation de la recherche d'emploi via agent IA (Claude Tool Use), France Travail API et Indeed MCP.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Tailwind + Vite → Vercel |
| Backend | FastAPI Python → Vercel serverless |
| Base de données | Supabase (PostgreSQL + Auth + RLS) |
| Agent IA | Anthropic API (claude-opus-4-6) |
| Jobs | France Travail API + Indeed MCP |

## Prérequis

- Python 3.12+
- Node.js 20+
- Compte Supabase
- Clé API Anthropic
- Credentials France Travail API

## Installation

### 1. Variables d'environnement

```bash
cp .env.example .env
# Remplir toutes les valeurs dans .env
```

### 2. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend accessible sur `http://localhost:8000`  
Health check : `GET http://localhost:8000/health`

### 3. Base de données Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter `backend/db/schema.sql` dans l'éditeur SQL Supabase
3. Vérifier les RLS policies :
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'job_applications';
   SELECT * FROM pg_policies WHERE tablename = 'candidate_profiles';
   ```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend accessible sur `http://localhost:5173`

## Déploiement

### Vercel

1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel Dashboard
3. Configurer les GitHub Secrets pour le CI/CD :
   - `ANTHROPIC_API_KEY`
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`
   - `FRANCE_TRAVAIL_CLIENT_ID`, `FRANCE_TRAVAIL_CLIENT_SECRET`
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Ordre de construction — Phase 1

Voir `CLAUDE.md` section "ORDRE DE CONSTRUCTION".

## Architecture agent

```
Orchestrateur (claude-opus-4-6)
├── search_jobs    → France Travail API + Indeed MCP
├── score_job      → claude-sonnet-4-6 (0-100)
├── generate_letter → claude-sonnet-4-6 (lettre + ATS)
└── save_job       → Supabase CRUD
```

## Sécurité

- RLS Supabase activé sur toutes les tables
- Clé `anon` uniquement côté frontend (jamais `service_role`)
- Variables d'environnement via `.env` (jamais dans le code)
- Audit `security-agent` requis avant chaque déploiement

## [ESTIMATION] Coûts Anthropic

À mesurer selon l'usage réel. Configurer une alerte budget sur [console.anthropic.com](https://console.anthropic.com).
