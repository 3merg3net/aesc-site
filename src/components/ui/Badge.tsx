"use client";

import { cn } from "@/lib/utils"; // if you don't have a cn helper, replace cn(...) with a simple template string

type Variant = "teal" | "gold" | "neutral";

export default function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const variants: Record<Variant, string> = {
    teal: "bg-teal-400/10 text-teal-200 ring-teal-300/40",
    gold: "bg-yellow-400/10 text-yellow-200 ring-yellow-300/40",
    neutral: "bg-white/5 text-zinc-300 ring-white/15",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] tracking-wide ring-1",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
