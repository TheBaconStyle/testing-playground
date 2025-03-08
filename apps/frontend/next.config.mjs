/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	cleanDistDir: true,
	output: "standalone",
	images: {
		loader: "custom",
		loaderFile: "./src/features/images/api/index.ts",
	},
};

export default nextConfig;
