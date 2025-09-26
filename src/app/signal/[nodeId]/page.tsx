"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import QRCodeImg from "@/components/meshwork/QRCodeImg";
import Glyph from "@/components/ui/Glyph";
import { cn } from "@/lib/utils";

type NodeRow = { node_id: string; last_seen: number; lat: number; lon: number };

type ChainPost = {
  id: string;
  nodeId: string;
  ts: number;
  kind: "text" | "image";
  text?: string;
  imageUrl?: string;
  lat?: number;
  lon?: number;
};

function useLocalChain(nodeId: string) {
  const key = `signal:posts:${nodeId}`;
  const [posts, setPosts] = useState<ChainPost[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setPosts(JSON.parse(raw));
    } catch {}
  }, [key]);
  const save = (items: ChainPost[]) => {
    setPosts(items);
    try { localStorage.setItem(key, JSON.stringify(items)); } catch {}
  };
  const add = (p: ChainPost) => save([p, ...posts]);
  return { posts, add };
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm ring-1",
        active ? "bg-teal-400/10 ring-teal-300/40 text-teal-100" : "ring-white/10 text-zinc-300 hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}

export default function SignalProfilePage() {
  const { nodeId: raw } = useParams<{ nodeId: string }>();
  const nodeId = String(raw || "");
  const profileUrl = useMemo(
    () => (typeof window !== "undefined" ? `${location.origin}/signal/${nodeId}` : ""),
    [nodeId]
  );

  const [tab, setTab] = useState<"overview" | "chain" | "post" | "share" | "settings">("overview");
  const [latest, setLatest] = useState<NodeRow | null>(null);

  const { posts, add } = useLocalChain(nodeId);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/nodes", { cache: "no-store" });
        const json = await res.json();
        const row = (json?.nodes as NodeRow[] | undefined)?.find((n) => n.node_id === nodeId) || null;
        if (alive) setLatest(row || null);
      } catch {}
    })();
    return () => { alive = false; };
  }, [nodeId]);

  if (!nodeId) {
    return <main className="min-h-screen bg-[#0B0F14] text-zinc-100 p-6">No node ID.</main>;
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100">
      {/* Banner */}
      <header className="border-b border-white/10 bg-gradient-to-b from-black/20 to-transparent">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-[11px] tracking-[0.18em] text-teal-300/80">SIGNAL • PROFILE</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Signal Profile — <span className="text-teal-300">{nodeId}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-300">
            Share your QR, post to your chain, and tune your presence.
          </p>

          <div className="relative mt-6 aspect-[16/6] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src="/assets/meshwork/signal-profile-banner.png"
              alt="Signal banner"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>Overview</TabButton>
            <TabButton active={tab === "chain"} onClick={() => setTab("chain")}>Signal Chain</TabButton>
            <TabButton active={tab === "post"} onClick={() => setTab("post")}>Post</TabButton>
            <TabButton active={tab === "share"} onClick={() => setTab("share")}>Share</TabButton>
            <TabButton active={tab === "settings"} onClick={() => setTab("settings")}>Settings</TabButton>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {tab === "overview" && (
          <>
            <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
              <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="font-medium flex items-center gap-2">
                  <Glyph name="beacon" className="text-[#e7d08c]" />
                  Your Node
                </h3>
                <div className="mt-3 text-sm text-zinc-300">
                  <div className="font-mono text-zinc-200">{nodeId}</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {latest
                      ? <>Last seen: {new Date(latest.last_seen).toLocaleString()} — ({latest.lat.toFixed(3)}, {latest.lon.toFixed(3)})</>
                      : "No recent presence detected."}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href="/meshwork/getting-started" className="rounded-lg px-3 py-1.5 ring-1 ring-white/15 hover:bg-white/10 text-sm">
                    Post a new Signal
                  </Link>
                  <a href="/meshwork#map" className="rounded-lg px-3 py-1.5 ring-1 ring-white/15 hover:bg-white/10 text-sm">
                    View on Live Map
                  </a>
                </div>
              </article>

              <aside className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="font-medium flex items-center gap-2">
                  <Glyph name="signal" className="text-[#e7d08c]" />
                  Your QR
                </h3>
                <div className="mt-3">
                  <QRCodeImg
                    text={profileUrl}
                    size={220}
                    fg="e6d9a8"
                    bg="00000000"
                    className="rounded-xl p-3 bg-black/40 border border-white/10 inline-block"
                    title="Scan to open this profile"
                  />
                </div>
                <p className="mt-3 text-xs text-zinc-400 break-all">{profileUrl}</p>
              </aside>
            </div>

            {/* NEW: Signal Volts / Conservator panel */}
            <SVPanel nodeId={nodeId} />
          </>
        )}

        {tab === "chain" && (
          <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="font-medium flex items-center gap-2">
              <Glyph name="chain" className="text-[#e7d08c]" />
              Signal Chain
            </h3>
            <p className="mt-2 text-sm text-zinc-300">
              Demo: shows local posts (saved to your browser) plus your presence. We’ll wire a real API later.
            </p>

            <ul className="mt-4 space-y-3">
              {posts.length === 0 && (
                <li className="text-sm text-zinc-400">No posts yet. Try the <span className="text-zinc-200">Post</span> tab.</li>
              )}
              {posts.map((p) => (
                <li key={p.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-zinc-400">{new Date(p.ts).toLocaleString()}</div>
                  {p.kind === "text" && <p className="mt-1 text-sm text-zinc-200 whitespace-pre-wrap">{p.text}</p>}
                  {p.kind === "image" && p.imageUrl && (
                    <div className="mt-2 relative w-full max-w-md aspect-[16/10] overflow-hidden rounded-md">
                      <Image src={p.imageUrl} alt="post" fill className="object-cover" />
                    </div>
                  )}
                  {(p.lat != null && p.lon != null) && (
                    <div className="mt-2 text-xs text-zinc-400">
                      📍 {p.lat.toFixed(3)}, {p.lon.toFixed(3)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </article>
        )}

        {tab === "post" && <SignalComposer nodeId={nodeId} onCreated={add} />}

        {tab === "share" && (
          <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="font-medium">Share</h3>
            <div className="mt-3 flex flex-col md:flex-row items-start gap-6">
              <QRCodeImg
                text={profileUrl}
                size={260}
                fg="e6d9a8"
                bg="00000000"
                className="rounded-xl p-4 bg-black/40 border border-white/10 inline-block"
                title="Scan to open this profile"
              />
              <div className="space-y-2 text-sm">
                <button
                  className="rounded-lg px-3 py-2 ring-1 ring-white/15 hover:bg-white/10"
                  onClick={() => navigator.clipboard.writeText(profileUrl)}
                >
                  Copy profile URL
                </button>
                <a
                  className="block rounded-lg px-3 py-2 ring-1 ring-white/15 hover:bg-white/10"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`My Signal: ${profileUrl}`)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Share on X
                </a>
              </div>
            </div>
          </article>
        )}

        {tab === "settings" && (
          <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="font-medium">Settings</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Coming soon: display name, avatar, privacy mode, export chain JSON.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}

/** --- NEW: Signal Volts (SV) panel --- */
function SVPanel({ nodeId }: { nodeId: string }) {
  const key = `sv:${nodeId}`;
  type SVState = {
    balance: number;        // total SV
    unclaimed: number;      // accrual ready to claim
    lastClaimTs: number;    // ms
    streakDays: number;     // consecutive days with Signals
    tier: "Seed" | "Grove" | "Sanctum" | "Aether";
  };

  const [sv, setSv] = useState<SVState>({
    balance: 0,
    unclaimed: 0,
    lastClaimTs: 0,
    streakDays: 0,
    tier: "Seed",
  });

  // Demo accrual model (replace with API later):
  // - Base accrual per day from presence pings
  // - Streak multiplier
  // - Tier multiplier (based on balance)
  function computeTier(balance: number): SVState["tier"] {
    if (balance >= 50000) return "Aether";
    if (balance >= 15000) return "Sanctum";
    if (balance >= 3000)  return "Grove";
    return "Seed";
  }
  function tierMultiplier(tier: SVState["tier"]) {
    return tier === "Aether" ? 1.6 : tier === "Sanctum" ? 1.35 : tier === "Grove" ? 1.15 : 1.0;
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as SVState;
        // Re-evaluate tier in case thresholds changed
        const t = computeTier(parsed.balance);
        setSv({ ...parsed, tier: t });
      }
    } catch {}
  }, [key]);

  // Simulate passive accrual based on last presence & streak (demo)
  useEffect(() => {
    const iv = setInterval(() => {
      setSv((cur) => {
        // ~0.02 SV / min base (≈28.8 SV / day) just for demo
        const basePerMin = 0.02;
        const streakMult = 1 + Math.min(cur.streakDays, 30) * 0.01; // +1% / day up to 30%
        const tierMult = tierMultiplier(cur.tier);
        const delta = basePerMin * streakMult * tierMult;
        const next = { ...cur, unclaimed: Number((cur.unclaimed + delta).toFixed(3)) };
        try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
        return next;
      });
    }, 60_000);
    return () => clearInterval(iv);
  }, [key, sv.tier]);

  // Claim handler (moves unclaimed -> balance)
  const handleClaim = () => {
    setSv((cur) => {
      const nextBal = Number((cur.balance + cur.unclaimed).toFixed(3));
      const t = computeTier(nextBal);
      const next = {
        ...cur,
        balance: nextBal,
        unclaimed: 0,
        lastClaimTs: Date.now(),
        tier: t,
      };
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // Demo: bump streak quickly when user posts to chain (we’ll call this from composer)
  useEffect(() => {
    function onDemoPost() {
      setSv((cur) => {
        const next = { ...cur, streakDays: Math.min(cur.streakDays + 1, 365) };
        try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
        return next;
      });
    }
    window.addEventListener("signal:demoPost", onDemoPost);
    return () => window.removeEventListener("signal:demoPost", onDemoPost);
  }, []);

  return (
    <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1016] to-black p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <span className="text-[#e7d08c]">⚡</span> Signal Volts
        </h3>
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-[11px] tracking-wide",
            sv.tier === "Aether" ? "bg-yellow-300/15 text-yellow-200 ring-1 ring-yellow-200/30" :
            sv.tier === "Sanctum" ? "bg-teal-300/10 text-teal-200 ring-1 ring-teal-300/30" :
            sv.tier === "Grove" ? "bg-emerald-300/10 text-emerald-200 ring-1 ring-emerald-300/30" :
            "bg-white/5 text-zinc-300 ring-1 ring-white/15"
          )}
          title="Conservator tier"
        >
          {sv.tier.toUpperCase()}
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="text-xs text-zinc-400">Balance</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">{sv.balance.toLocaleString()} <span className="text-sm text-zinc-400">SV</span></div>
          <div className="mt-1 text-xs text-zinc-400">Last claim {sv.lastClaimTs ? new Date(sv.lastClaimTs).toLocaleString() : "—"}</div>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="text-xs text-zinc-400">Unclaimed</div>
          <div className="mt-1 text-2xl font-semibold text-yellow-200">{sv.unclaimed.toLocaleString()} <span className="text-sm text-zinc-400">SV</span></div>
          <button
            onClick={handleClaim}
            disabled={sv.unclaimed <= 0}
            className={cn(
              "mt-3 rounded-lg px-3 py-1.5 text-sm ring-1",
              sv.unclaimed > 0
                ? "bg-yellow-300/10 ring-yellow-300/40 hover:bg-yellow-300/15"
                : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"
            )}
          >
            Claim SV
          </button>
        </div>

        <div className="rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="text-xs text-zinc-400">Streak</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-100">{sv.streakDays} <span className="text-sm text-zinc-400">days</span></div>
          <div className="mt-1 text-xs text-zinc-400">
            Multiplier: {(1 + Math.min(sv.streakDays, 30) * 0.01).toFixed(2)}× + tier {sv.tier}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="text-xs text-zinc-400">
          SV accrues with active Signals and check-ins. Streaks + tiers amplify earnings.
        </div>
        <div className="text-xs text-zinc-400">
          Use SV for boosts, rituals, curation, and future AEverse artifacts.
        </div>
        <div className="text-xs text-zinc-400">
          This is a demo model; mainnet rules, sinks, and faucets can evolve via governance.
        </div>
      </div>
    </article>
  );
}

/** --- Composer (inline) --- */
function SignalComposer({
  nodeId,
  onCreated,
}: {
  nodeId: string;
  onCreated: (p: ChainPost) => void;
}) {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [busy, setBusy] = useState(false);

  function newId() {
    return (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)) + "-" + Date.now().toString(36);
  }
  const canPost = text.trim().length > 0 || imageUrl.trim().length > 0;

  async function handlePost() {
    setBusy(true);
    try {
      const p: ChainPost = {
        id: newId(),
        nodeId,
        ts: Date.now(),
        kind: imageUrl ? "image" : "text",
        text: text.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        lat: lat ? Number(lat) : undefined,
        lon: lon ? Number(lon) : undefined,
      };
      onCreated(p); // optimistic local append

      // Ping SV demo streak bump
      try { window.dispatchEvent(new Event("signal:demoPost")); } catch {}

      setText(""); setImageUrl(""); setLat(""); setLon("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h3 className="font-medium flex items-center gap-2">
        <Glyph name="signal" className="text-[#e7d08c]" />
        Post to your Signal Chain
      </h3>
      <p className="mt-2 text-sm text-zinc-300">Add a short message and/or an image. Coordinates optional (check-ins).</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-zinc-300">Message</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 p-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
            placeholder="What’s happening?"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-300">Image URL (optional)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 p-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
            placeholder="https://…"
          />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-zinc-300">Latitude</label>
              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 p-2 text-sm"
                placeholder="e.g. 37.78"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-300">Longitude</label>
              <input
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 p-2 text-sm"
                placeholder="-122.41"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          disabled={!canPost || busy}
          onClick={handlePost}
          className={cn(
            "rounded-xl px-4 py-2 text-sm ring-1",
            canPost && !busy
              ? "bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15"
              : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"
          )}
        >
          {busy ? "Posting…" : "Post to Chain"}
        </button>
        <Link href="/meshwork#map" className="rounded-xl px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/5">
          View Map
        </Link>
      </div>
    </article>
  );
}






