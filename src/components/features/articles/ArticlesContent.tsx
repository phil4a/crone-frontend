'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { ArticleCard } from '@/components/common/articles/ArticleCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { useArticleCategories } from '@/hooks/articles/useArticleCategories';
import { useInfiniteArticles } from '@/hooks/articles/useArticles';
import { useInfinitePageLoader } from '@/hooks/useInfinitePageLoader';

const ITEMS_PER_PAGE = 9;

export function ArticlesContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get('page')) || 1;
	const category = searchParams.get('category') || 'articles';

	const {
		articles,
		totalPages,
		loadedPages,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteArticles(ITEMS_PER_PAGE, category);
	const { categories } = useArticleCategories();

	const setPageParam = useCallback(
		(nextPage: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set('page', String(nextPage));
			router.replace(`?${params.toString()}`, { scroll: false });
		},
		[router, searchParams]
	);

	const getTitle = () => {
		if (category === 'articles') return 'Все статьи';
		const foundCategory = categories.find(c => c.slug === category);
		return foundCategory ? foundCategory.name : 'Все статьи';
	};

	const breadcrumbs = [
		{ label: 'Статьи', href: '/articles' },
		category !== 'articles'
			? { label: getTitle(), href: `/articles?category=${category}` }
			: { label: '', href: '' }
	].filter(item => item.label);

	const { sentinelRef, containerRef, handleLoadMore } = useInfinitePageLoader<HTMLDivElement>({
		itemsPerPage: ITEMS_PER_PAGE,
		page,
		loadedPages,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		onPageChange: setPageParam,
		resetKey: category
	});

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />

			<Title
				as='h1'
				className='mb-8'
			>
				{getTitle()}
			</Title>
			{isLoading ? (
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-6 mb-12'>
					<SkeletonLoader
						count={6}
						className='w-full relative h-full aspect-12/16 rounded-lg'
					/>
				</div>
			) : error && articles.length === 0 ? (
				<div className='py-20 text-center text-red-500'>
					Произошла ошибка при загрузке статей. Пожалуйста, попробуйте позже.
				</div>
			) : articles.length > 0 ? (
				<>
					<div
						ref={containerRef}
						className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-6 mb-12'
					>
						{articles.map(article => (
							<ArticleCard
								key={article.id}
								article={article}
							/>
						))}
						{isFetchingNextPage ? (
							<SkeletonLoader
								count={3}
								className='w-full relative h-full aspect-12/16 rounded-lg'
							/>
						) : null}
					</div>

					<div className='flex flex-col items-center gap-4'>
						{hasNextPage ? (
							<Button
								type='button'
								variant='outline'
								disabled={isFetchingNextPage}
								onClick={handleLoadMore}
							>
								{isFetchingNextPage ? 'Загрузка…' : 'Показать ещё'}
							</Button>
						) : (
							<p className='text-gray-500'>Все статьи загружены</p>
						)}
						<div
							ref={sentinelRef}
							className='h-1 w-full'
						/>
						{totalPages > 0 ? (
							<p className='text-sm text-gray-500'>
								Загружено: {loadedPages} / {totalPages} страниц
							</p>
						) : null}
					</div>
				</>
			) : (
				<div className='text-center py-20 text-gray-500'>Статей в данной категории пока нет.</div>
			)}
		</>
	);
}
