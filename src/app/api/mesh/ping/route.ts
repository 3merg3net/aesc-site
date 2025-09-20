// src/app/api/mesh/ping/route.ts
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const supabase = getSupabase("service"); // if you require writes without RLS bypass via RPC you can switch to anon + RPC
    const body = await req.json();

    // TODO: validate HMAC, structure, ranges, etc.
    // Example insert (change table and columns to match your schema):
    const { error } = await supabase.from("pings").insert({
      node_id: body.nodeId,
      sticker_id: body.stickerId ?? null,
      ts: body.ts,
      nonce: body.nonce,
      sig: body.sig,
      lat: body.lat ?? null,
      lon: body.lon ?? null,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}


