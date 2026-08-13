"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import {
  defaultWhatsappMessage,
  navLinks,
  restaurant,
  whatsappUrl,
} from "@/data/restaurant";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#accueil");

  // Compaction de la barre au défilement.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Surlignage du lien correspondant à la section visible.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((element): element is Element => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Verrouillage du défilement quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Navigation principale"
          className={cn(
            "container-gv flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-20 sm:h-24",
          )}
        >
          <a
            href="#accueil"
            onClick={close}
            aria-label={`${restaurant.name} — retour en haut de page`}
          >
            <Logo compact={scrolled} />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors duration-300",
                    active === link.href
                      ? "text-cream"
                      : "text-cream-muted hover:text-cream",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-ember transition-all duration-300",
                      active === link.href ? "w-full" : "w-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={restaurant.phoneHref}
              className="hidden items-center gap-2 text-sm font-medium text-cream-muted transition-colors hover:text-cream md:inline-flex"
            >
              <Phone className="h-4 w-4 text-ember" aria-hidden="true" />
              <span>{restaurant.phone}</span>
            </a>

            <span className="hidden sm:block">
              <ButtonLink
                href={whatsappUrl(defaultWhatsappMessage)}
                external
                aria-label="Commander via WhatsApp"
              >
                Commander
              </ButtonLink>
            </span>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-cream transition-colors hover:border-cream lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <span className="flex flex-col items-end gap-[5px]" aria-hidden="true">
                  <span className="block h-px w-5 bg-cream" />
                  <span className="block h-px w-3.5 bg-cream" />
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-gv flex flex-1 flex-col justify-center pt-24 pb-10">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.06, duration: 0.5, ease }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="display-3 text-cream">{link.label}</span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-cream-faint">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5, ease }}
                className="mt-10 space-y-3"
              >
                <ButtonLink
                  href={whatsappUrl(defaultWhatsappMessage)}
                  external
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Commander sur WhatsApp
                </ButtonLink>
                <ButtonLink
                  href={restaurant.phoneHref}
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {restaurant.phone}
                </ButtonLink>
                <p className="pt-4 text-center text-xs tracking-wide text-cream-faint">
                  {restaurant.venue} — {restaurant.street}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
