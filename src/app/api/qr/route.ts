export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import QRCode from "qrcode";

// tiny in-PNG overlay helper (center the logo block)
async function overlayPng(base: Buffer, logoPng?: Buffer): Promise<Buffer> {
  if (!logoPng) return base;
  // NOTE: keeping it simple and dependency-free:
  // we return base for now; if you want compositing, we can add "sharp" later.
  return base;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") ?? "";
    if (!text) {
      return NextResponse.json({ ok: false, error: "Missing ?text" }, { status: 400 });
    }

    const size   = Math.min(1024, Math.max(64, Number(searchParams.get("size") || "256")));
    const margin = Math.min(12,  Math.max(0,  Number(searchParams.get("margin") || "1")));
    const format = (searchParams.get("format") || "png").toLowerCase();
    // colors (hex without # is fine too)
    const fg = "#" + (searchParams.get("fg") || "E6E6E6").replace(/^#/, "");
    const bg = "#" + (searchParams.get("bg") || "00000000").replace(/^#/, ""); // default transparent

    const common = {
      width: size,
      margin,
      errorCorrectionLevel: "M" as const,
      color: { dark: fg, light: bg },
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
    const out = await overlayPng(buf, undefined);
    return new Response(new Uint8Array(out), {
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




