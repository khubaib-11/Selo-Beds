import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.28:3000"],
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zxkrobxvmerfpavvuzsx.supabase.co",
      },
    ],
  },
};

export default nextConfig;
