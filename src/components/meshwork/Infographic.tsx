"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  /** default 16/9; options like "16/9", "4/3", "3/2" */
  ratio?: "16/9" | "4/3" | "3/2" | "21/9";
  /** cap height to prevent huge images on desktops */
  maxHeightClass?: string; // e.g. "max-h-[420px]"
};

const ratioMap = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "21/9": "aspect-[21/9]",
} as const;

export default function Infographic({
  src,
  alt,
  caption,
  ratio = "16/9",
  maxHeightClass = "max-h-[420px] md:max-h-[520px]",
}: Props) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4">
      <div
        className={[
          "relative w-full overflow-hidden rounded-xl",
          ratioMap[ratio],
          // ensure it never overflows vertically on large screens
          "mx-auto",
          maxHeightClass,
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          // contain = never crop; center with letterboxing when needed
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1100px"
          priority={false}
        />
      </div>
      {caption ? (
        <figcaption className="pt-2 text-sm text-slate-300/80">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
