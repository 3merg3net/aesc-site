// src/lib/supabase.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedAnon: SupabaseClient | null = null;
let cachedService: SupabaseClient | null = null;

function reqEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Supabase misconfig: ${name} is missing`);
  return v;
}

/**
 * Use:
 *  - getSupabase("anon")    → for public/browser reads (only in client code)
 *  - getSupabase("service") → for server code that must bypass RLS (API routes)
 *
 * Required envs:
 *  - NEXT_PUBLIC_SUPABASE_URL
 *  - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *  - SUPABASE_SERVICE_ROLE_KEY
 */
export function getSupabase(kind: "anon" | "service" = "anon") {
  const url = reqEnv("NEXT_PUBLIC_SUPABASE_URL");

  if (kind === "anon") {
    if (!cachedAnon) {
      const key = reqEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
      cachedAnon = createClient(url, key, { auth: { persistSession: false } });
    }
    return cachedAnon;
  }

  // kind === "service"
  if (!cachedService) {
    const key = reqEnv("SUPABASE_SERVICE_ROLE_KEY"); // server-only
    cachedService = createClient(url, key, { auth: { persistSession: false } });
  }
  return cachedService;
}




