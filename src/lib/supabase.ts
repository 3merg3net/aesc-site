// src/lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Read env once, but DO NOT throw at module scope
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** Returns a Supabase client or throws (inside the route handler) if misconfigured. */
export function getSupabase(): SupabaseClient {
  if (!url || !key) {
    // Throw only when a route actually tries to use the DB
    throw new Error(
      "Supabase env missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or server equivalents)."
    );
  }
  if (!client) {
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
