import logging
from typing import Literal
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from agent.tools.tracker import get_jobs, save_job, update_job_status, delete_job

logger = logging.getLogger(__name__)
router = APIRouter()

# ============================================================
# Pydantic models
# ============================================================

class JobCreate(BaseModel):
    source: Literal["indeed", "france_travail", "manual"] = "manual"
    external_id: str | None = None
    title: str = Field(..., min_length=1, max_length=300)
    company: str | None = Field(None, max_length=200)
    location: str | None = Field(None, max_length=200)
    contract_type: str | None = Field(None, max_length=50)
    description: str | None = None
    url: str | None = Field(None, max_length=2000)
    date_posted: str | None = None
    score: int = Field(0, ge=0, le=100)
    status: Literal["nouveau", "postule", "relance", "refus", "accepte"] = "nouveau"
    notes: str | None = None
    letter: str | None = None
    ats_keywords: list[str] = []


class StatusUpdate(BaseModel):
    status: Literal["nouveau", "postule", "relance", "refus", "accepte"]


# ============================================================
# Routes CRUD — l'IA tourne dans Claude Code, pas ici
# ============================================================

@router.post("/jobs", status_code=status.HTTP_201_CREATED)
async def create_job(payload: JobCreate):
    """Sauvegarde une offre depuis Claude Code ou manuellement."""
    try:
        job_data = payload.model_dump(exclude={"score", "status"})
        saved = await save_job(
            job_data=job_data,
            score=payload.score,
            status=payload.status,
        )
        return {"success": True, "job": saved}
    except Exception as e:
        logger.error("Failed to create job: %s", e)
        raise HTTPException(status_code=500, detail="Impossible de sauvegarder l'offre.")


@router.get("/jobs")
async def list_jobs(status: str | None = None, min_score: int = 0):
    """Récupère les candidatures depuis Supabase."""
    if min_score < 0 or min_score > 100:
        raise HTTPException(status_code=422, detail="min_score doit être entre 0 et 100.")
    valid_statuses = {"nouveau", "postule", "relance", "refus", "accepte"}
    if status and status not in valid_statuses:
        raise HTTPException(status_code=422, detail=f"Statut invalide. Valeurs : {valid_statuses}")
    try:
        jobs = await get_jobs(status=status, min_score=min_score)
        return {"success": True, "jobs": jobs, "count": len(jobs)}
    except Exception as e:
        logger.error("Failed to list jobs: %s", e)
        raise HTTPException(status_code=500, detail="Impossible de récupérer les candidatures.")


@router.put("/jobs/{job_id}/status")
async def patch_job_status(job_id: str, payload: StatusUpdate):
    """Met à jour le statut d'une candidature."""
    try:
        updated = await update_job_status(job_id, payload.status)
        return {"success": True, "job": updated}
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        logger.error("Failed to update job %s status: %s", job_id, e)
        raise HTTPException(status_code=500, detail="Impossible de mettre à jour le statut.")


@router.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_job(job_id: str):
    """Supprime une candidature — action irréversible."""
    try:
        await delete_job(job_id)
    except Exception as e:
        logger.error("Failed to delete job %s: %s", job_id, e)
        raise HTTPException(status_code=500, detail="Impossible de supprimer la candidature.")
