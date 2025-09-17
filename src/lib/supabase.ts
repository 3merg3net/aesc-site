import { createClient } from "@supabase/supabase-js";

// Use the built-in Supabase env vars that Vercel added automatically
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,    // project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!,   // service role key (server-side only)
  {
    auth: { persistSession: false }
  }
);
