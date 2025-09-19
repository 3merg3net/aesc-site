"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  /** "full" shows title/CTA; "compact" is decorative only (no text) */
  variant?: "full" | "compact";
};

export default function GettingStartedHeader({ variant = "compact" }: Props) {
  const showText = variant === "full";

  return (
    <header
      className={
        showText
          ? "relative overflow-hidden h-[48vh] min-h-[340px] md:h-[56vh]"
          : "relative overflow-hidden h-[32vh] min-h-[220px] md:h-[36vh]"
      }
    >
      {/* 1) Gradient base */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(70%_90%_at_50%_15%,#0b1e34_0%,#081627_45%,#030a14_100%)]" />

      {/* 2) Mesh grid (lines + nodes) */}
      <div className="mesh-canvas absolute inset-0 z-10 will-change-transform" />

      {/* 3) Hero art (below stars so stars glow over it) */}
      <div className="absolute inset-0 z-20">
        <div className="absolute inset-0 animate-hue drift-glitch will-change-transform">
          <Image
            src="/meshwork/meshwork-hero.png"
            alt="Meshwork network"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center pointer-events-none select-none mix-blend-screen opacity-85"
          />
        </div>
      </div>

      {/* 4) Stars (now ABOVE hero) */}
      <div
        className="absolute inset-0 z-30 animate-stars-drift pointer-events-none will-change-transform"
        style={{
          backgroundImage: "url(/meshwork/meshwork-stars.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.95,
          mixBlendMode: "lighten",
        }}
        aria-hidden="true"
      />

      {/* 5) Optional text/CTA (only in 'full' variant) */}
      {showText && (
        <div className="relative z-40 h-full flex items-center">
          <div className="mx-auto w-full max-w-4xl px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_6px_32px_rgba(24,166,255,.5)]">
              Getting Started with Meshwork
            </h1>
            <p className="mt-3 text-slate-200/90">
              Spin up a node, send your first signed ping, and watch it light up the mesh.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/meshwork#map"
                className="rounded-2xl px-4 py-2 text-sm font-medium text-sky-100 bg-sky-500/30 hover:bg-sky-500/40 ring-1 ring-sky-400/50"
              >
                Skip to Live Map
              </Link>
              <Link
                href="/meshwork"
                className="rounded-2xl px-4 py-2 text-sm font-medium text-white/90 bg-white/10 hover:bg-white/15 ring-1 ring-white/20"
              >
                Back to Meshwork
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 6) Scanline overlay */}
      <div className="absolute inset-0 z-[60] pointer-events-none animate-scan mix-blend-overlay opacity-20" />
    </header>
  );
}


