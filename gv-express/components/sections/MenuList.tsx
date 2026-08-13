"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import { DishCard } from "@/components/sections/DishCard";
import { Reveal } from "@/components/ui/Reveal";
import { MENU_IS_PLACEHOLDER, menuCategories, menuItems } from "@/data/menu";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "tout";

/** Carte complète avec filtres par catégorie. */
export function MenuList() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const gridRef = useRef<HTMLUListElement>(null);

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

  /**
   * Après un changement de catégorie la grille rétrécit : on ramène
   * son haut dans l'écran pour ne jamais laisser une zone vide.
   */
  const selectCategory = useCallback((id: string) => {
    setActiveCategory(id);
    const grid = gridRef.current;
    if (!grid) return;
    if (grid.getBoundingClientRect().top < 120) {
      window.requestAnimationFrame(() => {
        const top = grid.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }, []);

  const categoryLabel = (id: string) =>
    menuCategories.find((category) => category.id === id)?.label ?? "";

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="container-gv">
        {MENU_IS_PLACEHOLDER && (
          <Reveal>
            <p className="mx-auto flex max-w-3xl items-start gap-3 border border-gold/30 bg-gold/[0.07] px-5 py-4 text-sm leading-relaxed text-cocoa-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
              <span>
                <span className="font-semibold text-cocoa">Démonstration.</span>{" "}
                La mise en page est prête : les intitulés, photos et prix réels
                de GV Express seront intégrés à l’identique. Aucun plat ni tarif
                n’a été inventé — les prix s’affichent « à confirmer ».
              </span>
            </p>
          </Reveal>
        )}

        <Reveal delay={0.06}>
          <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:justify-center sm:px-0">
            {filters.map((filter) => {
              const isActive = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => selectCategory(filter.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative shrink-0 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                    isActive ? "text-ink" : "text-cocoa-muted hover:text-cocoa",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="menu-filter-pill"
                      transition={{ duration: 0.4, ease }}
                      className="absolute inset-0 -z-10 bg-gold"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 -z-10 border border-line" />
                  )}
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul
          ref={gridRef}
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25, ease } }}
                transition={{ duration: 0.5, ease, delay: Math.min(index * 0.04, 0.24) }}
              >
                <DishCard
                  item={item}
                  categoryLabel={categoryLabel(item.category)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
