"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// --- tiny utils ---
const nowMs = () => Date.now();
const randHex = (len = 16) =>
  [...crypto.getRandomValues(new Uint8Array(len))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

async function hmacSha256Hex(secretUtf8: string, messageUtf8: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secretUtf8),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(messageUtf8));
  const bytes = new Uint8Array(sig);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// canonical string we sign (exactly matches what server verifies)
function makeCanonical({
  nodeId,
  stickerId,
  ts,
  nonce,
}: {
  nodeId: string;
  stickerId?: string | null;
  ts: number;
  nonce: string;
}) {
  return [nodeId, stickerId ?? "", String(ts), nonce].join("|");
}

type Step = 1 | 2 | 3;

export default function StartWizard() {
  const [step, setStep] = useState<Step>(1);

  // Inputs
  const [nodeId, setNodeId] = useState("");
  const [stickerId, setStickerId] = useState("");
  const [secret, setSecret] = useState("");
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");

  // Derived signing fields
  const [ts, setTs] = useState<number>(nowMs());
  const [nonce, setNonce] = useState<string>(randHex(8));
  const canonical = useMemo(
    () => makeCanonical({ nodeId, stickerId: stickerId || null, ts, nonce }),
    [nodeId, stickerId, ts, nonce]
  );

  // Result
  const [sig, setSig] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cryptoOk = typeof window !== "undefined" && !!window.crypto?.subtle;

  useEffect(() => {
    // refresh ts/nonce if user returns to Step 2
    if (step === 2) {
      setTs(nowMs());
      setNonce(randHex(8));
      setSig("");
      setError(null);
    }
  }, [step]);

  const canContinue1 = nodeId.trim().length > 0;
  const canSign =
    cryptoOk && secret.trim().length >= 8 && nodeId.trim().length > 0;

  async function handleSign() {
    try {
      setBusy(true);
      setError(null);
      const s = await hmacSha256Hex(secret.trim(), canonical);
      setSig(s);
      setStep(3);
    } catch (e: any) {
      setError(e?.message ?? "Failed to sign. Your browser may block WebCrypto.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSendPing() {
    try {
      setBusy(true);
      setError(null);
      const body = {
        nodeId: nodeId.trim(),
        stickerId: stickerId.trim() || null,
        ts,
        nonce,
        sig,
        lat: lat ? Number(lat) : undefined,
        lon: lon ? Number(lon) : undefined,
      };
      const res = await fetch("/api/mesh/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j?.ok !== true) {
        throw new Error(j?.error || `Ping failed (status ${res.status})`);
      }
      // success: nudge user to the live map section
      window.location.assign("/meshwork#map");
    } catch (e: any) {
      setError(e?.message ?? "Ping failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
        {/* header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Start here</h2>
            <p className="mt-1 text-sm text-zinc-300">
              Three tiny steps: name your node → sign a ping locally → send it.
              Your secret never leaves your browser.
            </p>
          </div>
          <Link
            href="/meshwork#map"
            className="hidden md:inline-block rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
          >
            View Live Map
          </Link>
        </div>

        {/* stepper bar */}
        <ol className="mt-5 grid grid-cols-3 gap-2 text-xs text-zinc-400">
          {["Node", "Sign", "Send"].map((label, i) => {
            const n = (i + 1) as Step;
            const active = step === n;
            const done = step > n;
            return (
              <li
                key={label}
                className={`rounded-lg px-3 py-2 border ${
                  active
                    ? "border-teal-400/50 bg-teal-400/10 text-teal-200"
                    : done
                    ? "border-white/15 bg-white/5 text-zinc-200"
                    : "border-white/10 bg-black/30"
                }`}
              >
                {i + 1}. {label}
              </li>
            );
          })}
        </ol>

        {/* STEP 1: Node */}
        {step === 1 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-sm">
                <span className="text-zinc-300">Node ID (required)</span>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400/40"
                  placeholder="e.g. my-node-001 or 0xabc…"
                  value={nodeId}
                  onChange={(e) => setNodeId(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="text-zinc-300">Sticker ID (optional)</span>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400/40"
                  placeholder="add later if you’ll label IRL"
                  value={stickerId}
                  onChange={(e) => setStickerId(e.target.value)}
                />
              </label>
              <p className="text-xs text-zinc-400">
                <strong>Why this matters:</strong> a stable{" "}
                <code className="rounded bg-white/5 px-1">nodeId</code> lets the
                Meshwork track your activity over time.
              </p>
              <div className="pt-2">
                <button
                  disabled={!canContinue1}
                  onClick={() => setStep(2)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${
                    canContinue1
                      ? "bg-teal-500/20 text-teal-100 ring-1 ring-teal-300/40 hover:bg-teal-500/30"
                      : "bg-white/5 text-zinc-400 ring-1 ring-white/10 cursor-not-allowed"
                  }`}
                >
                  Continue → Sign
                </button>
              </div>
            </div>

            <aside className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-sm font-semibold">What you’re doing</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Giving your node a name (ID). Later, you’ll sign one message
                proving “I’m here now” and send it. That’s it.
              </p>
            </aside>
          </div>
        )}

        {/* STEP 2: Sign */}
        {step === 2 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              {!cryptoOk && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                  Your browser doesn’t support WebCrypto Subtle — try a modern
                  Chromium, Firefox, or Safari.
                </div>
              )}
              <label className="block text-sm">
                <span className="text-zinc-300">Secret (never stored)</span>
                <input
                  type="password"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400/40"
                  placeholder="min 8 chars (use a password manager)"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-zinc-300">Latitude (optional)</span>
                  <input
                    inputMode="decimal"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400/40"
                    placeholder="37.7749"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-zinc-300">Longitude (optional)</span>
                  <input
                    inputMode="decimal"
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-400/40"
                    placeholder="-122.4194"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                  />
                </label>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                <p className="text-xs text-zinc-400">Message to sign</p>
                <pre className="mt-1 overflow-x-auto text-xs text-zinc-200">
{canonical}
                </pre>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleSign}
                  disabled={!canSign || busy}
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${
                    canSign && !busy
                      ? "bg-teal-500/20 text-teal-100 ring-1 ring-teal-300/40 hover:bg-teal-500/30"
                      : "bg-white/5 text-zinc-400 ring-1 ring-white/10 cursor-not-allowed"
                  }`}
                >
                  {busy ? "Signing…" : "Sign in Browser"}
                </button>

                {/* placeholder for future wallets */}
                <button
                  disabled
                  title="Wallet signing coming soon"
                  className="rounded-xl px-4 py-2 text-sm font-medium bg-white/5 text-zinc-400 ring-1 ring-white/10 cursor-not-allowed"
                >
                  Sign with Wallet (soon)
                </button>
              </div>

              <p className="text-xs text-zinc-400">
                We never send your secret to the server. Signatures are created
                locally and only the <em>signature</em> is transmitted.
              </p>
            </div>

            <aside className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-sm font-semibold">Why signing?</h3>
              <p className="mt-2 text-sm text-zinc-300">
                A signed ping is verifiable proof that your node sent the
                message at roughly this time (with a nonce to prevent replay).
              </p>
            </aside>
          </div>
        )}

        {/* STEP 3: Send */}
        {step === 3 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                <p className="text-xs text-zinc-400">Signature (hex)</p>
                <pre className="mt-1 overflow-x-auto text-xs text-zinc-200">
{sig}
                </pre>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendPing}
                  disabled={!sig || busy}
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${
                    sig && !busy
                      ? "bg-teal-500/20 text-teal-100 ring-1 ring-teal-300/40 hover:bg-teal-500/30"
                      : "bg-white/5 text-zinc-400 ring-1 ring-white/10 cursor-not-allowed"
                  }`}
                >
                  {busy ? "Sending…" : "Send Ping"}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl px-4 py-2 text-sm font-medium border border-white/10 hover:bg-white/5"
                >
                  Start Over
                </button>
                <Link
                  href="/meshwork#map"
                  className="rounded-xl px-4 py-2 text-sm font-medium border border-white/10 hover:bg-white/5"
                >
                  View Live Map
                </Link>
              </div>

              {error && (
                <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-200">
                  {error}
                </div>
              )}
              {!error && (
                <p className="text-xs text-zinc-400">
                  After success you’ll jump to the live map. New pings show up
                  within seconds.
                </p>
              )}
            </div>

            <aside className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h3 className="text-sm font-semibold">What we send</h3>
              <pre className="mt-2 overflow-x-auto text-xs text-zinc-200">
{JSON.stringify(
  {
    nodeId,
    stickerId: stickerId || null,
    ts,
    nonce,
    sig,
    lat: lat ? Number(lat) : undefined,
    lon: lon ? Number(lon) : undefined,
  },
  null,
  2
)}
              </pre>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
