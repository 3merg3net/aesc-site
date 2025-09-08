// naive in-memory rate limit per IP (OK for small sites / serverless cold starts)
const hits = new Map<string, { count: number; ts: number }>();

export function limit(ip: string, windowMs = 60_000, max = 20) {
  const now = Date.now();
  const rec = hits.get(ip) ?? { count: 0, ts: now };
  if (now - rec.ts > windowMs) {
    rec.count = 0;
    rec.ts = now;
  }
  rec.count++;
  hits.set(ip, rec);
  return rec.count <= max;
}

