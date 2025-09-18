"use client";

import { useEffect, useMemo, useState } from "react";

type NodeRow = { node_id: string; last_seen: string; lat: number | null; lon: number | null; };

export default function StatsBar() {
  const [nodes, setNodes] = useState<NodeRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const r = await fetch("/api/nodes", { cache: "no-store" });
      const j = await r.json();
      setNodes(j.nodes || []);
    };
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  const { total, recent24h } = useMemo(() => {
    const now = Date.now();
    const recent = new Set<string>();
    for (const n of nodes) {
      const t = parseInt(n.last_seen, 10);
      if (now - t <= 24 * 3600 * 1000) recent.add(n.node_id);
    }
    return { total: nodes.length, recent24h: recent.size };
  }, [nodes]);

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <Stat label="Nodes (total)" value={total} />
      <Stat label="Active (24h)" value={recent24h} />
      <Stat label="With location" value={nodes.filter(n => n.lat && n.lon).length} />
      <Stat label="API source" value="/api/nodes" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-2xl font-semibold text-white mt-1">{value}</div>
    </div>
  );
}
