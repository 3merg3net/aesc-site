import Image from "next/image";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";


export const metadata = {
  title: "Research — ÆSC Trust",
  description:
    "Explore conservation invariants C96, R96, C768. Formal specifications, methodology, open publications, and reference implementations.",
  openGraph: { images: ["/aesctrust/research-banner.png"] },
};

export default function ResearchPage() {
  return (
    <main>
<Banner src="/aesctrust/research-banner.png" alt="Research" />

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
          <h1 className="text-4xl font-semibold">Research</h1>
          <p className="mt-4 text-aesc-sub max-w-3xl">
            ÆSC Trust investigates the mathematics and physics of the Æ law of conserved signal. Our program formalizes
            invariants, validates them through simulation and experiment, and ships open reference implementations so the
            work is reproducible and auditable.
          </p>

          <Divider />

          {/* Core invariants */}
          <h2 className="text-2xl font-semibold">Core Invariants</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            The framework is anchored by three related invariants. Together they enforce conservation, restore coherence,
            and extend balance across longer horizons.
          </p>
          <ul className="mt-6 space-y-6 text-aesc-sub max-w-3xl">
            <li>
              <span className="text-aesc-text font-semibold">C96 — Conservation.</span> Periodic budgets constrain net flow
              to ~0 across 96 ticks. This caps drift, bounds entropy, and forces systems back toward equilibrium.
            </li>
            <li>
              <span className="text-aesc-text font-semibold">R96 — Resonance.</span> Phase relation that pulls signals back
              into coherence. Misaligned activity decays; aligned activity amplifies until neutralized.
            </li>
            <li>
              <span className="text-aesc-text font-semibold">C768 — Triple Cycle.</span> Eight C96 windows form a 768-tick
              macrocycle, ensuring long-range balance and preventing short-term oscillations from accumulating error.
            </li>
          </ul>

          {/* Cards side by side */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Image
              src="/aesctrust/card-c96.png"
              alt="C96"
              width={600}
              height={400}
              className="rounded-xl2 ring-1 ring-white/10"
            />
            <Image
              src="/aesctrust/card-r96.png"
              alt="R96"
              width={600}
              height={400}
              className="rounded-xl2 ring-1 ring-white/10"
            />
            <Image
              src="/aesctrust/card-c768.png"
              alt="C768"
              width={600}
              height={400}
              className="rounded-xl2 ring-1 ring-white/10"
            />
          </div>

          <DividerGlyph />

          {/* Methodology */}
          <div className="grid md:grid-cols-[360px,1fr] gap-10 items-start">
            <div className="relative">
              {/* stronger UOR + proofbar */}
              <Image
                src="/aesctrust/uor-lineage-card.png"
                alt="UOR lineage"
                width={600}
                height={800}
                className="rounded-xl2 ring-1 ring-white/10 opacity-60"
              />
              <div className="mt-3">
                <Image
                  src="/aesctrust/proofbar.png"
                  alt="Proofbar"
                  width={600}
                  height={80}
                  className="opacity-80"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Methodology</h2>
              <p className="mt-4 text-aesc-sub max-w-3xl">
                We treat research as a pipeline: define clearly, test aggressively, and publish openly. Each step is designed to
                minimize ambiguity and maximize reproducibility.
              </p>
              <ul className="mt-6 space-y-3 text-aesc-sub list-disc list-inside">
                <li><span className="text-aesc-text">Specification:</span> plain-language and formal definitions of invariants.</li>
                <li><span className="text-aesc-text">Simulation:</span> deterministic testbeds model bursts, drift, adversarial inputs.</li>
                <li><span className="text-aesc-text">Reference code:</span> minimal, readable implementations with golden tests.</li>
                <li><span className="text-aesc-text">Review:</span> independent runs, audit notes, and peer commentary.</li>
              </ul>
            </div>
          </div>

          <DividerGlyph />

          {/* Publications */}
          <div>
            <h2 className="text-2xl font-semibold">Publications</h2>
            <Image
              src="/aesctrust/hero-bg-texture.png"
              alt=""
              width={1600}
              height={200}
              className="mt-6 w-full rounded-xl2 object-cover opacity-10"
            />
            <ul className="mt-6 space-y-2 text-aesc-blue">
              <li>
                <a href="#" className="underline">
                  C96: Conservation — specification, proofs, and reference implementations
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  R96: Resonance — methods, simulation harness, and evaluation suites
                </a>
              </li>
              <li>
                <a href="#" className="underline">
                  C768: Triple cycle — long-horizon behaviors and seasonality notes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}







