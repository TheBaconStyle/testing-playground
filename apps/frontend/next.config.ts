import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cleanDistDir: true,
  output: 'standalone',
  experimental: {
    viewTransition: true,
    serverActions: {
      allowedOrigins: [
        'http://localhost:3000',
        'https://www.baconcs.duckdns.org',
      ],
    },
  },
  images: {
    loader: 'custom',
    loaderFile: './src/features/images/api/index.ts',
  },
};

export default nextConfig;
