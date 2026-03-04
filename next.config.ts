import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'crone-group.ru'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/wp-content/:path*',
				destination: 'https://crone-group.ru/wp-content/:path*'
			}
		];
	}
};

export default nextConfig;
