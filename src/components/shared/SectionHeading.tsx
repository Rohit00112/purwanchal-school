import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** @deprecated R-09: headings no longer carry a decorative eyebrow badge. */
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  action?: ReactNode;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  align = "left",
  light = false,
  className,
  action,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center md:text-center",
        className
      )}
    >
      <Reveal className={cn("max-w-2xl", centered && "mx-auto")}>
        <h2
          className={cn(
            "text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.5rem]",
            light ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-[0.95rem] leading-relaxed sm:text-base",
              light ? "text-white/80" : "text-ink-soft"
            )}
          >
            {description}
          </p>
        )}
        {children}
      </Reveal>

      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>
  );
}
