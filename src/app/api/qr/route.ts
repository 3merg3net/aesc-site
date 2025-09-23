// src/app/api/qr/route.ts
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import QRCode from "qrcode";

/**
 * GET /api/qr?text=...&size=256&margin=1&format=png|svg
 * - text:   what to encode (REQUIRED)
 * - size:   pixel width/height (default 256)
 * - margin: quiet zone modules (default 1)
 * - format: "png" | "svg" (default "png")
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const size = Number(searchParams.get("size") || "256");
    const margin = Number(searchParams.get("margin") || "1");
    const format = (searchParams.get("format") || "png").toLowerCase();

    if (!text) {
      return NextResponse.json({ ok: false, error: "Missing ?text" }, { status: 400 });
    }

    if (format === "svg") {
      const svg = await QRCode.toString(text, {
        type: "svg",
        margin,
        width: size,
        errorCorrectionLevel: "M",
      });
      return new NextResponse(svg, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    // default: PNG
    const buf = await QRCode.toBuffer(text, {
      type: "png",
      margin,
      width: size,
      errorCorrectionLevel: "M",
    });
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "QR error" }, { status: 500 });
  }
}

