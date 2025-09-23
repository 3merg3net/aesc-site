export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const nodeId = url.searchParams.get("nodeId") || null;
    const limit = Number(url.searchParams.get("limit") || 10);
    const supabase = getSupabase("service");

    let q = supabase.from("pings").select("id,node_id,ts,nonce,sig,lat,lon").order("ts", { ascending: false });
    if (nodeId) q = q.eq("node_id", nodeId);
    q = q.limit(Math.min(Math.max(limit, 1), 50));

    const { data, error } = await q;
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });

    return NextResponse.json({ ok: true, count: data?.length || 0, rows: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unexpected error" }, { status: 500 });
  }
}

