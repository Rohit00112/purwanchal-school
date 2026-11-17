import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  badge?: ReactNode;
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
  badge,
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
        {badge && (
          <p
            className={cn(
              "mb-2 text-xs font-bold uppercase tracking-wider",
              light ? "text-sun-300" : "text-brand-700"
            )}
          >
            {badge}
          </p>
        )}
        <h2
          className={cn(
            "font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight",
            light ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-3 text-sm sm:text-base leading-relaxed",
              light ? "text-white/80" : "text-slate-600"
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
