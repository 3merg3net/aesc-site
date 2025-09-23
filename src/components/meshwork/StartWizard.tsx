"use client";

import { useEffect, useMemo, useState } from "react";

type Step = 1 | 2 | 3;

function randBase36(n = 6) {
  return Array.from(crypto.getRandomValues(new Uint8Array(n)))
    .map((b) => (b % 36).toString(36))
    .join("");
}

function generateNodeId() {
  const ts = Date.now().toString(36).slice(-4);
  return `node-Æ${ts}-${randBase36(6)}`;
}

function hex(bytes = 32) {
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  return [...buf].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function StartWizard() {
  const [step, setStep] = useState<Step>(1);

  // form state
  const [nodeId, setNodeId] = useState("");
  const [seed, setSeed] = useState("");       // local helper/entropy (not sent)
  const [secret, setSecret] = useState("");   // HMAC key (local only)
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const cryptoOk = typeof window !== "undefined" && !!window.crypto?.subtle;

  // initial generation
  useEffect(() => {
    try {
      const preNode = generateNodeId();
      const preSeed = hex(32);
      const preSecret = hex(32);
      setNodeId(preNode);
      setSeed(preSeed);
      setSecret(preSecret);
      sessionStorage.setItem("mesh:seed", preSeed);
      sessionStorage.setItem("mesh:secret", preSecret);
    } catch {}
  }, []);

  useEffect(() => setMsg(null), [step]);

  const canContinue1 = useMemo(() => nodeId.trim().length >= 4, [nodeId]);
  const canContinue2 = useMemo(
    () =>
      secret.trim().length >= 8 &&
      (!lat || !isNaN(Number(lat))) &&
      (!lon || !isNaN(Number(lon))),
    [secret, lat, lon]
  );

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_BASE_URL || "");

  const profileUrl =
    origin ? `${origin}/profile/${encodeURIComponent(nodeId || "")}` : "";

  async function handleSignAndSend() {
    setBusy(true);
    setMsg(null);
    try {
      const ts = Date.now();
      const nonce = (typeof window !== "undefined" && window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : Math.random().toString(16).slice(2)
      ).replace(/-/g, "").slice(0, 16);

      const payload = {
        nodeId: nodeId.trim(),
        stickerId: null, // DePin later; keep API shape
        ts,
        nonce,
        lat: lat ? Number(lat) : undefined,
        lon: lon ? Number(lon) : undefined,
      };

      // HMAC-SHA256(secret, "nodeId|stickerId|ts|nonce")
      const base = `${payload.nodeId}|${payload.stickerId ?? ""}|${payload.ts}|${payload.nonce}`;
      const enc = new TextEncoder();
      const key = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sigBuf = await window.crypto.subtle.sign("HMAC", key, enc.encode(base));
      const sigHex = [...new Uint8Array(sigBuf)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      const res = await fetch("/api/mesh/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, sig: sigHex }),
      });

      const raw = await res.text();
      let json: any = null;
      try { json = raw ? JSON.parse(raw) : null; } catch {}

      if (!res.ok || !json?.ok) {
        const reason = (json && (json.error || json.message)) || (raw && raw.slice(0, 300)) || `HTTP ${res.status}`;
        throw new Error(`Server error: ${reason}`);
      }

      // Persist echo for MeshPanel
      try {
        const last = { nodeId: payload.nodeId, lat: payload.lat, lon: payload.lon, ts: payload.ts };
        sessionStorage.setItem("lastThreadCenter", JSON.stringify(last));
        sessionStorage.setItem("mesh:last", JSON.stringify(last));
      } catch {}

      // Redirect with params so MeshPanel shows the success ribbon and animates
      const params = new URLSearchParams({ justPosted: "1", nodeId: payload.nodeId });
      if (Number.isFinite(payload.lat as number)) params.set("lat", String(payload.lat));
      if (Number.isFinite(payload.lon as number)) params.set("lon", String(payload.lon));

      setMsg("Thread posted. Opening map…");
      setTimeout(() => {
        window.location.assign(`/meshwork?${params.toString()}#map`);
      }, 700);
    } catch (e: any) {
      setMsg(e?.message || "Signing or post failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6">
      <h2 className="text-xl font-semibold">Start Here — 3-Step Thread Wizard</h2>
      <p className="mt-2 text-sm text-zinc-300">
        We’ll help you create a Node ID, auto-generate a secret, sign a thread, and see it on the live map.
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

      {/* STEP 1 */}
      {step === 1 && (
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr,280px]">
          <div>
            <label className="text-sm text-zinc-300">Node ID</label>
            <div className="mt-1 flex gap-2">
              <input
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
                placeholder="e.g. node-Æ8k3f-7q2c9x"
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
              />
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10"
                onClick={() => {
                  const nid = generateNodeId();
                  const s = hex(32);
                  setNodeId(nid);
                  setSeed(s);
                  try {
                    sessionStorage.setItem("mesh:seed", s);
                  } catch {}
                }}
              >
                Generate
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Any stable string works. You can register this on-chain later via NodeRegistry for durability.
            </p>

            <div className="mt-3">
              <label className="text-sm text-zinc-300">Local Seed (keep this safe)</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  readOnly
                  value={seed}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[12px] font-mono text-zinc-300"
                />
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10"
                  onClick={() => navigator.clipboard.writeText(seed)}
                >
                  Copy
                </button>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Stored locally (session). Wallets will replace this later.
              </p>
            </div>
          </div>

          {/* Node Profile QR (based on nodeId) */}
          <aside className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-zinc-400">Node Profile QR</p>
            <div className="mt-2 rounded-lg bg-black/60 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="QR code"
                src={`/api/qr?type=svg&text=${encodeURIComponent(profileUrl || nodeId)}`}
                className="mx-auto h-auto w-full max-w-[220px]"
              />
            </div>
            {profileUrl && (
              <a
                className="mt-3 inline-block rounded-lg px-3 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10"
                href={`/api/qr?type=png&text=${encodeURIComponent(profileUrl)}`}
                download={`mesh-node-${encodeURIComponent(nodeId)}.png`}
              >
                Download PNG
              </a>
            )}
          </aside>

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

      {/* STEP 2 */}
      {step === 2 && (
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr,280px]">
          <div>
            <label className="text-sm text-zinc-300">HMAC Secret</label>
            <div className="mt-1 flex gap-2">
              <input
                type="password"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
                placeholder="auto-generated"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10"
                onClick={() => {
                  const s = hex(32);
                  setSecret(s);
                  try { sessionStorage.setItem("mesh:secret", s); } catch {}
                }}
              >
                Regenerate
              </button>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10"
                onClick={() => navigator.clipboard.writeText(secret)}
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Stored locally (session). Not uploaded. Keep safe.
            </p>

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
            <p className="mt-2 text-xs text-zinc-400">
              We sign <code className="bg-black/40 px-1 rounded">nodeId|stickerId|ts|nonce</code> with HMAC-SHA256 using your secret. This proves the thread is really from you and fresh in time.
            </p>

            <div className="mt-3 flex items-center gap-3">
              <button
                disabled={!canContinue2 || busy}
                onClick={handleSignAndSend}
                className={`rounded-xl px-4 py-2 text-sm ring-1 ${
                  canContinue2 && !busy
                    ? "bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15"
                    : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"
                }`}
              >
                {busy ? "Posting…" : "Post Thread →"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="rounded-xl px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5"
              >
                ← Back
              </button>
              {msg && <span className="text-xs text-zinc-300">{msg}</span>}
            </div>
          </div>

          {/* Keep a QR preview here too (handy when printing a DePin sticker) */}
          <aside className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-zinc-400">Node Profile QR</p>
            <div className="mt-2 rounded-lg bg-black/60 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="QR code"
                src={`/api/qr?type=svg&text=${encodeURIComponent(profileUrl || nodeId)}`}
                className="mx-auto h-auto w-full max-w-[220px]"
              />
            </div>
            {profileUrl && (
              <a
                className="mt-3 inline-block rounded-lg px-3 py-2 text-xs ring-1 ring-white/15 hover:bg-white/10"
                href={`/api/qr?type=png&text=${encodeURIComponent(profileUrl)}`}
                download={`mesh-node-${encodeURIComponent(nodeId)}.png`}
              >
                Download PNG
              </a>
            )}
          </aside>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <p className="text-sm text-zinc-300">Done. Redirecting to the map…</p>
        </div>
      )}
    </div>
  );
}








