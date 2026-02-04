import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		domains: ['crone-group.ru'],
	},
};

export default nextConfig;
