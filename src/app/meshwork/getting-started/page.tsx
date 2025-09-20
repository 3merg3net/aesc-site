// app/meshwork/getting-started/page.tsx
import Image from "next/image";
import Link from "next/link";
import StartWizard from "@/components/meshwork/StartWizard";

export const metadata = {
  title: "Meshwork — Getting Started",
  description: "Spin up a digital node, sign a thread, and see it live on the Meshwork map.",
};

export default function GettingStarted() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      {/* Header / CTA */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14] p-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Getting Started with Meshwork</h1>
        <p className="mt-3 max-w-2xl text-slate-300/90">
          Meshwork is a live map of digital nodes. Post a signed <strong>thread</strong> from your node
          and see it appear on the map. You can attach a <strong>DePin</strong> tag later to associate
          a physical device or label.
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/meshwork#map" className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
            View Live Map
          </Link>
          <Link href="/api/nodes" className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
            View JSON
          </Link>
        </div>
      </div>

      {/* Wizard */}
      <section className="mt-10">
        <StartWizard />
      </section>

      {/* Thread lifecycle */}
      <section className="section mt-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">How a Thread Works</h2>
        <p className="mt-2 text-slate-300/90">
          A thread includes your Node ID, a timestamp, and a random nonce—signed with your secret using HMAC-SHA256.
          The network verifies freshness and signature before updating the map.
        </p>
        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
            <Image
              src="/meshwork/infographic-thread-lifecycle.svg"
              alt="Lifecycle of a thread: Node → API → Verify → DB → Map"
              fill
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-contain"
            />
          </div>
        </figure>
      </section>

      {/* Growth */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">See it Grow</h2>
        <p className="mt-2 text-slate-300/90">
          Each validated thread strengthens the public fabric—use it for stats, coordination, audits,
          and inter-verse collaboration.
        </p>
        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
            <Image
              src="/meshwork/infographic-mesh-growth.svg"
              alt="Sparse to dense network as more nodes post threads"
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
          Verified threads create tamper-resistant proof of activity for digital nodes—enabling transparent stats,
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

      <section className="section">
  <div className="flex items-center gap-4">
    <h2 className="text-2xl md:text-3xl font-semibold text-white">What’s next</h2>
  </div>

  <p className="mt-2 text-slate-300/90">
    Meshwork is digital-first today. DePin and IRL nodes merge next—bringing physical presence into
    the same invariant fabric.
  </p>

  <figure className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
    {/* aspect ratio fixed (dash), this sets height for the fill image */}
    <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
      <Image
        src="/meshwork/infographic-future-expansion.svg"
        alt="Future: digital nodes plus physical nodes combine into a unified mesh"
        fill
        sizes="(max-width: 768px) 100vw, 1600px"
        className="object-contain"
        priority={false}
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







