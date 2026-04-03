import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ProjectsContent } from '@/components/features/projects/ProjectsContent';
import { ProjectsSkeleton } from '@/components/features/projects/ProjectsSkeleton';

import { PAGE } from '@/config/pages.config';
import { PAGES_SEO } from '@/config/seo.config';
import { SITE_URL } from '@/config/site.config';

import { TAG_SEO_TITLES } from '@/hooks/projects/useProjectTags';

export const revalidate = 100;
export const dynamic = 'force-static';

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TAG_META: Record<
	string,
	{
		title: string;
		description: string;
	}
> = {
	spa: {
		title: 'Бани из клееного бруса под ключ в Новосибирске',
		description:
			'Бани из клееного бруса под ключ от Крона Групп в Новосибирске и по всей России. Индивидуальные проекты, комфортный микроклимат, долговечные и эстетичные банные комплексы.'
	},
	'kommercheskaya-nedvizhimost': {
		title: 'Коммерческие объекты из клееного бруса для бизнеса',
		description:
			'Коммерческие объекты из клееного бруса: гостиницы, рестораны, офисы и SPA-комплексы. Проектирование и строительство под ключ от Крона Групп в Новосибирске и регионах России.'
	}
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const searchParams = await props.searchParams;
	const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined;

	const baseTitle = PAGES_SEO.projects.title;
	const baseDescription = PAGES_SEO.projects.metaDesc;

	const tagMeta = tag ? TAG_META[tag] : undefined;

	const title = tagMeta ? tagMeta.title : baseTitle;
	const description = tagMeta ? tagMeta.description : baseDescription;

	const basePath = `${SITE_URL}${PAGE.OBJECTS}`;
	const canonicalPath = tag ? `${basePath}?tag=${encodeURIComponent(tag)}` : basePath;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalPath
		}
	};
}

export default async function ProjectsPage(props: PageProps) {
	const searchParams = await props.searchParams;
	const tag = typeof searchParams.tag === 'string' ? searchParams.tag : undefined;

	const title = tag && TAG_SEO_TITLES[tag] ? TAG_SEO_TITLES[tag] : 'Дома из клееного бруса';

	return (
		<Suspense fallback={<ProjectsSkeleton title={title} />}>
			<ProjectsContent />
		</Suspense>
	);
}
