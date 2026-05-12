import logging
from typing import Any
from db.supabase import get_client

logger = logging.getLogger(__name__)

VALID_STATUSES = {"nouveau", "postule", "relance", "refus", "accepte"}


async def save_job(job_data: dict[str, Any], score: float = 0, status: str = "nouveau") -> dict:
    """Sauvegarde une offre dans la table job_applications de Supabase."""
    if status not in VALID_STATUSES:
        logger.error("Invalid status '%s', defaulting to 'nouveau'", status)
        status = "nouveau"

    client = get_client()
    try:
        payload = {
            "source": job_data.get("source"),
            "external_id": job_data.get("id"),
            "title": job_data.get("title"),
            "company": job_data.get("company"),
            "location": job_data.get("location"),
            "contract_type": job_data.get("contract_type"),
            "description": job_data.get("description"),
            "url": job_data.get("url"),
            "date_posted": job_data.get("date_posted"),
            "score": score,
            "status": status,
        }
        result = client.table("job_applications").insert(payload).execute()
        logger.info("Saved job '%s' at '%s' with score %d", job_data.get("title"), job_data.get("company"), score)
        return result.data[0] if result.data else payload
    except Exception as e:
        logger.error("Failed to save job '%s': %s", job_data.get("title"), e)
        raise


async def update_job_status(job_id: str, status: str) -> dict:
    """Met à jour le statut d'une candidature dans Supabase."""
    if status not in VALID_STATUSES:
        raise ValueError(f"Statut invalide : {status}. Valeurs acceptées : {VALID_STATUSES}")

    client = get_client()
    try:
        result = (
            client.table("job_applications")
            .update({"status": status})
            .eq("id", job_id)
            .execute()
        )
        logger.info("Updated job %s status to '%s'", job_id, status)
        return result.data[0] if result.data else {}
    except Exception as e:
        logger.error("Failed to update status for job %s: %s", job_id, e)
        raise


async def get_jobs(status: str | None = None, min_score: int = 0) -> list[dict]:
    """Récupère les candidatures depuis Supabase avec filtres optionnels."""
    client = get_client()
    try:
        query = client.table("job_applications").select("*").gte("score", min_score)
        if status:
            query = query.eq("status", status)
        result = query.order("score", desc=True).execute()
        return result.data or []
    except Exception as e:
        logger.error("Failed to fetch jobs: %s", e)
        raise


async def delete_job(job_id: str) -> bool:
    """Supprime une candidature. Requiert confirmation explicite de l'utilisateur."""
    client = get_client()
    try:
        client.table("job_applications").delete().eq("id", job_id).execute()
        logger.info("Deleted job %s", job_id)
        return True
    except Exception as e:
        logger.error("Failed to delete job %s: %s", job_id, e)
        raise
