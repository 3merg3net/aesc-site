"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

type Geo = { lat?: number; lon?: number };

export default function SignalPostPage() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [geo, setGeo] = useState<Geo>({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => !busy && nodeId && (content.trim().length > 0 || !!file),
    [busy, nodeId, content, file]
  );

  // preview selected file
  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // optional: capture a quick geotag
  async function handleGeo() {
    setMsg(null);
    if (!("geolocation" in navigator)) { setMsg("Geolocation not available."); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => setMsg(err.message || "Failed to get location."),
      { maximumAge: 10_000, timeout: 10_000, enableHighAccuracy: true }
    );
  }

  async function uploadToSupabase(file: File): Promise<string> {
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const key = `${nodeId}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

    const { data, error } = await supabaseClient.storage
      .from("signals")                 // <-- your public bucket
      .upload(key, file, {
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type || undefined,
      });

    if (error) throw error;

    // public URL
    const { data: pub } = supabaseClient.storage.from("signals").getPublicUrl(data.path);
    return pub.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nodeId) return;
    setBusy(true);
    setMsg(null);

    try {
      let mediaUrl: string | undefined;
      if (file) {
        // (A) client-side upload to public bucket
        mediaUrl = await uploadToSupabase(file);
      }

      // (B) write the Signal row via server API
      const res = await fetch("/api/signal/post", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nodeId,
          content: content.trim() || null,
          mediaUrl: mediaUrl ?? null,
          lat: geo.lat,
          lon: geo.lon,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }

      // Optional: ping SV accrue for a "post" event
      try {
        await fetch("/api/sv/accrue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nodeId, kind: "post", weight: 2.0 }),
        });
      } catch {}

      // Go back to profile
      router.push(`/signal/${encodeURIComponent(nodeId)}`);
    } catch (e: any) {
      setMsg(e?.message || "Failed to post Signal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-teal-300">Post a Signal</h1>
          <Link href={`/signal/${nodeId}`} className="text-sm text-zinc-300 hover:text-white">
            ← Back to Profile
          </Link>
        </div>
        <p className="mt-1 text-sm text-zinc-400">Node: <span className="font-mono">{nodeId}</span></p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="text-sm text-zinc-300">Message</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Share an update, observation, ritual note, or link…"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400/40"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Media (optional)</label>
            <div className="mt-1 grid gap-3 md:grid-cols-[1fr,220px]">
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-zinc-100 hover:file:bg-white/15"
              />
              {preview && (
                <div className="relative h-40 w-full overflow-hidden rounded-lg border border-white/10 bg-black/30">
                  <Image src={preview} alt="preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Files go to Supabase storage bucket <code className="bg-white/5 rounded px-1">signals</code> (public).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleGeo}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5"
            >
              {geo.lat != null ? "Location attached ✓" : "Attach my location"}
            </button>
            {geo.lat != null && (
              <span className="text-xs text-zinc-400">
                {geo.lat.toFixed(4)}, {geo.lon?.toFixed(4)}
              </span>
            )}
          </div>

          {msg && (
            <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {msg}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className={`rounded-xl px-4 py-2 text-sm ring-1 ${
                canSubmit
                  ? "bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15"
                  : "bg-white/5 ring-white/10 opacity-50 cursor-not-allowed"
              }`}
            >
              {busy ? "Posting…" : "Post Signal →"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
