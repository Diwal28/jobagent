import os
import logging
from supabase import create_client, Client

logger = logging.getLogger(__name__)

_client: Client | None = None


def get_client() -> Client:
    """Retourne le client Supabase singleton. Utilise la clé anon (RLS actif)."""
    global _client
    if _client is None:
        url = os.environ["SUPABASE_URL"]
        key = os.environ["SUPABASE_ANON_KEY"]  # jamais service_role côté app
        _client = create_client(url, key)
        logger.info("Supabase client initialized for %s", url)
    return _client
