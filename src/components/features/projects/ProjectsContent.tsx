'use client';

import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { FiltersDrawer } from '@/components/features/projects/FiltersDrawer';
import { ProjectSkeletonLoader } from '@/components/features/projects/ProjectSkeletonLoader';
import { ProjectSidebar } from '@/components/features/projects/ProjectsSidebar';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { ITEMS_PER_PAGE } from '@/config/site.config';

import { useProjectFilters } from '@/hooks/projects/useProjectFilters';
import { useProjectStats } from '@/hooks/projects/useProjectStats';
import { useProjectTags } from '@/hooks/projects/useProjectTags';
import { useInfiniteProjects } from '@/hooks/projects/useProjects';
import { useInfinitePageLoader } from '@/hooks/useInfinitePageLoader';

import { ProjectsText } from './ProjectsText';
import { pluralizeProjects } from '@/lib/formatters/pluralize';
import { cn } from '@/lib/utils';

const ProjectSortPopoverClient = dynamic(
	() =>
		import('@/components/features/projects/ProjectsSortPopover').then(
			module => module.ProjectSortPopover
		),
	{ ssr: false }
);

export function ProjectsContent() {
	const { stats, isReady: isStatsReady } = useProjectStats();
	const { page, setPage, tag, filters, sort, setSort, applyFilters, resetTag, setTagFilter } =
		useProjectFilters(stats);
	const { tags, getPageTitle } = useProjectTags();
	const {
		projects,
		totalItems,
		totalPages,
		loadedPages,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useInfiniteProjects(ITEMS_PER_PAGE, filters, sort, isStatsReady);
	const sidebarKey = JSON.stringify(filters);
	const onPageChange = useCallback((nextPage: number) => setPage(nextPage), [setPage]);
	const { sentinelRef, containerRef, handleLoadMore } = useInfinitePageLoader<HTMLUListElement>({
		itemsPerPage: ITEMS_PER_PAGE,
		page,
		loadedPages,
		hasNextPage,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		onPageChange
	});

	return (
		<main className='pt-38 pb-27 container  min-h-screen'>
			<HeaderThemeObserver theme='light' />
			<Title as='h1'>{getPageTitle(tag)}</Title>

			<div className='grid grid-cols-1 pt-12 xl:grid-cols-5 gap-8'>
				<div className='hidden xl:block xl:col-span-1'>
					<ProjectSidebar
						key={sidebarKey}
						filters={filters}
						onApply={applyFilters}
						className='sticky top-32'
						stats={stats}
					/>
				</div>

				{/* Projects Grid */}
				<div className='xl:col-span-4'>
					{/* Top Bar with Tags and Sorting */}
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
						{/* Tags */}
						<div className='flex flex-wrap gap-2'>
							<Button
								variant='secondary'
								size='sm'
								onClick={resetTag}
								className={cn(!tag && 'bg-beige text-white font-semibold border-beige')}
							>
								Все
							</Button>
							{tags.map(t => (
								<Button
									size='sm'
									variant='secondary'
									key={t.id}
									onClick={() => setTagFilter(t.slug || null)}
									className={cn(tag === t.slug && 'bg-beige text-white font-semibold border-beige')}
								>
									{t.name}
								</Button>
							))}
						</div>

						<div className='hidden xl:flex'>
							<ProjectSortPopoverClient
								sort={sort}
								onChange={setSort}
							/>
						</div>
					</div>
					<div className='flex justify-between items-center mb-5'>
						<FiltersDrawer
							filters={filters}
							onApply={applyFilters}
							stats={stats}
						/>
						<div className='xl:hidden flex'>
							<ProjectSortPopoverClient
								sort={sort}
								onChange={setSort}
							/>
						</div>
					</div>
					{isLoading && (
						<div className='text-dark-gray mb-3'>
							<SkeletonLoader
								count={1}
								className='w-25 h-6 rounded-lg'
							/>
						</div>
					)}
					{!isLoading && totalItems > 0 && (
						<p className='text-dark-gray mb-3'>{pluralizeProjects(totalItems)}</p>
					)}
					{isLoading ? (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{Array.from({ length: 6 }).map((_, idx) => (
								<ProjectSkeletonLoader key={idx} />
							))}
						</div>
					) : error && projects.length === 0 ? (
						<div className='p-8 text-center text-red-500'>
							Произошла ошибка при загрузке проектов. Пожалуйста, попробуйте позже.
						</div>
					) : projects.length === 0 ? (
						<div className='p-12 text-center text-dark-gray bg-white rounded-2xl'>
							Проектов по выбранным критериям не найдено.
						</div>
					) : (
						<>
							<ul
								ref={containerRef}
								className='grid grid-cols-1 md:grid-cols-2 gap-5'
							>
								{projects.map((project, index) => (
									<ProjectCardDetailed
										key={project.id}
										project={project}
										index={index}
									/>
								))}
								{isFetchingNextPage
									? Array.from({ length: 2 }).map((_, idx) => (
											<ProjectSkeletonLoader key={`next-${idx}`} />
										))
									: null}
							</ul>

							<div className='mt-10 flex flex-col items-center gap-4'>
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
									<p className='text-dark-gray'>Все проекты загружены</p>
								)}
								<div
									ref={sentinelRef}
									className='h-1 w-full'
								/>
								{totalPages > 0 ? (
									<p className='text-sm text-dark-gray'>
										Загружено: {loadedPages} / {totalPages} страниц
									</p>
								) : null}
							</div>
						</>
					)}
				</div>
			</div>
			<ProjectsText tag={tag} />
		</main>
	);
}
