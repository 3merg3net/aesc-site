"use client";

import Image from "next/image";

export default function FigureImg({
  src,
  alt,
  variant = "wide", // "wide" | "tall"
  priority = false,
}: {
  src: string;
  alt: string;
  variant?: "wide" | "tall";
  priority?: boolean;
}) {
  const wrap =
    variant === "tall" ? "mx-auto w-full max-w-3xl" : "mx-auto w-full max-w-6xl";

  const box =
    variant === "tall"
      ? "relative h-[460px] md:h-[560px] overflow-hidden rounded-xl"
      : "relative aspect-[16/6] overflow-hidden rounded-xl";

  return (
    <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className={wrap}>
        <div className={box}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 1600px"
            className="object-contain"
            priority={priority}
          />
        </div>
      </div>
    </figure>
  );
}
