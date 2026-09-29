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

				<div className='article-content'>
					<ArticleContentParser content={article.content} />
				</div>
			</article>
		</>
	);
}
