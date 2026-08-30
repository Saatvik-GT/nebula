import { createRequire } from "node:module";
import type { NextConfig } from "next";

const require = createRequire(import.meta.url);
// The optimized black-hole landing component imports `.wgsl` shader files
// directly and pulls `vgpu` / `@vgpu/*` straight from source (no build step).
const wgslWebpackLoader = require.resolve("@vgpu/wgsl/loader-webpack");

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingRoot: process.cwd(),

  transpilePackages: [
    "vgpu",
    "@vgpu/core",
    "@vgpu/wgsl",
    "@vgpu/wgsl-std",
    "@vgpu/adapter-mock",
    "@vgpu/adapter-node",
  ],

  turbopack: {
    rules: {
      "*.wgsl": {
        loaders: [wgslWebpackLoader],
        as: "*.js",
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.wgsl$/,
      use: [{ loader: wgslWebpackLoader }],
    });
    return config;
  },
};

export default nextConfig;
