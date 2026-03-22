import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocumentText } from '@/components/layout/DocumentText';

import { client } from '@/api/graphql';

import {
	GetPageByUriDocument,
	GetPageByUriQuery,
	GetPageByUriQueryVariables
} from '@/graphql/generated';

const PAGE_URI = '/cookies-policy/';

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
	const { page } = await client.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
		GetPageByUriDocument,
		{ uri: PAGE_URI }
	);

	return {
		title: page?.seo?.title || page?.title || 'Политика cookies | Крона Групп',
		description: page?.seo?.metaDesc || ''
	};
}

export default async function CookiesPolicyPage() {
	const { page } = await client.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
		GetPageByUriDocument,
		{ uri: PAGE_URI }
	);

	if (!page) {
		notFound();
	}

	return <DocumentText page={page} />;
}
