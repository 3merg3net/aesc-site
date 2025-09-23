"use client";

import { useEffect, useRef } from "react";
import L, { Map as LeafletMap, LayerGroup } from "leaflet";
import "leaflet/dist/leaflet.css";

type NodeRow = { node_id: string; last_seen: number; lat: number; lon: number };

export default function LiveMapCore({
  fullBleed,
  heightClass = "h-[60vh] md:h-[70vh]",
}: {
  fullBleed?: boolean;
  heightClass?: string;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const pollRef = useRef<number | null>(null);

  async function load(group: LayerGroup) {
    try {
      const res = await fetch("/api/nodes", { cache: "no-store" });
      const json = await res.json();
      if (!json?.ok) return;

      const nodes: NodeRow[] = json.nodes ?? [];
      group.clearLayers();

      nodes.forEach((n) => {
        const p = [n.lat, n.lon] as [number, number];

        // soft aura
        L.circle(p, {
          radius: 8000,
          color: "transparent",
          fillColor: "rgba(56,189,248,0.22)",
          fillOpacity: 0.28,
        }).addTo(group);

        // core dot
        L.circleMarker(p, {
          radius: 4,
          color: "rgba(56,189,248,0.95)",
          fillColor: "rgba(56,189,248,0.85)",
          fillOpacity: 0.9,
          weight: 1.5,
        })
          .bindTooltip(`${n.node_id}`, { direction: "top", opacity: 0.9 })
          .addTo(group);
      });
    } catch {
      // ignore fetch errors
    }
  }

  useEffect(() => {
    if (mapRef.current) return;

    const containerId = "meshwork-leaflet";
    const el = document.getElementById(containerId);
    if (!el) return;

    const map = L.map(el, {
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: true,
      minZoom: 2,
      maxZoom: 7,
      worldCopyJump: true,
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd" }
    ).addTo(map);
    map.setView([22, 0], 3); // ← tighter default

    const group = L.layerGroup().addTo(map);

    mapRef.current = map;
    layerRef.current = group;

    // Initial load + poll
    load(group);
    pollRef.current = window.setInterval(() => load(group), 15000);

    // Fly to last posted thread (once) if present
    try {
      const raw = sessionStorage.getItem("lastThreadCenter");
      if (raw) {
        const { lat, lon } = JSON.parse(raw);
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          map.flyTo([lat, lon], 6, { duration: 1.1 });
          // brief glow pulse
          const pulse = L.circleMarker([lat, lon], {
            radius: 10,
            color: "rgba(56,189,248,0.9)",
            fillColor: "rgba(56,189,248,0.5)",
            fillOpacity: 0.6,
            weight: 2,
          }).addTo(map);
          const glow = L.circle([lat, lon], {
            radius: 10000,
            color: "transparent",
            fillColor: "rgba(56,189,248,0.25)",
            fillOpacity: 0.35,
          }).addTo(map);
          setTimeout(() => {
            map.removeLayer(pulse);
            map.removeLayer(glow);
          }, 2200);
        }
        sessionStorage.removeItem("lastThreadCenter");
      }
    } catch {}

    // Controls from outside (panel)
    const onFly = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const { lat, lon, zoom = 6 } = detail;
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        map.flyTo([lat, lon], zoom, { duration: 1.0 });
      }
    };
    const onRefresh = () => {
      if (layerRef.current) load(layerRef.current);
    };
    window.addEventListener("mesh:flyTo", onFly);
    window.addEventListener("mesh:refresh", onRefresh);

    return () => {
      window.removeEventListener("mesh:flyTo", onFly);
      window.removeEventListener("mesh:refresh", onRefresh);
      if (pollRef.current) clearInterval(pollRef.current);
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      pollRef.current = null;
    };
  }, []);

  return (
    <div
      className={[
        fullBleed
          ? "relative w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]"
          : "relative w-full rounded-2xl border border-white/10 overflow-hidden",
        heightClass,
      ].join(" ")}
    >
      <div id="meshwork-leaflet" className="absolute inset-0" />
    </div>
  );
  // inside your client component where you already have access to L (leaflet) and the map instance

function pulseAt(map: L.Map, lat: number, lon: number) {
  const center = L.latLng(lat, lon);

  // zoom/fly
  map.flyTo(center, Math.max(map.getZoom(), 5), { duration: 0.8 });

  // glowing pulse (two expanding rings)
  const ring1 = L.circle(center, { radius: 50, color: "#22d3ee", weight: 1, fillColor: "#22d3ee", fillOpacity: 0.35 });
  const ring2 = L.circle(center, { radius: 50, color: "#7dd3fc", weight: 1, fillColor: "#7dd3fc", fillOpacity: 0.25 });
  ring1.addTo(map);
  ring2.addTo(map);

  let t = 0;
  const iv = setInterval(() => {
    t += 40; // ms
    const r = 50 + (t * 2.2); // expand
    const o1 = Math.max(0, 0.35 - t / 2000);
    const o2 = Math.max(0, 0.25 - t / 2000);
    ring1.setRadius(r).setStyle({ fillOpacity: o1, opacity: o1 });
    ring2.setRadius(r * 0.7).setStyle({ fillOpacity: o2, opacity: o2 });
    if (t > 1200) {
      clearInterval(iv);
      map.removeLayer(ring1);
      map.removeLayer(ring2);
    }
  }, 40);
}

// after your map is created and ready, run this once
// inside your component, after the Leaflet map is created:
useEffect(() => {
  if (!mapRef.current) return;
  const map = mapRef.current;

  function onFlyTo(e: any) {
    const { lat, lon, zoom = Math.min(map.getMaxZoom(), map.getZoom() + 1) } = e.detail || {};
    if (lat == null || lon == null) return;
    // over-zoom then settle
    const target = L.latLng(lat, lon);
    map.flyTo(target, Math.min(zoom + 1, map.getMaxZoom()), { duration: 0.9 });
    setTimeout(() => map.flyTo(target, zoom, { duration: 0.5 }), 950);
  }

  function onPulseAt(e: any) {
    const { lat, lon } = e.detail || {};
    if (lat == null || lon == null) return;

    const center = map.getCenter();
    const target = L.latLng(lat, lon);

    // transient beam (polyline) from center to target
    const beam = L.polyline([center, target], {
      color: "#67e8f9",
      weight: 1,
      opacity: 0.7,
      dashArray: "2,6",
    }).addTo(map);

    // pulse circle
    const circle = L.circleMarker(target, {
      radius: 14,
      color: "#67e8f9",
      weight: 1,
      opacity: 0.9,
      fillColor: "#67e8f9",
      fillOpacity: 0.25,
    }).addTo(map);

    // animate fade
    let alive = true;
    const start = performance.now();
    function tick(t: number) {
      if (!alive) return;
      const k = Math.min(1, (t - start) / 700); // ~0.7s
      const r = 14 + k * 18;
      circle.setStyle({ radius: r as any, opacity: 0.9 * (1 - k), fillOpacity: 0.25 * (1 - k) });
      beam.setStyle({ opacity: 0.7 * (1 - k) });
      if (k < 1) requestAnimationFrame(tick);
      else { map.removeLayer(circle); map.removeLayer(beam); }
    }
    requestAnimationFrame(tick);

    return () => { alive = false; };
  }

  window.addEventListener("mesh:flyTo", onFlyTo as any);
  window.addEventListener("mesh:pulseAt", onPulseAt as any);
  return () => {
    window.removeEventListener("mesh:flyTo", onFlyTo as any);
    window.removeEventListener("mesh:pulseAt", onPulseAt as any);
  };
}, []);


}


