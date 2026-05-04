import type { MetadataRoute } from 'next';

import { PAGE } from '@/config/pages.config';
import { SITE_URL } from '@/config/site.config';

import { client } from '@/api/graphql';

import { GetSitemapDataDocument, type GetSitemapDataQuery } from '@/graphql/generated';

export const revalidate = 86400;

function getBaseUrl(): string {
	const raw = SITE_URL?.trim();
	if (!raw) return 'http://localhost:3000';

	try {
		return new URL(raw).origin;
	} catch {
		return 'http://localhost:3000';
	}
}

function toAbsoluteUrl(baseUrl: string, path: string): string {
	return new URL(path, baseUrl).toString();
}

async function getSitemapData(): Promise<{
	projects: Array<{ slug?: string | null }>;
	articles: Array<{ slug?: string | null }>;
}> {
	try {
		const data = await client.request<GetSitemapDataQuery>(GetSitemapDataDocument);
		return {
			projects: data.projects?.nodes ?? [],
			articles: data.articles?.nodes ?? []
		};
	} catch {
		return { projects: [], articles: [] };
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl();
	const now = new Date();

	const staticUrls: MetadataRoute.Sitemap = [
		{
			url: toAbsoluteUrl(baseUrl, PAGE.HOME),
			lastModified: now,
			changeFrequency: 'daily',
			priority: 1
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.ABOUT),
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.7
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.SERVICES),
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.7
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.OBJECTS),
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.8
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.ARTICLES),
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.8
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.CONTACTS),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.6
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.FAQ),
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.5
		},
		{
			url: toAbsoluteUrl(baseUrl, PAGE.SITE_MAP),
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.3
		},
		{
			url: toAbsoluteUrl(baseUrl, '/cookies-policy'),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.2
		},
		{
			url: toAbsoluteUrl(baseUrl, '/privacy-policy'),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.2
		},
		{
			url: toAbsoluteUrl(baseUrl, '/user-agreement'),
			lastModified: now,
			changeFrequency: 'yearly',
			priority: 0.2
		}
	];

	const { projects, articles } = await getSitemapData();

	const projectUrls: MetadataRoute.Sitemap = projects
		.map(item => item.slug?.trim())
		.filter((slug): slug is string => Boolean(slug))
		.map(slug => ({
			url: toAbsoluteUrl(baseUrl, `/project/${encodeURIComponent(slug)}`),
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.7
		}));

	const articleUrls: MetadataRoute.Sitemap = articles
		.map(item => item.slug?.trim())
		.filter((slug): slug is string => Boolean(slug))
		.map(slug => ({
			url: toAbsoluteUrl(baseUrl, `/articles/${encodeURIComponent(slug)}`),
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.6
		}));

	return [...staticUrls, ...projectUrls, ...articleUrls];
}
