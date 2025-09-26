export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { svStore } from "@/lib/svStore";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const nodeId = String(body?.nodeId || "");
    if (!nodeId) {
      return NextResponse.json({ ok: false, error: "Missing nodeId" }, { status: 400 });
    }
    const state = await svStore.claim(nodeId);
    return NextResponse.json({ ok: true, state });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "SV claim failed" }, { status: 500 });
  }
}
