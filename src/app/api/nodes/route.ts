import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  // Prefer the SQL view we created: node_summary
  const { data, error } = await supabaseAdmin
    .from("node_summary")
    .select("*")
    .order("last_seen", { ascending: false })
    .limit(1000);

  if (error) {
    console.error("Supabase select failed:", error);
    return NextResponse.json({ nodes: [], error: "db_select_failed" }, { status: 500 });
  }

  // Normalize types for JSON consumers if needed
  const nodes = (data ?? []).map((n: any) => ({
    node_id: n.node_id,
    last_seen: String(n.last_seen), // keep as string; client can Number() it
    lat: n.lat,
    lon: n.lon,
  }));

  // cache hints for edge/CDN (tweak as you like)
  return new NextResponse(JSON.stringify({ nodes }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "s-maxage=15, stale-while-revalidate=60",
    },
  });
}

