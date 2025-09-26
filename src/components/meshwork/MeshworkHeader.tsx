// src/components/meshwork/MeshworkHeader.tsx
"use client";

import Image from "next/image";

export default function MeshworkHeader() {
  return (
    <div className="relative border-b border-white/10 bg-gradient-to-b from-black/20 to-transparent">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="relative h-[220px] md:h-[260px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src="/assets/meshwork/meshwork-banner.png"
            alt="ÆSC Meshwork"
            fill
            className="object-contain"
            priority
          />
          {/* subtle bottom vignette to blend into page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B0F14] to-transparent" />
        </div>
      </div>
    </div>
  );
}





