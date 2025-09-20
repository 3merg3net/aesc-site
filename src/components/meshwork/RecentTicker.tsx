"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NodeRow = {
  node_id: string;
  last_seen: string; // ms epoch or ISO
  lat?: number | null;
  lon?: number | null;
};

function parseTs(v: string) {
  const n = Number(v);
  if (Number.isFinite(n)) return n;
  const iso = Date.parse(v);
  return Number.isFinite(iso) ? iso : 0;
}

export default function RecentTicker() {
  const [rows, setRows] = useState<NodeRow[]>([]);
  const sseRef = useRef<EventSource | null>(null);

  // Prefer SSE if /api/nodes/stream exists; otherwise poll /api/nodes
  useEffect(() => {
    let alive = true;

    const applyNodes = (list: any) => {
      if (!alive) return;
      const nodes = Array.isArray(list) ? list : Array.isArray(list?.nodes) ? list.nodes : [];
      setRows(nodes);
    };

    const startPolling = () => {
      const load = async () => {
        try {
          const r = await fetch("/api/nodes", { cache: "no-store" });
          const j = await r.json();
          applyNodes(j);
        } catch {
          /* ignore */
        }
      };
      load();
      const id = setInterval(load, 15000);
      return () => clearInterval(id);
    };

    let stopPoll: (() => void) | null = null;
    try {
      const es = new EventSource("/api/nodes/stream");
      sseRef.current = es;
      es.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          applyNodes(payload?.nodes ?? payload);
        } catch {
          /* ignore malformed */
        }
      };
      es.onerror = () => {
        es.close();
        sseRef.current = null;
        stopPoll = startPolling();
      };
    } catch {
      stopPoll = startPolling();
    }

    return () => {
      alive = false;
      if (sseRef.current) sseRef.current.close();
      if (stopPoll) stopPoll();
    };
  }, []);

  const recent = useMemo(() => {
    const byTs = [...rows].sort((a, b) => parseTs(b.last_seen) - parseTs(a.last_seen));
    return byTs.slice(0, 10);
  }, [rows]);

  if (!recent.length) {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
        Waiting for live threads…
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Recent Threads</p>
        <span className="text-[10px] rounded bg-teal-400/10 px-2 py-0.5 text-teal-200 ring-1 ring-teal-400/30">
          live
        </span>
      </div>

      <ul className="divide-y divide-white/10">
        {recent.map((n) => {
          const ts = parseTs(n.last_seen);
          return (
            <li key={`${n.node_id}-${ts}`} className="grid grid-cols-[1fr,auto] items-center gap-2 px-4 py-2 text-sm">
              <span className="truncate text-zinc-200">
                <b className="text-zinc-400">node</b> {short(n.node_id)}
                {Number.isFinite(n.lat) && Number.isFinite(n.lon) ? (
                  <span className="text-zinc-500"> · {(n.lat as number).toFixed(2)}, {(n.lon as number).toFixed(2)}</span>
                ) : null}
              </span>
              <span className="text-xs text-zinc-400">{timeAgo(ts)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function short(id: string) {
  return id && id.length > 12 ? `${id.slice(0, 6)}…${id.slice(-4)}` : id ?? "";
}

function timeAgo(ts: number) {
  if (!ts) return "—";
  const m = Math.max(0, Math.floor((Date.now() - ts) / 60000));
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
