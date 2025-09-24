export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import QRCode from "qrcode";

function hexToHashColor(hex: string, fallback: string) {
  const m = String(hex || "").trim().match(/^#?([0-9a-f]{6}|[0-9a-f]{8})$/i);
  return m ? `#${m[1]}` : fallback;
}

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

    // NEW: optional colors + error correction
    const fg = hexToHashColor(searchParams.get("fg") || "", "#0F172A");        // default dark slate
    const bg = hexToHashColor(searchParams.get("bg") || "", "#00000000");      // transparent background
    const ecParam = (searchParams.get("ec") || "M").toUpperCase();
    const errorCorrectionLevel = (["L","M","Q","H"].includes(ecParam) ? ecParam : "M") as "L" | "M" | "Q" | "H";

    const common = {
      width: size,
      margin,
      errorCorrectionLevel,
      color: {
        dark: fg,
        light: bg,
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



