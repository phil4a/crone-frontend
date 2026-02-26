import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

import { formatDate } from '@/lib/formatters/date';
import { Article } from '@/types/article.types';

interface ArticleCardProps {
	article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<article className='flex flex-col h-full bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300'>
			<Link
				href={`/articles/${article.slug}`}
				className='relative w-full aspect-video overflow-hidden'
			>
				{article.coverImage ? (
					<Image
						src={article.coverImage.url}
						alt={article.coverImage.alt || article.title}
						fill
						className='object-cover transition-transform duration-500 group-hover:scale-105'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				) : (
					<div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-400'>
						Нет изображения
					</div>
				)}
			</Link>

			<div className='flex flex-col grow p-6'>
				<div className='flex items-center gap-4 mb-4 text-xs text-gray-500 uppercase font-medium tracking-wider'>
					<Badge
						variant='outline'
						className='bg-beige/10 text-beige border-none px-2 py-1'
					>
						{article.category?.name || 'Статьи'}
					</Badge>
					<time dateTime={article.date}>{formatDate(article.date)}</time>
				</div>

				<h3 className='text-xl font-bold mb-3 leading-tight group-hover:text-beige transition-colors'>
					<Link href={`/articles/${article.slug}`}>{article.title}</Link>
				</h3>

				<div
					className='text-gray-600 text-sm mb-6 line-clamp-3 grow'
					dangerouslySetInnerHTML={{ __html: article.shortDescription }}
				/>

				<Button
					as={Link}
					href={`/articles/${article.slug}`}
					variant='default'
					className='w-full mt-auto'
				>
					Читать далее
				</Button>
			</div>
		</article>
	);
}
