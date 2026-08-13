"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import {
  defaultWhatsappMessage,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";
import { ease } from "@/lib/motion";

/**
 * Accès permanent à la commande.
 *  — mobile  : barre d’action fixe en bas d’écran (appel + WhatsApp) ;
 *  — desktop : bouton WhatsApp flottant discret.
 * Les deux n’apparaissent qu’après le hero, qui porte déjà ses CTA.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile */}
          <motion.div
            key="mobile-bar"
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden"
          >
            <div className="flex gap-2.5">
              <a
                href={restaurant.phoneHref}
                className="flex h-13 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line-strong py-3.5 text-sm font-semibold text-cream"
                aria-label={`Appeler GV Express au ${restaurant.phone}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Appeler
              </a>
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 flex-[1.3] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-leaf py-3.5 text-sm font-semibold text-white"
                aria-label="Commander via WhatsApp"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Commander
              </a>
            </div>
          </motion.div>

          {/* Desktop */}
          <motion.a
            key="fab"
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease }}
            aria-label="Commander via WhatsApp"
            className="group fixed bottom-7 right-7 z-40 hidden h-14 items-center gap-3 rounded-full bg-leaf pl-4 pr-4 text-white shadow-[0_14px_40px_-12px_rgba(31,168,85,0.85)] transition-all duration-300 hover:pr-6 sm:flex"
          >
            <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
              Commander
            </span>
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
