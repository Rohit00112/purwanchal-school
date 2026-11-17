import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** @deprecated Motion 1: no entrance animation. Kept so callers stay source-compatible. */
  delay?: number;
  /** @deprecated Motion 1: no entrance animation. */
  y?: number;
  /** @deprecated Motion 1: no entrance animation. */
  x?: number;
  /** @deprecated Motion 1: no entrance animation. */
  duration?: number;
  /** @deprecated Motion 1: no entrance animation. */
  once?: boolean;
}

/** Motion 1: content is present on first paint. Motion is reserved for direct user actions. */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
