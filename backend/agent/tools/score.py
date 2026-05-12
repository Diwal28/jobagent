# Le scoring est effectué directement par Claude Code (pas d'appel API séparé).
# Ces structures de données sont utilisées par tracker.py pour la validation.

from pydantic import BaseModel, Field


class JobScore(BaseModel):
    job_id: str
    score: int = Field(..., ge=0, le=100)
    strengths: list[str] = []
    weaknesses: list[str] = []
    recommendation: str = ""
