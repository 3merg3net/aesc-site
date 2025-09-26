// src/components/meshwork/SectionHeader.tsx
"use client";

import Image from "next/image";

export default function SectionHeader({
  title,
  divider,
  className = "",
}: {
  title: string;
  divider: string; // e.g. "/assets/meshwork/divider-growth.png"
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
      <div className="relative h-[60px] w-full max-w-4xl hidden md:block">
        <Image
          src={divider}
          alt={`${title} divider`}
          fill
          className="object-contain opacity-80"
          priority={false}
        />
      </div>
    </div>
  );
}


