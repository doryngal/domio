/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // Prevent Next.js from scanning the nested domio-shops sub-project
  webpack(config) {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/domio-shops/**", "**/node_modules/**"],
    };
    return config;
  },
};

export default nextConfig;
