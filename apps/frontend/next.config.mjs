/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cleanDistDir: true,
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost:3000"],
    },
  },
  images: { unoptimized: true },
};

export default nextConfig;
