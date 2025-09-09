import { NextResponse } from "next/server";
import { limit } from "../../../lib/rate-limit";

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || "0";

  // 10 requests/min per IP
  if (!limit(ip, 60_000, 10)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  try {
    const { name, email, company, phone, message, honey } = await req.json();

    // Honeypot
    if (honey) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;

    if (apiKey && to) {
      const subject = `AESC Contact: ${name}`;
      const html = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AESC Contact <no-reply@aesctrust.org>",
          to: [to],
          subject,
          html,
        }),
      });
    } else {
      console.warn("Email disabled: missing RESEND_API_KEY or CONTACT_TO");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}







