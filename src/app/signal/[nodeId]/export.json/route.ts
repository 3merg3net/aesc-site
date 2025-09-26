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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ nodeId: string }> } // Next 15: params is Promise
) {
  const { nodeId } = await params;

  const admin = getAdmin();
  if (!admin) {
    // Return an empty but valid JSON so build never crashes
    return new NextResponse(
      JSON.stringify({
        ok: true,
        nodeId,
        exportedAt: new Date().toISOString(),
        signals: [],
        note: "Supabase env not configured on build/runtime",
      }, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const { data, error } = await admin
    .from("signals")
    .select("id, node_id, content, media_url, ts, lat, lon")
    .eq("node_id", nodeId)
    .order("ts", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const payload = {
    ok: true,
    nodeId,
    exportedAt: new Date().toISOString(),
    signals: (data ?? []).map((r) => ({ ...r, ts: new Date(r.ts as any).toISOString() })),
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${nodeId}-signal-chain.json"`,
      "Cache-Control": "no-store",
    },
  });
}


