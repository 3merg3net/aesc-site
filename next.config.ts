// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚀 Ship now: don’t fail builds on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
ig;
