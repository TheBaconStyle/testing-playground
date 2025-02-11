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
  images: {
    loader: "custom",
    loaderFile: "./src/features/images/api/index.ts",
  },
};

export default nextConfig;
