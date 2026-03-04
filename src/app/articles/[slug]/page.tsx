import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { client } from '@/api/graphql';
import { ArticleDetail } from '@/components/features/articles/ArticleDetail';

import {
	GetAllArticleSlugsDocument,
	GetAllArticleSlugsQuery,
	GetArticleBySlugDocument,
	GetArticleBySlugQuery,
	GetArticleBySlugQueryVariables
} from '@/graphql/generated';
import { transformGraphQLArticle } from '@/lib/transformers';
import { TPageSlugProp } from '@/types/page.types';

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateStaticParams() {
	const { posts } = await client.request<GetAllArticleSlugsQuery>(GetAllArticleSlugsDocument);

	if (!posts?.nodes) return [];

	return posts.nodes
		.filter((node): node is { slug: string } => !!node?.slug)
		.map(node => ({
			slug: node.slug
		}));
}

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params;
	const { post } = await client.request<GetArticleBySlugQuery, GetArticleBySlugQueryVariables>(
		GetArticleBySlugDocument,
		{ slug }
	);

	if (!post) {
		return {
			title: 'Статья не найдена'
		};
	}

	return {
		title: post.seo?.title || post.title,
		description: post.seo?.metaDesc || ''
	};
}

export default async function ArticlePage({ params }: TPageSlugProp) {
	const { slug } = await params;
	const { post } = await client.request<GetArticleBySlugQuery, GetArticleBySlugQueryVariables>(
		GetArticleBySlugDocument,
		{ slug }
	);

	if (!post) {
		notFound();
	}

	// We cast post to any here because the transform function is typed against the list query result,
	// but the fields are identical due to the shared fragment.
	const article = transformGraphQLArticle(post as any);

	return <ArticleDetail article={article} />;
}
