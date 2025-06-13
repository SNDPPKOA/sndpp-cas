import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    unoptimized: true, // ✅ disables image optimization for static export
  },
};

export default nextConfig;
