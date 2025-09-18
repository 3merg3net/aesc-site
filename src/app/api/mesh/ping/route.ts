import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: verify HMAC, ts window, nonce replay, etc.

    const supabase = getSupabase();
    const { error } = await supabase.from("pings").insert({
      node_id: body.nodeId,
      sticker_id: body.stickerId ?? null,
      ts: new Date(body.ts),
      nonce: body.nonce,
      lat: body.lat ?? null,
      lon: body.lon ?? null,
      sig: body.sig,
    });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Bad request" }, { status: 400 });
  }
}

