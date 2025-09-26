export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { svStore } from "@/lib/svStore";
import type { AccrueInput } from "@/types/sv";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Partial<AccrueInput>;
    const nodeId = String(body?.nodeId || "");
    if (!nodeId) {
      return NextResponse.json({ ok: false, error: "Missing nodeId" }, { status: 400 });
    }

    // Optional: bump streak if this event qualifies as a "daily presence"
    // In production, your presence service can call a dedicated "streak" route.
    const updated = await svStore.accrue({
      nodeId,
      kind: body.kind ?? "ping",
      weight: typeof body.weight === "number" ? body.weight : 1.0,
      ts: body.ts ?? Date.now(),
    });

    return NextResponse.json({ ok: true, state: updated });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "SV accrue failed" }, { status: 500 });
  }
}
