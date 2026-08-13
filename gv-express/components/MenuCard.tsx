"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { MENU_IS_PLACEHOLDER, type MenuItem } from "@/data/menu";
import { restaurant, whatsappUrl } from "@/data/restaurant";
import { ease } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";

type MenuCardProps = {
  item: MenuItem;
  categoryLabel: string;
  index: number;
};

export function MenuCard({ item, categoryLabel, index }: MenuCardProps) {
  const reduceMotion = useReducedMotion();
  const price = formatPrice(item.price);

  const orderMessage = `Bonjour ${restaurant.name}, je souhaite commander : ${item.name}.`;

  return (
    <motion.li
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -12, transition: { duration: 0.28, ease } }
      }
      transition={{ duration: 0.5, ease, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2 transition-colors duration-500 hover:border-line-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
        <Image
          src={item.image}
          alt={
            MENU_IS_PLACEHOLDER
              ? `Emplacement photo réservé pour ${item.name.toLowerCase()}`
              : item.name
          }
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-line-strong bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
          {categoryLabel}
        </span>

        {item.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
            Suggestion
          </span>
        )}

        {MENU_IS_PLACEHOLDER && (
          <span className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.18em] text-cream-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Photo à intégrer
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display-3 text-cream">{item.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted text-pretty">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5 sm:mt-6">
          {price ? (
            <span className="text-lg font-semibold tracking-tight text-cream">
              {price}
            </span>
          ) : (
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-cream-faint">
              Prix à confirmer
            </span>
          )}

          <a
            href={whatsappUrl(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:border-ember hover:bg-ember hover:text-ink"
            aria-label={`Commander « ${item.name} » via WhatsApp`}
          >
            Commander
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </motion.li>
  );
}
