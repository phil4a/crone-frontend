import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ArticlesContent } from '@/components/features/articles/ArticlesContent';

import { PAGE } from '@/config/pages.config';
import { PAGES_SEO } from '@/config/seo.config';
import { SITE_URL } from '@/config/site.config';

export { ArticlesContent } from '@/components/features/articles/ArticlesContent';

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
	blog: {
		title: 'Блог компании Крона Групп',
		description:
			'Блог компании Крона Групп с новостями, статьями и советами по строительству и управлению коммерческими объектами из клееного бруса.'
	},
	'articles-materials': {
		title: 'Статьи о материалах строительства из клееного бруса',
		description:
			'Статьи о материалах строительства из клееного бруса с советами по выбору материалов, их обработке и применению в строительстве коммерческих и жилых объектов.'
	},
	building: {
		title: 'Статьи о строительстве из клееного бруса',
		description: 'Статьи о строительстве из клееного бруса'
	}
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const searchParams = await props.searchParams;
	const tag = typeof searchParams.category === 'string' ? searchParams.category : undefined;

	const baseTitle = PAGES_SEO.articles.title;
	const baseDescription = PAGES_SEO.articles.metaDesc;

	const tagMeta = tag ? TAG_META[tag] : undefined;

	const title = tagMeta ? tagMeta.title : baseTitle;
	const description = tagMeta ? tagMeta.description : baseDescription;

	const basePath = `${SITE_URL}${PAGE.ARTICLES}`;
	const canonicalPath = tag ? `${basePath}?category=${encodeURIComponent(tag)}` : basePath;

	return {
		title,
		description,
		alternates: {
			canonical: canonicalPath
		}
	};
}

export default async function ArticlesPage() {
	return (
		<Suspense fallback={<div className='h-screen' />}>
			<ArticlesContent />
		</Suspense>
	);
}
