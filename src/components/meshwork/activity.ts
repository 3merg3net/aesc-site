// Simple recency-based activity score in [0..1] using a half-life decay.
// 0 = cold, 1 = hot (just posted).
export function activityScore(lastSeenMs: number, now = Date.now(), halfLifeMinutes = 90): number {
  const ageMs = Math.max(0, now - lastSeenMs);
  const halfLifeMs = halfLifeMinutes * 60_000;
  // e^-ln(2) * (age / halfLife)  →  0.5 every half-life
  const decay = Math.exp(-Math.LN2 * (ageMs / halfLifeMs));
  return Math.max(0, Math.min(1, decay));
}

// Convenience: map score → UI scales
export function glowFromScore(s: number) {
  // radius in meters for aura; weight and opacities scale perceptibly
  const auraRadius = 4000 + Math.round(s * 14000); // 4–18 km
  const coreRadius = 3 + Math.round(s * 4);        // 3–7 px
  const auraOpacity = 0.15 + s * 0.35;             // 0.15–0.50
  const coreOpacity = 0.6 + s * 0.35;              // 0.6–0.95
  return { auraRadius, coreRadius, auraOpacity, coreOpacity };
}
