import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs"; // Supabase client needs Node runtime

const PingSchema = z.object({
  nodeId: z.string().min(2),
  stickerId: z.string().min(2),
  ts: z.number().int(),         // milliseconds since epoch
  nonce: z.string().min(4),
  sig: z.string().min(10),      // HMAC-SHA256 hex
  lat: z.number().optional(),
  lon: z.number().optional(),
});

function hmac(secret: string, msg: string) {
  return crypto.createHmac("sha256", secret).update(msg).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = PingSchema.parse(body);

    const secret = process.env.STICKER_HMAC_SECRET;
    if (!secret) {
      console.error("Missing STICKER_HMAC_SECRET");
      return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
    }

    // canonical message for signature
    const msg = `${data.nodeId}|${data.stickerId}|${data.ts}|${data.nonce}`;
    const expected = hmac(secret, msg);
    if (expected !== data.sig) {
      return NextResponse.json({ ok: false, error: "bad_sig" }, { status: 401 });
    }

    // (Optional) basic freshness/rate sanity: reject very old timestamps (>24h) or far future (>5m)
    const now = Date.now();
    if (data.ts < now - 86_400_000 || data.ts > now + 300_000) {
      return NextResponse.json({ ok: false, error: "bad_ts" }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabaseAdmin
      .from("pings")
      .insert([{
        node_id: data.nodeId,
        sticker_id: data.stickerId,
        ts: data.ts,
        lat: data.lat ?? null,
        lon: data.lon ?? null,
      }]);

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json({ ok: false, error: "db_insert_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // zod errors or JSON parse errors land here
    const msg = err?.message ?? "bad_request";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}

