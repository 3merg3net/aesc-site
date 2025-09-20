"use client";

import { useEffect, useMemo, useState } from "react";

type Step = 1 | 2 | 3;

export default function StartWizard() {
  const [step, setStep] = useState<Step>(1);

  // form state
  const [nodeId, setNodeId] = useState("");
  const [secret, setSecret] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // crypto availability (client only)
  const cryptoOk = typeof window !== "undefined" && !!window.crypto?.subtle;

  useEffect(() => setMsg(null), [step]);

  const canContinue1 = useMemo(() => nodeId.trim().length >= 4, [nodeId]);
  const canContinue2 = useMemo(
    () =>
      secret.trim().length >= 8 &&
      (!lat || !isNaN(Number(lat))) &&
      (!lon || !isNaN(Number(lon))),
    [secret, lat, lon]
  );

  async function handleSignAndSend() {
    setBusy(true);
    setMsg(null);
    try {
      const ts = Date.now();
      const nonce = cryptoOk
        ? window.crypto.randomUUID().replace(/-/g, "").slice(0, 16)
        : Math.random().toString(16).slice(2, 18);

      // UI calls it DePin; payload keeps server field name stickerId (null for now)
      const payload = {
        nodeId: nodeId.trim(),
        stickerId: null, // DePin can be added later; keeping API shape for now
        ts,
        nonce,
        lat: lat ? Number(lat) : undefined,
        lon: lon ? Number(lon) : undefined,
      };

      // Sign: HMAC-SHA256(secret, "nodeId|stickerId|ts|nonce")
      const base = `${payload.nodeId}|${payload.stickerId ?? ""}|${payload.ts}|${payload.nonce}`;
      const enc = new TextEncoder();
      const key = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sigBuf = await window.crypto.subtle.sign(
        "HMAC",
        key,
        enc.encode(base)
      );
      const sigHex = [...new Uint8Array(sigBuf)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Endpoint still /api/mesh/ping for now
      const res = await fetch("/api/mesh/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, sig: sigHex }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Failed to post thread");
      }

      setMsg("Thread posted. Opening map…");
      setTimeout(() => {
        window.location.assign("/meshwork#map");
      }, 900);
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
        We’ll help you create a Node ID, sign a thread, and see it on the live map.
      </p>

      {/* steps indicator */}
      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
        {["Node", "Sign", "Go Live"].map((label, i) => {
          const active = step === (i + 1);
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ${
                  active
                    ? "bg-teal-400/20 ring-teal-300 text-teal-200"
                    : "bg-white/5 ring-white/15"
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
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
              placeholder="e.g. 0xabc123... or my-node-01"
              value={nodeId}
              onChange={(e) => setNodeId(e.target.value)}
            />
            <p className="mt-2 text-xs text-zinc-400">
              Any stable string works. You can register this on-chain later via NodeRegistry for durability.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-zinc-300">
              A <strong>thread</strong> proves your node is active now. It includes your Node ID, timestamp and a random
              nonce, signed with your secret so others can trust it. You can also attach a <strong>DePin</strong> tag
              later (stored in the <code>stickerId</code> field).
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
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
              placeholder="min 8 chars"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
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
              Your secret is used locally to sign. We don’t store it. Add a <strong>DePin</strong> tag later to
              associate a physical or device identity (kept in <code>stickerId</code>).
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-zinc-300">
              We sign <code className="bg-black/40 px-1 rounded">nodeId|stickerId|ts|nonce</code> using HMAC-SHA256 with
              your secret. This proves the thread is really from you and fresh in time.
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
      )}

      {step === 3 && (
        <div className="mt-6">
          <p className="text-sm text-zinc-300">Done. Redirecting to the map…</p>
        </div>
      )}
    </div>
  );
}



