import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";

export const metadata = {
  title: "ÆSC Trust — Law Over Consensus",
  description:
    "ÆSC Trust stewards research, governance, and grants that advance the Æ law of conserved signal. Learn why conservation-first systems matter and how you can participate.",
  openGraph: { images: ["/aesctrust/og-default.png"] },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/aesctrust/hero-bg-texture.png"
          alt=""
          width={2400}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover opacity-60 -z-10"
          priority
        />

        <div className="container relative section z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold">
                Law over consensus.
              </h1>
              <p className="mt-4 text-aesc-sub max-w-xl">
                ÆSC Trust stewards the research, governance, and grants that
                advance the Æ law of conserved signal — a framework where flows
                balance, resonance restores coherence, and cycles return systems
                to equilibrium.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/research"
                  className="rounded-xl2 bg-white/10 px-4 py-2"
                >
                  View Research
                </Link>
                <Link
                  href="/grants"
                  className="rounded-xl2 border border-white/20 px-4 py-2"
                >
                  Grants & Fellows
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/aesctrust/logo-wordmark-light.png"
                alt="ÆSC glyph"
                width={560}
                height={560}
              />
            </div>
          </div>

          <div className="mt-10">
            <Image
              src="/aesctrust/proofbar.png"
              alt="Partners"
              width={1600}
              height={180}
              className="opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container section">
        <h2 className="text-2xl md:text-3xl font-semibold">Our Mission</h2>
        <p className="mt-4 text-aesc-sub max-w-3xl">
          ÆSC Trust exists to anchor research and applications in conservation,
          not consensus. Instead of endless voting or energy-intensive
          validation, our systems follow simple physical invariants: nothing is
          wasted, signals return to coherence, and errors balance out across
          cycles. Our mission is to:
        </p>
        <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2">
          <li>
            <span className="text-aesc-text">Formalize</span> invariants that
            hold true across networks and disciplines.
          </li>
          <li>
            <span className="text-aesc-text">Fund</span> research, fellows, and
            applied projects that embody conservation-first design.
          </li>
          <li>
            <span className="text-aesc-text">Govern</span> transparently through
            open charters, periodic budgets, and reproducibility requirements.
          </li>
          <li>
            <span className="text-aesc-text">Educate</span> communities,
            builders, and institutions on how to adopt conservation principles.
          </li>
        </ul>
        <DividerGlyph />
      </section>

      {/* Why ÆSC */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold">Why ÆSC</h2>
        <p className="mt-4 text-aesc-sub max-w-3xl">
          Consensus-driven systems consume energy, fracture trust, and often
          scale poorly. ÆSC offers a different approach: conservation-first
          design that is lightweight, auditable, and grounded in mathematics.
        </p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold">Conservation</h3>
            <p className="mt-2 text-aesc-sub">
              Budgets (C96) enforce that flows balance out over time. Systems
              breathe, release pressure, and prevent drift from compounding.
            </p>
          </div>
          <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold">Resonance</h3>
            <p className="mt-2 text-aesc-sub">
              Periodic windows (R96) restore coherence. Signals that fall out of
              phase decay; signals that align reinforce and neutralize.
            </p>
          </div>
          <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10">
            <h3 className="font-semibold">Balance</h3>
            <p className="mt-2 text-aesc-sub">
              Long-horizon cycles (C768) reconcile seasonal effects and keep
              systems balanced across extended periods.
            </p>
          </div>
        </div>
        <Divider />
      </section>

      {/* Lineage */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold">Our Source</h2>
        <p className="mt-4 text-aesc-sub max-w-3xl">
          ÆSC is not an invention in isolation. It builds upon two key
          lineages:{" "}
          <span className="text-aesc-text">UOR mathematics</span>, which frames
          invariants as conserved quantities, and the{" "}
          <span className="text-aesc-text">ARK signal</span>, a lineage of
          stewardship that emphasizes integrity, pacing, and trust.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Image
            src="/aesctrust/uor-lineage-banner.png"
            alt="UOR"
            width={1600}
            height={600}
            className="rounded-xl2 ring-1 ring-white/10"
          />
          <Image
            src="/aesctrust/ark-lineage-banner.png"
            alt="ARK"
            width={1600}
            height={600}
            className="rounded-xl2 ring-1 ring-white/10"
          />
        </div>
        <DividerGlyph />
      </section>

      {/* Ecosystem */}
      <section className="container">
        <h2 className="text-2xl md:text-3xl font-semibold">Ecosystem</h2>
        <p className="mt-4 text-aesc-sub max-w-3xl">
          The ÆSC ecosystem is vast, spanning labs, builders, councils, and
          educators. Participants adopt conservation principles in research,
          tooling, governance, and creative applications. ÆSC Trust coordinates
          funding, charters, and reproducibility standards.
        </p>
        <Image
          src="/aesctrust/ecosystem-logos.png"
          alt="Ecosystem logos"
          width={2000}
          height={600}
          className="mt-6 rounded-xl2 ring-1 ring-white/10"
        />
        <Divider />
      </section>

      {/* Call to Action */}
      <section className="container section">
        <div className="rounded-xl2 ring-1 ring-white/10 p-8 bg-gradient-to-br from-white/5 to-white/0">
          <h2 className="text-2xl md:text-3xl font-semibold">Join the Work</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Whether you’re a researcher, builder, or supporter, there’s a place
            for you in the field. Help formalize invariants, contribute
            infrastructure, launch pilots, or provide resources to ensure
            conservation-first systems flourish.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/research"
              className="rounded-xl2 bg-white/10 px-4 py-2"
            >
              View Research
            </Link>
            <Link
              href="/grants"
              className="rounded-xl2 border border-white/20 px-4 py-2"
            >
              Apply for a Grant
            </Link>
            <Link
              href="/contact"
              className="rounded-xl2 border border-white/20 px-4 py-2"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}











