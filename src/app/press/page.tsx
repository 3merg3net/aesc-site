import Image from "next/image";
import Banner from "@/components/Banner";
import Divider from "@/components/Divider";
import DividerGlyph from "@/components/DividerGlyph";


export const metadata = {
  title: "Press & Media — ÆSC Trust",
  description:
    "Media resources, brand guidelines, and background information for journalists and collaborators covering ÆSC Trust.",
  openGraph: { images: ["/aesctrust/press-banner.png"] },
};

export default function PressPage() {
  return (
    <main>
      <Banner src="/aesctrust/press-banner.png" alt="Press" />

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
          <h1 className="text-4xl font-semibold">Press & Media Resources</h1>
          <p className="mt-4 text-aesc-sub max-w-3xl">
            This page provides background materials, logos, brand guidelines, and answers to common questions about ÆSC
            Trust. We aim to make coverage clear, accurate, and consistent with our mission of advancing the Æ law of
            conserved signal.
          </p>

          <DividerGlyph />

          {/* Brand assets */}
          <h2 className="text-2xl font-semibold">Brand Assets</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            Logos and graphics may be used when referencing ÆSC Trust in media, presentations, or educational contexts.
            Please use official assets only and follow the guidelines below.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10 text-center">
              <Image
                src="/aesctrust/logo-symbol.png"
                alt="ÆSC glyph"
                width={120}
                height={120}
                className="mx-auto"
              />
              <p className="mt-2 text-sm text-aesc-sub">ÆSC Glyph</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10 text-center">
              <Image
                src="/aesctrust/logo-wordmark-light.png"
                alt="ÆSC wordmark"
                width={200}
                height={60}
                className="mx-auto"
              />
              <p className="mt-2 text-sm text-aesc-sub">Wordmark (light)</p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-6 ring-1 ring-white/10 text-center">
              <Image
                src="/aesctrust/press-kit-cover.png"
                alt="Press kit"
                width={200}
                height={160}
                className="mx-auto rounded-xl2"
              />
              <p className="mt-2 text-sm text-aesc-sub">Press Kit (PDF)</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/downloads/aesc-press-kit.zip"
              className="rounded-xl2 bg-white/10 px-4 py-2"
            >
              Download Full Press Kit
            </a>
            <a
              href="/downloads/aesc-brand-guidelines.pdf"
              className="rounded-xl2 border border-white/20 px-4 py-2"
            >
              Brand Guidelines
            </a>
          </div>

          <Divider />

          {/* Guidelines */}
          <h2 className="text-2xl font-semibold">Usage Guidelines</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Do</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Use official logos and banners provided by ÆSC Trust</li>
                <li>Credit “ÆSC Trust” in full when first referenced</li>
                <li>Link to <span className="text-aesc-blue">https://aesctrust.org</span> for authoritative info</li>
              </ul>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Don’t</h3>
              <ul className="mt-2 text-aesc-sub list-disc list-inside space-y-2">
                <li>Alter colors, proportions, or glyph geometry</li>
                <li>Use unofficial or outdated logos</li>
                <li>Misrepresent ÆSC Trust as a for-profit company (it is a public trust)</li>
              </ul>
            </div>
          </div>

          <DividerGlyph />

          {/* Voice & tone */}
          <h2 className="text-2xl font-semibold">Voice & Tone</h2>
          <p className="mt-3 text-aesc-sub max-w-3xl">
            ÆSC Trust communicates with clarity, precision, and professionalism. Our language is technical but accessible,
            rooted in conservation science and community trust. When describing ÆSC:
          </p>
          <ul className="mt-4 text-aesc-sub list-disc list-inside space-y-2">
            <li>Use “Trust” or “Foundation” language rather than “company”</li>
            <li>Emphasize conservation, resonance, and coherence</li>
            <li>Avoid hype or speculative claims; ground in research and reproducibility</li>
          </ul>

          <Divider />

          {/* FAQ / Q&A */}
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">What does ÆSC Trust do?</h3>
              <p className="mt-2 text-aesc-sub">
                We steward research, governance, and grants around the Æ law of conserved signal. We formalize invariants,
                fund reproducible science, and coordinate community contributions.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Is ÆSC a blockchain project?</h3>
              <p className="mt-2 text-aesc-sub">
                No. While some concepts overlap, ÆSC is broader. It is a conservation-first framework applicable to networks,
                governance, science, and culture. Some applications run on blockchains, but the principles are deeper.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">Who funds ÆSC Trust?</h3>
              <p className="mt-2 text-aesc-sub">
                The Trust is funded by a mix of philanthropic contributions, public goods funding, and aligned ecosystem partners.
                All disbursements are transparent.
              </p>
            </div>
            <div className="rounded-xl2 bg-aesc-panel/70 p-5 ring-1 ring-white/10">
              <h3 className="font-semibold">How can media get in touch?</h3>
              <p className="mt-2 text-aesc-sub">
                Please use the <a href="/contact" className="underline">Contact page</a> to reach our communications team. We
                respond promptly to legitimate press inquiries.
              </p>
            </div>
          </div>

          <DividerGlyph />

          {/* Closing */}
          <div className="rounded-xl2 ring-1 ring-white/10 p-6 bg-gradient-to-br from-white/5 to-white/0">
            <h2 className="text-2xl font-semibold">Press Inquiries</h2>
            <p className="mt-3 text-aesc-sub max-w-3xl">
              For interviews, quotes, or additional background, please get in touch. We are committed to transparency and
              clarity in all communications.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/downloads/aesc-press-kit.zip" className="rounded-xl2 bg-white/10 px-4 py-2">
                Download Press Kit
              </a>
              <a href="/contact" className="rounded-xl2 border border-white/20 px-4 py-2">
                Contact Communications
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}




