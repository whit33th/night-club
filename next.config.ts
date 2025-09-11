import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
    viewTransition: true,
    typedRoutes: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "impressive-chameleon-438.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

export default nextConfig;
