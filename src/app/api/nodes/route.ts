import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";         // explicit
export const dynamic = "force-dynamic";  // avoid any static analysis surprises

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("nodes_view") // or your table/view name
      .select("*")
      .limit(1000);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, nodes: data ?? [] });
  } catch (e: any) {
    // If env is missing during local build/run, you’ll get here
    return NextResponse.json({ ok: false, error: e?.message ?? "Supabase not configured" }, { status: 500 });
  }
}
