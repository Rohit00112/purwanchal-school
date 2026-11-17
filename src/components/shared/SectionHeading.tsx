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
          <div className="mb-3">
            <span
              className={cn(
                "inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider",
                light
                  ? "bg-white/10 text-sun-300 border border-white/20"
                  : "bg-brand-50 text-brand-700 border border-brand-100"
              )}
            >
              {badge}
            </span>
          </div>
        )}
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
              "mt-3 text-[0.95rem] leading-relaxed sm:text-base",
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
