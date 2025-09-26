// src/app/meshwork/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MeshworkHeader from "@/components/meshwork/MeshworkHeader";
import SectionHeader from "@/components/meshwork/SectionHeader";
import StatsBar from "@/components/meshwork/StatsBar";
import RecentTicker from "@/components/meshwork/RecentTicker";
import LiveMapClient from "@/components/meshwork/LiveMapClient";
import MeshPanelIsland from "@/components/meshwork/MeshPanelIsland";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ÆSC Meshwork — Own Your Signal Chain",
  description:
    "Start a Signal (Genesis), post signed presence, and build on the invariant Meshwork stewarded by ÆSC Trust.",
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
    <figure className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className={wrap}>
        <div className={box}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 1600px"
            className="object-contain"
          />
        </div>
      </div>
    </figure>
  );
}

export default function MeshworkPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100">
      {/* Hero banner wrapper (object-contain) */}
      <MeshworkHeader />

      {/* HERO COPY + CTA STRIP */}
      <header className="border-b border-white/10 bg-gradient-to-b from-black/20 to-transparent">
        <div className="mx-auto max-w-7xl px-6 pb-10 md:pb-12">
          <p className="text-[11px] tracking-[0.18em] text-teal-300/80">
            FOUNDATION • SIGNAL • DEVELOPERS
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">
            Build the <span className="text-teal-300">Meshwork</span> by owning your{" "}
            <span className="text-yellow-300">Signal Chain</span>
          </h1>

          <p className="mt-4 max-w-3xl text-sm md:text-base text-zinc-300">
            A <strong>Signal</strong> is a signed statement of presence. Your first Signal becomes{" "}
            <strong>Genesis</strong>—the start of a personal, tamper-resistant{" "}
            <strong>Signal Chain (SC)</strong>. As Signals accumulate, your node strengthens the
            Meshwork: an open fabric for coordination, reputation, and verifiable activity.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/meshwork/getting-started"
              className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2 hover:bg-teal-300/15"
            >
              Create Your Signal (Genesis)
            </Link>
            <a href="#map" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5">
              View Live Map
            </a>
            <a href="#mechanics" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5">
              How Signals Work
            </a>
          </div>
        </div>
      </header>

      {/* QUICKSTART */}
      <section id="quickstart" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="Quickstart (3 steps)"
            divider="/assets/meshwork/divider-quickstart.png"
          />
          <p className="mt-3 max-w-3xl text-sm text-zinc-400">
            1) Choose a <strong>Node ID</strong>. 2) Post a signed <strong>Genesis</strong>. 3) Land on
            your Signal Profile with a QR to share. Your node will appear on the Live Map (respecting your
            privacy mode).
          </p>

          <FigureImg
            variant="wide"
            src="/assets/meshwork/infographic-signal-quickstart.png"
            alt="Quickstart overview: Node → Genesis → Profile + Map"
          />

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/meshwork/getting-started"
              className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2 hover:bg-teal-300/15"
            >
              Start Wizard
            </Link>
            <Link href="/api/nodes" className="rounded-xl border border-white/10 px-4 py-2 hover:bg-white/5">
              View JSON
            </Link>
          </div>
        </div>
      </section>

      <RecentTicker />
      <StatsBar />

      {/* MAP */}
      <section id="map" className="border-b border-white/10 relative">
        <div className="mx-auto max-w-7xl px-0 py-12 md:py-16">
          {/* Keeping simple H2 here to avoid needing a divider-map asset */}
          <h2 className="px-6 text-xl md:text-2xl font-semibold">Live Meshwork Map</h2>
          <p className="mt-3 px-6 max-w-2xl text-sm text-zinc-400">
            Each glowing point is a node with recent Signals—verifiable presence across the globe.
          </p>

          <div className="relative mt-6">
            <LiveMapClient fullBleed heightClass="h-[70vh]" />
            {/* Overlay panel */}
            <div className="pointer-events-none absolute left-4 bottom-4 z-[401]">
              <div className="pointer-events-auto">
                <Suspense fallback={null}>
                  <MeshPanelIsland />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MECHANICS / WHY */}
      <section id="mechanics" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="How Signals Work"
            divider="/assets/meshwork/divider-mechanics.png"
          />

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr,380px]">
            <div>
              <article className="rounded-2xl border border-white/10 p-5 bg-black/30">
                <h3 className="font-medium">Signal = Signed Presence</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  A Signal contains your <code className="rounded bg-white/5 px-1">nodeId</code>, a timestamp, and a random
                  nonce—signed via HMAC-SHA256 using your secret. The network verifies freshness and signature before
                  updating public state.
                </p>
                <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                  <li>Base string: <code className="rounded bg-white/5 px-1">nodeId|stickerId|ts|nonce</code></li>
                  <li>Attach optional lat/lon; privacy modes: zone / global / hidden</li>
                  <li>Your first Signal is <strong>Genesis</strong>, the start of your <strong>Signal Chain</strong></li>
                </ul>
              </article>

              <article className="mt-4 rounded-2xl border border-white/10 p-5 bg-black/30">
                <h3 className="font-medium">Own Your Signal Chain (SC)</h3>
                <p className="mt-2 text-sm text-zinc-300">
                  The SC is your personal, append-only ledger within the Meshwork. You control what’s posted, how it’s
                  shared, and what apps can build on top—profiles, audits, rewards, and rituals all grow from your
                  verified activity.
                </p>
                <ul className="mt-3 list-disc pl-5 text-sm text-zinc-400">
                  <li>Portable identity: share your Signal Profile via QR</li>
                  <li>Export SC as JSON for analysis &amp; backup</li>
                  <li>Composability with WEave and AEverse (roadmap)</li>
                </ul>
              </article>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/assets/meshwork/infographic-signal-lifecycle.png"
                  alt="Signal lifecycle"
                  fill
                  sizes="(max-width: 768px) 100vw, 1600px"
                  className="object-contain"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                Lifecycle: Node → Sign → Verify → Public state → Map &amp; Profile.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* CONTRACTS */}
      <section id="contracts" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="Contracts (Base L2)"
            divider="/assets/meshwork/divider-contracts.png"
          />
          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            On-chain contracts anchor identity and emit events indexers can subscribe to. We favor a minimal, composable
            surface that pairs cleanly with off-chain systems.
          </p>

          <FigureImg
            variant="wide"
            src="/assets/meshwork/infographic-contracts.png"
            alt="Contract event flow"
          />
        </div>
      </section>

      {/* APIs & EVENTS */}
      <section id="api" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="APIs & Event Channels"
            divider="/assets/meshwork/divider-apis-and-events.png"
          />

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            Use REST to read/write or subscribe to event streams for real-time workflows. WebSockets (roadmap) will
            enable live subscriptions without polling.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-5">
              <h3 className="font-medium">REST</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                <li><code className="rounded bg-white/5 px-1">GET /api/nodes</code> — latest presence per node</li>
                <li><code className="rounded bg-white/5 px-1">POST /api/mesh/ping</code> — post a signed Signal</li>
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
                Live topic subscriptions with backpressure and resumable cursors.
              </p>
            </div>
          </div>

          <FigureImg
            variant="wide"
            src="/assets/meshwork/infographic-apis.png"
            alt="API and channel topology"
          />
        </div>
      </section>

      {/* SDKS */}
      <section id="sdks" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="SDKs"
            divider="/assets/meshwork/divider-sdks.png"
          />

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

          {/* Keeping your existing filename here intentionally */}
          <FigureImg
            variant="wide"
            src="/assets/meshwork/infographic-apis.png"
            alt="SDK overview"
          />
        </div>
      </section>

      {/* ARCHETYPES */}
      <section id="archetypes" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="Archetypes"
            divider="/assets/meshwork/divider-archetypes.png"
          />

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            Archetypes give symbolic shape to Meshwork design. Each maps to a practical concern in systems
            engineering and governance, helping teams reason about roles and responsibilities.
          </p>

          {/* Keeping your existing filename here intentionally */}
          <FigureImg
            variant="wide"
            src="/assets/meshwork/infographic-signal-lifecycle.png"
            alt="Archetype map"
          />

          <figcaption className="px-1 pt-2 text-xs text-zinc-400">
            Elements as a shared mental model for architecture and coordination.
          </figcaption>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-14">
          <SectionHeader
            title="Examples"
            divider="/assets/meshwork/divider-examples.png"
          />

          <p className="mt-3 max-w-3xl text-sm text-zinc-300">
            From live presence maps to rituals and audits—Signals are the primitive that powers
            coordination. Here are a few directions to build.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 p-5">
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/assets/meshwork/example-live-map.png" alt="Live map example" fill className="object-contain" />
              </div>
              <h3 className="font-medium">Live Node Map</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Subscribe to <code className="rounded bg-white/5 px-1">mesh.ping</code> and light up
                verified presence for your product or community hub.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 p-5">
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/assets/meshwork/example-ritual.png" alt="Generative ritual example" fill className="object-contain" />
              </div>
              <h3 className="font-medium">Generative Ritual</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Translate resonance windows into sound/visuals; mint badges when synchronized activity
                surpasses thresholds.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 p-5">
              <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image src="/assets/meshwork/example-c96.png" alt="C96 budget pilot" fill className="object-contain" />
              </div>
              <h3 className="font-medium">C96 Budget Pilot</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Periodic budgets reconcile on a C96 cadence with verifiable Signals and attestations.
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












