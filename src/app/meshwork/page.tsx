// src/app/meshwork/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MeshworkHeader from "@/components/meshwork/MeshworkHeader";
import StatsBar from "@/components/meshwork/StatsBar";
import RecentTicker from "@/components/meshwork/RecentTicker";
// ⬇️ CHANGE: use the client-wrapped map
import LiveMapClient from "@/components/meshwork/LiveMapClient";
import MeshPanel from "@/components/meshwork/MeshPanel";


export const metadata: Metadata = {
  title: "ÆSC Meshwork — Build on the Phramework",
  description:
    "Open contracts, event channels, and SDKs for building verses on the invariant Meshwork stewarded by ÆSC Trust.",
};

export default function MeshworkPage() {
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
            The Meshwork is a living network of digital nodes. Each <strong>thread</strong> you post
            proves presence and activity in time. As more threads interweave, the fabric becomes a
            verifiable substrate that apps, communities, and verses can build upon—transparent by
            design and aligned with Æ invariants.
          </p>

          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
            {[
              { id: "quickstart", label: "Quickstart" },
              { id: "map", label: "Live Map" },
              { id: "contracts", label: "Contracts" },
              { id: "api", label: "APIs & Events" },
              { id: "sdks", label: "SDKs" },
              { id: "archetypes", label: "Archetypes" },
              { id: "examples", label: "Examples" },
            ].map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="hover:text-zinc-200 underline-offset-4 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* QUICKSTART */}
      <section id="quickstart" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Quickstart (3 steps)</h2>
            <div className="relative h-[60px] w-full max-w-4xl hidden md:block">
              <Image
                src="/meshwork/divider-quickstart.svg"
                alt="Quickstart divider"
                fill
                className="object-contain opacity-80"
              />
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-400">
            Spin up a node in minutes. Every participant strengthens the Meshwork by posting
            lightweight, signed <strong>threads</strong>. Follow the steps to join and watch your
            node appear on the live map.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
              <Image
                src="/meshwork/infographic-getting-started1.png"
                alt="Getting started overview: Node → Thread → Map"
                fill
                sizes="(max-width: 768px) 100vw, 1600px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <RecentTicker />
      <StatsBar />

      {/* LIVE MAP */}
<section id="map" className="border-b border-white/10">
  <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
    <h2 className="text-xl md:text-2xl font-semibold">Live Meshwork Map</h2>
    <p className="mt-3 max-w-2xl text-sm text-zinc-400">
      Each glowing point is a node posting verified threads—proof of presence across the globe.
    </p>

    <div className="relative mt-6">
      {/* Map (kept non–full bleed, tighter view) */}
      <LiveMapClient heightClass="h-[60vh] md:h-[70vh]" />

      {/* Panel overlay (bottom-left on map) */}
     <div className="pointer-events-none absolute left-4 bottom-4">
  <div className="pointer-events-auto">
    <MeshPanel />
  </div>
</div>
    </div>
  </div>
</section>


      {/* CONTRACTS */}
      <section id="contracts" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Contracts (Base L2)</h2>
            <div className="relative h-[60px] w-full max-w-4xl">
              <Image
                src="/meshwork/divider-contracts.svg"
                alt="Contracts divider"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            On-chain contracts anchor Meshwork to <strong>Base L2</strong>, giving nodes durable
            identity and emitting events any app can index. We keep surface area small and policy-free,
            favoring composability with off-chain systems.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr,380px]">
            <div>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-white/10 p-5">
                  <h3 className="font-medium">NodeRegistry</h3>
                  <p className="mt-2 text-sm text-zinc-300">
                    Canonical mapping of <code className="rounded bg-white/5 px-1">nodeId</code> → metadata.
                    Emits buildable events for indexing and analytics.
                  </p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                    <li>Events: <code className="rounded bg-white/5 px-1">NodeRegistered</code>, <code className="rounded bg-white/5 px-1">NodeUpdated</code></li>
                    <li>Optional geo hash, display name, URL</li>
                    <li>Optimistic updates; hardening via attestations</li>
                  </ul>
                </article>

                <article className="rounded-2xl border border-white/10 p-5">
                  <h3 className="font-medium">AnchorNode (optional)</h3>
                  <p className="mt-2 text-sm text-zinc-300">
                    Extension for special sites (sacred, civic, institutional). Encodes location, epoch,
                    sigil, and witness attestations.
                  </p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                    <li>Events: <code className="rounded bg-white/5 px-1">PlacementAttested</code>, <code className="rounded bg-white/5 px-1">AnchorLinked</code></li>
                    <li>Supports off-chain proofs + on-chain references</li>
                  </ul>
                </article>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <h4 className="text-sm font-semibold">Design principles</h4>
                <ul className="mt-2 grid gap-2 text-sm text-zinc-300 md:grid-cols-3">
                  <li>Minimal surface area</li>
                  <li>Event-first (easy to index)</li>
                  <li>Composable with off-chain systems</li>
                  <li>Base-first, chain-agnostic patterns</li>
                  <li>Separation of identity vs. activity</li>
                  <li>Clear upgrade path via proxies</li>
                </ul>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/meshwork/infographic-contracts.svg"
                  alt="Contract event flow"
                  fill
                  sizes="(max-width: 768px) 100vw, 1600px"
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                Node registration emits events that indexers, dashboards, and auditors can subscribe to.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* APIs & EVENTS */}
      <section id="api" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">APIs &amp; Event Channels</h2>
            <div className="relative h-[60px] w-full max-w-4xl hidden md:block">
              <Image
                src="/meshwork/divider-apis.svg"
                alt="APIs divider"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            Use REST for simple reads and writes, or subscribe to event streams for real-time workflows.
            WebSockets are on the roadmap to reduce polling and enable fully live apps.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">REST</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li><code className="rounded bg-white/5 px-1">GET /api/nodes</code> — latest presence per node</li>
                <li><code className="rounded bg-white/5 px-1">POST /api/mesh/ping</code> — post a signed thread</li>
              </ul>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/50 p-3 text-xs text-zinc-200">
{`curl https://aesctrust.org/api/nodes`}
              </pre>
            </div>

            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">Event Bus</h3>
              <p className="mt-2 text-sm text-zinc-300">Great for analytics and reactive systems.</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                <li>Subjects: <code className="rounded bg-white/5 px-1">mesh.ping</code>, <code className="rounded bg-white/5 px-1">mesh.attest</code></li>
                <li>Cloud-native fanout; replay &amp; DLQs</li>
                <li>Ideal for ETL, scoring, enrichment</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">WebSocket (roadmap)</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Live subscriptions without polling. Topic filtering, backpressure, resumable cursors.
              </p>
            </div>
          </div>

          <figure className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
              <Image
                src="/meshwork/infographic-apis.svg"
                alt="API and channel topology"
                fill
                sizes="(max-width: 768px) 100vw, 1600px"
                className="object-contain"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* SDKS */}
      <section id="sdks" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">SDKs</h2>
            <div className="relative h-[60px] w-full max-w-4xl hidden md:block">
              <Image
                src="/meshwork/divider-sdks.svg"
                alt="SDKs divider"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            SDKs make Meshwork integration straightforward. Use <strong>TypeScript</strong> for apps and dashboards,
            or <strong>Python</strong> for data pipelines and analysis.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">@aesc/mesh (TypeScript)</h3>
              <p className="mt-2 text-sm text-zinc-300">Typed client for REST + signatures + utilities.</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/50 p-3 text-xs text-zinc-200">
{`import { MeshClient, signPing } from "@aesc/mesh";

const mesh = new MeshClient({ baseUrl: "https://aesctrust.org/api" });

const msg = { nodeId, stickerId: null, ts: Date.now(), nonce: crypto.randomUUID() };
const sig = await signPing(SECRET, msg);

await mesh.sendPing({ ...msg, sig, lat: 40.7, lon: -74.0 });`}
              </pre>
            </article>

            <article className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">aesc-mesh (Python)</h3>
              <p className="mt-2 text-sm text-zinc-300">Simple ingestion + streaming helpers.</p>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/50 p-3 text-xs text-zinc-200">
{`from aesc_mesh import Mesh, sign_ping

mesh = Mesh(base_url="https://aesctrust.org/api")
msg  = {"nodeId": NODE_ID, "stickerId": None, "ts": now_ms(), "nonce": rand_hex()}
sig  = sign_ping(SECRET, msg)

mesh.ping(**msg, sig=sig, lat=37.78, lon=-122.41)`}
              </pre>
            </article>
          </div>

          <figure className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
              <Image
                src="/meshwork/infographic-sdks.svg"
                alt="SDK overview"
                fill
                sizes="(max-width: 768px) 100vw, 1600px"
                className="object-contain"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* ARCHETYPES */}
      <section id="archetypes" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Archetypes</h2>
            <div className="relative h-[60px] w-full max-w-4xl hidden md:block">
              <Image
                src="/meshwork/divider-archetypes.svg"
                alt="Archetypes divider"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            Archetypes give symbolic shape to Meshwork design. Each maps to a practical concern in systems
            engineering and governance, helping teams reason about roles and responsibilities.
          </p>

          <figure className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
              <Image
                src="/meshwork/infographic-archetypes.svg"
                alt="Archetype map"
                fill
                sizes="(max-width: 768px) 100vw, 1600px"
                className="object-contain"
              />
            </div>
            <figcaption className="pt-2 text-xs text-zinc-400">
              Elements as a shared mental model for architecture and coordination.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Examples</h2>
            <div className="relative h-[60px] w-full max-w-4xl hidden md:block">
              <Image
                src="/meshwork/divider-examples.svg"
                alt="Examples divider"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            A few starting points that demonstrate how teams can build with Meshwork—from live presence
            maps to temporal rituals and budget pilots aligned to cosmic cycles.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 p-5">
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/meshwork/example-live-map.png" alt="Live map example" fill className="object-cover" />
              </div>
              <h3 className="font-medium">Live Node Map</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Subscribe to <code className="rounded bg-white/5 px-1">mesh.ping</code> and light up
                live placements for your product or community hub.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 p-5">
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/meshwork/example-ritual.png" alt="Generative ritual example" fill className="object-cover" />
              </div>
              <h3 className="font-medium">Generative Ritual</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Translate resonance windows into sound/visuals; mint badges when coordinated
                activity surpasses thresholds.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 p-5">
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/meshwork/example-c96.png" alt="C96 budget pilot" fill className="object-cover" />
              </div>
              <h3 className="font-medium">C96 Budget Pilot</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Periodic budgets that reconcile on a C96 cadence with verifiable threads and
                attestations for accountability.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <Link href="/ecosystem" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5">
              Explore Integration Patterns
            </Link>
            <Link href="/meshwork/getting-started" className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}








