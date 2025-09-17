import { createClient } from "@supabase/supabase-js";

// Vercel’s Supabase integration provides these vars automatically
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,   // e.g. https://xyz.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY!,  // server-only key
  { auth: { persistSession: false } }
);
