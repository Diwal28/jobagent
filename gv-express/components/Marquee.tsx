import { restaurant } from "@/data/restaurant";

const items = [
  "Service rapide et organisé",
  "Commande à distance",
  `${restaurant.street} — Pikine`,
  `${restaurant.hours.days} · ${restaurant.hours.label}`,
  restaurant.phone,
];

/**
 * Bandeau défilant sous le hero.
 * Décoratif : masqué aux lecteurs d’écran, dont le contenu est déjà
 * présent ailleurs dans la page.
 */
export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line bg-ink-2/60 py-4"
    >
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="whitespace-nowrap px-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream-muted">
                  {item}
                </span>
                <span className="h-1 w-1 rotate-45 bg-ember" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
