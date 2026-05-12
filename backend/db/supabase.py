import os
import logging
from supabase import create_client, Client

logger = logging.getLogger(__name__)

_client: Client | None = None


def get_client() -> Client:
    """Retourne le client Supabase singleton.

    Backend server-side : utilise service_role si disponible (bypass RLS),
    sinon anon key. La service_role key n'est jamais exposée au frontend.
    """
    global _client
    if _client is None:
        url = os.environ["SUPABASE_URL"]
        # service_role acceptable côté backend uniquement — bypass RLS pour les
        # opérations serveur sans session utilisateur (Phase 1 usage personnel)
        key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ["SUPABASE_ANON_KEY"]
        _client = create_client(url, key)
        logger.info("Supabase client initialized (role=%s)", "service" if "service_role" in key else "anon")
    return _client
