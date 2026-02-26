import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

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
		<aside className={cn('w-full pt-3', className)}>
			<h3 className='text-xl font-bold mb-4 lg:mb-6 uppercase'>Категории:</h3>
			<ul className='flex lg:flex-col gap-x-8 gap-y-3 lg:gap-4 flex-wrap'>
				<li>
					<Link
						href='/articles'
						className={cn(
							'text-lg uppercase tracking-wider transition-colors hover:text-beige',
							!currentCategory ? 'text-beige font-bold' : 'text-gray-500'
						)}
					>
						Все
					</Link>
				</li>
				{isLoading && (
					<SkeletonLoader
						count={3}
						className='h-5 w-24 rounded'
					/>
				)}
				{categories?.map(category => (
					<li key={category.slug}>
						<Link
							href={`/articles?category=${category.slug}`}
							className={cn(
								'text-lg uppercase tracking-wider transition-colors hover:text-beige',
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
