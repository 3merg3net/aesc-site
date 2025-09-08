import Image from "next/image";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";

export const metadata = {
  title: "Governance — ÆSC Trust",
  description:
    "Explore the governance model of ÆSC Trust: transparent charters, proposal lifecycle, council structure, DAO pathways, and opportunities for contribution.",
  openGraph: { images: ["/aesctrust/governance-banner.png"] },
};

export default function GovernancePage() {
  return (
    <main>
      <Banner src="/aesctrust/governance-banner.png" alt="Governance" />

      <section className="relative section">
        <Image
          src="/aesctrust/hero-bg-texture.png"
          alt=""
          fill
          priority
          className="object-cover opacity-10 -z-10 pointer-events-none"
        />

        <div className="container relative">
          {/* Intro */}
          <h1 className="text-4xl font-semibold">Governance</h1>
          <p className="mt-4 text-aesc-sub max-w-3xl">
            ÆSC Trust is governed through open charters, transparent processes, and councils accountable to the principles of
            conservation and coherence. Our goal is to prevent capture, enable participation, and keep decision-making aligned
            with the core invariants that anchor the system.
          </p>

          <DividerGlyph />

          {/* Principles */}
          <h2 className="text-2xl font-semibold">Foundational Principles</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Transparency</h3>
              <p className="mt-2 text-aesc-sub">
                All proposals, meeting minutes, and funding disbursements are published openly. Decisions are logged and archived
                for permanent reference.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Accountability</h3>
              <p className="mt-2 text-aesc-sub">
                Councils operate under explicit charters with defined term limits. Performance is reviewed publicly before renewal
                or replacement.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Participation</h3>
              <p className="mt-2 text-aesc-sub">
                Anyone may submit proposals or comment on active discussions. Fellowship programs prepare contributors to take
                on greater responsibilities.
              </p>
            </div>
          </div>

          <Divider />

          {/* Council structure */}
          <h2 className="text-2xl font-semibold">Council Structure</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Governance is carried out by specialized councils. Each has a focused mandate but remains accountable to the broader
            community.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Research Council</h3>
              <p className="mt-2 text-aesc-sub">
                Reviews proposals, validates publications, and manages reproducibility audits. Ensures rigor and integrity of the
                scientific program.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Grants Council</h3>
              <p className="mt-2 text-aesc-sub">
                Oversees disbursement of funds, milestone reviews, and compliance with openness requirements. Evaluates impact
                of funded projects.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Community Council</h3>
              <p className="mt-2 text-aesc-sub">
                Manages communication channels, facilitates forums, and ensures proposals are visible and accessible to all
                stakeholders.
              </p>
            </div>
          </div>

          <DividerGlyph />

          {/* Proposal lifecycle */}
          <h2 className="text-2xl font-semibold">Proposal Lifecycle</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Proposals progress through clear, predictable stages. This prevents gatekeeping while keeping the process efficient
            and auditable.
          </p>
          <div className="mt-6 grid md:grid-cols-4 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold">1. Draft</h3>
              <p className="mt-2 text-aesc-sub">Anyone may publish an initial draft. Community feedback is encouraged.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold">2. Review</h3>
              <p className="mt-2 text-aesc-sub">
                Councils review proposals for clarity, scope, and alignment with invariants. Constructive feedback is public.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold">3. Decision</h3>
              <p className="mt-2 text-aesc-sub">
                Approved proposals receive charters or funding. Decisions are logged with rationale and voting record.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-4 ring-1 ring-white/10">
              <h3 className="font-semibold">4. Execution</h3>
              <p className="mt-2 text-aesc-sub">
                Work is carried out under open reporting requirements. Milestones are tracked and published.
              </p>
            </div>
          </div>

          <Divider />

          {/* DAO section */}
          <h2 className="text-2xl font-semibold">DAO & Decentralized Pathways</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            ÆSC Trust experiments with decentralized governance models. A token-governed DAO layer may enable broader
            participation while the councils safeguard coherence. This hybrid approach ensures rigor at the core while allowing
            open experimentation at the edges.
          </p>
          <ul className="mt-4 list-disc list-inside text-aesc-sub space-y-2">
            <li>DAO proposals mirror council lifecycle for consistency</li>
            <li>Community tokens could grant signaling power, not unilateral control</li>
            <li>DAO pilots are run in parallel with council oversight</li>
          </ul>

          <DividerGlyph />

          {/* Opportunities */}
          <h2 className="text-2xl font-semibold">Opportunities to Contribute</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Governance thrives when more voices are engaged. There are multiple ways to help shape the framework.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Join a Working Group</h3>
              <p className="mt-2 text-aesc-sub">
                Participate in focused groups on research review, grants evaluation, or community standards. Working groups are
                open to volunteers who commit time and expertise.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Propose Improvements</h3>
              <p className="mt-2 text-aesc-sub">
                Submit governance improvements as formal proposals. Past examples include adjustments to term limits and
                transparency reporting formats.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Act as Reviewer</h3>
              <p className="mt-2 text-aesc-sub">
                Experienced contributors may join rotating review pools to provide peer commentary on proposals or milestones.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Support the DAO Pilot</h3>
              <p className="mt-2 text-aesc-sub">
                Participate in decentralized pilots, test signaling mechanisms, and help refine how DAO inputs complement council
                oversight.
              </p>
            </div>
          </div>

          <Divider />

          {/* Closing call */}
          <div className="rounded-xl2 ring-1 ring-white/10 p-6 bg-gradient-to-br from-white/5 to-white/0">
            <h2 className="text-2xl font-semibold">Help Guide the Framework</h2>
            <p className="mt-3 text-aesc-sub max-w-3xl">
              Governance is not static — it evolves with the ecosystem. Join discussions, propose changes, and help ensure ÆSC
              Trust remains aligned with its founding invariants of conservation and coherence.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              <li className="rounded-xl2 bg-white/10 px-3 py-2">Join a council call</li>
              <li className="rounded-xl2 bg-white/10 px-3 py-2">Draft a proposal</li>
              <li className="rounded-xl2 bg-white/10 px-3 py-2">Contribute to DAO pilot</li>
              <li className="rounded-xl2 bg-white/10 px-3 py-2">Help review milestones</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}




