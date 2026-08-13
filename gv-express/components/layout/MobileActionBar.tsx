"use client";

import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import {
  defaultWhatsappMessage,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";

/**
 * Barre d'action fixe sur mobile : appeler, écrire, réserver.
 * Toujours visible — c'est le principal levier de conversion sur
 * téléphone.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={restaurant.phoneHref}
          className="flex h-12 flex-col items-center justify-center gap-1 rounded-sm border border-line-dark-strong text-sand"
          aria-label={`Appeler GV Express au ${restaurant.phone}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
            Appeler
          </span>
        </a>

        <a
          href={whatsappUrl(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-col items-center justify-center gap-1 rounded-sm bg-leaf text-white"
          aria-label="Commander via WhatsApp"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
            Commander
          </span>
        </a>

        <Link
          href="/reservation"
          className="flex h-12 flex-col items-center justify-center gap-1 rounded-sm bg-gold text-ink"
        >
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
            Réserver
          </span>
        </Link>
      </div>
    </div>
  );
}
