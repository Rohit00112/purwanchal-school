import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  /** @deprecated R-09: no decorative eyebrow badge. */
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  image: string;
  crumbs: Crumb[];
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  image,
  crumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-brand-950", className)}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="img-cover object-center opacity-35"
      />
      <div className="absolute inset-0 bg-brand-950/85" />

      <div className="shell relative z-10 py-14 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/80">
          <Link href="/" className="underline-offset-4 transition-colors hover:text-sun-300 hover:underline">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="text-white/50">/</span>
              {crumb.href ? (
                <Link href={crumb.href} className="underline-offset-4 transition-colors hover:text-sun-300 hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
