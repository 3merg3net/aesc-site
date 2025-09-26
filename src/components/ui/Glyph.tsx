// src/components/ui/Glyph.tsx
"use client";

import React from "react";

// Allow TSX elements explicitly
type IconMap = Record<string, React.ReactNode>;

export default function Glyph({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const icons: IconMap = {
    beacon: <span className="text-lg">📡</span>,
    signal: <span className="text-lg">📶</span>,
    star: <span className="text-lg">⭐</span>,
    fire: <span className="text-lg">🔥</span>,
    heart: <span className="text-lg">💛</span>,
  };

  return (
    <span className={className}>
      {icons[name] ?? <span className="text-lg">❓</span>}
    </span>
  );
}


