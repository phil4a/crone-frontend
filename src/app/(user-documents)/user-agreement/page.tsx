import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DocumentText } from '@/components/layout/DocumentText';

import { client } from '@/api/graphql';

import {
	GetPageByUriDocument,
	GetPageByUriQuery,
	GetPageByUriQueryVariables
} from '@/graphql/generated';

const PAGE_URI = '/user-agreement/';

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
	const { page } = await client.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
		GetPageByUriDocument,
		{ uri: PAGE_URI }
	);

	return {
		title: page?.seo?.title || page?.title || 'Пользовательское соглашение | Крона Групп',
		description: page?.seo?.metaDesc || 'Пользовательское соглашение ООО «Крона Групп».'
	};
}

export default async function UserAgreementPage() {
	const { page } = await client.request<GetPageByUriQuery, GetPageByUriQueryVariables>(
		GetPageByUriDocument,
		{ uri: PAGE_URI }
	);

	if (!page) {
		notFound();
	}

	return <DocumentText page={page} />;
}
