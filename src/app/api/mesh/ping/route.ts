// src/app/api/mesh/ping/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const supabase = getSupabase("service"); // service role for writes
    const body = await req.json();

    // minimal shape checks (you can tighten later)
    if (!body?.nodeId || !body?.ts || !body?.nonce || !body?.sig) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (nodeId, ts, nonce, sig)" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("pings").insert({
      node_id: body.nodeId,
      sticker_id: body.stickerId ?? null,
      ts: Number(body.ts),
      nonce: String(body.nonce),
      sig: String(body.sig),
      lat: body.lat ?? null,
      lon: body.lon ?? null,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}

// optional: make GET explicitly 405 so opening the URL in a browser is clear
export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}






