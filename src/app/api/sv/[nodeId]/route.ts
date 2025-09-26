// src/app/api/sv/[nodeId]/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ nodeId: string }> }
) {
  const { nodeId } = await params;

  return NextResponse.json({
    ok: true,
    nodeId,
    sv: 0,
    streak: 0,
    lastAccrual: null,
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ nodeId: string }> }
) {
  const { nodeId } = await params;
  const body = await req.json().catch(() => ({}));

  // TODO: mutate SV; echo for now
  return NextResponse.json({ ok: true, nodeId, received: body });
}

