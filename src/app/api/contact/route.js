import { NextResponse } from "next/server";
import { limit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || "0";

  // 10 req/min per IP
  if (!limit(ip, 60_000, 10)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  try {
    const { name, email, company, phone, message, honey } = await req.json();

    // honeypot (from your form)
    if (honey) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    if (!apiKey || !to) {
      return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 500 });
    }

    const subject = `ÆSC Contact — ${name}`;
    const body = `From: ${name} <${email}>
Company: ${company || "-"}
Phone: ${phone || "-"}

Message:
${message}
`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ÆSC Trust <no-reply@aesctrust.org>", // must be a verified Resend domain
        to: [to],
        reply_to: [email],
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ ok: false, error: err || "Email send failed." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unexpected error." }, { status: 500 });
  }
}



