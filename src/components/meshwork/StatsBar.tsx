"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function StatsBar() {
  const [nodes, setNodes] = useState<NodeRow[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch once + refresh every 20s
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch("/api/nodes", { cache: "no-store" });
        const j = await r.json();
        if (!alive) return;
        setNodes(Array.isArray(j?.nodes) ? j.nodes : []);
      } catch {
        if (!alive) return;
        setNodes([]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const id = setInterval(load, 20000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const uniq = new Set<string>();
    let lastTs = 0;
    let active10 = 0;
    let active60 = 0;

    for (const n of nodes) {
      uniq.add(n.node_id);
      const ts = parseTs(n.last_seen);
      if (ts > lastTs) lastTs = ts;
      const ageMin = (now - ts) / 60000;
      if (ageMin <= 10) active10++;
      if (ageMin <= 60) active60++;
    }
    return {
      totalNodes: uniq.size,
      active10,
      active60,
      lastUpdate: lastTs ? new Date(lastTs) : null,
    };
  }, [nodes]);

  return (
    <div className="mt-8 grid gap-3 md:grid-cols-3">
      <Card
        title="Total Nodes"
        value={loading ? "—" : stats.totalNodes.toString()}
        hint={stats.lastUpdate ? `Updated ${timeAgo(stats.lastUpdate)} ago` : undefined}
      />
      <Card
        title="Active (≤10m)"
        value={loading ? "—" : stats.active10.toString()}
        hint="Currently resonating"
      />
      <Card
        title="Active (≤60m)"
        value={loading ? "—" : stats.active60.toString()}
        hint="Seen in the last hour"
      />
    </div>
  );
}

function Card({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-wide text-zinc-400">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-zinc-400">{hint}</p> : null}
    </div>
  );
}

function timeAgo(d: Date) {
  const ms = Date.now() - d.getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const days = Math.floor(h / 24);
  return `${days}d`;
}

