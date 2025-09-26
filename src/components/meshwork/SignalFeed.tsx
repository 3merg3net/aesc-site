"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Signal = {
  id: string;
  content: string | null;
  media_url: string | null;
  ts: string;
  lat: number | null;
  lon: number | null;
};

export default function SignalFeed({ nodeId }: { nodeId: string }) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/signal/list?nodeId=${encodeURIComponent(nodeId)}&t=${Date.now()}`, { cache: "no-store" });
      const json = await res.json();
      if (json?.ok) setSignals(json.signals);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [nodeId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Recent Signals</h3>
        <button onClick={load} disabled={loading} className="rounded-md px-2 py-1 text-xs ring-1 ring-white/10 hover:bg-white/5">
          {loading ? "…" : "Reload"}
        </button>
      </div>

      {signals.length === 0 && !loading && <p className="text-sm text-zinc-400">No signals yet.</p>}

      {signals.map((s) => (
        <article key={s.id} className="rounded-xl border border-white/10 bg-black/40 p-4">
          {s.content && <p className="text-sm whitespace-pre-wrap">{s.content}</p>}
          {s.media_url && (
            <div className="mt-2 relative w-full h-60">
              <Image src={s.media_url} alt="signal media" fill className="object-cover rounded-lg" />
            </div>
          )}
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
            <span>{new Date(s.ts).toLocaleString()}</span>
            {s.lat != null && <span>📍 {s.lat.toFixed(3)}, {s.lon?.toFixed(3)}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
