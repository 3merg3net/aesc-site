export const runtime = "nodejs";

import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") ?? "";
    if (!text) {
      return NextResponse.json({ ok: false, error: "Missing ?text" }, { status: 400 });
    }

    const size = Math.min(1024, Math.max(64, Number(searchParams.get("size") || "256")));
    const margin = Math.min(8, Math.max(0, Number(searchParams.get("margin") || "1")));
    const format = (searchParams.get("format") || "png").toLowerCase();

    const common = {
      width: size,
      margin,
      errorCorrectionLevel: "M" as const,
      color: {
        dark: "#E6E6E6",     // light gray code
        light: "#00000000",  // transparent background
      },
    };

    if (format === "svg") {
      const svg = await QRCode.toString(text, { ...common, type: "svg" });
      return new NextResponse(svg, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // default: PNG
    const buf = await QRCode.toBuffer(text, common);
    // Convert Buffer -> Uint8Array so the Web Response typing is happy
    return new Response(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "QR generation failed" }, { status: 500 });
  }
}


