// app/meshwork/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import MeshworkHeader from "@/components/meshwork/MeshworkHeader";
import StatsBar from "@/components/meshwork/StatsBar";
import RecentTicker from "@/components/meshwork/RecentTicker";
import LiveMapClient from "@/components/meshwork/LiveMapClient"; // ← client-only wrapper

export const metadata: Metadata = {
  title: "ÆSC Meshwork — Build on the Phramework",
  description:
    "Open contracts, event channels, and SDKs for building verses on the invariant Meshwork stewarded by ÆSC Trust.",
};

export default function MeshworkPage() {
  const sections = [
    { id: "quickstart", label: "Quickstart" },
    { id: "contracts", label: "Contracts" },
    { id: "api", label: "APIs & Events" },
    { id: "sdks", label: "SDKs" },
    { id: "archetypes", label: "Archetypes" },
    { id: "examples", label: "Examples" },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100">
      <MeshworkHeader />

      {/* HERO */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <p className="text-[11px] tracking-[0.18em] text-teal-300/80">FOUNDATION • DEVELOPERS</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
            The ÆSC <span className="text-teal-300">Meshwork</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-zinc-300">
            The invariant phramework beneath all verses. Open contracts, event channels, and SDKs for building systems
            that conserve, resonate, and self-correct.
          </p>

          {/* Local section nav */}
          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-zinc-200 underline-offset-4 hover:underline">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* QUICKSTART */}
      <section id="quickstart" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">Quickstart (3 steps)</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                k: "01",
                t: "Register a Node (Base L2)",
                d: (
                  <>
                    Call{" "}
                    <code className="rounded bg-white/5 px-1">registerNode(nodeId, geoHash, url)</code>. Emits{" "}
                    <code className="rounded bg-white/5 px-1">NodeRegistered</code>.
                  </>
                ),
              },
              {
                k: "02",
                t: "Ping the Mesh",
                d: (
                  <>
                    Send signed <code className="rounded bg-white/5 px-1">mesh.ping</code> via REST. Subscribe to the
                    public stream.
                  </>
                ),
              },
              {
                k: "03",
                t: "See it Live",
                d: (
                  <>
                    Query <code className="rounded bg-white/5 px-1">/nodes</code> and render your map/app logic.
                  </>
                ),
              },
            ].map((s) => (
              <li key={s.k} className="rounded-2xl border border-white/10 p-5">
                <p className="text-teal-300 mb-1 text-[11px] tracking-wide">{s.k}</p>
                <p className="font-medium">{s.t}</p>
                <p className="mt-2 text-sm text-zinc-300">{s.d}</p>
              </li>
            ))}
          </ol>

          <p className="mt-5 text-sm text-zinc-400">
            Start small (e.g., C96 periodic budgets) and expand over time.
          </p>

          <StatsBar />
          <RecentTicker />
        </div>
      </section>

      {/* FULL-BLEED LIVE MAP (client-only) */}
      <section className="full-bleed">
        <LiveMapClient heightClass="h-[70vh]" />
      </section>

      {/* CONTRACTS */}
      <section id="contracts" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">Contracts (Base L2)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">NodeRegistry</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">
                <li>Node identity + metadata; emits buildable events.</li>
                <li>
                  Events: <code className="rounded bg-white/5 px-1">NodeRegistered</code>,{" "}
                  <code className="rounded bg-white/5 px-1">PlacementAttested</code>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">AnchorNode (optional)</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">
                <li>NFT/attestation for sacred anchor sites.</li>
                <li>Attach sigil, tone, epoch, and location proofs.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/research" className="underline underline-offset-4 text-zinc-300 hover:text-zinc-100">
              Research background
            </Link>
            <Link href="/ecosystem" className="underline underline-offset-4 text-zinc-300 hover:text-zinc-100">
              Integration patterns
            </Link>
          </div>
        </div>
      </section>

      {/* API */}
      <section id="api" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">APIs & Event Channels</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">REST</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">
                <li>
                  <code className="rounded bg-white/5 px-1">GET /api/nodes</code> — aggregated presence
                </li>
                <li>
                  <code className="rounded bg-white/5 px-1">POST /api/mesh/ping</code> — signed PoP
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">Event Bus</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Subjects: <code className="rounded bg-white/5 px-1">mesh.ping</code>,{" "}
                <code className="rounded bg-white/5 px-1">mesh.attest</code>,{" "}
                <code className="rounded bg-white/5 px-1">ritual.mint</code>
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">WebSocket (roadmap)</h3>
              <p className="mt-2 text-sm text-zinc-300">Live subscriptions for real-time apps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SDKS */}
      <section id="sdks" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">SDKs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">@aesc/mesh (TypeScript)</h3>
              <p className="mt-2 text-sm text-zinc-300">Register, sign pings, and query nodes in TS/Next.js.</p>
              <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs">
{`import { MeshClient } from "@aesc/mesh";
const mesh = new MeshClient({ baseUrl: "https://aesctrust.org/api" });`}
              </pre>
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">aesc-mesh (Python)</h3>
              <p className="mt-2 text-sm text-zinc-300">Simple ingestion for data/analytics workflows.</p>
              <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs">
{`from aesc_mesh import subscribe
for msg in subscribe("mesh.ping"):
    print(msg)`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHETYPES */}
      <section id="archetypes" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">Archetypes (Nature + Cosmic)</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {[
              { k: "EARTH", d: "Anchors • grounded attestations" },
              { k: "WATER", d: "Data streams → rivers → lake" },
              { k: "FIRE", d: "Compute • jobs • schedulers" },
              { k: "AIR/SKY", d: "Edge/Cloud delivery & timing" },
              { k: "COSMOS", d: "C96 / R96 / C768 cycles" },
            ].map((a) => (
              <div key={a.k} className="rounded-2xl border border-white/10 p-5">
                <p className="text-sm text-teal-300">{a.k}</p>
                <p className="mt-1 text-sm text-zinc-300">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">Examples</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { t: "Live Node Map", d: <>Subscribe to <code className="rounded bg-white/5 px-1">mesh.ping</code> and light up placements.</> },
              { t: "Generative Ritual", d: "Translate resonance windows into sound/visuals; mint badges." },
              { t: "C96 Budget Pilot", d: "Periodic budgets that reconcile on C96 cadence with proofs." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 p-5">
                <h3 className="font-medium">{x.t}</h3>
                <p className="mt-2 text-sm text-zinc-300">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/ecosystem" className="inline-block rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
              Explore Integration Patterns
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-transparent to-black/20">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-2xl border border-white/10 p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold">Weave your Verse</h3>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
              The Meshwork is neutral and open. Build your own verse atop ÆSC’s invariants and join the public fabric.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a href="#quickstart" className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2">
                Start Quickstart
              </a>
              <Link href="/research" className="rounded-xl border border-white/10 px-4 py-2">
                Read Research
              </Link>
              <Link href="/contact" className="rounded-xl border border-white/10 px-4 py-2">
                Partner with ÆSC
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

