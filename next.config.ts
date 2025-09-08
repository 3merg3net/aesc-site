import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // Leave redirects empty for now; let Vercel's Primary Domain handle www ↔ apex
  // redirects: async () => [],
};

export default nextConfig;
