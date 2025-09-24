// app/meshwork/getting-started/page.tsx
import Image from "next/image";
import Link from "next/link";
import StartWizard from "@/components/meshwork/StartWizard";

export const metadata = {
  title: "Meshwork — Create Your Signal Chain",
  description:
    "Begin your Signal Chain: choose a Node ID, post a Genesis thread, and see it live on the Meshwork map.",
};

export default function GettingStarted() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14]">
        <div className="relative aspect-[16/6] w-full">
          <Image
            src="/assets/meshwork/getting-started-banner.png"
            alt="Create Your Signal Chain — Meshwork"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Create Your Signal Chain
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300/90">
            Every Signal begins with a <strong>Genesis block</strong>. Choose your Node ID, post your
            first thread, and your SC will awaken. From this moment on, each action you take is written
            to your <strong>Signal Chain</strong> — your personal, verifiable ledger.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#wizard" className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
              Create My Signal
            </a>
            <Link href="/meshwork#map" className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
              View Live Map
            </Link>
            <Link href="/api/nodes" className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
              View JSON
            </Link>
          </div>
        </div>
      </div>

      {/* Wizard */}
      <section id="wizard" className="mt-10 scroll-mt-20">
        <StartWizard />
      </section>

      {/* How your SC writes blocks */}
      <section className="section mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">How your Signal Chain writes blocks</h2>
        <p className="mt-2 text-slate-300/90">
          A thread includes your Node ID, a timestamp, and a random nonce—signed with HMAC-SHA256.
          When verified, it’s recorded as a block in your SC and updates the map (respecting your privacy mode).
        </p>
        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
            <Image
              src="/meshwork/infographic-thread-lifecycle.svg"
              alt="Lifecycle: Node → Sign → Verify → Block → Map"
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-contain"
            />
          </div>
        </figure>
      </section>

      {/* Growth */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">See it grow</h2>
        <p className="mt-2 text-slate-300/90">
          Each validated block strengthens the public fabric—use it for stats, coordination, audits,
          and cross-weave collaboration.
        </p>
        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
            <Image
              src="/meshwork/infographic-mesh-growth.svg"
              alt="Sparse to dense network as more Signals post blocks"
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-contain"
            />
          </div>
        </figure>
      </section>

      {/* Why + Future */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Why it matters</h2>
        <p className="mt-2 text-slate-300/90">
          Signal Chains create tamper-resistant proof of presence and activity—enabling transparent stats,
          rewards, and governance over time.
        </p>
        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
            <Image
              src="/meshwork/infographic-why-mesh.svg"
              alt="Trust, community, resonance, and benefits of the mesh"
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-contain"
            />
          </div>
        </figure>
      </section>

      {/* What’s next */}
      <section className="section">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">What’s next</h2>
        </div>
        <p className="mt-2 text-slate-300/90">
          Meshwork is digital-first today. DePin and IRL nodes merge next—bringing physical presence into
          the same verifiable fabric. Later, your SC can be anchored on Base for public proofs.
        </p>
        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
            <Image
              src="/meshwork/infographic-future-expansion.svg"
              alt="Future: digital and physical nodes converge into a single mesh"
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-contain"
            />
          </div>
          <figcaption className="pt-2 text-xs text-zinc-400">
            Digital and physical nodes converge into a single verifiable mesh.
          </figcaption>
        </figure>
      </section>
    </main>
  );
}








