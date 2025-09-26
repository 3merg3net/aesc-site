// src/app/meshwork/getting-started/page.tsx
import Image from "next/image";
import Link from "next/link";
import StartWizard from "@/components/meshwork/StartWizard";
import GettingStartedHeader from "@/components/meshwork/GettingStartedHeader";
import SectionHeader from "@/components/meshwork/SectionHeader";

export const metadata = {
  title: "Meshwork — Getting Started",
  description: "Create your Genesis Signal, post presence, and see it live on the Meshwork map.",
};

// Local helper: consistent framing for wide vs tall infographics
function FigureImg({
  src,
  alt,
  variant = "wide", // "wide" | "tall"
}: {
  src: string;
  alt: string;
  variant?: "wide" | "tall";
}) {
  const wrap =
    variant === "tall"
      ? "mx-auto w-full max-w-3xl" // narrower frame for tall images
      : "mx-auto w-full max-w-6xl"; // roomy frame for wide images

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
            priority={false}
          />
        </div>
      </div>
    </figure>
  );
}

export default function GettingStarted() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100">
      {/* Top banner */}
      <GettingStartedHeader />

      {/* Wizard */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
          <h2 className="text-xl font-semibold">Start Here — 3-Step Signal Wizard</h2>
          <p className="mt-2 text-sm text-zinc-300">
            We’ll help you create a Node ID, sign your first Signal (Genesis), and see it on the live map.
          </p>
          <div className="mt-6">
            <StartWizard />
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/meshwork#map" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5">
            View Live Map
          </Link>
          <Link href="/api/nodes" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5">
            View JSON
          </Link>
        </div>
      </section>

      {/* Lifecycle (tall) */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <SectionHeader title="Signal Lifecycle" divider="/assets/meshwork/divider-lifecycle.png" />
        <p className="mt-2 text-slate-300/90">
          A Signal includes your Node ID, a timestamp, and a random nonce—signed with your secret (HMAC-SHA256).
          The network verifies freshness and signature before updating public state.
        </p>
        <FigureImg
          variant="tall"
          src="/assets/meshwork/infographic-signal-lifecycle.png"
          alt="Lifecycle: Node → Sign → Verify → Public State → Map"
        />
      </section>

      {/* Growth (wide) */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <SectionHeader title="See it Grow" divider="/assets/meshwork/divider-growth.png" />
        <p className="mt-2 text-slate-300/90">
          Each validated Signal strengthens the mesh—fueling stats, coordination, audits, and AEverse rituals.
        </p>
        <FigureImg
          variant="wide"
          src="/assets/meshwork/infographic-mesh-growth.png"
          alt="Sparse to dense network as more nodes post Signals"
        />
      </section>

      {/* Why it matters (tall) */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <SectionHeader title="Why it Matters" divider="/assets/meshwork/divider-why.png" />
        <p className="mt-2 text-slate-300/90">
          Verified Signals create tamper-resistant proof of activity—enabling transparent stats, rewards,
          and governance over time.
        </p>
        <FigureImg
          variant="tall"
          src="/assets/meshwork/infographic-why-mesh.png"
          alt="Trust, community, resonance, and benefits of the mesh"
        />
      </section>

      {/* What’s next (wide) */}
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <SectionHeader title="What’s Next" divider="/assets/meshwork/divider-next.png" />
        <p className="mt-2 text-slate-300/90">
          Meshwork is digital-first today. DePin and IRL nodes merge next—bringing physical presence into the same
          invariant fabric.
        </p>
        <FigureImg
          variant="wide"
          src="/assets/meshwork/infographic-future-expansion.png"
          alt="Future: digital and physical nodes converge into a unified mesh"
        />
        <figcaption className="px-1 pt-2 text-xs text-zinc-400">
          Digital and physical nodes converge into a single verifiable mesh.
        </figcaption>
      </section>
    </main>
  );
}












