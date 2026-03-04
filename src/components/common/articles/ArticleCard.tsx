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
	const articleUrl = `/articles/${article.slug}${
		article.category ? `?category=${article.category.slug}` : ''
	}`;

	return (
		<article className='flex flex-col h-full bg-white rounded-lg border border-brown/20 overflow-hidden group'>
			<Link
				href={articleUrl}
				className='relative w-full aspect-4/3 overflow-hidden'
			>
				{article.coverImage ? (
					<Image
						src={article.coverImage.url}
						alt={article.coverImage.alt || article.title}
						fill
						className='object-cover  transition-transform duration-500 group-hover:scale-102'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				) : (
					<div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-400'>
						Нет изображения
					</div>
				)}
			</Link>

			<div className='flex flex-col grow p-6'>
				<div className='flex items-center gap-4 mb-4 text-xs text-gray-500  font-medium tracking-wider'>
					<Badge
						variant='beige'
						className='font-normal'
					>
						{article.category?.name || 'Статьи'}
					</Badge>
					<time
						className='uppercase'
						dateTime={article.date}
					>
						{formatDate(article.date)}
					</time>
				</div>

				<h3 className='text-2xl font-normal mb-3 group-hover:text-brown transition-colors'>
					<Link href={articleUrl}>{article.title}</Link>
				</h3>

				<div
					className='text-gray-600 text-sm mb-6 line-clamp-3 grow'
					dangerouslySetInnerHTML={{ __html: article.shortDescription }}
				/>

				<Button
					as={Link}
					href={articleUrl}
					variant='default'
					size='lg'
					className='w-full mt-auto'
				>
					Читать далее
				</Button>
			</div>
		</article>
	);
}
