export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { svStore } from "@/lib/svStore";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const nodeId = String(body?.nodeId || "");
    const by = typeof body?.by === "number" ? body.by : 1;
    if (!nodeId) {
      return NextResponse.json({ ok: false, error: "Missing nodeId" }, { status: 400 });
    }

    const updated = await svStore.bumpStreak(nodeId, by);
    return NextResponse.json({ ok: true, state: updated });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "SV streak failed" }, { status: 500 });
  }
}
