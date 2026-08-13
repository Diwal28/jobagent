import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="display-2 mt-5 text-cream text-balance">{title}</h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className={cn(
            "hairline mt-7 w-24",
            centered && "mx-auto",
          )}
        />
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p className="mt-6 text-base leading-relaxed text-cream-muted sm:text-lg text-pretty">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
