import { NextRequest, NextResponse } from "next/server";

type SubscribeBody = {
  email?: string;
  honey?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, honey } = (await req.json()) as SubscribeBody;

    // honeypot
    if (honey) return NextResponse.json({ ok: true });

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;

    if (apiKey && to) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AESC Newsletter <no-reply@aesctrust.org>",
          to: [to],
          subject: "New newsletter subscriber",
          html: `<p>${email}</p>`,
        }),
      });
    } else {
      console.warn("Email disabled: missing RESEND_API_KEY or CONTACT_TO");
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}


