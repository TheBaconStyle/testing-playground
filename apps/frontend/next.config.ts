import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  output: 'standalone',
  experimental: {
    viewTransition: true,
    serverActions: {
      allowedOrigins: [
        'localhost',
        'localhost:3000',
        'www.baconcs.duckdns.org',
        '0bks9mkt-3000.inc1.devtunnels.ms',
        '0bks9mkt-80.inc1.devtunnels.ms',
        '3rs27bxx-3000.inc1.devtunnels.ms',
      ],
    },
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/auth/:path*',
          destination: 'http://localhost:5000/api/auth/:path*',
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
