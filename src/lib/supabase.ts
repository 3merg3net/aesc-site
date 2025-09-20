// src/lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only factory. Use 'anon' for reads and 'service' for writes/cron.
 * Never expose the service key to the browser.
 */
export function getSupabase(role: "anon" | "service" = "anon"): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Supabase misconfig: NEXT_PUBLIC_SUPABASE_URL is missing");
  }

  // Prefer service key when explicitly requested; fall back to anon if needed.
  const key = role === "service" ? (svc || anon) : anon;

  if (!key) {
    throw new Error(
      `Supabase misconfig: ${
        role === "service" ? "SUPABASE_SERVICE_ROLE_KEY (or anon fallback)" : "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      } is missing`
    );
  }

  // Server: no session persistence
  return createClient(url, key, { auth: { persistSession: false } });
}

