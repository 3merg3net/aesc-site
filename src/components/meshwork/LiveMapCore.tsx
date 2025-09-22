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
}


