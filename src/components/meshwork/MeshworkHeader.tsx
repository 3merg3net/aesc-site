"use client";

import Image from "next/image";
import Link from "next/link";

export default function MeshworkHeader() {
  return (
    <header className="relative overflow-hidden h-[66vh] min-h-[460px] md:h-[76vh]">
      {/* Base gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(70%_90%_at_50%_15%,#0b1e34_0%,#081627_45%,#030a14_100%)]" />

      {/* CSS mesh grid + nodes */}
      <div className="mesh-canvas absolute inset-0 z-10" />

      {/* Stars */}
      <div
        className="absolute inset-0 z-20 animate-stars-drift pointer-events-none"
        style={{
          backgroundImage: "url(/meshwork/meshwork-stars.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.95,
        }}
      />

      {/* Hero with hue/glitch for pop */}
      <div className="absolute inset-0 z-30">
        <div className="absolute inset-0 animate-hue drift-glitch">
          <Image
            src="/meshwork/meshwork-hero.png"
            alt="Meshwork hero"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center pointer-events-none select-none mix-blend-screen"
          />
        </div>
      </div>

      {/* Content (title + CTA) */}
      <div className="relative z-50 h-full flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_8px_40px_rgba(24,166,255,.55)]">
              ÆSC Meshwork
            </h1>
            <p className="mt-3 text-slate-200/90">
              Live digital nodes, verified pings, real-time network resonance.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/meshwork/getting-started"
                className="rounded-2xl px-4 py-2 text-sm font-medium text-sky-100 bg-sky-500/30 hover:bg-sky-500/40 ring-1 ring-sky-400/50"
              >
                New here? Get Started
              </Link>
              <Link
                href="/meshwork#map"
                className="rounded-2xl px-4 py-2 text-sm font-medium text-white/90 bg-white/10 hover:bg-white/15 ring-1 ring-white/20"
              >
                Open Live Map
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 z-[60] pointer-events-none animate-scan mix-blend-overlay opacity-20" />
    </header>
  );
}


