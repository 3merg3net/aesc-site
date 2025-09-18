"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";

/** Optional props so you can reuse this anywhere */
type Props = {
  /** Full-bleed edge-to-edge across the viewport */
  fullBleed?: boolean;
  /** Height: vh string or tailwind class; default 60vh */
  heightClass?: string;
};

type NodeRow = {
  node_id: string;
  last_seen: string;          // ms since epoch OR ISO
  lat: number | null;
  lon: number | null;
};

export default function LiveMap({ fullBleed = true, heightClass = "h-[60vh]" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<NodeRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pollId = useRef<number | null>(null);
  const center = useMemo<[number, number]>(() => [20, 0], []);

  // React-Leaflet safety
  useEffect(() => setMounted(true), []);

  // Data: try SSE first; fallback to polling
  useEffect(() => {
    let alive = true;
    let es: EventSource | null = null;

    const apply = (payload: any) => {
      if (!alive) return;
      const arr = Array.isArray(payload?.nodes) ? payload.nodes : [];
      setNodes(arr);
    };

    // Fallback polling
    const startPolling = () => {
      const load = async () => {
        try {
          const r = await fetch("/api/nodes", { cache: "no-store" });
          const j = await r.json();
          apply(j);
        } catch (e: any) {
          if (!alive) return;
          setError(e?.message ?? "Failed to load nodes");
        }
      };
      load();
      pollId.current = window.setInterval(load, 15000);
    };

    try {
      es = new EventSource("/api/nodes/stream");
      es.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data); // { nodes: NodeRow[] }
          apply(payload);
        } catch {
          /* ignore non-JSON */
        }
      };
      es.onerror = () => {
        es?.close();
        es = null;
        startPolling();
      };
    } catch {
      startPolling();
    }

    return () => {
      alive = false;
      if (es) es.close();
      if (pollId.current) {
        clearInterval(pollId.current);
        pollId.current = null;
      }
    };
  }, []);

  // Helpers
  const parseTs = (v: string) => {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
    const iso = Date.parse(v);
    return Number.isFinite(iso) ? iso : Date.now();
  };
  const short = (id: string) => (id && id.length > 12 ? `${id.slice(0, 6)}…${id.slice(-4)}` : id ?? "");

  // Full-bleed wrapper (centered): use arbitrary properties with spaces encoded as underscores
  const outerClass = fullBleed
    ? "relative w-screen max-w-none [margin-left:calc(50%_-_50vw)] [margin-right:calc(50%_-_50vw)]"
    : "relative w-full";

  if (!mounted) {
    return (
      <div className={`${outerClass} ${heightClass}`}>
        <div className="absolute inset-0 grid place-items-center text-slate-400 text-sm">
          Loading map…
        </div>
      </div>
    );
  }

  return (
    <div className={outerClass}>
      <div className={`relative ${heightClass} overflow-hidden rounded-none md:rounded-2xl border border-white/10`}>
        {error && (
          <div className="absolute inset-0 grid place-items-center text-slate-300 text-sm z-[500]">
            {error}
          </div>
        )}

        {/* Corner legend */}
        <Legend />

        <MapContainer
          center={center}
          zoom={2}
          scrollWheelZoom
          className="h-full w-full"
          preferCanvas
          worldCopyJump
        >
          <TileLayer
            // Dark basemap for contrast; swap if you prefer
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

/** Tiny corner legend */
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


