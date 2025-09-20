// src/app/api/diag/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET() {
  const present = (name: string) => Boolean(process.env[name] && process.env[name]!.length > 0);
  return NextResponse.json({
    ok: true,
    env: {
      NEXT_PUBLIC_SUPABASE_URL: present("NEXT_PUBLIC_SUPABASE_URL"),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: present("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      SUPABASE_SERVICE_ROLE_KEY: present("SUPABASE_SERVICE_ROLE_KEY"),
      SUPABASE_JWT_SECRET: present("SUPABASE_JWT_SECRET"),
    },
    runtime: process.env.VERCEL ? "vercel" : "local",
  });
}
