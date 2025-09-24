"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ChainRow = {
  id: number;
  node_id: string;
  ts: number;
  nonce: string | null;
  sig: string | null;
  lat: number | null;
  lon: number | null;
  type?: string | null;
};

type Profile = {
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  privacy?: "zone" | "global" | "hidden" | string;
};

export default function SignalProfilePage() {
  // ✅ All hooks stay inside the component body
  const params = useParams<{ nodeId: string }>();
  const nodeParam = (params?.nodeId ?? "").toString();

  const [url, setUrl] = useState("");
  const [showGenesis, setShowGenesis] = useState(false);

  // profile state (from localStorage)
  const [profile, setProfile] = useState<Profile>({});

  // timeline state
  const [blocks, setBlocks] = useState<ChainRow[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !nodeParam) return;

    // Build canonical URL for QR/share
    try {
      setUrl(`${window.location.origin}/signal/${encodeURIComponent(nodeParam)}`);
    } catch {}

    // One-time “Genesis welcome” flag from the wizard
    try {
      const flag = sessionStorage.getItem("mesh:showGenesisWelcome");
      if (flag === "1") {
        setShowGenesis(true);
        sessionStorage.removeItem("mesh:showGenesisWelcome");
      }
    } catch {}

    // Load profile from localStorage (if present)
    try {
      const raw = localStorage.getItem(`profile:${nodeParam}`);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}

    // Load recent chain rows (defensive)
    let alive = true;
    (async () => {
      try {
        setLoadingBlocks(true);
        const qs = new URLSearchParams({ nodeId: String(nodeParam), limit: "10" });
        const res = await fetch(`/api/diag/last?${qs.toString()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`diag status ${res.status}`);
        const json = await res.json().catch(() => ({}));
        if (!alive) return;
        const rows: ChainRow[] = Array.isArray(json?.rows) ? json.rows : [];
        setBlocks(rows);
      } catch {
        if (alive) setBlocks([]); // graceful fallback
      } finally {
        if (alive) setLoadingBlocks(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [nodeParam]);

  if (!nodeParam) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-zinc-100 p-6">
        <p>No node ID provided.</p>
      </main>
    );
  }

  const qrSvg = url ? `/api/qr?text=${encodeURIComponent(url)}&format=svg&size=256&margin=1` : "";

  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100 flex flex-col items-center justify-center p-6">
      {/* Welcome modal (only once after Genesis) */}
      {showGenesis && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70">
          <div className="relative w-full max-w-lg rounded-2xl border border-yellow-500/40 bg-neutral-950/90 p-8 shadow-xl">
            <span className="absolute right-4 top-4 rounded-md bg-yellow-600/20 px-2 py-1 text-xs font-semibold text-yellow-400">
              SC Active
            </span>
            <h1 className="mb-4 text-center text-3xl font-bold text-yellow-400">Welcome to the Meshwork</h1>
            <p className="mb-3 text-center text-xl font-semibold text-white">
              A Genesis spark ignites — your Signal Chain awakens.
            </p>
            <p className="mb-6 text-center text-sm text-neutral-300">
              Every action you take from this moment will be inscribed into your SC — your personal blockchain, yours to guide and control.
            </p>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={`/signal/${encodeURIComponent(nodeParam)}/edit`}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-neutral-800"
              >
                Edit Profile
              </a>
              <a
                href="/meshwork/getting-started"
                className="rounded-lg border border-neutral-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-neutral-800"
              >
                Post Thread
              </a>
              <a
                href="#signal-chain"
                onClick={() => setShowGenesis(false)}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-neutral-800"
              >
                View SC
              </a>
            </div>
            <p className="text-center text-xs text-neutral-500">
              Current Privacy Mode: <span className="capitalize">{profile?.privacy || "zone"}</span> • You can change this anytime.
            </p>
            <button
              onClick={() => setShowGenesis(false)}
              className="absolute right-4 bottom-4 rounded-md px-3 py-1 text-xs text-neutral-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header with avatar/name if present */}
      <div className="mt-2 flex items-center gap-3">
        {profile?.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-10 w-10 rounded-full ring-1 ring-white/10 object-cover"
          />
        ) : null}
        <div>
          <h1 className="text-2xl font-semibold text-teal-300">
            {profile?.displayName?.trim() || "Signal Profile"}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Node: <strong className="font-mono">{nodeParam}</strong>
            {profile?.privacy ? (
              <span className="ml-2 text-xs text-zinc-500">• privacy: {profile.privacy}</span>
            ) : null}
          </p>
        </div>
      </div>

      {/* QR */}
      {qrSvg && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <img
              src={qrSvg}
              alt={`QR for ${nodeParam}`}
              width={256}
              height={256}
              className="rounded-md bg-white p-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={qrSvg.replace("format=svg", "format=png")}
              download={`${nodeParam}.png`}
              className="rounded border border-white/10 px-3 py-1 text-xs hover:bg-white/5"
            >
              Download PNG
            </a>
            <a
              href={qrSvg}
              download={`${nodeParam}.svg`}
              className="rounded border border-white/10 px-3 py-1 text-xs hover:bg-white/5"
            >
              Download SVG
            </a>
            <button
              className="rounded border border-white/10 px-3 py-1 text-xs hover:bg-white/5"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(url);
                  alert("Profile link copied.");
                } catch {}
              }}
            >
              Share / Copy
            </button>
          </div>
          <p className="text-xs text-zinc-500 break-all">{url}</p>
        </div>
      )}

      {/* Signal Chain timeline */}
      <section id="signal-chain" className="mt-10 w-full max-w-xl">
        <div className="mb-3 flex items-center gap-2">
          <img
            src="/assets/meshwork/signal-chain-icon.png"
            alt=""
            width={18}
            height={18}
            className="opacity-90"
          />
          <h2 className="text-lg font-bold text-yellow-400">Signal Chain</h2>
        </div>

        {loadingBlocks ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            Loading…
          </div>
        ) : blocks.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            <div className="flex items-center gap-3">
              <img
                src="/assets/meshwork/empty-signal.png"
                alt=""
                width={48}
                height={48}
                className="rounded"
              />
              <div>
                <p>No blocks to display yet.</p>
                <p className="mt-1 text-xs text-zinc-400">
                  Post a thread to begin your Signal Chain.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* left-side vertical connector */}
            <div className="absolute left-3 top-2 bottom-2 w-[2px] opacity-70">
              <img
                src="/assets/meshwork/timeline-connector.png"
                alt=""
                className="h-full w-[2px] object-cover"
              />
            </div>

            <ul className="space-y-4 pl-8">
              {blocks.map((b, i) => {
                const isGenesis = i === blocks.length - 1; // flip if your API is oldest-first
                const title = b.type || (isGenesis ? "Genesis" : "Thread Posted");
                const when = new Date(b.ts).toLocaleString();
                const hashSnippet = (b.sig || "").slice(0, 18);
                return (
                  <li key={b.id ?? `${b.ts}-${i}`} className="relative">
                    <img
                      src={isGenesis ? "/assets/meshwork/genesis-icon.png" : "/assets/meshwork/timeline-dot.png"}
                      alt=""
                      width={16}
                      height={16}
                      className="absolute left-0 top-2 -translate-x-1.5"
                    />
                    <div className="rounded-md border border-neutral-800 bg-neutral-950/60 p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">{title}</p>
                        <span className="text-xs text-neutral-400">{when}</span>
                      </div>
                      <div className="mt-1 grid gap-1 text-xs">
                        <div className="font-mono text-neutral-500">
                          sig: <span className="truncate inline-block align-bottom">{hashSnippet}…</span>
                        </div>
                        {Number.isFinite(b.lat as number) && Number.isFinite(b.lon as number) ? (
                          <div className="text-neutral-400">
                            loc: {b.lat!.toFixed(3)}, {b.lon!.toFixed(3)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <p className="mt-6 text-zinc-400 text-sm text-center max-w-md">
        This profile is the entry to your <strong>Signal Chain (SC)</strong>. Your first
        thread becomes your <strong>Genesis block</strong>. Future versions will show your
        SC history, privacy mode, and WEave integrations.
      </p>
    </main>
  );
}



