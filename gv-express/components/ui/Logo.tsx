import { cn } from "@/lib/utils";

/**
 * Monogramme GV — traitement typographique temporaire.
 * À remplacer par le logo officiel de GV Express dès qu’il est
 * disponible (voir README, section « Remplacer le logo »).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="gv-mark-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0a44f" />
          <stop offset="100%" stopColor="#d8542a" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="url(#gv-mark-gradient)"
        strokeWidth="1.5"
      />
      {/* Arc bas : évoque une assiette vue de profil. */}
      <path
        d="M9 27a15 15 0 0 0 30 0Z"
        fill="url(#gv-mark-gradient)"
        opacity="0.9"
      />
      <path d="M9 27h30" stroke="#f5eee4" strokeWidth="1.2" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={compact ? "h-7 w-7" : "h-9 w-9"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-display)] font-semibold tracking-tight text-cream",
            compact ? "text-lg" : "text-xl",
          )}
        >
          GV Express
        </span>
        {!compact && (
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-cream-faint">
            Pikine · Dakar
          </span>
        )}
      </span>
    </span>
  );
}
