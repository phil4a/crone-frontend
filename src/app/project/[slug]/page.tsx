import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectContent } from '@/components/features/project/ProjectContent';

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

export async function generateStaticParams() {
	const { posts } = await client.request<GetAllProjectSlugsQuery>(GetAllProjectSlugsDocument);

	if (!posts?.nodes) return [];

	return posts.nodes
		.filter((node): node is { slug: string } => !!node?.slug)
		.map(node => ({
			slug: node.slug
		}));
}

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params;
	const { post } = await client.request<GetProjectBySlugQuery, GetProjectBySlugQueryVariables>(
		GetProjectBySlugDocument,
		{ slug }
	);

	if (!post) {
		return {
			title: 'Проект не найден'
		};
	}

	return {
		title: post.seo?.title || post.title,
		description: post.seo?.metaDesc || ''
	};
}

export default async function ObjectPage({ params }: TPageSlugProp) {
	const { slug } = await params;
	const { post } = await client.request<GetProjectBySlugQuery, GetProjectBySlugQueryVariables>(
		GetProjectBySlugDocument,
		{ slug }
	);

	if (!post) {
		notFound();
	}

	const project = transformGraphQLProject(post);

	const relatedData = await client.request<
		GetRelatedProjectsQuery,
		GetRelatedProjectsQueryVariables
	>(GetRelatedProjectsDocument, {
		tag: project.tags[0] || undefined,
		notIn: [project.globalId || '']
	});

	const relatedNodes = relatedData?.posts?.nodes || [];
	const relatedProjects = getRandomProjects(relatedNodes, 3);

	return (
		<ProjectContent
			project={project}
			relatedProjects={relatedProjects}
		/>
	);
}
