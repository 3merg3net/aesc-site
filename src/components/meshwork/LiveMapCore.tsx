"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = { fullBleed?: boolean; heightClass?: string };
type NodeRow = { node_id: string; last_seen: string; lat: number | null; lon: number | null };

export default function LiveMapCore({ fullBleed = true, heightClass = "h-[60vh]" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<NodeRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pollId = useRef<ReturnType<typeof setInterval> | null>(null);
  const center = useMemo<[number, number]>(() => [20, 0], []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let alive = true;
    let es: EventSource | null = null;

    const apply = (payload: any) => {
      if (!alive) return;
      setNodes(Array.isArray(payload?.nodes) ? payload.nodes : []);
    };

    const load = async () => {
      try {
        const r = await fetch("/api/nodes", { cache: "no-store" });
        apply(await r.json());
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load nodes");
      }
    };

    const startPolling = () => {
      load();
      pollId.current = setInterval(load, 15000);
    };

    try {
      es = new EventSource("/api/nodes/stream");
      es.onmessage = (ev) => {
        try { apply(JSON.parse(ev.data)); } catch {}
      };
      es.onerror = () => { es?.close(); es = null; startPolling(); };
    } catch {
      startPolling();
    }

    return () => {
      alive = false;
      if (es) es.close();
      if (pollId.current) clearInterval(pollId.current);
    };
  }, []);

  const parseTs = (v: string) => {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
    const iso = Date.parse(v);
    return Number.isFinite(iso) ? iso : Date.now();
  };
  const short = (id: string) => (id && id.length > 12 ? `${id.slice(0, 6)}…${id.slice(-4)}` : id ?? "");

  const outerClass = fullBleed
    ? "relative w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]"
    : "relative w-full";

  if (!mounted) {
    return (
      <div className={`${outerClass} ${heightClass}`}>
        <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">Loading map…</div>
      </div>
    );
  }

  return (
    <div className={outerClass}>
      <div className={`relative ${heightClass} overflow-hidden rounded-none md:rounded-2xl border border-white/10`}>
        {error && <div className="absolute inset-0 grid place-items-center text-slate-300 text-sm z-[500]">{error}</div>}
        <Legend />
        <MapContainer center={center} zoom={2} scrollWheelZoom className="h-full w-full" preferCanvas worldCopyJump>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap, &copy; Stadia Maps"
          />
          {nodes
            .filter((n) => Number.isFinite(n?.lat) && Number.isFinite(n?.lon))
            .map((n) => {
              const ts = parseTs(n.last_seen);
              const ageMin = Math.max(0, Math.round((Date.now() - ts) / 60000));
              const color = ageMin < 10 ? "#22d3ee" : ageMin < 60 ? "#f59e0b" : "#64748b";
              const radius = ageMin < 10 ? 6 : ageMin < 60 ? 5 : 4;
              return (
                <CircleMarker
                  key={`${n.node_id}-${ts}`}
                  center={[n.lat as number, n.lon as number]}
                  radius={radius}
                  pathOptions={{ color, fillColor: color, fillOpacity: 0.85, weight: 1 }}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={1} sticky>
                    <div className="text-xs">
                      <div><b>node</b> {short(n.node_id)}</div>
                      <div><b>last seen</b> {ageMin === 0 ? "now" : `${ageMin}m ago`}</div>
                      <div><b>loc</b> {(n.lat as number).toFixed(3)}, {(n.lon as number).toFixed(3)}</div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
}

function Legend() {
  const Item = ({ c, label }: { c: string; label: string }) => (
    <div className="flex items-center gap-2">
      <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
      <span className="text-xs text-slate-300">{label}</span>
    </div>
  );
  return (
    <div className="pointer-events-none absolute right-3 bottom-3 z-[500] rounded-lg bg-black/50 px-3 py-2 ring-1 ring-white/10">
      <div className="text-[11px] uppercase tracking-wide text-slate-400 mb-1">Legend</div>
      <div className="flex flex-col gap-1">
        <Item c="#22d3ee" label="< 10m" />
        <Item c="#f59e0b" label="< 60m" />
        <Item c="#64748b" label="older" />
      </div>
    </div>
  );
}
