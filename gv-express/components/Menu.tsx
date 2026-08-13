"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import { MenuCard } from "@/components/MenuCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MENU_IS_PLACEHOLDER, menuCategories, menuItems } from "@/data/menu";
import { defaultWhatsappMessage, whatsappUrl } from "@/data/restaurant";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "tout";

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const gridRef = useRef<HTMLUListElement>(null);

  /**
   * Après un changement de catégorie, la grille rétrécit : on
   * ramène son haut dans l’écran pour ne jamais laisser le
   * visiteur devant une zone vide.
   */
  const selectCategory = useCallback((id: string) => {
    setActiveCategory(id);
    const grid = gridRef.current;
    if (!grid) return;
    if (grid.getBoundingClientRect().top < 96) {
      window.requestAnimationFrame(() => {
        const top = grid.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }, []);

  const filters = useMemo(
    () => [{ id: ALL, label: "Tout" }, ...menuCategories],
    [],
  );

  const visibleItems = useMemo(
    () =>
      activeCategory === ALL
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const categoryLabel = (id: string) =>
    menuCategories.find((category) => category.id === id)?.label ?? "";

  return (
    <section id="menu" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Halo chaud discret en fond de section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(224,100,44,0.12),transparent_70%)]"
      />

      <div className="container-gv">
        <SectionHeading
          eyebrow="La carte"
          title="Notre menu"
          description="Découvrez nos spécialités et choisissez votre prochaine envie."
        />

        {MENU_IS_PLACEHOLDER && (
          <Reveal delay={0.16}>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] px-5 py-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-cream-muted text-pretty">
                <span className="font-semibold text-cream">Démonstration.</span>{" "}
                La mise en page ci-dessous est prête : intitulés, photos et prix
                réels de GV Express seront intégrés à l’identique. Aucun plat
                ni tarif n’a été inventé.
              </p>
            </div>
          </Reveal>
        )}

        {/* Filtres par catégorie */}
        <Reveal delay={0.2}>
          <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((filter) => {
              const isActive = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => selectCategory(filter.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative shrink-0 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-ink" : "text-cream-muted hover:text-cream",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-filter-pill"
                      transition={{ duration: 0.4, ease }}
                      className="absolute inset-0 -z-10 rounded-full bg-cream"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-line" />
                  )}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grille des plats */}
        <motion.ul
          ref={gridRef}
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
                categoryLabel={categoryLabel(item.category)}
              />
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-line bg-ink-2 px-6 py-10 text-center sm:px-10">
            <p className="display-3 max-w-md text-cream text-balance">
              Une question sur la carte&nbsp;?
            </p>
            <p className="max-w-md text-sm leading-relaxed text-cream-muted">
              Écrivez-nous directement : nous répondons et prenons la commande
              dans la foulée.
            </p>
            <ButtonLink
              href={whatsappUrl(defaultWhatsappMessage)}
              external
              size="lg"
              className="mt-2"
            >
              Écrire sur WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
