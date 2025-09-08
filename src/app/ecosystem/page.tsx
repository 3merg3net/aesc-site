import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";

export const metadata = {
  title: "Ecosystem — ÆSC Trust",
  description:
    "Explore the ÆSC ecosystem: research labs, standards, infrastructure, applications, education, grants, and governance. How to join, partner tiers, integration patterns, audit standards, and roadmap.",
  openGraph: { images: ["/aesctrust/ecosystem-banner.png"] },
};

export default function EcosystemPage() {
  return (
    <main>
      <Banner src="/aesctrust/ecosystem-banner.png" alt="Ecosystem" />

      <section className="relative section">
        {/* subtle page texture */}
        <Image
          src="/aesctrust/hero-bg-texture.png"
          alt=""
          fill
          priority
          className="object-cover opacity-10 -z-10 pointer-events-none"
        />

        <div className="container relative">
          {/* Intro */}
          <h1 className="text-4xl font-semibold">The ÆSC Ecosystem</h1>
          <p className="mt-4 text-aesc-sub max-w-3xl">
            The ecosystem spans research, standards, infrastructure, and applications built around the Æ law of conserved signal.
            Each participant—labs, builders, artists, councils—contributes to a coherent field where systems conserve, resonate,
            and self-correct over periodic cycles (C96 / R96 / C768). This page explains who’s here, how we work together, and
            how you can plug in.
          </p>

          <DividerGlyph />

          {/* Who's here */}
          <h2 className="text-2xl font-semibold">What Lives in the Ecosystem</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            A conservation-first network thrives when multiple layers reinforce each other: rigorous research, strong standards,
            legible infrastructure, and visible applications. Education, funding, and governance keep everything aligned.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Research Labs</h3>
              <p className="mt-2 text-aesc-sub">
                Formalizing invariants, running simulations, and publishing open datasets. Labs validate return-to-zero behavior,
                boundary conditions, and long-horizon stability.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Protocols & Standards</h3>
              <p className="mt-2 text-aesc-sub">
                Specs and reference designs that encode conservation and resonance into primitives—budgets, rate limits, cycles,
                and settlement rules.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Infrastructure & Tooling</h3>
              <p className="mt-2 text-aesc-sub">
                Libraries, services, and dev tools that make invariants easy to adopt. Multi-language ports, golden tests, and
                reproducible harnesses are the norm.
              </p>
            </div>

            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Applications & Media</h3>
              <p className="mt-2 text-aesc-sub">
                Systems that demonstrate conservation-first practice in the wild—governance pilots, scientific workflows, games,
                creative tools, and time-based media.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Education & Outreach</h3>
              <p className="mt-2 text-aesc-sub">
                Guides, workshops, curriculum, and showcases that translate the math into practical intuition and working patterns.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Grants & Governance</h3>
              <p className="mt-2 text-aesc-sub">
                Funding programs, councils, and DAO pilots that align incentives with conservation and transparency across seasons.
              </p>
            </div>
          </div>

          <Divider />

          {/* Logos / partner collage */}
          <Image
            src="/aesctrust/ecosystem-logos.png"
            alt="Ecosystem logos"
            width={2000}
            height={600}
            className="mt-4 rounded-xl2 ring-1 ring-white/10"
          />

          <div className="mt-6">
            <Image
              src="/aesctrust/proofbar.png"
              alt="Proofbar"
              width={1600}
              height={120}
              className="opacity-80"
            />
          </div>

          <DividerGlyph />

          {/* Participant types & value */}
          <h2 className="text-2xl font-semibold">Participant Types & Value Exchange</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            ÆSC is not a single product but a field. Each participant type contributes distinct value while benefiting from shared
            standards, open tooling, and social capital.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Independent Researchers & Labs</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Publish formal specs, proofs, and simulation data</li>
                <li>Co-author standards and reference implementations</li>
                <li>Leverage grants, fellowships, and shared datasets</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Builders & Product Teams</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Adopt conservation primitives in apps and services</li>
                <li>Use dev kits, test harnesses, and language ports</li>
                <li>Showcase applied results; inform future specs</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Communities & Councils</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Run proposals and pilots with periodic budgets</li>
                <li>Provide review, audits, and accountability</li>
                <li>Mentor contributors into reviewer pools</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Educators & Curators</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Create coursework, workshops, and showcases</li>
                <li>Translate math into patterns and design guides</li>
                <li>Bridge new contributors into active tracks</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* Tracks & Onboarding */}
          <h2 className="text-2xl font-semibold">Onboarding Tracks</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Pick a starting point, then grow into adjacent tracks. Most teams blend research, infra, and application work over time.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Specs & Standards</h3>
              <p className="mt-2 text-aesc-sub">
                Contribute to invariant definitions, boundary cases, and formal notation—then co-maintain the reference specs.
              </p>
              <ul className="mt-3 text-aesc-sub list-disc list-inside space-y-2">
                <li>Author or review proposals</li>
                <li>Help polish notation and proofs</li>
                <li>Define tests and acceptance criteria</li>
              </ul>
            </div>

            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Infrastructure & Tooling</h3>
              <p className="mt-2 text-aesc-sub">
                Implement stable, well-tested building blocks: rate limiters, periodic budgets, resonance schedulers, and more.
              </p>
              <ul className="mt-3 text-aesc-sub list-disc list-inside space-y-2">
                <li>Multi-language ports and parity tests</li>
                <li>CLI tools, SDKs, and observability</li>
                <li>Deterministic test harnesses</li>
              </ul>
            </div>

            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Applications & Pilots</h3>
              <p className="mt-2 text-aesc-sub">
                Prove the value in production: governance pilots, scientific workflows, games or media that benefit from resonance.
              </p>
              <ul className="mt-3 text-aesc-sub list-disc list-inside space-y-2">
                <li>Scope milestones and success metrics</li>
                <li>Publish datasets and reproducibility notes</li>
                <li>Share postmortems and lessons learned</li>
              </ul>
            </div>
          </div>

          <DividerGlyph />

          {/* Partner tiers */}
          <h2 className="text-2xl font-semibold">Partner Tiers</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            We support individual contributors and institutional partners. Tiers reflect depth of collaboration—not status. Movement
            across tiers is common as teams grow impact.
          </p>

          <div className="mt-6 grid md:grid-cols-4 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Contributor</h3>
              <p className="mt-2 text-aesc-sub">Individual or small team shipping PRs, specs, or datasets.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Project</h3>
              <p className="mt-2 text-aesc-sub">A focused initiative with milestones and reproducible artifacts.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Partner</h3>
              <p className="mt-2 text-aesc-sub">Longer-term collaboration; joint roadmaps and shared releases.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Fellowship</h3>
              <p className="mt-2 text-aesc-sub">Dedicated funding to pursue research or infrastructure at depth.</p>
            </div>
          </div>

          <Divider />

          {/* Integration patterns */}
          <h2 className="text-2xl font-semibold">Integration Patterns</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Adopt invariants incrementally. Most teams start with one pattern, validate behavior, and then expand.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Periodic Budgets (C96)</h3>
              <p className="mt-2 text-aesc-sub">
                Add a 96-tick limiter around costful operations (compute, bandwidth, emissions). Systems “breathe” and avoid runaway drift.
              </p>
              <ul className="mt-3 text-aesc-sub list-disc list-inside space-y-2">
                <li>Token buckets seeded per 96-tick window</li>
                <li>Soft-then-hard gating near budget limits</li>
                <li>Auto-reset + reconciliation at tick 96</li>
              </ul>
            </div>

            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Resonance Scheduling (R96)</h3>
              <p className="mt-2 text-aesc-sub">
                Align recurring tasks to resonance windows: cache warmups, indexing, batch settlement, and event rotation.
              </p>
              <ul className="mt-3 text-aesc-sub list-disc list-inside space-y-2">
                <li>Use phase offsets to prevent hotspots</li>
                <li>Measure drift; dampen out-of-phase bursts</li>
                <li>Zero-out residuals at window close</li>
              </ul>
            </div>

            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10 md:col-span-2">
              <h3 className="font-semibold">Triple Cycle Stability (C768)</h3>
              <p className="mt-2 text-aesc-sub">
                For long-running systems, stitch eight C96 windows into one macrocycle. Seasonal effects can be modeled and
                balanced without accumulating hidden debt.
              </p>
              <ul className="mt-3 text-aesc-sub list-disc list-inside space-y-2">
                <li>Macro budgets & multi-window reconciliation</li>
                <li>Long-horizon KPIs and error bounds</li>
                <li>Stress testing across seasonal scenarios</li>
              </ul>
            </div>
          </div>

          <DividerGlyph />

          {/* Quality & audit */}
          <h2 className="text-2xl font-semibold">Quality, Telemetry & Audit</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Every artifact should be reproducible. We encourage deterministic seeds, golden tests, and transparent decision logs.
            Observability aligns everyone on what matters: conservation and coherence over time.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Reproducibility</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Seeds, fixtures, and expected outputs</li>
                <li>Tagged releases and environment notes</li>
                <li>Parity tests across language ports</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Telemetry</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Budget utilization per window</li>
                <li>Phase alignment & drift metrics</li>
                <li>Residuals at reconciliation</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Audit & Review</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Public review pools and council notes</li>
                <li>Traceable rationales & voting records</li>
                <li>Diffable change logs for proposals</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* Roadmap */}
          <h2 className="text-2xl font-semibold">Roadmap (Rolling)</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            The ecosystem evolves seasonally. We keep a rolling roadmap with clear acceptance criteria and public status.
          </p>

          <div className="mt-6 grid md:grid-cols-4 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Q1–Q2</h3>
              <p className="mt-2 text-aesc-sub">
                C96/R96 spec updates, new language ports, and initial DAO pilot with mirrored lifecycle.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Q3</h3>
              <p className="mt-2 text-aesc-sub">Ecosystem showcases, education bundles, and first multi-institution fellows.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Q4</h3>
              <p className="mt-2 text-aesc-sub">C768 macrocycle guidance, telemetry schemas, and audit playbook v1.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Beyond</h3>
              <p className="mt-2 text-aesc-sub">Public goods funding streams and cross-domain pilots (science, culture, civic).</p>
            </div>
          </div>

          <DividerGlyph />

          {/* CTA */}
          <div className="relative rounded-xl2 ring-1 ring-white/10 p-6 bg-gradient-to-br from-white/5 to-white/0">
            <Image
              src="/aesctrust/hero-bg-texture.png"
              alt=""
              width={1600}
              height={160}
              className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-xl2 -z-10"
            />
            <h2 className="text-2xl font-semibold">Join the Ecosystem</h2>
            <p className="mt-3 text-aesc-sub max-w-3xl">
              Submit your project, propose a standard, or launch a pilot. We welcome contributions that strengthen conservation
              and coherence across the field.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href="#" className="inline-flex items-center gap-2 rounded-xl2 border border-white/20 px-4 py-2">
                <img src="/aesctrust/submit-project-badge.png" alt="" className="h-8" />
                Submit your project
              </Link>
              <Link href="/grants" className="rounded-xl2 bg-white/10 px-4 py-2">Explore Grants</Link>
              <Link href="/research" className="rounded-xl2 border border-white/20 px-4 py-2">Read the Research</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}





