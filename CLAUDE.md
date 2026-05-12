# JOBAGENT — CLAUDE CODE INSTRUCTIONS

> Lu automatiquement à chaque session.
> Partagé par l'orchestrateur et tous les subagents.

---

## PROJET

**Nom** : JobAgent — Automatisation recherche d'emploi  
**Phase** : 1 — usage personnel, 1 seul utilisateur  
**IDE** : VSCode  

**Stack fixe — pas d'alternative :**

| Couche      | Technologie                          |
|-------------|--------------------------------------|
| Frontend    | React 18 + Tailwind + Vite → Vercel  |
| Backend     | FastAPI Python → Vercel serverless   |
| Base de données | Supabase (PostgreSQL + Auth)     |
| Versioning  | GitHub repo privé                    |
| Agent IA    | API Anthropic + Tool Use             |
| Jobs        | MCP Indeed officiel + API France Travail |

**Modèles :**
- Orchestrateur : `claude-opus-4-6`
- Subagents : `claude-sonnet-4-6`

---

## RÈGLES ABSOLUES

Ces règles s'appliquent à l'orchestrateur et à tous les subagents.

**Secrets**
- Jamais de clé API dans le code ou les commits
- Toujours via variables d'environnement
- `.env` dans `.gitignore` dès l'init — jamais commité
- `.env.example` versionné avec noms de variables uniquement
- Jamais de `service_role` key côté frontend

**Code**
- Tout appel API externe dans `try/catch` avec timeout explicite
- Logger chaque erreur avant de la gérer
- Ne jamais silencer une erreur sans commentaire
- Validation Pydantic sur tous les inputs de routes FastAPI
- Variables d'environnement côté frontend préfixées `VITE_` uniquement

**Base de données**
- RLS Supabase activé sur chaque table sans exception
- Vérifier les policies après chaque `CREATE TABLE`
- Migrations nommées `YYYYMMDD_description.sql`
- Jamais de `DROP` sans confirmation explicite de l'utilisateur

**Tests**
- Chaque étape testée et validée avant de passer à la suivante
- Cas nominal + cas erreur sur chaque fonction critique
- Signaler ce qui nécessite validation manuelle en production

**Estimations**
- Tout délai, coût ou performance → labelisé `[ESTIMATION]`
- Ne jamais présenter une estimation comme un fait

---

## STRUCTURE DU PROJET

```
JOBAGENT/
├── .claude/
│   ├── agents/
│   │   ├── backend-agent.md
│   │   ├── database-agent.md
│   │   ├── frontend-agent.md
│   │   ├── security-agent.md
│   │   └── test-agent.md
│   └── settings.json
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── agent/
│   │   ├── core.py           # boucle Tool Use Claude
│   │   └── tools/
│   │       ├── search.py     # Indeed MCP + France Travail
│   │       ├── score.py      # scoring offres via Claude
│   │       ├── generate.py   # lettre de motivation + CV ATS
│   │       └── tracker.py    # CRUD Supabase
│   ├── api/
│   │   └── routes.py
│   └── db/
│       ├── supabase.py
│       └── schema.sql
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Tracker.jsx
│   │   └── lib/
│   │       ├── supabase.js
│   │       └── api.js
│   ├── package.json
│   └── vite.config.js
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .env.example
├── .gitignore
├── vercel.json
├── CLAUDE.md               ← ce fichier
└── README.md
```

---

## SUBAGENTS — RÔLES ET DÉCLENCHEMENT

| Agent | Domaine | Outils autorisés |
|-------|---------|-----------------|
| `backend-agent` | FastAPI, routes, agent core Tool Use | Read, Edit, Write, Bash |
| `database-agent` | Supabase, SQL, RLS policies, migrations | Read, Edit, Write, Bash |
| `frontend-agent` | React, Tailwind, appels API, état | Read, Edit, Write, Bash |
| `security-agent` | Audit sécurité — **lecture seule** | Read, Grep, Bash |
| `test-agent` | pytest, tests React, validation | Read, Edit, Write, Bash |

**Règles d'orchestration :**
- Tâches indépendantes → paralléliser
- Tâche B dépend de A → séquentiel obligatoire
- Modifications sur le même fichier → séquentiel obligatoire
- Migrations DB → toujours séquentiel
- `security-agent` → déclencher avant chaque déploiement

**Qualité des invocations subagent :**
Chaque invocation doit contenir :
1. Fichier(s) concerné(s) avec chemin exact
2. Tâche explicite et délimitée
3. Livrable attendu avec format de sortie
4. Outils autorisés uniquement

---

## ORDRE DE CONSTRUCTION — NE PAS DÉVIER

```
PHASE A — FONDATIONS
  A1. Supabase : tables + RLS policies + clés récupérées
  A2. GitHub   : repo privé + git init + premier commit
  A3. Backend  : FastAPI local → GET /health → validé

PHASE B — AGENT CORE
  B1. score.py      : Tool Use Claude → testé en isolation
  B2. search.py     : Indeed MCP + France Travail API → testés
  B3. core.py       : boucle complète Tool Use → testée
  B4. tracker.py    : CRUD Supabase → testé sur DB réelle
  B5. generate.py   : lettre + CV ATS → testés

PHASE C — FRONTEND
  C1. Dashboard.jsx : liste offres scorées depuis Supabase
  C2. Tracker.jsx   : candidatures + changement statut
  C3. api.js        : connexion frontend/backend → flux complet testé

PHASE D — DÉPLOIEMENT
  D1. vercel.json   : backend serverless + frontend static
  D2. deploy.yml    : GitHub Actions CI/CD
  D3. Commit final  : vérifier .env absent du commit
  D4. security-agent: audit final avant push
```

---

## MODE CRITIQUE — ACTIF EN PERMANENCE

Déclenché sur : agents IA, auth, secrets, DB, déploiement, paiement

**Supabase**
- RLS mal configuré = toutes les données publiquement exposées
- Vérifier après chaque table : `SELECT * FROM pg_policies WHERE tablename = '<table>';`
- Tier gratuit = pas de backup automatique → export manuel requis

**Vercel**
- Timeout serverless : 10s (gratuit) / 30s (Pro)
- Agent IA peut dépasser 10s → gérer en asynchrone
- Cold start : 2-5s première requête [ESTIMATION]

**API Anthropic**
- Configurer budget alert sur console.anthropic.com
- Pas de retry en boucle si API down → message d'erreur explicite
- Coût par session de recherche complète : [ESTIMATION — à mesurer]

**GitHub**
- Repo privé obligatoire
- Vérifier `.env` absent avant chaque push
- Secrets GitHub Actions via Settings → Secrets → Actions

**RGPD**
- Phase 1 usage personnel → hors scope
- Dès second utilisateur → politique de confidentialité requise

---

## CE QUE CLAUDE CODE NE DOIT PAS FAIRE

- Inventer une bibliothèque ou un endpoint qui n'existe pas
- Hardcoder une valeur qui doit être en variable d'environnement
- Créer une route API sans validation des inputs
- Committer sans vérifier l'absence de `.env`
- Déployer sans audit `security-agent` validé
- Ignorer une erreur sans la logger
- Paralléliser des tâches avec dépendances séquentielles
- Présenter une estimation comme un fait vérifié
