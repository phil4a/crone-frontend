import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocumentText } from '@/components/layout/DocumentText';

import { client } from '@/api/graphql';

import {
	GetPageByUriDocument,
	GetPageByUriQuery,
	GetPageByUriQueryVariables
} from '@/graphql/generated';

const PAGE_URI = '/privacy-policy/';

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
	const { page } = await client.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
		GetPageByUriDocument,
		{ uri: PAGE_URI }
	);

	if (!page) {
		return {
			title: 'Политика конфиденциальности | Крона Групп',
			description: 'Политика в отношении обработки персональных данных ООО «Крона Групп».'
		};
	}

	return {
		title: page.seo?.title || page.title || 'Политика конфиденциальности',
		description: page.seo?.metaDesc || ''
	};
}

export default async function PrivacyPolicyPage() {
	const { page } = await client.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
		GetPageByUriDocument,
		{ uri: PAGE_URI }
	);

	if (!page) {
		notFound();
	}

	return <DocumentText page={page} />;
}
