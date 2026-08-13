import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 will-change-transform active:scale-[0.98] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-ink shadow-[0_10px_30px_-12px_rgba(224,100,44,0.9)] hover:bg-[#f0a44f] hover:shadow-[0_16px_40px_-14px_rgba(224,100,44,1)]",
  outline:
    "border border-line-strong text-cream hover:border-cream hover:bg-cream hover:text-ink",
  ghost: "text-cream hover:text-ember",
  whatsapp:
    "bg-leaf text-white shadow-[0_10px_30px_-12px_rgba(31,168,85,0.9)] hover:brightness-110",
};

const sizes: Record<Size, string> = {
  // 48px et 56px de hauteur : cibles tactiles confortables sur mobile.
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Ajoute automatiquement rel/target pour les liens sortants. */
  external?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
