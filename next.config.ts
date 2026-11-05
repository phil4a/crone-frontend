import type { NextConfig } from 'next';

// Хосты берём из env, чтобы сайт работал и на тестовых доменах.
// Без env — прод-значения.
const originOf = (url: string | undefined, fallback: string) => {
	try {
		return url ? new URL(url).origin : fallback;
	} catch {
		return fallback;
	}
};

const SITE_ORIGIN = originOf(process.env.NEXT_PUBLIC_SITE_URL, 'https://crone-group.ru');
const WP_ORIGIN = originOf(process.env.NEXT_PUBLIC_API_URL, 'https://api.crone-group.ru');

const imageHosts = Array.from(
	new Set(['crone-group.ru', 'api.crone-group.ru', new URL(SITE_ORIGIN).hostname, new URL(WP_ORIGIN).hostname])
);

const nextConfig: NextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		qualities: [30, 55, 75],
		deviceSizes: [320, 768, 1024, 1280, 1920],
		remotePatterns: [
			...imageHosts.map((hostname) => ({ protocol: 'https' as const, hostname })),
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
				destination: `${WP_ORIGIN}/wp-content/:path*`,
				permanent: true
			},
			{
				source: '/wp-includes/:path*',
				destination: `${WP_ORIGIN}/wp-includes/:path*`,
				permanent: true
			},
			{
				source: '/wp-json/:path*',
				destination: `${WP_ORIGIN}/wp-json/:path*`,
				permanent: true
			},
			{
				source: '/wp-admin/:path*',
				destination: `${WP_ORIGIN}/wp-admin/:path*`,
				permanent: true
			}
		];
	}
};

export default nextConfig;
