#!/usr/bin/env python3
"""
Rapatrie en local les photographies servies par le CDN Unsplash.

Le site fonctionne tel quel avec les URLs distantes. Ce script sert à
basculer sur des fichiers auto-hébergés : meilleur contrôle du cache,
aucune dépendance à un tiers, et un site qui reste intact si le CDN change.

Usage :
    python3 scripts/self_host_photos.py            # télécharge + réécrit index.html
    python3 scripts/self_host_photos.py --dry-run  # liste seulement ce qui serait fait

Toute image qui ne se télécharge pas est laissée en URL distante : on ne
casse jamais une balise <img> qui fonctionnait.
"""

import argparse
import pathlib
import re
import sys
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
PHOTO_DIR = ROOT / "assets" / "img" / "photos"

# https://images.unsplash.com/photo-<id>?<params>
URL_RE = re.compile(r"https://images\.unsplash\.com/(photo-[0-9a-f-]+)\?([^\"'\s]+)")
TIMEOUT = 30
UA = "Mozilla/5.0 (compatible; maison-emeraude-selfhost/1.0)"


def width_of(query: str) -> str:
    """Largeur demandée dans la query string, 1600 par défaut."""
    match = re.search(r"(?:^|&)(?:amp;)?w=(\d+)", query)
    return match.group(1) if match else "1600"


def download(url: str, dest: pathlib.Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        if response.status != 200:
            raise urllib.error.HTTPError(url, response.status, "statut inattendu", response.headers, None)
        payload = response.read()
    if len(payload) < 1024:
        raise ValueError(f"réponse trop courte ({len(payload)} octets)")
    dest.write_bytes(payload)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="n'écrit rien, se contente de lister")
    args = parser.parse_args()

    if not INDEX.exists():
        print(f"introuvable : {INDEX}", file=sys.stderr)
        return 1

    html = INDEX.read_text(encoding="utf-8")

    # Dédoublonnage : une même photo apparaît en plusieurs largeurs (srcset)
    wanted = {}
    for match in URL_RE.finditer(html):
        photo_id, query = match.group(1), match.group(2)
        wanted[(photo_id, width_of(query))] = match.group(0)

    if not wanted:
        print("Aucune URL Unsplash trouvée — le site est déjà auto-hébergé.")
        return 0

    print(f"{len(wanted)} fichier(s) à récupérer dans {PHOTO_DIR.relative_to(ROOT)}/\n")

    if args.dry_run:
        for (photo_id, width) in sorted(wanted):
            print(f"  {photo_id}-{width}.jpg")
        return 0

    PHOTO_DIR.mkdir(parents=True, exist_ok=True)
    replacements = {}
    failures = []

    for (photo_id, width), sample_url in sorted(wanted.items()):
        name = f"{photo_id}-{width}.jpg"
        dest = PHOTO_DIR / name
        # &amp; dans le HTML : on rétablit une URL réellement requêtable
        remote = sample_url.replace("&amp;", "&")

        if dest.exists() and dest.stat().st_size > 1024:
            print(f"  ✓ {name} (déjà présent)")
        else:
            try:
                download(remote, dest)
                print(f"  ✓ {name} ({dest.stat().st_size // 1024} Ko)")
            except Exception as error:  # réseau, 404, quota… on journalise et on continue
                print(f"  ✗ {name} — {error}", file=sys.stderr)
                failures.append((photo_id, width, error))
                dest.unlink(missing_ok=True)
                continue

        replacements[(photo_id, width)] = f"assets/img/photos/{name}"

    def swap(match: "re.Match[str]") -> str:
        key = (match.group(1), width_of(match.group(2)))
        return replacements.get(key, match.group(0))

    updated = URL_RE.sub(swap, html)

    if updated != html:
        INDEX.write_text(updated, encoding="utf-8")
        print(f"\nindex.html mis à jour ({len(replacements)} URL réécrites).")
        print("Pensez à retirer https://images.unsplash.com de la directive img-src "
              "dans vercel.json si plus aucune URL distante ne subsiste.")
    else:
        print("\nAucune réécriture nécessaire.")

    if failures:
        print(f"\n{len(failures)} échec(s) — ces images restent servies par le CDN.", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
