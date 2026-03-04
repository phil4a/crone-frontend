import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'crone-group.ru'
			},
			{
				protocol: 'https',
				hostname: '*.userapi.com'
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
