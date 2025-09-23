// src/app/api/mesh/ping/route.ts
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import crypto from "crypto";

/**
 * DEMO SHARED SECRET:
 * - Set in env as DEMO_SHARED_SECRET (Vercel & .env.local)
 * - For production, replace with per-node keys or wallet signatures.
 */
const DEMO_SHARED_SECRET = process.env.DEMO_SHARED_SECRET || "";

// HMAC-SHA256 helper
function hmacHex(secret: string, message: string) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase("service");
    const body = await req.json();

    const nodeId: string = body?.nodeId || "";
    const stickerId: string | null = body?.stickerId ?? null;
    const ts: number = Number(body?.ts);
    const nonce: string = body?.nonce || "";
    const sig: string = (body?.sig || "").toLowerCase();
    const lat = body?.lat ?? null;
    const lon = body?.lon ?? null;

    if (!nodeId || !Number.isFinite(ts) || !nonce || !sig) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Verify HMAC if a shared secret is configured
    if (DEMO_SHARED_SECRET) {
      const base = `${nodeId}|${stickerId ?? ""}|${ts}|${nonce}`;
      const expect = hmacHex(DEMO_SHARED_SECRET, base);
      if (expect !== sig) {
        return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
      }
    }

    const { error } = await supabase.from("pings").insert({
      node_id: nodeId,
      sticker_id: stickerId,
      ts,
      nonce,
      sig,
      lat,
      lon,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unexpected error" }, { status: 500 });
  }
}







