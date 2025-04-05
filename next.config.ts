import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.whatsapp.net',
      },
    ],
  },
};

export default nextConfig;
