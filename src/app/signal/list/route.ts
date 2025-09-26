export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !service) return null;
  return createClient(url, service);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nodeId = (searchParams.get("nodeId") || "").trim();
    if (!nodeId) return NextResponse.json({ ok: false, error: "Missing nodeId" }, { status: 400 });

    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || "25")));

    const admin = getAdmin();
    if (!admin) {
      // Return empty list if envs missing so UI still renders
      return NextResponse.json({ ok: true, signals: [] });
    }

    const { data, error } = await admin
      .from("signals")
      .select("id, node_id, content, media_url, ts, lat, lon")
      .eq("node_id", nodeId)
      .order("ts", { ascending: false })
      .limit(limit);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    const signals = (data || []).map((r) => ({ ...r, ts: new Date(r.ts as any).toISOString() }));
    return NextResponse.json({ ok: true, signals });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Failed to list signals" }, { status: 500 });
  }
}
