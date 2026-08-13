import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <Reveal>
        <p className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={cn(
            "display-2 mt-4 text-balance",
            dark ? "text-sand" : "text-cocoa",
          )}
        >
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <Ornament tone={tone} className={cn("mt-5", centered && "mx-auto")} />
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "mt-5 text-[0.9375rem] leading-relaxed text-pretty sm:text-base",
              dark ? "text-sand-muted" : "text-cocoa-muted",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
