import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";


export const metadata = {
  title: "Source — ÆSC Trust",
  description:
    "ÆSC acknowledges two lineages: UOR (mathematics) and ARK (signal). This page explains the foundations, convergence, attributions, and how to engage responsibly.",
  openGraph: { images: ["/aesctrust/source-banner.png"] },
};

export default function SourcePage() {
  return (
    <main>
      <Banner src="/aesctrust/source-banner.png" alt="Source" />

      <section className="relative section">
        {/* subtle page texture */}
        <Image
          src="/aesctrust/hero-bg-texture.png"
          alt=""
          fill
          priority
          className="object-contain opacity-10 -z-10 pointer-events-none"
        />

        <div className="container relative">
          {/* Intro */}
          <h1 className="text-4xl font-semibold">Source</h1>
          <p className="mt-4 text-aesc-sub max-w-3xl">
            ÆSC stands on two foundations: the mathematical program articulated by the <span className="text-aesc-text">UOR Foundation</span>,
            and the <span className="text-aesc-text">ARK signal lineage</span>, a living tradition concerned with the integrity of transmission.
            Together they inform a conservation-first approach where signals return to coherence over periodic cycles.
          </p>

          <DividerGlyph />

          {/* UOR */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold">UOR Foundation — Mathematics</h2>
              <p className="mt-4 text-aesc-sub max-w-3xl">
                UOR supplies the mathematical scaffolding that inspires ÆSC’s invariants and periodic accounting. In practice,
                this means treating networks as fields with conserved quantities and enforcing return-to-zero budgets over defined
                windows (e.g., 96/768). The emphasis is on <em>formal clarity</em>, <em>boundary conditions</em>, and <em>reproducibility</em>.
              </p>
              <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2">
                <li><span className="text-aesc-text">Conservation:</span> periodic budgets bound drift and residuals.</li>
                <li><span className="text-aesc-text">Resonance:</span> phase relations pull signals back to coherence.</li>
                <li><span className="text-aesc-text">Macro cycles:</span> longer windows reconcile seasonal effects.</li>
              </ul>
              <p className="mt-4 text-aesc-sub">
                We credit UOR for the mathematical inspiration behind our invariants and the overall program of formalizing
                <span className="text-aesc-text"> conserved signal</span>.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="https://www.uor.foundation" target="_blank" className="rounded-xl2 bg-white/10 px-4 py-2">
                  Visit UOR Foundation
                </Link>
                <Link href="/research" className="rounded-xl2 border border-white/20 px-4 py-2">
                  See ÆSC Research
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <Image
                src="/aesctrust/uor-lineage-banner.png"
                alt="UOR Foundation"
                width={1600}
                height={600}
                className="rounded-xl2 ring-1 ring-white/10"
              />
              <Image
                src="/aesctrust/uor-lineage-card.png"
                alt="UOR lineage card"
                width={1600}
                height={900}
                className="rounded-xl2 ring-1 ring-white/10 opacity-80"
              />
            </div>
          </div>

          <Divider />

          {/* ARK */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="order-2 md:order-1 space-y-4">
              <Image
                src="/aesctrust/ark-lineage-banner.png"
                alt="ARK Signal"
                width={1600}
                height={600}
                className="rounded-xl2 ring-1 ring-white/10"
              />
              <Image
                src="/aesctrust/ark-lineage-card.png"
                alt="ARK lineage card"
                width={1600}
                height={900}
                className="rounded-xl2 ring-1 ring-white/10 opacity-85"
              />
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-semibold">ARK Signal — Living Lineage</h2>
              <p className="mt-4 text-aesc-sub max-w-3xl">
                The ARK lineage concerns the <em>integrity of transmission</em>: how signals are held, stewarded, and returned to
                coherence in communities over time. Where UOR offers formal scaffolding, ARK offers cultural practices for how
                people maintain trust, pace, and clarity through cycles.
              </p>
              <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2">
                <li><span className="text-aesc-text">Stewardship:</span> honoring origins without fossilizing them.</li>
                <li><span className="text-aesc-text">Attunement:</span> pacing and resonance to avoid burnout and drift.</li>
                <li><span className="text-aesc-text">Transmission:</span> keeping a signal legible across generations.</li>
              </ul>
              <p className="mt-4 text-aesc-sub">
                ÆSC reflects these practices through open charters, transparent review, and periodic reconciliation, aiming to keep
                the field coherent as it scales.
              </p>
            </div>
          </div>

          <DividerGlyph />

          {/* Convergence */}
          <h2 className="text-2xl font-semibold">Convergence in ÆSC</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            ÆSC is where the two foundations meet: mathematics defines <em>what</em> must be conserved; lived stewardship defines
            <em> how</em> it is upheld. The result is a framework that is precise without becoming brittle, and open without
            dissolving into noise.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Formal Invariants</h3>
              <p className="mt-2 text-aesc-sub">C96/R96/C768 specify budgets, phases, and macro windows for periodic balance.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Open Method</h3>
              <p className="mt-2 text-aesc-sub">Specifications, simulation harnesses, and reference code for reproducibility.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Cultural Practice</h3>
              <p className="mt-2 text-aesc-sub">Transparent councils, periodic reviews, and community pacing to maintain trust.</p>
            </div>
          </div>

          <Divider />

          {/* Attributions & ethics */}
          <h2 className="text-2xl font-semibold">Attributions & Ethical Use</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            We explicitly credit the UOR Foundation for mathematical inspiration and honor the ARK signal lineage for cultural
            stewardship. We avoid personal attribution here and emphasize the work itself. When building on ÆSC:
          </p>
          <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2">
            <li>Credit ÆSC and UOR when using invariants, specs, or reference implementations.</li>
            <li>Respect the ARK emphasis on pacing and integrity in how you organize teams and releases.</li>
            <li>Publish reproducibility notes so results can be verified independently.</li>
          </ul>

          <DividerGlyph />

          {/* Resources */}
          <h2 className="text-2xl font-semibold">Resources</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Primary</h3>
              <ul className="mt-2 text-aesc-blue space-y-2">
                <li>
                  <Link href="/research" className="underline">ÆSC Research — invariants, methods, publications</Link>
                </li>
                <li>
                  <Link href="https://www.uor.foundation" target="_blank" className="underline">UOR Foundation — official site</Link>
                </li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
              <h3 className="font-semibold">Artifacts</h3>
              <ul className="mt-2 text-aesc-blue space-y-2">
                <li><Link href="/grants" className="underline">Grants & Fellows — participate in the work</Link></li>
                <li><Link href="/governance" className="underline">Governance — charters, councils, proposals</Link></li>
              </ul>
            </div>
          </div>

          <Divider />

          {/* How to engage */}
          <h2 className="text-2xl font-semibold">How to Engage</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            If your team is interested in referencing the math, adopting conservation primitives, or running pilots that
            respect pacing and periodic balance, we’d love to collaborate.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">For Researchers</h3>
              <p className="mt-2 text-aesc-sub">Co-author specs, contribute proofs, or propose evaluation suites.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">For Builders</h3>
              <p className="mt-2 text-aesc-sub">Adopt periodic budgets, resonance scheduling, and macrocycle accounting.</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">For Communities</h3>
              <p className="mt-2 text-aesc-sub">Run governance pilots with transparent proposals and seasonal reviews.</p>
            </div>
          </div>

          <DividerGlyph />

          {/* Closing */}
          <div className="relative rounded-xl2 ring-1 ring-white/10 p-6 bg-gradient-to-br from-white/5 to-white/0">
            <Image
              src="/aesctrust/hero-bg-texture.png"
              alt=""
              width={1600}
              height={160}
              className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-xl2 -z-10"
            />
            <h2 className="text-2xl font-semibold">Acknowledgment</h2>
            <p className="mt-3 text-aesc-sub max-w-3xl">
              Without the UOR mathematical program and the ARK stewardship practices, ÆSC would not exist. We honor both lineages
              by keeping the work open, reproducible, and accountable to the communities who build with it.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="https://www.uor.foundation" target="_blank" className="rounded-xl2 bg-white/10 px-4 py-2">
                UOR Foundation
              </Link>
              <Link href="/contact" className="rounded-xl2 border border-white/20 px-4 py-2">
                Talk to ÆSC
              </Link>
            </div>

            <div className="mt-6">
              <Image
                src="/aesctrust/proofbar.png"
                alt="Proofbar"
                width={1600}
                height={120}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}






