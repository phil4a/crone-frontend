import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectContent } from '@/components/features/project/ProjectContent';

import { PAGE } from '@/config/pages.config';
import { SITE_CONFIG, SITE_URL } from '@/config/site.config';

import { client } from '@/api/graphql';

import {
	GetAllProjectSlugsDocument,
	GetAllProjectSlugsQuery,
	GetProjectBySlugDocument,
	GetProjectBySlugQuery,
	GetProjectBySlugQueryVariables,
	GetRelatedProjectsDocument,
	GetRelatedProjectsQuery,
	GetRelatedProjectsQueryVariables
} from '@/graphql/generated';
import { getRandomProjects } from '@/lib/projects/utils';
import { transformGraphQLProject } from '@/lib/transformers';
import { TPageSlugProp } from '@/types/page.types';

export const revalidate = 86400;
export const dynamic = 'force-static';

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

function stripHtml(value: string): string {
	return value
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function buildDescription(value: string, maxLength: number = 170): string {
	const text = stripHtml(value);
	if (text.length <= maxLength) return text;
	return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export async function generateStaticParams() {
	try {
		const { posts } = await client.request<GetAllProjectSlugsQuery>(GetAllProjectSlugsDocument);

		if (!posts?.nodes) return [];

		return posts.nodes
			.filter((node): node is { slug: string } => !!node?.slug)
			.map(node => ({
				slug: node.slug
			}));
	} catch {
		return [];
	}
}

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params;
	let post: GetProjectBySlugQuery['post'] | null = null;
	try {
		const data = await client.request<GetProjectBySlugQuery, GetProjectBySlugQueryVariables>(
			GetProjectBySlugDocument,
			{ slug }
		);
		post = data.post ?? null;
	} catch {
		post = null;
	}

	if (!post) {
		return {
			title: 'Проект не найден',
			robots: { index: false, follow: false }
		};
	}

	const baseUrl = getBaseUrl();
	const canonicalPath = `/project/${encodeURIComponent(slug)}`;
	const canonicalUrl = toAbsoluteUrl(baseUrl, canonicalPath);

	const title = post.seo?.title || post.title || 'Проект';
	const descriptionSource = post.seo?.metaDesc || post.projectFields?.shortDescription || '';
	const description = descriptionSource ? buildDescription(descriptionSource) : '';

	const ogImage = post.featuredImage?.node?.sourceUrl || undefined;

	const imageUrl = ogImage
		? ogImage.startsWith('http')
			? ogImage
			: `https:${ogImage}`
		: undefined;

	const city = post.projectFields?.city || undefined;
	const typeRaw = post.projectFields?.type;
	const projectType = Array.isArray(typeRaw) ? typeRaw[0] || undefined : typeRaw || undefined;
	const tagSlugs = post.tags?.nodes?.map(node => node.slug || '').filter(Boolean) || [];

	return {
		title,
		description,
		keywords: [post.title || title, city, projectType, ...tagSlugs].filter(
			(value): value is string => Boolean(value)
		),
		alternates: { canonical: canonicalUrl },
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: SITE_CONFIG.name,
			locale: 'ru_RU',
			type: 'website',
			images: imageUrl
				? [
						{
							url: imageUrl,
							alt: post.title || title
						}
					]
				: undefined
		},
		twitter: {
			card: imageUrl ? 'summary_large_image' : 'summary',
			title,
			description,
			images: imageUrl ? [imageUrl] : undefined
		},
		robots: { index: true, follow: true }
	};
}

export default async function ObjectPage({ params }: TPageSlugProp) {
	const { slug } = await params;
	let post: GetProjectBySlugQuery['post'] | null = null;
	try {
		const data = await client.request<GetProjectBySlugQuery, GetProjectBySlugQueryVariables>(
			GetProjectBySlugDocument,
			{ slug }
		);
		post = data.post ?? null;
	} catch {
		post = null;
	}

	if (!post) {
		notFound();
	}

	const project = transformGraphQLProject(post);

	let relatedData: GetRelatedProjectsQuery | null = null;
	try {
		relatedData = await client.request<GetRelatedProjectsQuery, GetRelatedProjectsQueryVariables>(
			GetRelatedProjectsDocument,
			{
				tag: project.tags[0] || undefined,
				notIn: [project.globalId || '']
			}
		);
	} catch {
		relatedData = null;
	}

	const relatedNodes = relatedData?.posts?.nodes || [];
	const relatedProjects = getRandomProjects(relatedNodes, 3);

	const baseUrl = getBaseUrl();
	const canonicalPath = `/project/${encodeURIComponent(slug)}`;
	const canonicalUrl = toAbsoluteUrl(baseUrl, canonicalPath);

	const primaryImage = project.coverImage?.url || undefined;

	const ldJson = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: project.title,
		description: project.shortDescription ? buildDescription(project.shortDescription) : undefined,
		url: canonicalUrl,
		isPartOf: {
			'@type': 'WebSite',
			name: SITE_CONFIG.name,
			url: baseUrl
		},
		primaryImageOfPage: primaryImage
			? {
					'@type': 'ImageObject',
					url: primaryImage
				}
			: undefined,
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Главная',
					item: toAbsoluteUrl(baseUrl, PAGE.HOME)
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: 'Объекты',
					item: toAbsoluteUrl(baseUrl, PAGE.OBJECTS)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: project.title,
					item: canonicalUrl
				}
			]
		}
	};

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
			/>
			<ProjectContent
				project={project}
				relatedProjects={relatedProjects}
			/>
		</>
	);
}
