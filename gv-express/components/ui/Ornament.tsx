import { cn } from "@/lib/utils";

/**
 * Filet décoratif placé sous les titres de section.
 * Deux traits fins reliés par une volute — signature visuelle
 * reprise sur toutes les pages.
 */
export function Ornament({
  className,
  tone = "light",
}: {
  className?: string;
  /** `light` = sur fond clair, `dark` = sur fond sombre. */
  tone?: "light" | "dark";
}) {
  const color = tone === "dark" ? "var(--color-gold)" : "var(--color-gold-ink)";

  return (
    <svg
      viewBox="0 0 120 12"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3 w-[120px]", className)}
      style={{ color }}
    >
      <path
        d="M2 6h34M84 6h34"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M42 6c3-4 7-4 9 0s6 4 9 0 6-4 9 0 6 4 9 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
