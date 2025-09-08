import { NextResponse } from "next/server";
import { limit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || "0";

  // 10 req/min per IP
  if (!limit(ip, 60_000, 10)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email, name, honey } = await req.json();

    // honeypot (ignore bots silently)
    if (honey) return NextResponse.json({ ok: true });

    if (!email || typeof email !== "string") {
      return NextResponse.json({ ok: false, error: "Email required." }, { status: 400 });
    }

    const API_KEY = process.env.RESEND_API_KEY;
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
    if (!API_KEY || !AUDIENCE_ID) {
      return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 500 });
    }

    // Resend Contacts API — add/update subscriber in an Audience
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: name || undefined,
        audience_id: AUDIENCE_ID,
        unsubscribed: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err || "Failed to subscribe." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unexpected error." }, { status: 500 });
  }
}

