import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		qualities: [30, 55, 75],
		deviceSizes: [320, 768, 1024, 1280, 1920],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.crone-group.ru'
			},
			{
				protocol: 'https',
				hostname: '*.userapi.com'
			},
			{
				protocol: 'https',
				hostname: 'mc.yandex.ru'
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
