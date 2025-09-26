"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabaseClient";

export default function PostComposer({
  nodeId,
  onPosted,
}: {
  nodeId: string;
  onPosted?: () => void;
}) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [geo, setGeo] = useState<{ lat?: number; lon?: number }>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => !busy && nodeId && (content.trim().length > 0 || !!file),
    [busy, nodeId, content, file]
  );

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleGeo() {
    setMsg(null);
    if (!("geolocation" in navigator)) return setMsg("Geolocation not available.");
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => setMsg(err.message || "Failed to get location."),
      { maximumAge: 10_000, timeout: 10_000, enableHighAccuracy: true }
    );
  }

  async function uploadToSupabase(f: File): Promise<string> {
    const ext = f.name.split(".").pop() || "bin";
    const key = `${nodeId}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
    const { data, error } = await supabaseClient.storage
      .from("signals")
      .upload(key, f, { cacheControl: "31536000", upsert: false, contentType: f.type || undefined });
    if (error) throw error;
    const { data: pub } = supabaseClient.storage.from("signals").getPublicUrl(data.path);
    return pub.publicUrl;
  }

  async function submit(kind: "post" | "checkin" = "post") {
    if (!nodeId) return;
    setBusy(true);
    setMsg(null);
    try {
      let mediaUrl: string | undefined;
      if (file) mediaUrl = await uploadToSupabase(file);
      const res = await fetch("/api/signal/post", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nodeId,
          content: kind === "checkin" ? (content.trim() || "Check-in") : (content.trim() || null),
          mediaUrl: mediaUrl ?? null,
          lat: geo.lat,
          lon: geo.lon,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || `HTTP ${res.status}`);

      // SV: accrue + optional streak
      try {
        await fetch("/api/sv/accrue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodeId, kind: kind === "checkin" ? "checkin" : "post", weight: kind === "checkin" ? 1.5 : 2.0 }),
        });
        await fetch("/api/sv/streak", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nodeId, by: 1 }) });
      } catch {}

      // reset
      setContent("");
      setFile(null);
      setPreview(null);
      setGeo({});
      onPosted?.();
    } catch (e: any) {
      setMsg(e?.message || "Failed to post.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Compose Signal</h3>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          {geo.lat != null ? (
            <span>📍 {geo.lat!.toFixed(3)}, {geo.lon?.toFixed(3)}</span>
          ) : (
            <button type="button" onClick={handleGeo} className="rounded-md px-2 py-1 ring-1 ring-white/10 hover:bg-white/5">Attach location</button>
          )}
        </div>
      </div>

      <textarea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share an update, observation, ritual note, or link…"
        className="mt-3 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
      />

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr,220px]">
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-zinc-100 hover:file:bg-white/15"
        />
        {preview && (
          <div className="relative h-36 w-full overflow-hidden rounded-lg border border-white/10 bg-black/30">
            <Image src={preview} alt="preview" fill className="object-cover" />
          </div>
        )}
      </div>

      {msg && <div className="mt-3 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">{msg}</div>}

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          disabled={!canSubmit}
          onClick={() => submit("post")}
          className={`rounded-xl px-4 py-2 text-sm ring-1 ${canSubmit ? "bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15" : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"}`}
        >
          Post Signal →
        </button>
        <button
          disabled={busy || !nodeId}
          onClick={() => submit("checkin")}
          className="rounded-xl px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/5"
          title="Quick geotag check-in"
        >
          Quick Check-In
        </button>
      </div>
    </div>
  );
}
