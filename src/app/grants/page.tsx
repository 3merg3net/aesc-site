import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";

export const metadata = {
  title: "Grants & Fellows — ÆSC Trust",
  description:
    "Funding programs that advance conservation-first research, infrastructure, and applied projects rooted in the Æ law of conserved signal.",
  openGraph: { images: ["/aesctrust/grants-banner.png"] },
};

export default function GrantsPage() {
  return (
    <main>
      <Banner src="/aesctrust/grants-banner.png" alt="Grants" />

      <section className="relative section">
        {/* subtle background */}
        <Image
          src="/aesctrust/hero-bg-texture.png"
          alt=""
          fill
          priority
          className="object-cover opacity-10 -z-10 pointer-events-none"
        />

        <div className="container relative">
          {/* Intro */}
          <h1 className="text-4xl font-semibold">Grants & Fellows</h1>
          <p className="mt-4 text-aesc-sub max-w-3xl">
            ÆSC Trust funds work that strengthens the foundations of conservation-first systems. We support research into
            invariants, developer tooling and reference implementations, and applied projects that demonstrate real-world
            benefits of coherence over consensus.
          </p>

          {/* CTA row */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#" className="rounded-xl2 bg-white/10 px-4 py-2">Apply for a Grant</Link>
            <Link href="#" className="rounded-xl2 border border-white/20 px-4 py-2">View Current RFPs</Link>
            <Link href="/contact" className="rounded-xl2 border border-white/20 px-4 py-2">Talk to the Team</Link>
          </div>

          <DividerGlyph />

          {/* Program tracks */}
          <h2 className="text-2xl font-semibold">Program Tracks</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Choose the track that best fits your work. Each track has tailored evaluation criteria and reporting expectations,
            but all grants share a commitment to open knowledge and reproducibility.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Research</h3>
              <p className="mt-2 text-aesc-sub">
                Formalize invariants, analyze boundary conditions, and publish methods. Ideal for academic and independent
                researchers producing open papers, proofs, and datasets.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Infrastructure</h3>
              <p className="mt-2 text-aesc-sub">
                Build libraries, protocols, and reference implementations based on Æ invariants. Prioritizes clarity, tests, and
                multi-language parity for community adoption.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Applied</h3>
              <p className="mt-2 text-aesc-sub">
                Demonstrate conservation-first design in production: governance pilots, media systems, games, or scientific tools
                that benefit from resonance and periodic balance.
              </p>
            </div>
          </div>

          <Divider />

          {/* Funding sizes & terms */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Grant Sizes</h3>
              <ul className="mt-2 text-aesc-sub space-y-2">
                <li><span className="text-aesc-text">Seed:</span> $5k – $25k (2–8 weeks)</li>
                <li><span className="text-aesc-text">Standard:</span> $25k – $100k (1–4 months)</li>
                <li><span className="text-aesc-text">Fellowship:</span> $100k+ (up to 12 months)</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Disbursement</h3>
              <p className="mt-2 text-aesc-sub">
                Tranche-based. Initial 40–60% on kickoff; remainder tied to public milestones. No equity or token warrants; IP remains
                with the grantee, with a preference for open licenses.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Openness</h3>
              <p className="mt-2 text-aesc-sub">
                Grantees publish artifacts (papers, code, datasets) and minimal reproducibility notes. Sensitive data may be redacted,
                but methods and decisions should be auditable.
              </p>
            </div>
          </div>

          <DividerGlyph />

          {/* Selection criteria */}
          <h2 className="text-2xl font-semibold">Selection Criteria</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            We evaluate fit and feasibility. Strong proposals articulate a clear problem, demonstrate awareness of prior work, and
            explain how the result advances conservation-first practice.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Fit & Impact</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Alignment with Æ invariants (C96/R96/C768) and principles</li>
                <li>Potential for ecosystem reuse or measurable benefit</li>
                <li>Clarity of outcomes and dissemination plan</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Feasibility & Team</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Well-scoped milestones and realistic timeline</li>
                <li>Evidence of relevant expertise or prior work</li>
                <li>Quality of methodology and evaluation approach</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* Timeline */}
          <h2 className="text-2xl font-semibold">Typical Timeline</h2>
          <div className="mt-4 grid md:grid-cols-4 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Week 0–2</h3>
              <p className="mt-2 text-aesc-sub">Submission & review. Clarifying questions if needed.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Week 3–4</h3>
              <p className="mt-2 text-aesc-sub">Decision, award letter, and milestone confirmation.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Execution</h3>
              <p className="mt-2 text-aesc-sub">Tranche 1 → work → public milestone → tranche 2 (if applicable).</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Wrap-up</h3>
              <p className="mt-2 text-aesc-sub">Publish artifacts and reproducibility notes. Optional presentation.</p>
            </div>
          </div>

          <DividerGlyph />

          {/* How to apply */}
          <h2 className="text-2xl font-semibold">How to Apply</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Submit a concise proposal (3–5 pages) or a short video (≤7 minutes). Include links to prior work and any public repos.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Required</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Problem statement and background</li>
                <li>Milestones, timeline, and budget</li>
                <li>Deliverables and dissemination plan</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Helpful Extras</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Prototype, code samples, or datasets</li>
                <li>Letters of support or collaborators</li>
                <li>Risks and mitigation strategy</li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* Reporting expectations */}
          <h2 className="text-2xl font-semibold">Reporting & Openness</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            We ask for short public updates at each milestone: what shipped, what changed, and what others can reuse. A final
            write-up links all artifacts, commits, and test seeds so results are reproducible.
          </p>
          <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2">
            <li>Public milestone notes (1–2 paragraphs)</li>
            <li>Repository links and tagged release(s)</li>
            <li>Datasets and deterministic seeds (if applicable)</li>
          </ul>

          <DividerGlyph />

          {/* Final CTA over light texture */}
          <div className="relative rounded-xl2 ring-1 ring-white/10 p-6 bg-gradient-to-br from-white/5 to-white/0">
            <Image
              src="/aesctrust/hero-bg-texture.png"
              alt=""
              width={1600}
              height={160}
              className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-xl2 -z-10"
            />
            <h2 className="text-2xl font-semibold">Ready to propose your work?</h2>
            <p className="mt-3 text-aesc-sub max-w-3xl">
              We review proposals on a rolling basis and host seasonal showcases for grantees to present findings.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="#" className="rounded-xl2 bg-white/10 px-4 py-2">Start Application</Link>
              <Link href="/contact" className="rounded-xl2 border border-white/20 px-4 py-2">Ask a Question</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



