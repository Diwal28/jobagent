import os
import logging
import httpx

logger = logging.getLogger(__name__)

FRANCE_TRAVAIL_BASE_URL = "https://api.francetravail.io/partenaire/offresdemploi/v2"
FRANCE_TRAVAIL_AUTH_URL = "https://entreprise.francetravail.fr/connexion/oauth2/access_token"


async def _get_france_travail_token() -> str:
    """Récupère un token OAuth2 France Travail."""
    client_id = os.environ["FRANCE_TRAVAIL_CLIENT_ID"]
    client_secret = os.environ["FRANCE_TRAVAIL_CLIENT_SECRET"]

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.post(
                FRANCE_TRAVAIL_AUTH_URL,
                data={
                    "grant_type": "client_credentials",
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "scope": "api_offresdemploiv2 o2dsoffre",
                },
                params={"realm": "/partenaire"},
            )
            resp.raise_for_status()
            return resp.json()["access_token"]
        except httpx.HTTPStatusError as e:
            logger.error("France Travail auth failed: %s", e)
            raise


async def _search_france_travail(query: str, location: str | None, contract_type: str | None) -> list[dict]:
    """Recherche sur l'API France Travail."""
    try:
        token = await _get_france_travail_token()
        params = {"motsCles": query, "range": "0-19"}
        if location:
            params["commune"] = location
        if contract_type:
            type_map = {"CDI": "CDI", "CDD": "CDD", "stage": "STG", "alternance": "E2"}
            params["typeContrat"] = type_map.get(contract_type, contract_type)

        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.get(
                f"{FRANCE_TRAVAIL_BASE_URL}/offres/search",
                headers={"Authorization": f"Bearer {token}"},
                params=params,
            )
            resp.raise_for_status()
            data = resp.json()
            return data.get("resultats", [])
    except Exception as e:
        logger.error("France Travail search error: %s", e)
        return []


async def search_jobs(query: str, location: str | None = None, contract_type: str | None = None) -> list[dict]:
    """Recherche des offres d'emploi sur Indeed MCP + France Travail.

    Indeed MCP est appelé via l'intégration MCP Claude Code.
    France Travail via son API REST officielle.
    """
    results = []

    # France Travail
    ft_results = await _search_france_travail(query, location, contract_type)
    for offer in ft_results:
        results.append({
            "source": "france_travail",
            "id": offer.get("id"),
            "title": offer.get("intitule"),
            "company": offer.get("entreprise", {}).get("nom"),
            "location": offer.get("lieuTravail", {}).get("libelle"),
            "contract_type": offer.get("typeContratLibelle"),
            "description": offer.get("description"),
            "url": offer.get("origineOffre", {}).get("urlOrigine"),
            "date_posted": offer.get("dateCreation"),
        })

    # TODO: Indeed MCP — à connecter via mcp__claude_ai_Indeed__search_jobs
    # L'intégration MCP Indeed est disponible dans Claude Code uniquement,
    # pas depuis le backend FastAPI. Passer par un endpoint dédié ou proxy.

    logger.info("search_jobs returned %d results for query='%s'", len(results), query)
    return results
