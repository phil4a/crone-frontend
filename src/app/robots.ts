import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/config/site.config';

function getBaseUrl(): string | null {
	const raw = SITE_URL?.trim();
	if (!raw) return null;

	try {
		return new URL(raw).origin;
	} catch {
		return null;
	}
}

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getBaseUrl();

	if (process.env.NODE_ENV !== 'production') {
		return {
			rules: [{ userAgent: '*', disallow: '/' }]
		};
	}

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/_next/']
			}
		],
		sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,
		host: baseUrl ?? undefined
	};
}

