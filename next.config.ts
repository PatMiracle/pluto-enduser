import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
};

export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [new URL("https://pluto.reelest.com.ng/**")],
  },
};
