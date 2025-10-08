import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove or update experimental.serverActions if not needed or not valid for your Next.js version
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    domains: ['images.ctfassets.net'],
  },
  /* config options here */
};

export default nextConfig;
