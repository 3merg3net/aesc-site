import Image from "next/image";
import Link from "next/link";
import GettingStartedHeader from "@/components/meshwork/GettingStartedHeader";

export const metadata = {
  title: "Meshwork — Getting Started",
  description:
    "Spin up a digital node, send a signed ping, and see it live on the Meshwork map.",
};

function Infographic({
  src,
  alt,
  caption,
}: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 900px"
          priority={false}
        />
      </div>
      {caption ? (
        <figcaption className="pt-2 text-sm text-slate-300/80">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export default function GettingStarted() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <GettingStartedHeader variant="compact" />
      <header className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Getting Started with Meshwork
        </h1>
        <p className="mt-3 max-w-2xl text-slate-300/90">
          Meshwork is a live map of <strong>digital nodes</strong>. When a node
          sends a signed ping, the network verifies it and updates the map. Follow the
          three steps below to participate.
        </p>
        
      </header>

      {/* Step 1 */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">1) Spin up a digital node</h2>
        <p className="mt-2 text-slate-300/90">
          A “node” can be any app, service, or script you control. Give it a stable
          <code className="mx-1 rounded bg-black/40 px-1.5 py-0.5 text-[0.9em]">nodeId</code> and (optionally) a
          <code className="mx-1 rounded bg-black/40 px-1.5 py-0.5 text-[0.9em]">stickerId</code> placeholder if you plan to attach a physical label later.
        </p>

        <div className="mt-4">
          <Infographic
            src="/meshwork/infographic-getting-started.png"
            alt="Three-step overview: node → ping → live on Meshwork"
            caption="Digital-first: start with a software node. Physical labels can be added later."
          />
        </div>
      </section>

      {/* Step 2 */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">2) Send a signed ping</h2>
        <p className="mt-2 text-slate-300/90">
          Create a message <em>(nodeId | stickerId | ts | nonce)</em> and sign it with your
          private secret (HMAC). Then POST it to the Meshwork Ping API.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Infographic
            src="/meshwork/infographic-ping-lifecycle.png"
            alt="Lifecycle of a ping: Node → API → Verification → Database → Map"
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white">Example (curl)</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-black/50 p-3 text-xs leading-relaxed text-slate-200">
{`curl -X POST https://aesctrust.org/api/mesh/ping \\
  -H "Content-Type: application/json" \\
  -d '{
    "nodeId": "0xYOUR_NODE_ID",
    "stickerId": "0xOPTIONAL",
    "ts": 1713200000000,
    "nonce": "abcd1234efgh",
    "sig": "<hmac_sha256_hex>",
    "lat": 39.8097343,
    "lon": -98.5556199
  }'`}
            </pre>

            <p className="mt-3 text-slate-300/90">
              Response: <code className="bg-black/40 px-1.5 py-0.5 rounded">{"{ ok: true }"}</code> on success.
            </p>

            <ul className="mt-3 list-disc pl-5 text-slate-300/90">
              <li><strong>ts</strong>: UNIX ms timestamp (±5 min skew allowed; ±24h window overall).</li>
              <li><strong>nonce</strong>: random 8–32 hex chars to prevent replay.</li>
              <li><strong>sig</strong>: HMAC-SHA256(secret, <em>nodeId|stickerId|ts|nonce</em>) in hex.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">3) See it live on Meshwork</h2>
        <p className="mt-2 text-slate-300/90">
          Use the read endpoint to see the latest per-node activity. Your node should appear
          within seconds after a successful ping.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Infographic
            src="/meshwork/infographic-mesh-growth.png"
            alt="Sparse to dense network as more digital nodes join"
          />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold text-white">Fetch nodes (JSON)</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-black/50 p-3 text-xs leading-relaxed text-slate-200">
{`curl https://aesctrust.org/api/nodes`}
            </pre>

            <div className="mt-3 flex gap-3">
              <Link
                href="/api/nodes"
                className="rounded-2xl px-3 py-2 text-sm font-medium text-white/90 bg-white/10 hover:bg-white/15 ring-1 ring-white/15"
              >
                View JSON
              </Link>
              <Link
                href="/meshwork#map"
                className="rounded-2xl px-3 py-2 text-sm font-medium text-sky-100 bg-sky-500/25 hover:bg-sky-500/35 ring-1 ring-sky-400/40"
              >
                Open Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Why it matters</h2>
        <p className="mt-2 text-slate-300/90">
          Verified pings create tamper-resistant proof of activity for digital nodes, enabling
          transparent stats, rewards, and governance over time.
        </p>
        <div className="mt-4">
          <Infographic
            src="/meshwork/infographic-why-mesh.png"
            alt="Trust, community, resonance, and potential benefits of the mesh"
          />
        </div>
      </section>

      {/* Future */}
      <section className="section">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">What’s next</h2>
        <p className="mt-2 text-slate-300/90">
          Meshwork is digital-first today. Physical labels and IRL nodes come next, merging
          with digital nodes into a unified mesh.
        </p>
        <div className="mt-4">
          <Infographic
            src="/meshwork/infographic-future-expansion.png"
            alt="Future: digital nodes plus physical nodes combine into a unified mesh"
          />
        </div>
      </section>
    </main>
  );
}
