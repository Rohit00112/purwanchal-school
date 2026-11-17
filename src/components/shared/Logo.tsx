import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  light?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({
  className,
  variant,
  light = false,
  size = "md",
  showText = true,
}: LogoProps) {
  const resolvedVariant = variant || (light ? "light" : "dark");
  const sizeMap = {
    sm: { img: 36, text: "text-sm", sub: "text-[10px]" },
    md: { img: 46, text: "text-base sm:text-lg", sub: "text-[11px]" },
    lg: { img: 60, text: "text-xl sm:text-2xl", sub: "text-xs" },
  };

  const currentSize = sizeMap[size];

  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 group min-h-[44px]", className)}>
      <div
        className={cn(
          "relative shrink-0 rounded-full bg-white p-1 shadow-xs border transition-transform duration-200 group-hover:scale-105",
          resolvedVariant === "light"
            ? "border-white/30"
            : "border-slate-200"
        )}
        style={{ width: currentSize.img + 8, height: currentSize.img + 8 }}
      >
        <Image
          src="/logo/logo-web.png"
          alt="Purwanchal Secondary Boarding School Emblem"
          width={currentSize.img}
          height={currentSize.img}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-serif font-bold tracking-tight leading-none",
              currentSize.text,
              resolvedVariant === "light" ? "text-white" : "text-[#16194F]"
            )}
          >
            PURWANCHAL
          </span>
          <span
            className={cn(
              "font-sans font-semibold tracking-wider uppercase mt-1 leading-tight",
              currentSize.sub,
              resolvedVariant === "light" ? "text-[#DFB251]" : "text-[#2E3191]"
            )}
          >
            Secondary Boarding School
          </span>
          <span
            className={cn(
              "text-[10px] tracking-wide mt-0.5",
              resolvedVariant === "light" ? "text-slate-300" : "text-slate-500"
            )}
          >
            Estd. 1994 AD · Tarahara, Sunsari
          </span>
        </div>
      )}
    </Link>
  );
}
