import type { NextConfig } from 'next';
import { env } from '@/shared/env';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  output: 'standalone',
  typedRoutes: true,
  experimental: {
    viewTransition: true,
    serverActions: {
      allowedOrigins: [
        env.NEXT_PUBLIC_DOMAIN
      ],
    },
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
      ],
    };
  },
  images: {
    loader: 'custom',
    loaderFile: './src/shared/images/api/index.ts',
  },
  allowedDevOrigins: [
    'www.baconcs.duckdns.org',
    'localhost',
    '0bks9mkt-3000.inc1.devtunnels.ms',
    '0bks9mkt-80.inc1.devtunnels.ms',
  ],
};

export default nextConfig;
