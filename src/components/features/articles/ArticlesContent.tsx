'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ArticleCard } from '@/components/common/articles/ArticleCard';
import { ArticlesSidebar } from '@/components/features/articles/ArticlesSidebar';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Pagination } from '@/components/ui/Pagination';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { useArticleCategories } from '@/hooks/articles/useArticleCategories';
import { useArticles } from '@/hooks/articles/useArticles';

const ITEMS_PER_PAGE = 9;

export function ArticlesContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const page = Number(searchParams.get('page')) || 1;
	const category = searchParams.get('category') || 'articles';

	const { articles, totalPages, isLoading } = useArticles(page, ITEMS_PER_PAGE, category);
	const { categories } = useArticleCategories();

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(newPage));
		router.push(`?${params.toString()}`);
	};

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

	return (
		<main className='pt-38 pb-27 container bg-light-gray min-h-screen'>
			<HeaderThemeObserver theme='light' />

			<Breadcrumbs items={breadcrumbs} />

			<Title
				as='h1'
				className='mb-12'
			>
				{getTitle()}
			</Title>

			<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
				{/* Sidebar */}
				<div className='hidden lg:block lg:col-span-1'>
					<ArticlesSidebar className='sticky top-32' />
				</div>

				{/* Content */}
				<div className='lg:col-span-3'>
					{isLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
							{Array.from({ length: 6 }).map((_, i) => (
								<SkeletonLoader
									key={i}
									className='aspect-video w-full rounded-lg'
								/>
							))}
						</div>
					) : articles.length > 0 ? (
						<>
							<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12'>
								{articles.map(article => (
									<ArticleCard
										key={article.id}
										article={article}
									/>
								))}
							</div>

							<Pagination
								currentPage={page}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</>
					) : (
						<div className='text-center py-20 text-gray-500'>
							Статей в данной категории пока нет.
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
