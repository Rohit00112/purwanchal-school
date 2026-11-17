import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  light?: boolean;
  className?: string;
  href?: string | null;
}

/** The school's uploaded crest from /public/logo/logo.png. */
export function LogoMark({ className, alt = "" }: { className?: string; alt?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1 ring-1 ring-line-strong",
        className
      )}
    >
      <Image
        src="/logo/logo.png"
        alt={alt}
        width={48}
        height={48}
        sizes="48px"
        className="size-full object-contain"
      />
    </span>
  );
}

export function Logo({ showText = true, light = false, className, href = "/" }: LogoProps) {
  const content = (
    <span className="flex items-center gap-3">
      <LogoMark alt={showText ? "" : "Purwanchal Secondary Boarding School"} />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[0.95rem] font-extrabold tracking-tight sm:text-base",
              light ? "text-white" : "text-brand-950"
            )}
          >
            Purwanchal
          </span>
          <span
            className={cn(
              "mt-1 text-[0.58rem] font-bold uppercase tracking-[0.19em]",
              light ? "text-sun-300" : "text-brand-600"
            )}
          >
            Secondary Boarding School
          </span>
        </span>
      )}
    </span>
  );

  if (href === null) return <span className={className}>{content}</span>;

  return (
    <Link href={href} className={cn("inline-flex min-h-11 items-center", className)} aria-label="Purwanchal Secondary Boarding School, home">
      {content}
    </Link>
  );
}
