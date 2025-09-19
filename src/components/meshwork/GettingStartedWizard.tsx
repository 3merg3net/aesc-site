"use client";

import { useMemo, useState } from "react";

type PingDraft = {
  nodeId: string;
  stickerId?: string | null;
  ts: number;      // ms
  nonce: string;   // hex or uuid
  lat?: number | null;
  lon?: number | null;
};

const hexToBytes = (hex: string) => {
  const s = hex.trim().replace(/^0x/i, "");
  if (s.length % 2) throw new Error("Secret hex must have even length");
  const out = new Uint8Array(s.length / 2);
  for (let i = 0; i < s.length; i += 2) out[i / 2] = parseInt(s.slice(i, i + 2), 16);
  return out;
};
const bytesToHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");

async function hmacSha256Hex(secretHex: string, msg: string) {
  const keyData = hexToBytes(secretHex);
  const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return bytesToHex(mac);
}

export default function GettingStartedWizard() {
  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [nodeId, setNodeId] = useState("");
  const [stickerId, setStickerId] = useState("");
  const [secretHex, setSecretHex] = useState(""); // never sent to server
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");

  // Result state
  const [draft, setDraft] = useState<PingDraft | null>(null);
  const [sig, setSig] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canStep1 = nodeId.trim().length >= 3 && secretHex.trim().length >= 16; // simple guard

  // Prepare the message to sign
  const message = useMemo(() => {
    if (!draft) return "";
    // canonical message: nodeId|stickerId|ts|nonce
    const sId = draft.stickerId ? draft.stickerId : "";
    return `${draft.nodeId}|${sId}|${draft.ts}|${draft.nonce}`;
  }, [draft]);

  const handleStep1Continue = () => {
    setError(null);
    if (!canStep1) {
      setError("Please provide a Node ID (3+ chars) and a Secret (hex).");
      return;
    }
    const now = Date.now();
    const nonce = crypto.randomUUID().replace(/-/g, "");
    const d: PingDraft = {
      nodeId: nodeId.trim(),
      stickerId: stickerId.trim() || null,
      ts: now,
      nonce,
      lat: lat ? Number(lat) : null,
      lon: lon ? Number(lon) : null,
    };
    setDraft(d);
    setStep(2);
  };

  const handleSign = async () => {
    try {
      setError(null);
      if (!draft) return;
      const s = await hmacSha256Hex(secretHex, message);
      setSig(s);
      setStep(3);
    } catch (e: any) {
      setError(e?.message ?? "Failed to sign. Check your secret (hex).");
    }
  };

  const handleSend = async () => {
    if (!draft || !sig) return;
    setSending(true);
    setError(null);
    try {
      const payload: any = {
        nodeId: draft.nodeId,
        stickerId: draft.stickerId,
        ts: draft.ts,
        nonce: draft.nonce,
        sig,
      };
      if (Number.isFinite(draft.lat)) payload.lat = draft.lat;
      if (Number.isFinite(draft.lon)) payload.lon = draft.lon;

      const res = await fetch("/api/mesh/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j?.ok !== true) {
        throw new Error(j?.error || `Ping failed (${res.status})`);
      }
      setSentOk(true);
    } catch (e: any) {
      setSentOk(false);
      setError(e?.message ?? "Failed to send ping.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
      {/* Stepper header */}
      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-300/80">
        <span className={`px-2 py-1 rounded ${step === 1 ? "bg-white/10" : "bg-black/30"}`}>1. Node</span>
        <span className={`px-2 py-1 rounded ${step === 2 ? "bg-white/10" : "bg-black/30"}`}>2. Sign</span>
        <span className={`px-2 py-1 rounded ${step === 3 ? "bg-white/10" : "bg-black/30"}`}>3. Send</span>
      </div>

      {/* Errors */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* STEP 1: Node inputs */}
      {step === 1 && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Node ID *</label>
              <input
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
                placeholder="my-node-001"
                className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-teal-400/40"
              />
              <p className="mt-1 text-xs text-slate-400">A stable identifier for your node (will be visible on map).</p>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Sticker ID (optional)</label>
              <input
                value={stickerId}
                onChange={(e) => setStickerId(e.target.value)}
                placeholder="0xABCDEF… (if you plan to add a physical label later)"
                className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-teal-400/40"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Secret (hex) *</label>
              <input
                value={secretHex}
                onChange={(e) => setSecretHex(e.target.value)}
                placeholder="a1b2c3d4…"
                className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-teal-400/40"
              />
              <p className="mt-1 text-xs text-slate-400">
                Used locally to sign the ping. <strong>Never sent</strong> to the server.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Lat (optional)</label>
                <input
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="37.774"
                  className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-teal-400/40"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Lon (optional)</label>
                <input
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  placeholder="-122.419"
                  className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-teal-400/40"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 mt-2 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Continue to create a ping draft (timestamp + nonce) we’ll sign in your browser.
            </p>
            <button
              onClick={handleStep1Continue}
              className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2 text-sm hover:bg-teal-300/15"
            >
              Continue → Sign
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Preview + sign */}
      {step === 2 && draft && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-200 overflow-x-auto">
            <pre className="whitespace-pre">{JSON.stringify({
              nodeId: draft.nodeId,
              stickerId: draft.stickerId ?? null,
              ts: draft.ts,
              nonce: draft.nonce,
              lat: draft.lat ?? null,
              lon: draft.lon ?? null,
            }, null, 2)}</pre>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">We sign: <code className="bg-white/5 px-1 rounded">{`${draft.nodeId}|${draft.stickerId ?? ""}|${draft.ts}|${draft.nonce}`}</code></p>
            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
              >
                Back
              </button>
              <button
                onClick={handleSign}
                className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2 text-sm hover:bg-teal-300/15"
              >
                Sign in Browser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Signature + send */}
      {step === 3 && draft && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-200 overflow-x-auto">
            <pre className="whitespace-pre">{JSON.stringify({
              nodeId: draft.nodeId,
              stickerId: draft.stickerId ?? null,
              ts: draft.ts,
              nonce: draft.nonce,
              sig,
              lat: draft.lat ?? null,
              lon: draft.lon ?? null,
            }, null, 2)}</pre>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Ready to POST to <code className="bg-white/5 px-1 rounded">/api/mesh/ping</code>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
              >
                Back
              </button>
              <button
                disabled={sending}
                onClick={handleSend}
                className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-4 py-2 text-sm hover:bg-teal-300/15 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Ping"}
              </button>
            </div>
          </div>

          {sentOk && (
            <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-200">
              Ping accepted! Open the <a className="underline" href="/meshwork#map">live map</a> — your node should appear within seconds.
            </div>
          )}
          {sentOk === false && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              Ping failed. {error ? `(${error})` : ""} Check your secret/clock and try again.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

