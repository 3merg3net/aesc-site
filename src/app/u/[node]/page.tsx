// src/app/u/[node]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

type Props = { params: { node: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = `Node ${params.node} — Meshwork`;
  return {
    title,
    description: `Live presence and recent threads for node ${params.node}.`,
    openGraph: { title, images: ["/meshwork/og-meshwork.png"] },
  };
}

export default async function NodeProfile({ params }: Props) {
  const node = decodeURIComponent(params.node);
  const supabase = getSupabase("service");

  // most-recent ping for this node
  const { data, error } = await supabase
    .from("pings")
    .select("ts, lat, lon, nonce, sig")
    .eq("node_id", node)
    .order("ts", { ascending: false })
    .limit(10);

  const rows = data ?? [];
  const latest = rows[0] || null;

  const profileUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/u/${encodeURIComponent(node)}`;
  const qrSvgUrl = `/api/qr?type=svg&text=${encodeURIComponent(profileUrl)}&size=512&dark=%23FFFFFF&light=%230000`;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-teal-300/80">MESHWORK • NODE</p>
          <h1 className="mt-1 text-3xl font-semibold">{node}</h1>
          {latest ? (
            <p className="mt-2 text-sm text-zinc-400">
              Last seen {new Date(latest.ts).toLocaleString()}
              {Number.isFinite(latest.lat) && Number.isFinite(latest.lon) &&
                ` • (${latest.lat?.toFixed(3)}, ${latest.lon?.toFixed(3)})`}
            </p>
          ) : (
            <p className="mt-2 text-sm text-zinc-400">No threads yet.</p>
          )}
          <div className="mt-4 flex gap-3">
            <Link href="/meshwork#map" className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5">
              View on Map
            </Link>
            <a
              href={`/api/qr?type=png&text=${encodeURIComponent(profileUrl)}&size=1024&dark=%23FFFFFF&light=%230000`}
              className="rounded-xl border border-teal-300/40 bg-teal-300/10 px-3 py-2 text-sm"
              download={`mesh-node-${node}.png`}
            >
              Download QR
            </a>
          </div>
        </div>

        {/* QR */}
        <div className="hidden sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrSvgUrl} alt="Node QR" className="h-40 w-40" />
        </div>
      </header>

      {/* recent */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Recent threads</h2>
        <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-zinc-300">
              <tr>
                <th className="px-3 py-2 text-left">Time</th>
                <th className="px-3 py-2 text-left">Lat</th>
                <th className="px-3 py-2 text-left">Lon</th>
                <th className="px-3 py-2 text-left">Nonce</th>
                <th className="px-3 py-2 text-left">Sig</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="px-3 py-2">{new Date(r.ts).toLocaleString()}</td>
                  <td className="px-3 py-2">{r.lat == null ? "-" : r.lat.toFixed(4)}</td>
                  <td className="px-3 py-2">{r.lon == null ? "-" : r.lon.toFixed(4)}</td>
                  <td className="px-3 py-2">{r.nonce || "-"}</td>
                  <td className="px-3 py-2">
                    <code className="rounded bg-white/5 px-1">{(r.sig || "").slice(0, 16)}…</code>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr className="border-t border-white/10">
                  <td className="px-3 py-8 text-center text-zinc-400" colSpan={5}>
                    No data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
