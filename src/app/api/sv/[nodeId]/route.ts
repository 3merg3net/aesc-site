export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { svStore } from "@/lib/svStore";

export async function GET(
  _req: Request,
  { params }: { params: { nodeId: string } }
) {
  try {
    const nodeId = decodeURIComponent(params.nodeId);
    if (!nodeId) {
      return NextResponse.json({ ok: false, error: "Missing nodeId" }, { status: 400 });
    }
    const state = await svStore.get(nodeId);
    return NextResponse.json({ ok: true, state });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "SV get failed" }, { status: 500 });
  }
}
