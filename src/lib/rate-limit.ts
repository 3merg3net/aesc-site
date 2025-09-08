// naive in-memory rate limit per IP (OK for small sites / serverless cold starts)
// src/lib/rate-limit.ts
const buckets = new Map<string, number[]>();

export function limit(key: string, windowMs: number, maxHits: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);
  return hits.length <= maxHits;
}


