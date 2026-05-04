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
	async redirects() {
		return [
			{
				source: '/wp-content/:path*',
				destination: 'https://crone-group.ru/wp-content/:path*',
				permanent: true
			},
			{
				source: '/wp-includes/:path*',
				destination: 'https://crone-group.ru/wp-includes/:path*',
				permanent: true
			},
			{
				source: '/wp-json/:path*',
				destination: 'https://api.crone-group.ru/wp-json/:path*',
				permanent: true
			},
			{
				source: '/wp-admin/:path*',
				destination: 'https://crone-group.ru/wp-admin/:path*',
				permanent: true
			}
		];
	}
};

module.exports = nextConfig;
