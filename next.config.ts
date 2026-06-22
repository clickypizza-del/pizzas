import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the Z.ai preview gateway to request /_next/* resources without
  // triggering the cross-origin dev warning.
  allowedDevOrigins: ["*.space-z.ai"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
      },
    ],
  },
};

export default nextConfig;
