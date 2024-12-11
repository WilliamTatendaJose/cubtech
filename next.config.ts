import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['cdn.sanity.io']
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },

};

export default nextConfig;
