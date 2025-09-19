"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Flat list for mobile (kept simple)
const mobileLinks = [
  { href: "/research", label: "Research" },
  { href: "/grants", label: "Grants" },
  { href: "/governance", label: "Governance" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/meshwork", label: "Meshwork" },
  { href: "/meshwork/getting-started", label: "Getting Started" },
  { href: "/press", label: "Press" },
  { href: "/source", label: "Source" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [meshOpen, setMeshOpen] = useState(false);
  const meshRef = useRef<HTMLDivElement | null>(null);

  // Close menus on route change
  useEffect(() => { setMobileOpen(false); setMeshOpen(false); }, [pathname]);

  // Close mesh menu on outside click / esc
  useEffect(() => {
    function onDocDown(e: MouseEvent) {
      if (!meshRef.current) return;
      if (!meshRef.current.contains(e.target as Node)) setMeshOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMeshOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-[100] backdrop-blur supports-[backdrop-filter]:bg-black/40">
      {/* gold accent line */}
      <div className="h-[2px] bg-gradient-to-r from-[#d6b35a] via-[#e8c873] to-[#d6b35a]" />

      <div className="container flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/aesctrust/logo-symbol.png"
            alt="ÆSC"
            width={28}
            height={28}
            className="opacity-90"
            priority
          />
          <span className="font-semibold tracking-wide">ÆSC Trust</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <NavLink href="/research" active={isActive("/research")}>Research</NavLink>
          <NavLink href="/grants" active={isActive("/grants")}>Grants</NavLink>
          <NavLink href="/governance" active={isActive("/governance")}>Governance</NavLink>
          <NavLink href="/ecosystem" active={isActive("/ecosystem")}>Ecosystem</NavLink>

          {/* Meshwork: CLICK to toggle, panel only renders when open */}
          <div className="relative" ref={meshRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={meshOpen}
              onClick={() => setMeshOpen((s) => !s)}
              className={`inline-flex items-center gap-1 hover:text-white focus:outline-none ${
                pathname?.startsWith("/meshwork") ? "text-white" : "text-aesc-sub"
              }`}
            >
              Meshwork
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                className={`opacity-70 transition ${meshOpen ? "rotate-180" : ""}`}
              >
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {meshOpen && (
              <div
                role="menu"
                className="absolute left-1/2 -translate-x-1/2 mt-3 w-[280px]
                           rounded-2xl border border-white/10 bg-black/70 backdrop-blur p-3 z-50 shadow-xl"
              >
                <Link
                  href="/meshwork"
                  role="menuitem"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                  onClick={() => setMeshOpen(false)}
                >
                  <Image src="/meshwork/logo-meshwork.png" alt="" width={24} height={24} className="opacity-90" />
                  <div>
                    <div className="text-sm font-medium">Overview</div>
                    <div className="text-xs text-zinc-400">Nodes, pings, resonance</div>
                  </div>
                </Link>

                <Link
                  href="/meshwork/getting-started"
                  role="menuitem"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                  onClick={() => setMeshOpen(false)}
                >
                  <Image src="/meshwork/btn-get-started.png" alt="" width={90} height={24} className="opacity-90" />
                  <div>
                    <div className="text-sm font-medium">Getting Started</div>
                    <div className="text-xs text-zinc-400">3-step quickstart</div>
                  </div>
                </Link>

                <Link
                  href="/meshwork#map"
                  role="menuitem"
                  className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                  onClick={() => setMeshOpen(false)}
                >
                  <Image src="/meshwork/btn-view-map.png" alt="" width={84} height={24} className="opacity-90" />
                  <div>
                    <div className="text-sm font-medium">Live Map</div>
                    <div className="text-xs text-zinc-400">Real-time nodes</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/press" active={isActive("/press")}>Press</NavLink>
          <NavLink href="/source" active={isActive("/source")}>Source</NavLink>
          <NavLink href="/contact" active={isActive("/contact")}>Contact</NavLink>
        </nav>

        {/* Desktop socials */}
        <div className="hidden md:flex items-center gap-2">
          <SocialLink ariaLabel="X (Twitter)" href="https://x.com/Aesctrust/" />
          <SocialLink ariaLabel="GitHub" href="https://github.com/" icon="github" />
          <SocialLink ariaLabel="LinkedIn" href="https://www.linkedin.com/" icon="linkedin" />
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-white/15 text-white"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((s) => !s)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <nav className="container py-3 flex flex-col">
            {mobileLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`py-2 text-base ${active ? "text-white" : "text-aesc-sub hover:text-white"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

/** Small helpers */
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-2 hover:text-white ${active ? "text-white" : "text-aesc-sub"}`}
    >
      <Image
        src="/aesctrust/logo-symbol.png"
        alt=""
        width={12}
        height={12}
        className="opacity-60 hidden sm:inline-block"
      />
      {children}
    </Link>
  );
}

function SocialLink({
  ariaLabel,
  href,
  icon,
}: {
  ariaLabel: string;
  href: string;
  icon?: "github" | "linkedin";
}) {
  const rel = "noreferrer noopener";
  return (
    <Link
      aria-label={ariaLabel}
      href={href}
      target="_blank"
      rel={rel}
      className="rounded-xl2 ring-1 ring-white/15 p-2 hover:ring-white/30"
    >
      {icon === "github" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2a10 10 0 0 0-3.162 19.49c.5.092.683-.217.683-.483 0-.238-.009-.868-.013-1.704-2.78.604-3.366-1.34-3.366-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.004.07 1.532 1.033 1.532 1.033.893 1.53 2.343 1.088 2.913.832.091-.647.35-1.088.636-1.339-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.447-1.27.098-2.648 0 0 .84-.27 2.75 1.025A9.57 9.57 0 0 1 12 6.844c.85.004 1.705.115 2.503.337 1.91-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.395.099 2.648.64.699 1.029 1.592 1.029 2.683 0 3.842-2.339 4.688-4.566 4.936.359.309.678.919.678 1.852 0 1.337-.012 2.416-.012 2.744 0 .268.18.58.688.481A10 10 0 0 0 12 2Z"
          />
        </svg>
      ) : icon === "linkedin" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M6.94 8.5V21H3.56V8.5h3.38ZM5.25 3A2.06 2.06 0 1 1 5.24 7a2.06 2.06 0 0 1 .01-4ZM21 21h-3.38v-6.47c0-1.54-.55-2.6-1.93-2.6-1.05 0-1.67.71-1.94 1.4-.1.25-.12.6-.12.95V21h-3.38s.04-10.77 0-11.9h3.38V11c.45-.69 1.25-1.67 3.03-1.67 2.22 0 3.94 1.45 3.94 4.57V21Z" />
        </svg>
      ) : (
        // X / Twitter default
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M18.244 2H21l-6.56 7.5L22 22h-6.9l-4.3-5.8L5.8 22H3l7.04-8.05L2 2h6.9l3.9 5.3L18.244 2Zm-2.4 18h2.1L8.3 4h-2.1l9.644 16Z" />
        </svg>
      )}
    </Link>
  );
}











