import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // using Vercel Postgres

export async function GET() {
  const { rows } = await sql`
    select
      node_id,
      max(ts) as last_seen,
      avg(lat) as lat,
      avg(lon) as lon
    from pings
    group by node_id
    order by last_seen desc
    limit 1000;
  `;
  return NextResponse.json({ nodes: rows });
}
