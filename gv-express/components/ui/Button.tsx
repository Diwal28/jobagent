import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "gold" | "dark" | "outline" | "outline-dark" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.985] disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Bouton principal — doré sur fond clair comme sur fond sombre. */
  gold: "bg-gold text-ink hover:bg-gold-soft",
  dark: "bg-ink text-sand hover:bg-ink-3",
  outline:
    "border border-line-strong text-cocoa hover:border-ink hover:bg-ink hover:text-sand",
  "outline-dark":
    "border border-line-dark-strong text-sand hover:border-sand hover:bg-sand hover:text-ink",
  whatsapp: "bg-leaf text-white hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.6875rem]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-[0.8125rem]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonLinkProps = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    /** Lien sortant : ouvre un nouvel onglet avec rel sécurisé. */
    external?: boolean;
  };

export function ButtonLink({
  variant = "gold",
  size = "md",
  className,
  children,
  href,
  external = false,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

type ActionButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement>;

export function ActionButton({
  variant = "gold",
  size = "md",
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
