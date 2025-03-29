/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [];
  },
  experimental: {
    serverActions: true,
  },
  env: {
    PORT: 3002,
  },
};

module.exports = nextConfig; 