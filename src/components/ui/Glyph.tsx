"use client";

import { cn } from "@/lib/utils";

export default function Glyph({
  name,
  className,
}: {
  name: "beacon" | "signal" | "star" | "chain";
  className?: string;
}) {
  const icons: Record<string, JSX.Element> = {
    beacon: <span className="text-lg">📡</span>,
    signal: <span className="text-lg">📶</span>,
    star:   <span className="text-lg">⭐</span>,
    chain:  <span className="text-lg">⛓️</span>,
  };

  return <span className={cn("inline-block", className)}>{icons[name] ?? "❖"}</span>;
}

