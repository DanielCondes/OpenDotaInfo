import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // 🔥 Desactiva los sourcemaps del server (Turbopack)
  experimental: {
    serverSourceMaps: false,
  },

  // 🔇 Silenciar error por no usar turbopack.config
  turbopack: {},
};

export default nextConfig;