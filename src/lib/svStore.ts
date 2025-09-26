import type { SVState, SVTier, AccrueInput } from "@/types/sv";

// ---- Tier logic (same thresholds as UI; adjust when you like) ----
export function svTierFor(balance: number): SVTier {
  if (balance >= 50_000) return "Aether";
  if (balance >= 15_000) return "Sanctum";
  if (balance >= 3_000)  return "Grove";
  return "Seed";
}

export function tierMultiplier(tier: SVTier): number {
  return tier === "Aether" ? 1.6
       : tier === "Sanctum" ? 1.35
       : tier === "Grove"   ? 1.15
       : 1.0;
}

// ---- Simple in-memory store (dev only). Replace with Redis/Supabase later. ----
// Keep a single global instance across hot reloads:
const g = globalThis as any;
if (!g.__SV_STORE__) g.__SV_STORE__ = new Map<string, SVState>();
const STORE: Map<string, SVState> = g.__SV_STORE__;

function initState(nodeId: string): SVState {
  const now = Date.now();
  return {
    nodeId,
    balance: 0,
    unclaimed: 0,
    lastClaimTs: 0,
    streakDays: 0,
    tier: "Seed",
    updatedAt: now,
  };
}

export const svStore = {
  async get(nodeId: string): Promise<SVState> {
    return STORE.get(nodeId) ?? initState(nodeId);
  },

  async put(state: SVState): Promise<void> {
    state.updatedAt = Date.now();
    STORE.set(state.nodeId, state);
  },

  // Move unclaimed -> balance
  async claim(nodeId: string): Promise<SVState> {
    const cur = await this.get(nodeId);
    if (cur.unclaimed <= 0) return cur;

    const nextBalance = Number((cur.balance + cur.unclaimed).toFixed(6));
    const tier = svTierFor(nextBalance);
    const next: SVState = {
      ...cur,
      balance: nextBalance,
      unclaimed: 0,
      lastClaimTs: Date.now(),
      tier,
      updatedAt: Date.now(),
    };
    await this.put(next);
    return next;
  },

  // Accrue based on event weight * multipliers. This is intentionally simple.
  // Call this from pipelines/webhooks (e.g., when /api/mesh/ping succeeds).
  async accrue(evt: AccrueInput): Promise<SVState> {
    const { nodeId, kind = "ping", weight = 1.0 } = evt;
    const cur = await this.get(nodeId);

    // Base units per event (tune per kind)
    const baseByKind: Record<string, number> = {
      ping: 0.8,
      checkin: 1.5,
      post: 2.0,
      ritual: 3.5,
      boost: 0.0, // handled elsewhere (consumption)
    };
    const base = baseByKind[kind] ?? 0.5;

    // Streak & tier multipliers (same idea as UI)
    const streakMult = 1 + Math.min(cur.streakDays, 30) * 0.01;
    const tierMult = tierMultiplier(cur.tier);

    const delta = Number((base * weight * streakMult * tierMult).toFixed(6));
    const next: SVState = {
      ...cur,
      unclaimed: Number((cur.unclaimed + delta).toFixed(6)),
      updatedAt: Date.now(),
    };
    await this.put(next);
    return next;
  },

  // For daily streak bumps (call once per day when a presence/Signal is recorded)
  async bumpStreak(nodeId: string, by: number = 1): Promise<SVState> {
    const cur = await this.get(nodeId);
    const next: SVState = {
      ...cur,
      streakDays: Math.min(cur.streakDays + by, 365),
      updatedAt: Date.now(),
    };
    await this.put(next);
    return next;
  },
};

// ---- Example: how to swap to Redis later ----
// 1) Add UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN envs.
// 2) Replace Map<> with Redis JSON (e.g., key `sv:${nodeId}`).
// 3) Keep this file’s method signatures so the API routes don’t change.
