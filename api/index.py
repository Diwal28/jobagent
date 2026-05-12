import sys
import os

# Ajouter backend/ au path pour que les imports relatifs fonctionnent sur Vercel
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from main import app  # noqa: F401 — Vercel détecte 'app' ASGI automatiquement
