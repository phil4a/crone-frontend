/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		qualities: [30, 55, 75],
		deviceSizes: [320, 768, 1024, 1280, 1920],
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

module.exports = nextConfig;

