import Image from "next/image";
import { ReactNode } from "react";

type Align = "left" | "center";
type Height = "sm" | "md" | "lg";
type Fit = "cover" | "contain";

export default function PageHeader({
  title,
  subtitle,
  bgSrc,
  badge,
  actions,
  align = "left",
  height = "md",
  overlay = 0.35,
  priority = false,
  fit = "cover",
}: {
  title: string;
  subtitle?: string;
  bgSrc: string;
  badge?: ReactNode;
  actions?: ReactNode;
  align?: Align;
  height?: Height;
  overlay?: number;
  priority?: boolean;
  fit?: Fit;
}) {
  const h =
    height === "lg" ? "h-[320px] md:h-[380px]"
    : height === "sm" ? "h-[200px] md:h-[240px]"
    : "h-[260px] md:h-[300px]";
  const textAlign = align === "center" ? "items-center text-center" : "items-start text-left";
  const objectClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <header className={`relative w-full ${h} overflow-hidden border-b border-white/10`}>
      <div className="absolute inset-0">
        <Image
          src={bgSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1600px"
          priority={priority}
          className={objectClass}
        />
        <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} aria-hidden />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl px-6">
        <div className={`my-auto flex w-full flex-col gap-3 ${textAlign}`}>
          {badge ? <div className="text-xs text-teal-300/80">{badge}</div> : null}
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="max-w-2xl text-sm md:text-base text-zinc-300/90">{subtitle}</p> : null}
          {actions ? <div className="mt-2 flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      </div>
    </header>
  );
}


