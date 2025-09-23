"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function NodeProfilePage() {
  const { nodeId } = useParams<{ nodeId: string }>();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && nodeId) {
      setUrl(`${window.location.origin}/u/${nodeId}`);
    }
  }, [nodeId]);

  if (!nodeId) {
    return (
      <main className="min-h-screen bg-[#0B0F14] text-zinc-100 p-6">
        <p>No node ID provided.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F14] text-zinc-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold text-teal-300">Node Profile</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Identity for <strong>{nodeId}</strong>
      </p>

      {url && (
        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Use the API route to render a QR image (PNG/SVG) */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="relative h-[240px] w-[240px]">
              <Image
                // tweak query params if your api/qr supports them (size / fg / bg)
                src={`/api/qr?text=${encodeURIComponent(url)}&size=220&fg=14b8a6&bg=0B0F14`}
                alt={`QR for ${nodeId}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <p className="text-xs text-zinc-400 break-all">{url}</p>
        </div>
      )}

      <p className="mt-6 text-zinc-400 text-sm text-center max-w-md">
        Scan to open this node’s profile. Future: public threads, DePin tag, reputation, and WEave
        integration.
      </p>
    </main>
  );
}
