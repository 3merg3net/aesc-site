"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Profile = {
  displayName: string;
  avatarUrl: string; // can be data URL
  bio: string;
  privacy: "zone" | "global" | "hidden";
};

const DEFAULTS: Profile = {
  displayName: "",
  avatarUrl: "",
  bio: "",
  privacy: "zone",
};

export default function EditSignalProfilePage() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // load any existing profile
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`profile:${nodeId}`);
      if (raw) setProfile({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {}
  }, [nodeId]);

  async function onPickFile(file: File) {
    if (!file) return;
    // convert to data URL for preview & storage
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setProfile((p) => ({ ...p, avatarUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  }

  async function onSave() {
    setBusy(true);
    try {
      // persist to localStorage for now (no backend yet)
      localStorage.setItem(`profile:${nodeId}`, JSON.stringify(profile));
      // optional toast
      alert("Profile saved.");
      router.replace(`/signal/${encodeURIComponent(nodeId)}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100 px-6 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-teal-300">Edit Signal Profile</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Node: <span className="font-mono">{nodeId}</span>
        </p>

        <div className="mt-6 grid gap-5">
          {/* Avatar */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <label className="text-sm text-zinc-300">Avatar</label>
            <div className="mt-3 flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/10 bg-white/5">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-zinc-500">No image</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5"
                    onClick={() => fileRef.current?.click()}
                  >
                    Upload file
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onPickFile(f);
                    }}
                  />
                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5"
                    onClick={() => setProfile((p) => ({ ...p, avatarUrl: "" }))}
                  >
                    Remove
                  </button>
                </div>
                <input
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs"
                  placeholder="or paste image URL…"
                  value={profile.avatarUrl.startsWith("data:") ? "" : profile.avatarUrl}
                  onChange={(e) => setProfile((p) => ({ ...p, avatarUrl: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Display name */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <label className="text-sm text-zinc-300">Display name</label>
            <input
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              placeholder="e.g. AESC Explorer"
              value={profile.displayName}
              onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))}
            />
          </div>

          {/* Bio */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <label className="text-sm text-zinc-300">Bio</label>
            <textarea
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              rows={4}
              placeholder="Short description of this signal/node…"
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>

          {/* Privacy */}
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <label className="text-sm text-zinc-300">Privacy mode</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["zone", "global", "hidden"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setProfile((p) => ({ ...p, privacy: opt }))}
                  className={`rounded-lg px-3 py-2 text-xs ring-1 ${
                    profile.privacy === opt
                      ? "bg-teal-400/10 ring-teal-300/40 text-teal-200"
                      : "ring-white/10 hover:bg-white/5"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              <strong>zone</strong>: coarse map visibility • <strong>global</strong>: full visibility •{" "}
              <strong>hidden</strong>: no public map presence
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              disabled={busy}
              onClick={onSave}
              className="rounded-xl px-4 py-2 text-sm ring-1 bg-teal-400/10 ring-teal-300/40 hover:bg-teal-400/15 disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save profile"}
            </button>
            <button
              onClick={() => router.back()}
              className="rounded-xl px-3 py-2 text-xs ring-1 ring-white/10 hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
