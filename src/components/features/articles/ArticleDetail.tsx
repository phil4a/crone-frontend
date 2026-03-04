import Image from 'next/image';

import { ArticleContentParser } from '@/components/features/articles/ArticleContentParser';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Title } from '@/components/ui/Title';

import { formatDate } from '@/lib/formatters/date';
import { Article } from '@/types/article.types';

interface ArticleDetailProps {
	article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
	const breadcrumbs = [
		{ label: 'Статьи', href: '/articles' },
		article.category
			? { label: article.category.name, href: `/articles?category=${article.category.slug}` }
			: { label: '', href: '' }
	].filter(item => item.label);

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />

			<article>
				<Title
					as='h1'
					className='mb-6'
				>
					{article.title}
				</Title>

				{article.date && <div className='text-dark-gray mb-6'>{formatDate(article.date)}</div>}

				{/* {article.coverImage && (
					<div className='relative w-full aspect-video mb-8 rounded-2xl overflow-hidden'>
						<Image
							src={article.coverImage.url}
							alt={article.coverImage.alt || article.title}
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 80vw'
							priority
						/>
					</div>
				)} */}

				<div className='text-main leading-relaxed [&_p]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4 [&_li]:list-disc [&_ol>li]:list-decimal [&_li]:ml-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-2 [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_a]:text-beige [&_a]:underline hover:[&_a]:no-underline'>
					<ArticleContentParser content={article.content} />
				</div>
			</article>
		</>
	);
}
