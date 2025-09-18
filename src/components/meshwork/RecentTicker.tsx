"use client";

import { useEffect, useState } from "react";

type NodeRow = { node_id: string; last_seen: string; lat: number | null; lon: number | null; };

export default function RecentTicker() {
  const [rows, setRows] = useState<NodeRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const r = await fetch("/api/nodes", { cache: "no-store" });
      const j = await r.json();
      setRows(j.nodes || []);
    };
    load();
    const id = setInterval(load, 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/30">
      <div className="whitespace-nowrap animate-[ticker_18s_linear_infinite] py-2">
        {rows.slice(0, 24).map((n, i) => (
          <span key={n.node_id + i} className="inline-flex items-center gap-2 mx-6 text-sm text-slate-200">
            <Dot /> node {short(n.node_id)} · last seen {age(n.last_seen)}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function short(id: string) { return id.length > 12 ? `${id.slice(0,6)}…${id.slice(-4)}` : id; }
function age(ms: string) {
  const diff = Date.now() - parseInt(ms, 10);
  const m = Math.max(0, Math.round(diff / 60000));
  if (m < 1) return "now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  return `${h}h ago`;
}
function Dot() { return <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />; }
