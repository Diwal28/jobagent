# La génération de lettres et CV ATS est effectuée par Claude Code.
# Ces structures de données sont utilisées pour sauvegarder les résultats.

from pydantic import BaseModel


class GeneratedContent(BaseModel):
    job_id: str
    letter: str = ""
    ats_keywords: list[str] = []
    ats_tips: list[str] = []
