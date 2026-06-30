import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

import { FeedbackForm } from '@/components/common/FeedbackForm';
import { Advantages } from '@/components/features/home/Advantages';
import { Hero } from '@/components/features/home/Hero';
import { Projects } from '@/components/features/home/Projects';
import { AClassSection } from '@/components/features/home/a-class-houses/AClassSection';
import { LazyCreating } from '@/components/features/home/creating/LazyCreating';
import { LazyFeatures } from '@/components/features/home/features/LazyFeatures';
import { LazyGeography } from '@/components/features/home/geography/LazyGeography';
import { LazySteps } from '@/components/features/home/steps/LazySteps';
import { ViewportLazy } from '@/components/layout/ViewportLazy';

import { SITE_CONFIG } from '@/config/site.config';

import { client } from '@/api/graphql';

import {
	GetProjectsDocument,
	type GetProjectsQuery,
	type GetProjectsQueryVariables
} from '@/graphql/generated';

function normalizeImageUrl(value: string): string {
	const trimmed = value.trim();
	if (trimmed.startsWith('http')) return trimmed;
	if (trimmed.startsWith('//')) return `https:${trimmed}`;
	return trimmed;
}

const getHomeCoverImageUrl = unstable_cache(
	async (): Promise<string | null> => {
		try {
			const data = await client.request<GetProjectsQuery, GetProjectsQueryVariables>(
				GetProjectsDocument,
				{
					first: 1,
					offset: 0
				}
			);
			const node = data?.posts?.nodes?.[0];
			const url = node?.featuredImage?.node?.sourceUrl?.trim();
			return url ? normalizeImageUrl(url) : null;
		} catch {
			return null;
		}
	},
	['crone-home-cover-og-image'],
	{ revalidate: 3600 }
);

export async function generateMetadata(): Promise<Metadata> {
	const ogImageUrl = (await getHomeCoverImageUrl()) || '/images/home/fs-pc.jpg';

	return {
		alternates: { canonical: '/' },
		openGraph: {
			title: SITE_CONFIG.metadata.title,
			description: SITE_CONFIG.metadata.description,
			url: '/',
			siteName: SITE_CONFIG.name,
			locale: 'ru_RU',
			type: 'website',
			images: [
				{
					url: ogImageUrl,
					alt: SITE_CONFIG.name
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: SITE_CONFIG.metadata.title,
			description: SITE_CONFIG.metadata.description,
			images: [ogImageUrl]
		},
		keywords: [
			'строительство домов',
			'клееный брус',
			'Новосибирск',
			'проектирование',
			'дом под ключ',
			SITE_CONFIG.name
		]
	};
}

export default function HomePage() {
	return (
		<main className='flex min-h-screen flex-col'>
			<Hero />
			<Advantages />
			<ViewportLazy rootMargin='400px'>
				<AClassSection />
			</ViewportLazy>
			<LazyFeatures />
			<ViewportLazy rootMargin='700px'>
				<LazyCreating />
			</ViewportLazy>

			<Projects />
			<ViewportLazy rootMargin='800px'>
				<LazyGeography />
			</ViewportLazy>
			<ViewportLazy rootMargin='500px'>
				<LazySteps />
			</ViewportLazy>
			<FeedbackForm formId={225} />
		</main>
	);
}
