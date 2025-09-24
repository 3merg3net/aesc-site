import Image from "next/image";
import QRCodeImg from "@/components/meshwork/QRCodeImg";

async function getLast(nodeId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/diag/last?nodeId=${encodeURIComponent(nodeId)}&limit=1`, { cache: "no-store" });
    const json = await res.json();
    return json?.rows?.[0] || null;
  } catch {
    return null;
  }
}

export default async function ProfilePage({ params }: { params: { nodeId: string } }) {
  const nodeId = decodeURIComponent(params.nodeId);
  const row = await getLast(nodeId);
  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/profile/${encodeURIComponent(nodeId)}`;
<QRCodeImg
  text={profileUrl}
  size={256}
  margin={1}
  format="png"          // keep png for reliability on live
  className="rounded-md ring-1 ring-white/10 bg-white/5 p-2"
/>
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-[#0B0F14] p-6">
        <h1 className="text-2xl font-semibold">Node Profile</h1>
        <p className="mt-1 text-sm text-zinc-400">Basic view of a Meshwork node (public).</p>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr,280px]">
          <div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-zinc-400">Node ID</div>
              <div className="mt-1 font-mono text-zinc-100">{nodeId}</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-zinc-400">Last seen</div>
                  <div className="mt-1 text-zinc-100">
                    {row?.ts ? new Date(row.ts).toLocaleString() : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-zinc-400">Location</div>
                  <div className="mt-1 text-zinc-100">
                    {Number.isFinite(row?.lat) && Number.isFinite(row?.lon)
                      ? `${row.lat.toFixed(3)}, ${row.lon.toFixed(3)}`
                      : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm text-zinc-400">Profile QR</div>
            <div className="mt-2 rounded-lg bg-black/60 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="QR code"
                src={`/api/qr?type=svg&text=${encodeURIComponent(profileUrl)}`}
                className="mx-auto h-auto w-full max-w-[220px]"
              />
            </div>
            <a
              className="mt-3 inline-block rounded-lg px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/10"
              href={`/api/qr?type=png&text=${encodeURIComponent(profileUrl)}`}
              download={`mesh-node-${encodeURIComponent(nodeId)}.png`}
            >
              Download PNG
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
