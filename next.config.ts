import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove or update experimental.serverActions if not needed or not valid for your Next.js version
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    // This replaces the deprecated 'domains' with the new 'remotePatterns'
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
