// app/meshwork/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MeshworkHeader from "@/components/meshwork/MeshworkHeader";
import StatsBar from "@/components/meshwork/StatsBar";
import RecentTicker from "@/components/meshwork/RecentTicker";
import Infographic from "@/components/meshwork/Infographic";
import ClientLiveMap from "@/components/meshwork/ClientLiveMap"; 

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
            The Meshwork is the living network of digital nodes. Each ping weaves a new thread, proving presence,
            activity, and alignment. Together, these threads form a verifiable fabric that developers can build upon —
            for data, coordination, and culture.
          </p>
        </div>
      </header>

      {/* Quickstart */}
      <section id="quickstart" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <h2 className="text-xl md:text-2xl font-semibold">Quickstart (3 steps)</h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            Spin up a node in minutes. Every participant strengthens the Meshwork by proving activity with lightweight,
            signed pings. Follow the steps to join and see yourself appear on the map.
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl border border-white/10 p-5">
              <p className="text-teal-300 mb-1 text-[11px] tracking-wide">01</p>
              <p className="font-medium">Register a Node (Base L2)</p>
              <p className="mt-2 text-sm text-zinc-300">
                Call <code className="rounded bg-white/5 px-1">registerNode</code> with your nodeId and metadata. Your
                node is now part of the Meshwork.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 p-5">
              <p className="text-teal-300 mb-1 text-[11px] tracking-wide">02</p>
              <p className="font-medium">Ping the Mesh</p>
              <p className="mt-2 text-sm text-zinc-300">
                Send a signed <code className="rounded bg-white/5 px-1">mesh.ping</code>. This is proof-of-presence for
                your node, recorded by the network.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 p-5">
              <p className="text-teal-300 mb-1 text-[11px] tracking-wide">03</p>
              <p className="font-medium">See it Live</p>
              <p className="mt-2 text-sm text-zinc-300">
                Your ping appears on the live map within seconds. The Meshwork verifies activity and grows stronger as
                more nodes join.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Live Map */}
      <section id="map" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-0 py-12 md:py-16">
          <h2 className="px-6 text-xl md:text-2xl font-semibold">Live Meshwork Map</h2>
          <p className="mt-3 px-6 max-w-2xl text-sm text-zinc-400">
            Explore the Meshwork in real time. Each glowing point is a node sending verified pings — proof of presence
            across the globe.
          </p>
          <div className="mt-6">
             <ClientLiveMap fullBleed heightClass="h-[70vh]" />
          </div>
        </div>
      </section>

      {/* Contracts */}
      <section id="contracts" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Contracts (Base L2)</h2>
            <Image
              src="/meshwork/divider-contracts.png"
              alt=""
              width={220}
              height={20}
              className="opacity-80 hidden md:block"
            />
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-[1fr,360px]">
            <div>
              <p className="text-sm text-zinc-300">
                Onchain contracts anchor Meshwork to <strong>Base L2</strong>, giving nodes durable identity and
                producing events that any app can index. Contracts are intentionally minimal, favoring composability
                over policy.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-white/10 p-5">
                  <h3 className="font-medium">NodeRegistry</h3>
                  <p className="mt-2 text-sm text-zinc-300">
                    A canonical mapping of <code className="rounded bg-white/5 px-1">nodeId</code> → metadata. Emits
                    buildable events for indexing and analytics.
                  </p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                    <li>
                      Events:{" "}
                      <code className="rounded bg-white/5 px-1">NodeRegistered</code>,{" "}
                      <code className="rounded bg-white/5 px-1">NodeUpdated</code>
                    </li>
                    <li>Optional geo hash, display name, URL</li>
                    <li>Optimistic updates; hardening via attestations</li>
                  </ul>
                </article>

                <article className="rounded-2xl border border-white/10 p-5">
                  <h3 className="font-medium">AnchorNode (optional)</h3>
                  <p className="mt-2 text-sm text-zinc-300">
                    An extension for special sites (sacred, civic, institutional). Encodes location, epoch, sigil, and
                    witness attestations.
                  </p>
                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                    <li>
                      Events: <code className="rounded bg-white/5 px-1">PlacementAttested</code>,{" "}
                      <code className="rounded bg-white/5 px-1">AnchorLinked</code>
                    </li>
                    <li>Supports off-chain proofs + onchain references</li>
                  </ul>
                </article>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <h4 className="text-sm font-semibold">Design principles</h4>
                <ul className="mt-2 grid gap-2 text-sm text-zinc-300 md:grid-cols-3">
                  <li>Minimal surface area</li>
                  <li>Event-first (easy to index)</li>
                  <li>Composable with off-chain systems</li>
                  <li>Chain-agnostic patterns, Base-first</li>
                  <li>Separation of identity vs. activity</li>
                  <li>Clear upgrade path via proxies</li>
                </ul>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Infographic
                src="/meshwork/infographic-contracts.png"
                alt="Contract event flow"
                ratio="4/3"
                maxHeightClass="max-h-[360px] md:max-h-[420px]"
              />
              <p className="mt-2 text-xs text-zinc-400">
                Node registration emits events that indexers and dashboards can subscribe to.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* APIs */}
      <section id="api" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">APIs &amp; Event Channels</h2>
            <Image
              src="/meshwork/divider-apis.png"
              alt=""
              width={220}
              height={20}
              className="opacity-80 hidden md:block"
            />
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            Developers can plug into Meshwork over simple REST endpoints or subscribe to event channels for stream
            processing. WebSockets are on the roadmap to reduce polling and enable fully live apps.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">REST</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li>
                  <code className="rounded bg-white/5 px-1">GET /api/nodes</code> — latest presence per node
                </li>
                <li>
                  <code className="rounded bg-white/5 px-1">POST /api/mesh/ping</code> — signed ping ingestion
                </li>
              </ul>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-black/50 p-3 text-xs text-zinc-200">{`curl https://aesctrust.org/api/nodes`}</pre>
            </div>

            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">Event Bus</h3>
              <p className="mt-2 text-sm text-zinc-300">Designed for analytics and reactive systems.</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                <li>
                  Subjects: <code className="rounded bg-white/5 px-1">mesh.ping</code>,{" "}
                  <code className="rounded bg-white/5 px-1">mesh.attest</code>
                </li>
                <li>Cloud-native fanout; replay &amp; DLQs</li>
                <li>Great for ETL, scoring, enrichment</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">WebSocket (roadmap)</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Live subscriptions for clients without polling. Topic filtering, backpressure, resumable cursors.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Infographic
              src="/meshwork/infographic-apis.png"
              alt="API and channel topology"
              ratio="16/9"
              maxHeightClass="max-h-[420px] md:max-h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section id="sdks" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">SDKs</h2>
            <Image
              src="/meshwork/divider-sdks.png"
              alt=""
              width={220}
              height={20}
              className="opacity-80 hidden md:block"
            />
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            SDKs make Meshwork integration straightforward. Use <strong>TypeScript</strong> for apps and dashboards, or{" "}
            <strong>Python</strong> for data pipelines, notebooks, and analytics.
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

          <div className="mt-6">
            <Infographic
              src="/meshwork/infographic-sdks.png"
              alt="SDK usage overview"
              ratio="16/9"
              maxHeightClass="max-h-[420px] md:max-h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* Archetypes */}
      <section id="archetypes" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Archetypes</h2>
            <Image
              src="/meshwork/divider-archetypes.png"
              alt=""
              width={220}
              height={20}
              className="opacity-80 hidden md:block"
            />
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            Archetypes give symbolic shape to Meshwork design. Each maps to a practical concern in systems engineering
            and governance, helping teams reason about roles and responsibilities.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {[
              { k: "EARTH", d: "Anchors • grounded attestations", img: "/meshwork/icon-earth.png" },
              { k: "WATER", d: "Data streams → rivers → lake", img: "/meshwork/icon-water.png" },
              { k: "FIRE", d: "Compute • jobs • schedulers", img: "/meshwork/icon-fire.png" },
              { k: "AIR", d: "Edge/Cloud delivery & timing", img: "/meshwork/icon-air.png" },
              { k: "COSMOS", d: "C96 / R96 / C768 cycles", img: "/meshwork/icon-cosmos.png" },
            ].map((a) => (
              <div key={a.k} className="rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Image src={a.img} alt="" width={100} height={100} className="opacity-90" />
                  <p className="text-sm text-teal-300">{a.k}</p>
                </div>
                <p className="mt-2 text-sm text-zinc-300">{a.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Infographic
              src="/meshwork/infographic-archetypes.png"
              alt="Archetype map"
              ratio="16/9"
              maxHeightClass="max-h-[420px] md:max-h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
          <div className="flex items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">Examples</h2>
          <Image
              src="/meshwork/divider-examples.png"
              alt=""
              width={220}
              height={20}
              className="opacity-80 hidden md:block"
            />
          </div>

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            A few starting points that demonstrate how teams can build with Meshwork—from live presence maps to temporal
            rituals and budget pilots aligned to cosmic cycles.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Live Node Map",
                d: (
                  <>
                    Subscribe to <code className="rounded bg-white/5 px-1">mesh.ping</code> and light up live placements
                    for your product or community hub.
                  </>
                ),
                img: "/meshwork/example-live-map.png",
              },
              {
                t: "Generative Ritual",
                d: "Translate resonance windows into sound/visuals; mint badges when coordinated activity surpasses thresholds.",
                img: "/meshwork/example-ritual.png",
              },
              {
                t: "C96 Budget Pilot",
                d: "Periodic budgets that reconcile on a C96 cadence with verifiable pings and attestations for accountability.",
                img: "/meshwork/example-c96.png",
              },
            ].map((ex) => (
              <article key={ex.t} className="rounded-2xl border border-white/10 p-5">
                <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                  {/* contain to ensure full graphic is visible */}
                  <Image src={ex.img} alt={ex.t} fill className="object-contain" />
                </div>
                <h3 className="font-medium">{ex.t}</h3>
                <p className="mt-2 text-sm text-zinc-300">{ex.d}</p>
              </article>
            ))}
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


