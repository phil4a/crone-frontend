import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useArticleCategories } from '@/hooks/articles/useArticleCategories';

import { cn } from '@/lib/utils';

interface ArticlesSidebarProps {
	className?: string;
}

export function ArticlesSidebar({ className }: ArticlesSidebarProps) {
	const searchParams = useSearchParams();
	const currentCategory = searchParams.get('category');
	const { categories, isLoading } = useArticleCategories();

	return (
		<aside className={cn('w-full', className)}>
			<h3 className='text-lg font-bold mb-6 uppercase'>Категории:</h3>
			<ul className='flex flex-col gap-4'>
				<li>
					<Link
						href='/articles'
						className={cn(
							'text-sm uppercase tracking-wider transition-colors hover:text-beige',
							!currentCategory ? 'text-beige font-bold' : 'text-gray-500'
						)}
					>
						Все
					</Link>
				</li>
				{isLoading &&
					Array.from({ length: 3 }).map((_, i) => (
						<li key={i}>
							<div className='h-5 w-24 bg-gray-200 animate-pulse rounded' />
						</li>
					))}
				{categories?.map(category => (
					<li key={category.slug}>
						<Link
							href={`/articles?category=${category.slug}`}
							className={cn(
								'text-sm uppercase tracking-wider transition-colors hover:text-beige',
								currentCategory === category.slug ? 'text-beige font-bold' : 'text-gray-500'
							)}
						>
							{category.name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
