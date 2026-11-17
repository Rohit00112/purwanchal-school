import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-7 items-center rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-600 text-white",
        secondary: "bg-brand-50 text-brand-800",
        accent: "bg-sun-300 text-brand-950",
        outline: "border border-line-strong text-ink",
        success: "bg-brand-100 text-brand-800",
        warning: "bg-sun-100 text-sun-600",
        error: "bg-error-soft text-error",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
