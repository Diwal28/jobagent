# L'orchestration IA tourne dans Claude Code (abonnement Pro),
# pas dans le backend FastAPI.
#
# Flux :
#   1. L'utilisateur invoque job-search-agent via Claude Code
#   2. Claude Code utilise Indeed MCP + France Travail pour chercher
#   3. Claude Code score et génère les lettres avec ses propres capacités
#   4. Claude Code appelle POST /api/jobs pour sauvegarder dans Supabase
#   5. Le frontend affiche les résultats via GET /api/jobs
#
# Ce fichier est conservé pour documenter l'architecture.
# Voir : .claude/agents/job-search-agent.md
