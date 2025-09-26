"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

type NodeRow = { node_id: string; last_seen: number; lat: number; lon: number };
type Last = { nodeId?: string; lat?: number; lon?: number; ts?: number };

type LastThread = {
  id: number;
  node_id: string;
  ts: number;
  nonce: string | null;
  sig: string | null;
  lat: number | null;
  lon: number | null;
};

function InnerPanel() {
  const [lastCenter, setLastCenter] = useState<Last | null>(null);
  const [lastRow, setLastRow] = useState<LastThread | null>(null);
  const [recent, setRecent] = useState<NodeRow[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [loadingLast, setLoadingLast] = useState(false);

  const hasCoords =
    Number.isFinite(lastCenter?.lat as number) && Number.isFinite(lastCenter?.lon as number);

  // helper -> talk to LiveMap
  const flyTo = (lat?: number, lon?: number, zoom = 6) => {
    if (lat == null || lon == null) return;
    window.dispatchEvent(new CustomEvent("mesh:flyTo", { detail: { lat, lon, zoom } }));
  };
  const pulseAt = (lat?: number, lon?: number) => {
    if (lat == null || lon == null) return;
    window.dispatchEvent(new CustomEvent("mesh:pulseAt", { detail: { lat, lon } }));
  };
  const refreshMap = () => window.dispatchEvent(new Event("mesh:refresh"));

  // Bootstrap from session
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lastThreadCenter");
      if (raw) setLastCenter(JSON.parse(raw));
    } catch {}
  }, []);

  // Load recent nodes
  const loadRecent = async () => {
    try {
      setLoadingRecent(true);
      const res = await fetch("/api/nodes", { cache: "no-store" });
      const json = await res.json();
      if (json?.ok) {
        const nodes: NodeRow[] = json.nodes ?? [];
        const trimmed = nodes
          .filter((n) => Number.isFinite(n.lat) && Number.isFinite(n.lon))
          .sort((a, b) => b.last_seen - a.last_seen)
          .slice(0, 8);
        setRecent(trimmed);
      }
    } finally {
      setLoadingRecent(false);
    }
  };
  useEffect(() => {
    loadRecent();
  }, []);

  // Load last row details for the focused node (if we have one)
  useEffect(() => {
    const node = lastCenter?.nodeId || "";
    if (!node) {
      setLastRow(null);
      return;
    }
    let alive = true;

    (async () => {
      try {
        setLoadingLast(true);
        const qs = new URLSearchParams({ nodeId: node, limit: "1" });
        const res = await fetch(`/api/diag/last?${qs.toString()}`, { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;
        const row: LastThread | null = json?.rows?.[0] ?? null;
        setLastRow(row);
      } catch {
        if (alive) setLastRow(null);
      } finally {
        if (alive) setLoadingLast(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [lastCenter?.nodeId]);

  return (
    <div className="pointer-events-auto w-[320px] rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-zinc-200 backdrop-blur">
      <h3 className="font-semibold text-white/90 flex items-center gap-2">
        Mesh Panel <Badge variant="gold">Conservator</Badge>
      </h3>

      {/* Last signal (from redirect/session) */}
      <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="text-xs text-zinc-400">Last signal</p>

        {lastCenter?.nodeId ? (
          <>
            <div className="mt-2">
              <span className="text-zinc-300">Node:</span>{" "}
              <span className="font-medium">{lastCenter.nodeId}</span>
            </div>

            {hasCoords ? (
              <div className="mt-1">
                <span className="text-zinc-300">Loc:</span>{" "}
                <span>{lastCenter.lat!.toFixed(3)}, {lastCenter.lon!.toFixed(3)}</span>
              </div>
            ) : (
              <p className="mt-1 text-zinc-400">No coordinates were included.</p>
            )}

            {/* DB-confirmed row details */}
            <div className="mt-2 rounded-md border border-white/10 bg-black/30 p-2 text-xs">
              {loadingLast && <div className="opacity-70">Loading confirmation…</div>}
              {!loadingLast && lastRow && (
                <div className="space-y-1">
                  <div>
                    <span className="text-zinc-400">Timestamp:</span>{" "}
                    {new Date(lastRow.ts).toLocaleString()}
                  </div>
                  <div>
                    <span className="text-zinc-400">Nonce:</span>{" "}
                    <code className="rounded bg-white/5 px-1">{lastRow.nonce || "-"}</code>
                  </div>
                  <div>
                    <span className="text-zinc-400">Sig:</span>{" "}
                    <code className="rounded bg-white/5 px-1">
                      {(lastRow.sig || "").slice(0, 18)}…
                    </code>
                  </div>
                </div>
              )}
              {!loadingLast && !lastRow && (
                <div className="opacity-70">No record found yet for this node.</div>
              )}
            </div>

            <div className="mt-2 flex gap-2">
              <button
                className="rounded-lg bg-teal-400/10 px-3 py-1 ring-1 ring-teal-300/40 hover:bg-teal-400/15"
                onClick={() => {
                  if (hasCoords) {
                    window.dispatchEvent(new CustomEvent("mesh:flyTo", { detail: { lat: lastCenter!.lat, lon: lastCenter!.lon, zoom: 6 } }));
                    window.dispatchEvent(new CustomEvent("mesh:pulseAt", { detail: { lat: lastCenter!.lat, lon: lastCenter!.lon } }));
                  } else {
                    refreshMap();
                  }
                }}
              >
                Locate my signal
              </button>

              <a
                className="rounded-lg px-3 py-1 ring-1 ring-white/15 hover:bg-white/10"
                href={`/signal/${encodeURIComponent(lastCenter!.nodeId!)}`}
              >
                Open my profile →
              </a>
            </div>
          </>
        ) : (
          <p className="text-zinc-300">
            Post a Signal in <span className="underline">Getting Started</span> to see it here.
          </p>
        )}
      </div>

      {/* Recent activity list */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Recent activity</h4>
          <button
            className="rounded px-2 py-1 text-xs ring-1 ring-white/15 hover:bg-white/10"
            onClick={loadRecent}
            disabled={loadingRecent}
          >
            {loadingRecent ? "…" : "Reload"}
          </button>
        </div>

        <ul className="mt-2 max-h-48 space-y-1 overflow-auto pr-1">
          {recent.map((n) => (
            <li
              key={n.node_id}
              className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-white/5"
              onClick={() => {
                flyTo(n.lat, n.lon, 5);
                pulseAt(n.lat, n.lon);
              }}
              title={`Last seen ${new Date(n.last_seen).toLocaleString()}`}
            >
              <span className="truncate">{n.node_id}</span>
              <span className="text-xs text-zinc-400">
                {n.lat.toFixed(2)}, {n.lon.toFixed(2)}
              </span>
            </li>
          ))}
          {recent.length === 0 && <li className="text-xs text-zinc-400">No recent signals yet.</li>}
        </ul>

        <div className="mt-3 text-[11px] text-zinc-400">
          Keep the mesh alive —
          <span className="mx-1"><Badge variant="teal">Conservator</Badge></span>
          post regular Signals.
          <a className="ml-2 underline hover:text-zinc-200" href="/meshwork/getting-started">Start now →</a>
        </div>
      </div>
    </div>
  );
}

export default function MeshPanel() {
  return (
    <Suspense fallback={
      <div className="pointer-events-auto w-[320px] rounded-2xl border border-white/10 bg-black/60 p-4 text-sm text-zinc-200 backdrop-blur">Loading…</div>
    }>
      <InnerPanel />
    </Suspense>
  );
}




