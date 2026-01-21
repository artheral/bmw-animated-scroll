import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'bmw-animated-scroll'; // Update this to your exact repository name if different

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};

export default nextConfig;
