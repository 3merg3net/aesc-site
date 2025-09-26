export type SVTier = "Seed" | "Grove" | "Sanctum" | "Aether";

export interface SVState {
  nodeId: string;
  balance: number;       // total SV
  unclaimed: number;     // accrual waiting to be claimed
  lastClaimTs: number;   // epoch ms
  streakDays: number;    // consecutive days with Signals
  tier: SVTier;
  // optional telemetry
  updatedAt: number;     // epoch ms
}

export interface AccrueInput {
  nodeId: string;
  // weight for the event (e.g. ping, check-in, post, ritual, etc.)
  kind?: "ping" | "checkin" | "post" | "ritual" | "boost";
  weight?: number; // default 1.0
  // optional — when the event occurred (defaults to now)
  ts?: number;
}
