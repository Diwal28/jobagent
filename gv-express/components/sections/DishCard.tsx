import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { MENU_IS_PLACEHOLDER, type MenuItem } from "@/data/menu";
import { restaurant, whatsappUrl } from "@/data/restaurant";
import { cn, formatPrice } from "@/lib/utils";

type DishCardProps = {
  item: MenuItem;
  categoryLabel: string;
  className?: string;
};

/** Carte plat — utilisée sur l'accueil et sur la page Menu. */
export function DishCard({ item, categoryLabel, className }: DishCardProps) {
  const price = formatPrice(item.price);
  const orderMessage = `Bonjour ${restaurant.name}, je souhaite commander : ${item.name}.`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-line bg-cream-3 transition-all duration-500 hover:border-gold/50 hover:shadow-[0_24px_50px_-32px_rgba(36,26,18,0.5)]",
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-ink">
        <Image
          src={item.image}
          alt={
            MENU_IS_PLACEHOLDER
              ? `Emplacement photo réservé pour ${item.name.toLowerCase()}`
              : item.name
          }
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur-sm">
          {categoryLabel}
        </span>

        {item.featured && (
          <span className="absolute right-3 top-3 bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
            Suggestion
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="display-3 text-cocoa">{item.name}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-cocoa-muted text-pretty">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          {price ? (
            <span className="text-lg font-semibold tracking-tight text-ember-ink">
              {price}
            </span>
          ) : (
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa-faint">
              Prix à confirmer
            </span>
          )}

          <a
            href={whatsappUrl(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cocoa transition-colors duration-300 hover:text-ember-ink"
            aria-label={`Commander « ${item.name} » via WhatsApp`}
          >
            Commander
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
