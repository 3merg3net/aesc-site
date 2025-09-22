// src/app/api/diag/last/route.ts
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase("service");
    const { data, error, count } = await supabase
      .from("pings")
      .select("id, node_id, ts, nonce, sig, lat, lon", { count: "exact" })
      .order("ts", { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, count, rows: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}
