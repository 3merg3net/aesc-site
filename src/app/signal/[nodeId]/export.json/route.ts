import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(_req: Request, { params }: { params: { nodeId: string } }) {
  const nodeId = decodeURIComponent(params.nodeId);
  if (!nodeId) return NextResponse.json({ ok: false, error: "Missing nodeId" }, { status: 400 });

  const { data, error } = await supabase
    .from("signals")
    .select("*")
    .eq("node_id", nodeId)
    .order("ts", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return new NextResponse(JSON.stringify({ nodeId, count: data.length, signals: data }, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
