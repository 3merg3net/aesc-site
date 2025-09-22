// src/app/api/nodes/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type Row = {
  node_id: string;
  ts: number;
  lat: number | null;
  lon: number | null;
};

export async function GET() {
  try {
    const supabase = getSupabase("service");
    const { data, error } = await supabase
      .from("pings")
      .select("node_id, ts, lat, lon")
      .order("ts", { ascending: false })
      .limit(5000);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    const rows = (data ?? []) as Row[];

    // latest per node
    const seen = new Set<string>();
    const latest: Row[] = [];
    for (const r of rows) {
      if (!seen.has(r.node_id)) {
        latest.push(r);
        seen.add(r.node_id);
      }
    }

    const nodes = latest
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



