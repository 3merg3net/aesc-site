// Always present, even if Supabase envs are missing
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// If you want Edge runtime:
// export const runtime = "edge";

type NodeRow = {
  node_id: string;
  last_seen: string; // ISO or ms
  lat: number | null;
  lon: number | null;
};

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Graceful fallback when envs are missing (no 404/500)
  if (!url || !key) {
    return NextResponse.json({ ok: true, nodes: [] satisfies NodeRow[] }, { status: 200 });
  }

  try {
    const supabase = createClient(url, key);
    // Adjust table/columns to your schema:
    const { data, error } = await supabase
      .from("mesh_nodes_view") // or "nodes"
      .select("node_id,last_seen,lat,lon")
      .limit(1000);

    if (error) {
      console.error("supabase error:", error);
      return NextResponse.json({ ok: true, nodes: [] as NodeRow[] }, { status: 200 });
    }

    // Normalize timestamps to string
    const nodes: NodeRow[] = (data || []).map((r: any) => ({
      node_id: String(r.node_id),
      last_seen: String(r.last_seen),
      lat: r.lat ?? null,
      lon: r.lon ?? null,
    }));

    return NextResponse.json({ ok: true, nodes }, { status: 200 });
  } catch (e) {
    console.error("nodes GET exception", e);
    return NextResponse.json({ ok: true, nodes: [] as NodeRow[] }, { status: 200 });
  }
}


