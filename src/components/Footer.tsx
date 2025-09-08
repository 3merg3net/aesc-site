import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

const footerLinks = [
  { href: "/research", label: "Research" },
  { href: "/grants", label: "Grants" },
  { href: "/governance", label: "Governance" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/press", label: "Press" },
  { href: "/source", label: "Source" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5">
      {/* Newsletter edge-to-edge bar */}
      <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 border-b border-white/10">
        <div className="container py-10">
          <h2 className="text-xl font-semibold">Subscribe to updates</h2>
          <p className="mt-2 text-aesc-sub">Research papers, grants, and ecosystem announcements.</p>
          <NewsletterForm />
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container py-12 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <div className="flex items-center gap-3">
            <Image src="/aesctrust/logo-symbol.png" alt="ÆSC" width={22} height={22} className="opacity-90" />
            <span className="text-sm font-semibold tracking-wide">ÆSC Trust</span>
          </div>
          <p className="mt-3 text-sm text-aesc-sub max-w-sm">
            Stewarding the law of conserved signal — research, open standards, and applied ecosystems.
          </p>
        </div>

        {/* Explore with glyph bullets */}
        <nav aria-label="Footer" className="text-sm">
          <h3 className="text-white/80 font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center gap-2 text-aesc-sub hover:text-white">
                  <Image src="/aesctrust/logo-symbol.png" alt="" width={10} height={10} className="opacity-60" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Attribution + socials */}
        <div className="flex flex-col items-end gap-4 text-sm text-aesc-sub">
          <div>
            Mathematics by{" "}
            <a className="underline hover:text-white" href="https://www.uor.foundation" target="_blank">
              UOR Foundation
            </a>{" "}
            · Signal lineage by ARK
          </div>
          <div className="flex items-center gap-2">
            {/* X */}
            <Link aria-label="X (Twitter)" href="https://x.com/" target="_blank" className="rounded-xl2 ring-1 ring-white/15 p-2 hover:ring-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                <path d="M18.244 2H21l-6.56 7.5L22 22h-6.9l-4.3-5.8L5.8 22H3l7.04-8.05L2 2h6.9l3.9 5.3L18.244 2Zm-2.4 18h2.1L8.3 4h-2.1l9.644 16Z"/>
              </svg>
            </Link>
            {/* GitHub */}
            <Link aria-label="GitHub" href="https://github.com/" target="_blank" className="rounded-xl2 ring-1 ring-white/15 p-2 hover:ring-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 0 0-3.162 19.49c.5.092.683-.217.683-.483 0-.238-.009-.868-.013-1.704-2.78.604-3.366-1.34-3.366-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.033 1.532 1.033.893 1.53 2.343 1.088 2.913.832.091-.647.35-1.088.636-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.648 0 0 .84-.27 2.75 1.025A9.57 9.57 0 0 1 12 6.844c.85.004 1.705.115 2.503.337 1.91-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.395.099 2.648.64.699 1.029 1.592 1.029 2.683 0 3.842-2.339 4.688-4.566 4.936.359.309.678.919.678 1.852 0 1.337-.012 2.416-.012 2.744 0 .268.18.58.688.481A10 10 0 0 0 12 2Z"/>
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link aria-label="LinkedIn" href="https://www.linkedin.com/" target="_blank" className="rounded-xl2 ring-1 ring-white/15 p-2 hover:ring-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
                <path d="M6.94 8.5V21H3.56V8.5h3.38ZM5.25 3A2.06 2.06 0 1 1 5.24 7a2.06 2.06 0 0 1 .01-4ZM21 21h-3.38v-6.47c0-1.54-.55-2.6-1.93-2.6-1.05 0-1.67.71-1.94 1.4-.1.25-.12.6-.12.95V21h-3.38s.04-10.77 0-11.9h3.38V11c.45-.69 1.25-1.67 3.03-1.67 2.22 0 3.94 1.45 3.94 4.57V21Z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



