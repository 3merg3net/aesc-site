// scripts/test-supabase.ts
import { config } from "dotenv";
config({ path: ".env.local" }); // <- ensure NEXT_PUBLIC_SUPABASE_URL etc. are loaded

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");

const supabase = createClient(url, key);

(async () => {
  const { data, error } = await supabase
    .from("pings")
    .insert({
      node_id: "debug-node",
      sticker_id: null,
      ts: Date.now(),
      nonce: "test123",
      sig: "debug",
      lat: 37.78,
      lon: -122.41,
    })
    .select();

  console.log({ error, data });
})();
