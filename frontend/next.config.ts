import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Support static asset optimization and rewrites to backend API if configured
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (backendUrl && backendUrl.startsWith('http') && !backendUrl.includes('localhost:3000')) {
      return [
        {
          source: '/api/v1/:path*',
          destination: `${backendUrl.replace(/\/api\/v1\/?$/, '')}/api/v1/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
