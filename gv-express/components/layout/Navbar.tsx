"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { TopBar } from "@/components/layout/TopBar";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navLinks, restaurant } from "@/data/restaurant";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink/95 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "bg-ink lg:bg-transparent",
        )}
      >
        <div className={cn("transition-all duration-500", scrolled && "lg:hidden")}>
          <TopBar />
        </div>

        <nav
          aria-label="Navigation principale"
          className={cn(
            "container-gv flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16 lg:h-[4.5rem]" : "h-[4.5rem] lg:h-24",
            !scrolled && "lg:border-b lg:border-line-dark",
          )}
        >
          <Link href="/" aria-label={`${restaurant.name} — accueil`}>
            <Logo compact={scrolled} />
          </Link>

          <ul className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                    isActive(link.href)
                      ? "text-gold"
                      : "text-sand-muted hover:text-sand",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                      isActive(link.href) ? "w-full" : "w-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ButtonLink href="/reservation">Réserver une table</ButtonLink>
            </span>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-line-dark-strong text-sand transition-colors hover:border-gold hover:text-gold xl:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <span className="flex flex-col items-end gap-[5px]" aria-hidden="true">
                  <span className="block h-px w-5 bg-current" />
                  <span className="block h-px w-3.5 bg-current" />
                  <span className="block h-px w-5 bg-current" />
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/98 backdrop-blur-2xl xl:hidden"
          >
            <div className="container-gv flex flex-1 flex-col justify-center overflow-y-auto pt-28 pb-10">
              <ul>
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + index * 0.05, duration: 0.45, ease }}
                    className="border-b border-line-dark"
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span
                        className={cn(
                          "font-[family-name:var(--font-display)] text-2xl",
                          isActive(link.href) ? "text-gold" : "text-sand",
                        )}
                      >
                        {link.label}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-sand-faint">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.45, ease }}
                className="mt-8 space-y-3"
              >
                <ButtonLink
                  href="/reservation"
                  size="lg"
                  className="w-full"
                  onClick={close}
                >
                  Réserver une table
                </ButtonLink>
                <ButtonLink
                  href={restaurant.phoneHref}
                  variant="outline-dark"
                  size="lg"
                  className="w-full"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {restaurant.phone}
                </ButtonLink>
                <p className="flex items-center justify-center gap-2 pt-3 text-center text-[11px] text-sand-faint">
                  <MessageCircle className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {restaurant.hours.days} · {restaurant.hours.label}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
