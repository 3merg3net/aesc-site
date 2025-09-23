export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type Row = { node_id: string; ts: number; lat: number | null; lon: number | null };

export async function GET(req: Request) {
  try {
    const supabase = getSupabase("service");

    const url = new URL(req.url);
    const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") || "5000", 10) || 5000, 1), 10000);
    const since = parseInt(url.searchParams.get("since") || "0", 10) || 0;

    let query = supabase.from("pings").select("node_id, ts, lat, lon").order("ts", { ascending: false }).limit(limit);
    if (since > 0) {
      // Supabase filter for ts >= since
      // @ts-ignore - supabase types allow gte filter by string path
      query = query.gte("ts", since);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    const rows = (data ?? []) as Row[];

    // Reduce to latest per node
    const latest = new Map<string, Row>();
    for (const r of rows) {
      if (!latest.has(r.node_id)) latest.set(r.node_id, r);
    }

    const nodes = Array.from(latest.values())
      .map((r) => ({
        node_id: r.node_id,
        last_seen: Number(r.ts),
        lat: r.lat == null ? null : Number(r.lat),
        lon: r.lon == null ? null : Number(r.lon),
      }))
      .filter((n) => Number.isFinite(n.lat) && Number.isFinite(n.lon));

    return NextResponse.json({ ok: true, nodes });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}




