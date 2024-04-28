/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	rewrites: async () => {
		return [
			{
				source: "/api/:path*",
				destination: "http://127.0.0.1:5001/api/:path*",
			},
		];
	},
};

export default nextConfig;
