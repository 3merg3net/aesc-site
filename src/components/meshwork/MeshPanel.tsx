"use client";

import { useEffect, useState } from "react";

type NodeRow = { node_id: string; last_seen: number; lat: number; lon: number };
type Last = { nodeId?: string; lat?: number; lon?: number; ts?: number };

export default function MeshPanel() {
  const [last, setLast] = useState<Last | null>(null);
  const [recent, setRecent] = useState<NodeRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // pull last from sessionStorage (if wizard just posted)
    try {
      const raw = sessionStorage.getItem("lastThreadCenter");
      if (raw) setLast(JSON.parse(raw));
    } catch {}
    // also try “echo” from previous redirect (wizard already clears; user may reload)
    if (!last) {
      try {
        const raw2 = sessionStorage.getItem("mesh:last");
        if (raw2) setLast(JSON.parse(raw2));
      } catch {}
    }
  }, []);

  async function loadRecent() {
    try {
      setLoading(true);
      const res = await fetch("/api/nodes", { cache: "no-store" });
      const json = await res.json();
      if (json?.ok) {
        const nodes: NodeRow[] = json.nodes ?? [];
        // Show the 8 most recent that have coordinates
        const trimmed = nodes
          .filter((n) => Number.isFinite(n.lat) && Number.isFinite(n.lon))
          .sort((a, b) => b.last_seen - a.last_seen)
          .slice(0, 8);
        setRecent(trimmed);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecent();
  }, []);

  function flyTo(lat?: number, lon?: number, zoom = 6) {
    if (lat == null || lon == null) return;
    window.dispatchEvent(new CustomEvent("mesh:flyTo", { detail: { lat, lon, zoom } }));
  }

  return (
    <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-4 w-[320px] text-sm text-zinc-200">
      <h3 className="text-white/90 font-semibold">Mesh Panel</h3>

      {/* Last thread */}
      <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="text-xs text-zinc-400">Last thread</p>
        {last?.nodeId ? (
          <>
            <div className="mt-1">
              <span className="text-zinc-300">Node:</span>{" "}
              <span className="font-medium">{last.nodeId}</span>
            </div>
            {Number.isFinite(last.lat) && Number.isFinite(last.lon) ? (
              <div className="mt-1">
                <span className="text-zinc-300">Loc:</span>{" "}
                <span>{last.lat?.toFixed(3)}, {last.lon?.toFixed(3)}</span>
              </div>
            ) : (
              <p className="mt-1 text-zinc-400">No coordinates were included.</p>
            )}
            <div className="mt-2 flex gap-2">
              <button
                className="rounded-lg px-3 py-1 ring-1 ring-teal-300/40 bg-teal-400/10 hover:bg-teal-400/15"
                onClick={() => flyTo(last.lat, last.lon, 6)}
              >
                Locate my thread
              </button>
              <button
                className="rounded-lg px-3 py-1 ring-1 ring-white/15 hover:bg-white/10"
                onClick={() => window.dispatchEvent(new Event("mesh:refresh"))}
              >
                Refresh
              </button>
            </div>
          </>
        ) : (
          <p className="text-zinc-300">Post a thread in “Getting Started” to see it here.</p>
        )}
      </div>

      {/* Recent activity */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Recent activity</h4>
          <button
            className="text-xs rounded px-2 py-1 ring-1 ring-white/15 hover:bg-white/10"
            onClick={loadRecent}
            disabled={loading}
          >
            {loading ? "…" : "Reload"}
          </button>
        </div>
        <ul className="mt-2 space-y-1 max-h-48 overflow-auto pr-1">
          {recent.map((n) => (
            <li
              key={n.node_id}
              className="flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-white/5 cursor-pointer"
              onClick={() => flyTo(n.lat, n.lon, 5)}
              title={`Last seen ${new Date(n.last_seen).toLocaleString()}`}
            >
              <span className="truncate">{n.node_id}</span>
              <span className="text-xs text-zinc-400">
                {n.lat.toFixed(2)}, {n.lon.toFixed(2)}
              </span>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="text-zinc-400 text-xs">No recent nodes yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
