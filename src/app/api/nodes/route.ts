// src/app/api/nodes/route.ts
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabase("anon");
    // Adjust table/view names to yours:
    // Example: a materialized view latest_nodes or a query selecting latest ping per node
    const { data, error } = await supabase
      .from("nodes_view") // <-- change to your table/view
      .select("node_id,last_seen,lat,lon")
      .limit(1000);

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, nodes: data ?? [] });
  } catch (e: any) {
    // Surfacing a clear reason if envs are missing
    return NextResponse.json({ ok: false, error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}

