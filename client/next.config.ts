import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
