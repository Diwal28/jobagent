import { cn } from "@/lib/utils";

/**
 * Marque GV — couverts croisés dans un cercle.
 * Traitement temporaire : à remplacer par le logo officiel de
 * GV Express dès qu'il est fourni (voir README).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("h-8 w-8", className)}
    >
      <circle
        cx="20"
        cy="20"
        r="18.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      {/* Fourchette */}
      <path
        d="M14.6 9.5v6.2c0 1.5.9 2.4 2.1 2.6l-.5 12.2M13 9.5v5.4M16.2 9.5v5.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Couteau */}
      <path
        d="M25.6 9.5c1.7 1.9 2.3 4.4 2 7.2-.2 1.6-.9 2.4-2 2.6l-.5 11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
  compact = false,
}: {
  className?: string;
  /** `dark` = posé sur fond sombre, `light` = sur fond clair. */
  tone?: "dark" | "light";
  compact?: boolean;
}) {
  const wordmark = tone === "dark" ? "text-sand" : "text-cocoa";
  const sub = tone === "dark" ? "text-sand-faint" : "text-cocoa-faint";

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark
        className={cn(compact ? "h-7 w-7" : "h-9 w-9", "text-gold")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-[family-name:var(--font-display)] font-semibold uppercase tracking-[0.14em]",
            compact ? "text-base" : "text-lg sm:text-xl",
            wordmark,
          )}
        >
          GV Express
        </span>
        <span
          className={cn(
            "mt-1.5 text-[8px] font-semibold uppercase tracking-[0.42em]",
            sub,
          )}
        >
          Restaurant
        </span>
      </span>
    </span>
  );
}
