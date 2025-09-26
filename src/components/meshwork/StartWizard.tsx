"use client";

import { useEffect, useMemo, useState } from "react";

type Step = 1 | 2 | 3;

// Build-time injected; safe for client because it's demo-only
const SHARED = process.env.NEXT_PUBLIC_DEMO_SHARED_SECRET || "";

// Helpers
function genNodeId() {
  const h = (n = 6) =>
    Array.from(crypto.getRandomValues(new Uint8Array(n)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, n);
  return `aesc-${h(6)}-${h(6)}`;
}

function genSecret() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sigBuf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function StartWizard() {
  const [step, setStep] = useState<Step>(1);

  const [nodeId, setNodeId] = useState("");
  const [secret, setSecret] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const cryptoOk = typeof window !== "undefined" && !!window.crypto?.subtle;

  useEffect(() => setMsg(null), [step]);

  // Autofill
  useEffect(() => {
    if (!nodeId && cryptoOk) setNodeId(genNodeId());
    if (!secret && cryptoOk) setSecret(genSecret());
  }, [cryptoOk]); // once crypto is available

  const canContinue1 = useMemo(() => nodeId.trim().length >= 4, [nodeId]);
  const canContinue2 = useMemo(
    () => secret.trim().length >= 8 && (!lat || !isNaN(Number(lat))) && (!lon || !isNaN(Number(lon))),
    [secret, lat, lon]
  );

  async function handleSignAndSend() {
    setBusy(true);
    setMsg(null);
    try {
      if (!cryptoOk) throw new Error("Secure crypto not available (use localhost or HTTPS).");

      const ts = Date.now();
      const nonce = (crypto.randomUUID?.() ?? Math.random().toString(16).slice(2)).replace(/-/g, "").slice(0, 16);

      // NOTE: For the demo, both client & server use the same shared secret.
      // If SHARED is present, we ignore the user-entered secret when signing.
      const signingSecret = SHARED || secret;

      const payload = {
        nodeId: nodeId.trim(),
        stickerId: null,
        ts,
        nonce,
        lat: lat ? Number(lat) : undefined,
        lon: lon ? Number(lon) : undefined,
      };

      const base = `${payload.nodeId}|${payload.stickerId ?? ""}|${payload.ts}|${payload.nonce}`;
      const sigHex = await hmacHex(signingSecret, base);

      const res = await fetch("/api/mesh/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, sig: sigHex }),
      });

      const raw = await res.text();
      let json: any = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {}

      if (!res.ok || !json?.ok) {
        const reason = (json && (json.error || json.message)) || (raw && raw.slice(0, 300)) || `HTTP ${res.status}`;
        throw new Error(`Server error: ${reason}`);
      }

      // after server returns ok…
try {
  const center = {
    nodeId: payload.nodeId,
    lat: Number.isFinite(payload.lat as number) ? payload.lat : undefined,
    lon: Number.isFinite(payload.lon as number) ? payload.lon : undefined,
    ts,
  };
  sessionStorage.setItem("lastThreadCenter", JSON.stringify(center));
  sessionStorage.setItem("mesh:last", JSON.stringify(center));
  sessionStorage.setItem("mesh:lastProfile", `/signal/${encodeURIComponent(payload.nodeId)}`);
} catch {}

setMsg("Signal posted. Opening profile…");
const profileUrl = `/signal/${encodeURIComponent(payload.nodeId)}`;
window.open(profileUrl, "_blank", "noopener,noreferrer");
setTimeout(() => {
  const q = new URLSearchParams({
    justPosted: "1",
    nodeId: payload.nodeId,
    ...(payload.lat != null ? { lat: String(payload.lat) } : {}),
    ...(payload.lon != null ? { lon: String(payload.lon) } : {}),
  });
  window.location.assign(`/meshwork#map?${q.toString()}`);
}, 500);

    } catch (e: any) {
      setMsg(e?.message || "Signing or post failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
      <h2 className="text-xl font-semibold">Start Here — 3-Step Signal Wizard</h2>
      <p className="mt-2 text-sm text-zinc-300">
        We’ll help you create a Node ID, sign your first Signal (Genesis), and see it on the live map.
      </p>

      {/* steps indicator */}
      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
        {["Node", "Sign", "Go Live"].map((label, i) => {
          const active = step === (i + 1);
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ${
                  active ? "bg-teal-400/20 ring-teal-300 text-teal-200" : "bg-white/5 ring-white/15"
                }`}
              >
                {i + 1}
              </span>
              <span className={active ? "text-teal-200" : ""}>{label}</span>
              {i < 2 && <span className="mx-2 opacity-40">›</span>}
            </div>
          );
        })}
      </div>

      {/* step panes */}
      {step === 1 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-zinc-300">Node ID</label>
            <div className="mt-1 flex gap-2">
              <input
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
                placeholder="e.g. aesc-xxxxxx-yyyyyy"
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
              />
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5"
                onClick={() => setNodeId(genNodeId())}
                title="Regenerate"
              >
                ↻
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Any stable string works. You can register this on-chain later via NodeRegistry.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-zinc-300">
              A <strong>Signal</strong> proves your node is active now. It includes Node ID, timestamp, and a random
              nonce, signed with your secret so others can trust it. The first Signal is <strong>Genesis</strong>. You
              can attach a <strong>DePin</strong> tag later (kept in <code>stickerId</code>).
            </p>
          </div>

          <div className="md:col-span-2">
            <button
              disabled={!canContinue1}
              onClick={() => setStep(2)}
              className={`rounded-xl px-4 py-2 text-sm ring-1 ${
                canContinue1
                  ? "bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15"
                  : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"
              }`}
            >
              Continue to Sign →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-zinc-300">Secret (HMAC key)</label>
            <div className="mt-1 flex gap-2">
              <input
                type="password"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
                placeholder="min 8 chars"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                disabled={!!SHARED}
              />
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5 disabled:opacity-50"
                onClick={() => setSecret(genSecret())}
                disabled={!!SHARED}
                title={SHARED ? "Using shared demo secret" : "Regenerate"}
              >
                ↻
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-zinc-300">Latitude (optional)</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  placeholder="e.g. 37.78"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Longitude (optional)</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
                  placeholder="-122.41"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                />
              </div>
            </div>
            {SHARED && (
              <p className="mt-2 text-xs text-emerald-300/80">Using demo shared secret for signing (client & server match).</p>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-zinc-300">
              We sign <code className="bg-black/40 px-1 rounded">nodeId|stickerId|ts|nonce</code> using HMAC-SHA256.
            </p>
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              disabled={!canContinue2 || busy}
              onClick={handleSignAndSend}
              className={`rounded-xl px-4 py-2 text-sm ring-1 ${
                canContinue2 && !busy
                  ? "bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15"
                  : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"
              }`}
            >
              {busy ? "Posting…" : "Post Signal →"}
            </button>
            <button onClick={() => setStep(1)} className="rounded-xl px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5">
              ← Back
            </button>
            {msg && <span className="text-xs text-zinc-300">{msg}</span>}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <p className="text-sm text-zinc-300">Done. Redirecting…</p>
        </div>
      )}
    </div>
  );
}

















