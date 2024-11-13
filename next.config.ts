import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Ignore punycode warning
    config.ignoreWarnings = [{ module: /node_modules\/punycode/ }];
    return config;
  },
};

export default nextConfig;
