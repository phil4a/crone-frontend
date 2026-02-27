'use client';

import dynamic from 'next/dynamic';

import { ProjectCardDetailed } from '@/components/common/projects/ProjectCardDetailed';
import { FiltersDrawer } from '@/components/features/projects/FiltersDrawer';
import { ProjectSidebar } from '@/components/features/projects/ProjectsSidebar';
import { HeaderThemeObserver } from '@/components/layout/HeaderThemeObserver';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Title } from '@/components/ui/Title';

import { ITEMS_PER_PAGE } from '@/config/site.config';

import { useProjectFilters } from '@/hooks/projects/useProjectFilters';
import { useProjectStats } from '@/hooks/projects/useProjectStats';
import { useProjectTags } from '@/hooks/projects/useProjectTags';
import { useProjects } from '@/hooks/projects/useProjects';

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
	// Custom Hooks
	const { stats } = useProjectStats();
	const { page, setPage, tag, filters, sort, setSort, applyFilters, resetTag, setTagFilter } =
		useProjectFilters(stats);
	const { tags, getPageTitle } = useProjectTags();
	const { projects, totalItems, totalPages, isLoading, error } = useProjects(
		page,
		ITEMS_PER_PAGE,
		filters,
		sort
	);
	const sidebarKey = JSON.stringify(filters);

	return (
		<main className='pt-38 pb-27 container bg-light-gray min-h-screen'>
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
								<div
									key={idx}
									className='relative flex flex-col'
								>
									<div className='absolute w-23.5 h-7.5 rounded-lg top-5 left-5 z-1 bg-white' />
									<div className='absolute top-5 right-5 z-1 w-15.25 h-7.5 rounded-lg bg-white' />
									<SkeletonLoader
										count={1}
										className='relative w-full h-full aspect-4/3 lg:aspect-video rounded-2xl'
									/>
									<div className='flex flex-col pt-4 pb-5 px-2 gap-2'>
										<SkeletonLoader
											count={1}
											className='w-30 h-6 mb-1 rounded-lg'
										/>
										<div className='flex flex-wrap gap-x-8 gap-y-2.5'>
											{
												<SkeletonLoader
													count={4}
													className='w-22 h-6 rounded-lg'
												/>
											}
										</div>
									</div>
								</div>
							))}
						</div>
					) : error ? (
						<div className='p-8 text-center text-red-500'>
							Произошла ошибка при загрузке проектов. Пожалуйста, попробуйте позже.
						</div>
					) : projects.length === 0 ? (
						<div className='p-12 text-center text-dark-gray bg-white rounded-2xl'>
							Проектов по выбранным критериям не найдено.
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
								{projects.map(project => (
									<ProjectCardDetailed
										key={project.id}
										project={project}
									/>
								))}
							</div>

							<div className='mt-10'>
								<Pagination
									currentPage={page || 1}
									totalPages={totalPages}
									onPageChange={p => {
										setPage(p);
										window.scrollTo({ top: 0, behavior: 'smooth' });
									}}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<ProjectsText tag={tag} />
		</main>
	);
}
